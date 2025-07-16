package com.tanaka.model;

import java.util.ArrayList;
import java.util.List;

/**
 *  TODOセッション用クラス
 * @author 田中優己
 *
 */
public class TodoSessionData {
	
	//Todoリスト
	private List<Todo> todoList = new ArrayList<>();
	
	//Getter
	public List<Todo> getTodoList(){
		return todoList;
	}
	
	//Setter
	@SuppressWarnings("unchecked")
	public void setTodoList(Object todoList){
		this.todoList = (List<Todo>)todoList;
	}

}
