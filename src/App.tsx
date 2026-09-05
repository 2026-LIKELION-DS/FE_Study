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

  return (
    <main className="todo-container">
      <h1 className="todo-container__header">
        ⛄︎ YEBIN'S TO-DO ⛄︎
      </h1>

      <TodoInput onAdd={handleAddTodo} />

      <TodoList todos={todos} />
    </main>
  );
}

export default App;