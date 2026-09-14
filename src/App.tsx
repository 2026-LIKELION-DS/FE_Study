import { useState } from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import type { Todo } from './types'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
  const [nextId, setNextId] = useState<number>(1)

  function addTodo(text: string) {
    const trimmedText = text.trim()
    if (trimmedText === '') return

    const newTodo: Todo = { id: nextId, text: trimmedText }
    setTodos([...todos, newTodo])
    setNextId(nextId + 1)
  }

  function completeTodo(id: number) {
    const completedTodo = todos.find((todo) => todo.id === id)
    if (!completedTodo) return

    setTodos(todos.filter((todo) => todo.id !== id))
    setCompletedTodos([...completedTodos, completedTodo])
  }

  function deleteTodo(id: number) {
    setCompletedTodos(completedTodos.filter((todo) => todo.id !== id))
  }

  return (
    <main className="todo-container">
      <h1 className="todo-container__header">🦁 LIKELION TO-DO</h1>
      <TodoInput onAdd={addTodo} />
      <div className="render-container">
        <TodoList title="할 일" todos={todos} isCompleted={false} onAction={completeTodo} />
        <TodoList title="완료" todos={completedTodos} isCompleted={true} onAction={deleteTodo} />
      </div>
    </main>
  )
}

export default App
