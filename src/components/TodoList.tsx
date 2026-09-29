import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Todo } from '../App';
import TodoItem from './TodoItem';

export default function TodoList() {
    const { data: todos = [], isLoading, isError } = useQuery<Todo[]>({
        queryKey: ['todos'],
        queryFn: async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
            if (!res.ok) throw new Error('네트워크 오류');
            return res.json();
        }
    });

    if (isLoading) return <p style={{ textAlign: 'center' }}>로딩 중...</p>;
    if (isError) return <p style={{ textAlign: 'center' }}>에러가 발생했습니다.</p>;

    const incompleteTodos = todos.filter(todo => !todo.completed);
    const completeTodos = todos.filter(todo => todo.completed);

    return (
        <div className="render-container">
            <div className="render-container__section">
                <h2 className="render-container__title">할 일</h2>
                <ul className="render-container__list">
                    {incompleteTodos.map(todo => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </ul>
            </div>
            <div className="render-container__section">
                <h2 className="render-container__title">완료</h2>
                <ul className="render-container__list">
                    {completeTodos.map(todo => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </ul>
            </div>
        </div>
    );
}