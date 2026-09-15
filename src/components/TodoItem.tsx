import React from 'react';
import { Todo } from '../App';

interface TodoItemProps {
    todo: Todo;
    onComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onComplete, onDelete }: TodoItemProps) {
    return (
        <li className="render-container__item">
            <span className="render-container__item-text">{todo.text}</span>
            {!todo.isCompleted ? (
                <button
                    className="render-container__item-button complete"
                    onClick={() => onComplete(todo.id)}
                >
                    완료
                </button>
            ) : (
                <button
                    className="render-container__item-button delete"
                    onClick={() => onDelete(todo.id)}
                >
                    삭제
                </button>
            )}
        </li>
    );
}