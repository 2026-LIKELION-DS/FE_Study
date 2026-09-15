import React from 'react';
import { Todo } from '../App';
import TodoItem from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function TodoList({ todos, onComplete, onDelete }: TodoListProps) {
    const incompleteTodos = todos.filter(todo => !todo.isCompleted);
    const completeTodos = todos.filter(todo => todo.isCompleted);

    return (
        <div className="render-container">
            <div className="render-container__section">
                <h2 className="render-container__title">할 일</h2>
                <ul className="render-container__list">
                    {incompleteTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onComplete={onComplete}
                            onDelete={onDelete}
                        />
                    ))}
                </ul>
            </div>
            <div className="render-container__section">
                <h2 className="render-container__title">완료</h2>
                <ul className="render-container__list">
                    {completeTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onComplete={onComplete}
                            onDelete={onDelete}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}