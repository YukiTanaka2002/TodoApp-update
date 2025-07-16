package com.tanaka.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.tanaka.model.Todo;

@Repository
public class TodoDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // 未完了TODOリストの取得
    public List<Todo> getTodoList() {
        String sql = "SELECT id, task, completed, due_date FROM tasks WHERE completed = false";

        // RowMapperを使って結果をTodoオブジェクトにマッピング
        RowMapper<Todo> rowMapper = (rs, rowNum) -> {
            Todo todo = new Todo();
            todo.setId(rs.getInt("id"));
            todo.setTodo(rs.getString("task"));
            todo.setCompleted(rs.getBoolean("completed"));
            todo.setDueDate(rs.getString("due_date"));
            return todo;
        };

        // jdbcTemplate.queryを使ってリストを返す
        return jdbcTemplate.query(sql, rowMapper);
    }
    
    // 完了したTODOのみを取得
    public List<Todo> getCompletedTodoList() {
        String sql = "SELECT id, task, completed, due_date FROM tasks WHERE completed = true";

        RowMapper<Todo> rowMapper = (rs, rowNum) -> {
            Todo todo = new Todo();
            todo.setId(rs.getInt("id"));
            todo.setTodo(rs.getString("task"));
            todo.setCompleted(rs.getBoolean("completed"));
            todo.setDueDate(rs.getString("due_date"));
            return todo;
        };

        return jdbcTemplate.query(sql, rowMapper);
    }

    // TODOリストの追加
    public void addTodo(String todo, String dueDate) {
    	String sql = "INSERT INTO tasks (task, due_date, completed) VALUES (?, ?, ?)";
    	jdbcTemplate.update(sql, todo, dueDate, false);

    }

 // TODOを完了にする
    public void completeTodo(int todoId) {
        String sql = "UPDATE tasks SET completed = true WHERE id = ?";
        jdbcTemplate.update(sql, todoId);  // タスク内容で完了状態を更新
    }

    // TODOを削除する
    public void deleteTodo(int todoId) {
        String sql = "DELETE FROM tasks WHERE id = ?";
        jdbcTemplate.update(sql, todoId);  // タスク内容で削除
    }

    // TODOを編集する
    public void updateTodo(Todo inTodo) {
    	int id = inTodo.getId();
    	String todo = inTodo.getTodo();		//TODO内容
    	String date = inTodo.getDueDate();	//期日
    	
        String sql = "UPDATE tasks SET task = ?, due_date = ? WHERE id = ?";
        jdbcTemplate.update(sql, todo, date, id);  
    }


    
    // 完了TODOを削除
    public void deleteCompletedTodo() {
        // 完了TODOを削除するSQL
        String sql = "DELETE FROM tasks WHERE completed = true";
        jdbcTemplate.update(sql);
    }

}
