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
 * 保存処理
 */

　async function updateTodo(button) {
	// クリックされた保存ボタンの親カード要素を取得
	const card = button.closest(".card");
	  
	// TODOカードが取得できない場合はエラーをログに出して処理中断
	if (!card) {
		console.error("カードが見つかりません");
		return;
	}
	
	 // TODOのID、編集中のTODOテキストと期日の入力値を取得
	 const id = card.getAttribute("data-todo-id");
	 const todoInput = card.querySelector(".edit-todo");
	 const dateInput = card.querySelector(".edit-date");
	 const todo = todoInput.value;
	 const dueDate = dateInput.value;

	try {
		// サーバーへ更新内容をJSONで送信するPOSTリクエストを送る
		await fetch("/update", {
		  method: "POST",
		  headers: {
		    "Content-Type": "application/json",
		  },
		  body: JSON.stringify({ id, todo, dueDate }),
		});
	} catch (error) {
	    // 通信や更新時にエラーが発生したらコンソールに表示
	    console.error("更新エラー:", error);
	}
	
	// 更新完了後、保存ボタンを非表示にする（対象のカード内のみ）
	const saveButton = card.querySelector(".btnSave");
	if (saveButton) saveButton.style.display = "none";
	
	//表示モードに切り替える
	switchToDisplayMode();
	
	// 期日が今日のTODOを赤くする関数を呼び出して再判定
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
    if (dueDateText <= today) {
      card.style.backgroundColor = "#ffcccc"; // 今日が期日のTODOを目立たせる
    } else {
      card.style.backgroundColor = ""; // 今日じゃない場合は色をリセット
    }
    
  });
}

/**
 * 編集モードから表示モード切り替え処理
 */
function switchToDisplayMode(){
	// 編集モードから表示モードに切り替える（TODOテキスト部分）
	  const todoDiv = document.createElement("div");
	  todoDiv.classList.add("todo-text");
	  todoDiv.textContent = todo;
	  todoInput.replaceWith(todoDiv);
	
	  // 編集モードから表示モードに切り替える（期日部分）
	  const dateDiv = document.createElement("div");
	  dateDiv.classList.add("due-date");
	  dateDiv.textContent = "期日: " + dueDate;
	  dateInput.replaceWith(dateDiv);
}

	
// ページ読み込み時に呼び出す
document.addEventListener("DOMContentLoaded", highlightTodayTodos);

