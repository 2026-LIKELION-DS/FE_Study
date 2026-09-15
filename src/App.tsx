import { useState } from "react";
import Header from "./components/Header/Header";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoList from "./components/TodoList/TodoList";
import type { Todo } from "./types/todo";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text, completed: false }]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app">
      <div className="todo-container">
        <Header />
        <TodoInput onAdd={addTodo} />
      </div>
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
};

export default App;
