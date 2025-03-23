package com.HibikiOno.ToDoApp.Repository;

import com.HibikiOno.ToDoApp.Entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}