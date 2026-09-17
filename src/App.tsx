import React, { useState } from 'react';
import './style.css';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import type { Todo } from './components/TodoItem';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      isDone: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, isDone: true } : todo))
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const activeTodos = todos.filter((todo) => !todo.isDone);
  const doneTodos = todos.filter((todo) => todo.isDone);

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁 LIKELION TO-DO</h1>
      <TodoInput onAdd={handleAddTodo} />

      <div className="render-container">
        <TodoList
          title="할 일"
          todos={activeTodos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
        <TodoList
          title="완료"
          todos={doneTodos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      </div>
    </div>
  );
};

export default App;