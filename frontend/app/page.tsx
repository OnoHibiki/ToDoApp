'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './page.module.css'

type Todo = {
  id: number
  title: string
  description: string
  completed: boolean
  deadline: string
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    deadline: ''
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTodo, setEditTodo] = useState({
    title: '',
    description: '',
    deadline: ''
  })

  // 一覧取得
  const fetchTodos = async () => {
    const res = await axios.get<Todo[]>('http://localhost:8080/api/todos')
    setTodos(res.data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // 追加
  const handleAdd = async () => {
    await axios.post('http://localhost:8080/api/todos', {
      ...newTodo,
      completed: false
    })
    setNewTodo({ title: '', description: '', deadline: '' })
    fetchTodos()
  }

  // 削除
  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:8080/api/todos/${id}`)
    fetchTodos()
  }

  // 編集開始
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditTodo({
      title: todo.title,
      description: todo.description,
      deadline: todo.deadline
    })
  }

  // 編集保存
  const handleEditSave = async (id: number) => {
    await axios.put(`http://localhost:8080/api/todos/${id}`, {
      ...editTodo,
      id,
      completed: todos.find(todo => todo.id === id)?.completed || false
    })
    setEditingId(null)
    fetchTodos()
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>ToDo アプリ</h1>

      <div className={styles.form}>
        <input
          className={styles.input}
          placeholder="タイトル"
          value={newTodo.title}
          onChange={e => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          className={styles.input}
          placeholder="説明"
          value={newTodo.description}
          onChange={e => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <input
          className={styles.date}
          type="date"
          value={newTodo.deadline}
          onChange={e => setNewTodo({ ...newTodo, deadline: e.target.value })}
        />
        <button className={styles.button} onClick={handleAdd}>追加</button>
      </div>

      <ul className = {styles.todoList}>
        {todos.map(todo => (
          <li key={todo.id} className={styles.todoItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={async () => {
                await axios.put(`http://localhost:8080/api/todos/${todo.id}`, {
                  ...todo,
                  completed: !todo.completed,
                })
                fetchTodos()
              }}
            />
            {editingId === todo.id ? (
              <>
                <input
                  className={styles.input}
                  value={editTodo.title}
                  onChange={e => setEditTodo({ ...editTodo, title: e.target.value })}
                />
                <input
                  className={styles.input}
                  value={editTodo.description}
                  onChange={e => setEditTodo({ ...editTodo, description: e.target.value })}
                />
                <input
                  className={styles.date}
                  type="date"
                  value={editTodo.deadline}
                  onChange={e => setEditTodo({ ...editTodo, deadline: e.target.value })}
                />
                <button className={styles.button} onClick={() => handleEditSave(todo.id)}>保存</button>
                <button className={styles.button} onClick={() => setEditingId(null)}>キャンセル</button>
              </>
            ) : (
              <>
                <strong className={todo.completed ? styles.todoDone : ''}>
                  {todo.title}
                </strong>（{todo.deadline}）<br />
                {todo.description}<br />
                <button className={styles.button} onClick={() => startEdit(todo)}>編集</button>
                <button className={styles.button} onClick={() => handleDelete(todo.id)}>削除</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}