package com.tanaka.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tanaka.model.Todo;
import com.tanaka.service.TodoService;

import jakarta.servlet.http.HttpSession;

@Controller
public class TodoController {

    @Autowired
    private TodoService todoService;
    
    //TODOリストセッションキー
    private static final String SESSION_KEY_TODOLIST = "session_key_todo";

    // "/" にアクセスした場合、タスクリストを表示
    @GetMapping("/")
    public String getTodoList(Model model, HttpSession session) {
        // 完了していないTODOリストを取得
        List<Todo> incompleteTodoList  = todoService.getTodoList().stream()
                                      .filter(todo -> !todo.isCompleted())
                                      .collect(Collectors.toList());
        
        // 完了TODOリストを取得
        List<Todo> completedTodoList = todoService.getCompletedTodoList();
        
        //セッションに未完了TODOリストを保存する
        session.setAttribute(SESSION_KEY_TODOLIST, incompleteTodoList );
        
        model.addAttribute("todos", incompleteTodoList);
        model.addAttribute("completedTodos", completedTodoList);
        
        return "todo"; 
    }


    // 新しいTODOを追加
    @PostMapping("/add-todo")
    public String addTodo(@RequestParam("todo") String todo, @RequestParam("dueDate") String dueDate) {
    	
        todoService.addTodo(todo, dueDate);
     
        return "redirect:/"; // タスク追加後にトップページ（"/"）にリダイレクト
    }

    
    /**
     * 完了処理
     * @param todoId
     */
    @PostMapping("/complete")
    @ResponseBody
    public void completeTodo(@RequestBody String todoId) {
        if (todoId == null || todoId.trim().isEmpty()) {
            // TODO内容が空の場合のエラーハンドリング
            return;  
        }
        
        // TODO完了処理
        todoService.completeTodo(todoId);  
        return ;  // 完了後にトップページにリダイレクト
    }

 
    /**
     * 削除処理
     * @param todoId
     */
    @PostMapping("/delete")
    @ResponseBody
    public void deleteTodo(@RequestBody String todoId) {
        if (todoId == null || todoId.trim().isEmpty()) {
        	
            // TODOが空の場合のエラーハンドリング
            return; 
        }
        
        // TODO削除
        todoService.deleteTodo(todoId);  
        return;
    }

    /**
     * 更新処理（編集時）
     * @param todo
     * @return
     */
    @PostMapping("/update")
    @ResponseBody
    public String updateTodo(@RequestBody Todo todo) {
		/*  if (todo.todo == null || todo.todo().isEmpty() || todo.getDueDate() == null || newTodo.trim().isEmpty()) {
		    // タスク内容が空の場合のエラーハンドリング
		    return "";  // 何もせずにトップページにリダイレクト
		}*/
        todoService.updateTodo(todo);
        return "redirect:/"; // 編集後にトップページ（"/"）にリダイレクト
    }
    
//  //TODOを検索
//  @PostMapping("/search")
//  @ResponseBody
//  public List<Todo> searchTodo(@RequestBody String todo, HttpSession session){
//  	List<Todo> searchTodoList = new ArrayList<>();
//  	
//  	//セッションからTODOリストを取得
//  	TodoSessionData todoSession = new TodoSessionData();
//  	todoSession.setTodoList(session.getAttribute(SESSION_KEY_TODOLIST));
//  	
//
//  	//検索欄がnullの場合、TODOリストを再表示する
//  	if(todo == "") {
//  		searchTodoList = todoSession.getTodoList();
//  		return searchTodoList;
//  	}
//  	
//  	searchTodoList = todoService.searchTodo(todo, todoSession);
//  	
//  	
//  	return searchTodoList;
//  	
//  	
//  }

}
