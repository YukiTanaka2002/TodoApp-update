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

    // todoListの取得
    public List<Todo> getTodoList() {
        String sql = "SELECT id, task, completed FROM tasks";

        // RowMapperを使って結果をTodoオブジェクトにマッピング
        RowMapper<Todo> rowMapper = (rs, rowNum) -> {
            Todo todo = new Todo();
            todo.setId(rs.getInt("id"));
            todo.setTask(rs.getString("task"));
            todo.setCompleted(rs.getBoolean("completed"));
            return todo;
        };

        // jdbcTemplate.queryを使ってリストを返す
        return jdbcTemplate.query(sql, rowMapper);
    }
    
    // 完了したタスクのみを取得
    public List<Todo> getCompletedTodoList() {
        String sql = "SELECT id, task, completed FROM tasks WHERE completed = true";

        RowMapper<Todo> rowMapper = (rs, rowNum) -> {
            Todo todo = new Todo();
            todo.setId(rs.getInt("id"));
            todo.setTask(rs.getString("task"));
            todo.setCompleted(rs.getBoolean("completed"));
            return todo;
        };

        return jdbcTemplate.query(sql, rowMapper);
    }

    // todoListの追加
    public void addTodo(String taskDescription) {
        // 新しいタスクを追加するSQL
        String sql = "INSERT INTO tasks (task, completed) VALUES (?, ?)";

        // jdbcTemplate.updateを使ってデータベースに追加
        jdbcTemplate.update(sql, taskDescription, false); // デフォルトでcompletedはfalse
    }

 // タスクを完了にする
    public void completeTodoByDescription(String taskDescription) {
        String sql = "UPDATE tasks SET completed = true WHERE task = ?";
        jdbcTemplate.update(sql, taskDescription);  // タスク内容で完了状態を更新
    }

    // タスクを削除する
    public void deleteTodoByDescription(String taskDescription) {
        String sql = "DELETE FROM tasks WHERE task = ?";
        jdbcTemplate.update(sql, taskDescription);  // タスク内容で削除
    }

    // タスクを編集する
    public void updateTodoByDescription(String taskDescription, String newTaskDescription) {
        String sql = "UPDATE tasks SET task = ? WHERE task = ?";
        jdbcTemplate.update(sql, newTaskDescription, taskDescription);  // タスク内容で更新
    }


    
    // 完了Todoを削除
    public void deleteCompletedTodos() {
        // 完了タスクを削除するSQL
        String sql = "DELETE FROM tasks WHERE completed = true";
        jdbcTemplate.update(sql);
    }

}
