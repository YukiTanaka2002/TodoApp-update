package com.tanaka.model;

public class todoForm {

	/** ID */
    private int id;
    
    /** TODO内容 */
    private String todo;
    
    /** 完了状況 */
    private boolean completed;
    
    /** 期日 */
    private String dueDate;

    //GETTER
    //SETTER
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTodo() {
        return todo;
    }

    public void setTodo(String todo) {
        this.todo = todo;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
    
    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }
}
