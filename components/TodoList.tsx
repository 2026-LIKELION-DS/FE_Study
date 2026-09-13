import React from 'react';
import { type Todo, TodoItem } from './TodoItem';

interface TodoListProps {
  title: string;
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoList = ({ title, todos, onToggle, onDelete }: TodoListProps) => {
  return (
    <div className="render-container__section">
      <h3 className="render-container__title">{title}</h3>
      <ul className="render-container__list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};