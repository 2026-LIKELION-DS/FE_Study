import React from 'react';
import type { Todo } from '../App';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
    return(
        <li className="render-container__item">
            <span className="render-container__text">{todo.text}</span>
            {todo.isDone ? (
                <button className="render-container__item-button delete" onClick = {()=> onDelete(todo.id)}>
                    삭제
                </button>
            ):(
                <button className="render-container__item-button complete" onClick={()=>onToggle(todo.id)}>
                    완료
                </button>
            )}
        </li>
    );
};