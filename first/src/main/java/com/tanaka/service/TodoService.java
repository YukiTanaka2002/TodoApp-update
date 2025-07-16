package com.tanaka.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tanaka.dao.TodoDao;
import com.tanaka.model.Todo;
import com.tanaka.model.TodoSessionData;

@Service
public class TodoService {

    @Autowired
    private TodoDao todoDao;

    //TODOリストキャッシュ用
    //private List<Todo> todoList= new ArrayList<>();
    
    // TODOリストを取得
    public List<Todo> getTodoList() {
    	
    	//TODOリストを取得する。
    	List<Todo> todoList = todoDao.getTodoList();
    	
    	//期日設定なしのTODOに「なし」を設定する
    	for(Todo todo : todoList) {
    		String dueDate = todo.getDueDate();
    		
    		//期日設定がない場合
    		if(dueDate == null) {
    			todo.setDueDate("なし");
    		}
    		
    	}
    	
        return todoList;
    }
    
    // 完了したTODOを取得
    public List<Todo> getCompletedTodoList() {
        return todoDao.getCompletedTodoList();  // Dao層で完了したTODOを取得
    }


    // TODOを追加
    public void addTodo(String todo, String dueDate) {
    	//期日設定がない場合
    	if(dueDate == "") {
    		//nullに設定
    		dueDate = null;
    	}
        todoDao.addTodo(todo, dueDate);
    }
    
 // TODOを完了にする
    public void completeTodo(String todoId) {
    	//ダブルクォートを削除する
    	todoId = todoId.replace("\"", "");

    	//intに変換する
    	int _todoId = Integer.parseInt(todoId);
    	
        todoDao.completeTodo(_todoId);  // Dao層で完了処理
    }

    // TODOを削除する
    public void deleteTodo(String todoId) {
    	
    	//ダブルクォートを削除する
    	todoId = todoId.replace("\"", "");

    	//intに変換する
    	int _todoId = Integer.parseInt(todoId);
        todoDao.deleteTodo(_todoId);  // Dao層で削除処理
    }

    // TODOを編集する
    public void updateTodo(Todo todo) {
    	String date = todo.getDueDate();
    	//int id = todo.getId();
    	//期日設定がない場合
    	if(date == "") {
    		//nullに設定
    		date = null;
    	}else {
    		//ダブルクォートを削除する
        	date.replace("\"", "");
    	}
    	
    	todo.setDueDate(date);
    	
        todoDao.updateTodo(todo);  // Dao層で編集処理
    }



 // 完了TODOを削除
    public void deleteCompletedTodo() {
        todoDao.deleteCompletedTodo(); // 完了タスクを削除
    }
    
 //TODOを検索
    public List<Todo> searchTodo(String searchTodo, TodoSessionData session){
    	
    	//検索結果TODOリスト
    	List<Todo> searchTodoList = new ArrayList<>();
    	
    	//セッションからTodoリストを取得
    	List<Todo> todoList = session.getTodoList();
    	
    	//キャッシュしたTODOリストから一致するタスクを取得
    	for(Todo todoJoh : todoList) {
    		String todo = todoJoh.getTodo();
    		
    		if(searchTodo.equals(todo)) {
    			todoJoh.setTodo(searchTodo);
    			searchTodoList.add(todoJoh);
    		}
    	}
    	
    	return searchTodoList;
    	
    }

}
