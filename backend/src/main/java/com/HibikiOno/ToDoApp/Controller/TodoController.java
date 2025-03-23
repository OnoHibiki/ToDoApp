package com.HibikiOno.ToDoApp.Controller;

import com.HibikiOno.ToDoApp.Entity.Todo;
import com.HibikiOno.ToDoApp.Service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000") // Next.jsからのアクセス許可
public class TodoController {

    @Autowired
    private TodoService todoService;

    // すべてのToDoを取得
    @GetMapping
    public List<Todo> getAllTodos() {
        return todoService.getAllTodos();
    }

    // 特定のToDoを取得
    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable Long id) {
        return todoService.getTodoById(id).orElse(null);
    }

    // 新しいToDoを作成
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoService.saveTodo(todo);
    }

    // ToDoを更新
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        todo.setId(id);
        return todoService.saveTodo(todo);
    }

    // ToDoを削除
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
    }
}