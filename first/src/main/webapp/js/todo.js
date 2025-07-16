/**
 * TODO.js
 */


/**
 * TODO完了処理
 */
async function todoComplete(btn) {
	
	  const card = btn.closest('.card');
  	  const todoId = card.getAttribute('data-todo-id');
	
		//TODOを完了にする（サーバー処理）
		try{
			await fetch('/complete', {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				},
				body: JSON.stringify(todoId)
			});
			
			
		}catch(error){
		console.log(error);	
		}
		
		  // 完了列に移動
	    const completeColumn = document.querySelectorAll('.column')[1];  // 2番目のカラムが完了列なら
	    completeColumn.appendChild(card);

	    
	    
	    // 完了ボタンを非表示
	    btn.style.display = 'none';
	  }
	  

/**
 * 削除処理
 */ 
 async function deleteTodo(btn) {
    const card = btn.closest('.card');
    const todoId = card.getAttribute('data-todo-id');
    
    //TODOを削除にする（サーバー処理）
		try{
			await fetch('/delete', {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				},
				body: JSON.stringify(todoId)
			});
			
			
		}catch(error){
		console.log(error);	
		}
		
    card.remove();
 }
      	
    
/**
 *編集処理
 */
  function editTodo(button) {
	  const card = button.closest(".card");
	  if (!card) {
	    console.error("カードが見つかりません");
	    return;
	  }

	  // 保存ボタンを表示（このカード内だけ）
	  const saveBtn = card.querySelector(".btnSave");
	  if (saveBtn) saveBtn.style.display = "inline";

	  // TODO内容を入力モードに
	  const todoDiv = card.querySelector(".todo-text");
	  const todoText = todoDiv.textContent;
	  const todoInput = document.createElement("input");
	  todoInput.type = "text";
	  todoInput.value = todoText;
	  todoInput.classList.add("edit-todo");
	  todoDiv.replaceWith(todoInput);

	  // 期日を入力モードに
	  const dateDiv = card.querySelector(".due-date");
	  const dateText = dateDiv.textContent.replace("期日: ", "").trim();
	  const dateInput = document.createElement("input");
	  dateInput.type = "date";
	  dateInput.value = dateText;
	  dateInput.classList.add("edit-date");
	  dateDiv.replaceWith(dateInput);
}

    
/**
 * （編集時）保存処理
 */

　async function updateTodo(button) {
	　const card = button.closest(".card");
	  //TODOカードが取得できない場合
	  if (!card) {
	    console.error("カードが見つかりません");
	    return;
	  }
	
	  const id = card.getAttribute("data-todo-id");
	  const todoInput = card.querySelector(".edit-todo");
	  const dateInput = card.querySelector(".edit-date");
	  const todo = todoInput.value;
	  const dueDate = dateInput.value;

	  try {
	    await fetch("/update", {
	      method: "POST",
	      headers: {
	        "Content-Type": "application/json",
	      },
	      body: JSON.stringify({ id, todo, dueDate }),
	    });
	  } catch (error) {
	    console.error("更新エラー:", error);
	  }

	  // 保存ボタンを非表示にする（このカードだけ対象）
	  const saveButton = card.querySelector(".btnSave");
	  if (saveButton) saveButton.style.display = "none";

	  // 表示モード切り替え（TODO内容）
	  const todoDiv = document.createElement("div");
	  todoDiv.classList.add("todo-text");
	  todoDiv.textContent = todo;
	  todoInput.replaceWith(todoDiv);

	  // 表示モード切り替え（期日）
	  const dateDiv = document.createElement("div");
	  dateDiv.classList.add("due-date");
	  dateDiv.textContent = "期日: " + dueDate;
	  dateInput.replaceWith(dateDiv);
	  
	  highlightTodayTodos();
	  
	}
	
　
/**
 * すべてのTODOカードをチェックして、
 * 「期日が今日」のものを赤くする
 */
function highlightTodayTodos() {
  // 今日の日付を「YYYY-MM-DD」形式で取得
  const today = new Date().toISOString().split('T')[0];

  // すべてのTODOカードをループ処理
  document.querySelectorAll(".card").forEach(card => {
    // 各カードから期日表示の要素を取得
    const dueDateElem = card.querySelector(".due-date");
    if (!dueDateElem) return; // 期日が存在しない場合はスキップ

    // 「期日: YYYY-MM-DD」の形式から日付だけを抜き出す
    const dueDateText = dueDateElem.textContent.replace("期日: ", "").trim();

    // 期日が今日と一致する場合は背景色を赤に、それ以外は元の色に戻す
    if (dueDateText === today) {
      card.style.backgroundColor = "#ffcccc"; // 今日が期日のTODOを目立たせる
    } else {
      card.style.backgroundColor = ""; // 今日じゃない場合は色をリセット
    }
  });
}


// ページ読み込み時に呼び出す
document.addEventListener("DOMContentLoaded", highlightTodayTodos);


	
//async function searchTodo() {
//  const searchValue = document.querySelector("#searchTodo").value;
//  const incompleteColumn = document.querySelector(".board .column");
//
//  try {
//    const response = await fetch("/search", {
//      method: "POST",
//      headers: { "Content-Type": "application/json" },
//      body: JSON.stringify(searchValue),
//    });
//    const todos = await response.json();
//
//    // 既存のカード・メッセージを全部消す
//    incompleteColumn.querySelectorAll(".card, .no-todo-message").forEach(el => el.remove());
//
//    if (todos.length === 0) {
//      const message = document.createElement("div");
//      message.textContent = "該当するTODOはありません";
//      message.classList.add("no-todo-message");
//      message.style.padding = "10px";
//      incompleteColumn.appendChild(message);
//      return;
//    }
//
//    todos.forEach(todo => {
//      const card = document.createElement("div");
//      card.classList.add("card");
//      card.setAttribute("data-todo-id", todo.id);
//
//      const todoText = document.createElement("div");
//      todoText.classList.add("todo-text");
//      todoText.textContent = todo.todo;
//      card.appendChild(todoText);
//
//      const dueDate = document.createElement("div");
//      dueDate.classList.add("due-date");
//      dueDate.textContent = todo.dueDate ? `期日: ${todo.dueDate}` : "期日: なし";
//      card.appendChild(dueDate);
//
//      incompleteColumn.appendChild(card);
//    });
//
//  } catch (error) {
//    console.error("検索エラー:", error);
//  }
//}

