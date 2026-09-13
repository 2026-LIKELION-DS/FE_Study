import React from 'react';

export interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{todo.text}</span>
      {!todo.isDone ? (
        <button
          type="button"
          className="render-container__item-button complete"
          onClick={() => onToggle(todo.id)}
        >
          완료
        </button>
      ) : (
        <button
          type="button"
          className="render-container__item-button delete"
          onClick={() => onDelete(todo.id)}
        >
          삭제
        </button>
      )}
    </li>
  );
};