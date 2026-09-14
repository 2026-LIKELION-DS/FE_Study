import React, { useState } from 'react';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import './style.css';

export interface Todo{
  id: number;
  text: string;
  isDone: boolean;
}
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      isDone: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };
  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  const workingTodos = todos.filter((todo) => !todo.isDone);
  const doneTodos = todos.filter((todo) => todo.isDone);
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁LIKELION TO-DO</h1>
      <TodoInput onAdd={handleAddTodo}/>
      <div className="render-container">
        <TodoList
            title="할 일"
            todos={workingTodos}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
          <TodoList
            title="완료"
            todos={doneTodos}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </div>
    </div>
  );
};

export default App;