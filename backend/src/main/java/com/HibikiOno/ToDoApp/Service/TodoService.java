package com.HibikiOno.ToDoApp.Service;

import com.HibikiOno.ToDoApp.Entity.Todo;
import com.HibikiOno.ToDoApp.Repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    // すべてのToDoを取得
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    // ToDoをIDで取得
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    // ToDoを追加・更新
    public Todo saveTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    // ToDoを削除
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}