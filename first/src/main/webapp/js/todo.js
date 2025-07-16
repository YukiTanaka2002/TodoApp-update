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
 * 保存処理（編集時）
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
	  
	}
	
//	async function searchTodo() {
//  const searchTodo = document.querySelector("#searchTodo").value;
//  const list = document.getElementById("todoList");
//
//  try {
//    const response = await fetch("/search", {
//      method: "POST",
//      headers: {
//        "Content-Type": "application/json",
//      },
//      body: JSON.stringify(searchTodo), // ★ここを文字列に戻すだけ！
//    });
//
//    const data = await response.json();
//
//    // 表示を初期化
//    list.innerHTML = "";
//
//    // 結果を表示
//    if (data.length === 0) {
//      const li = document.createElement("li");
//      li.textContent = "該当するTODOが見つかりませんでした。";
//      list.appendChild(li);
//    } else {
//      data.forEach(todo => {
//        const li = document.createElement("li");
//        li.innerHTML = `<strong>${todo.todo}</strong>（期日: ${todo.dueDate}）`;
//        list.appendChild(li);
//      });
//    }
//
//  } catch (error) {
//    console.error("検索エラー:", error);
//  }
//}
