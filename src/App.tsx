import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import type { Todo } from "./types/Todo";
import "./style.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const handleCompleteTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: true }
          : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="todo-container">
      <h1 className="todo-container__header">🌷 MY TO-DO</h1>

      <TodoInput onAdd={handleAddTodo} />

      <TodoList todos={todos} onComplete={handleCompleteTodo} onDelete={handleDeleteTodo}/>
    </main>
  );
}

export default App;