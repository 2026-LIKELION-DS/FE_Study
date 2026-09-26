import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '../App';

interface TodoItemProps {
    todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
    const queryClient = useQueryClient();

    const completeMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: true })
            });
            if (!res.ok) throw new Error('완료 처리 실패');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('삭제 실패');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    });

    return (
        <li className="render-container__item">
            <span className="render-container__item-text">{todo.title}</span>
            {!todo.completed ? (
                <button
                    className="render-container__item-button complete"
                    onClick={() => completeMutation.mutate(todo.id)}
                    disabled={completeMutation.isPending}
                >
                    {completeMutation.isPending ? '처리중' : '완료'}
                </button>
            ) : (
                <button
                    className="render-container__item-button delete"
                    onClick={() => deleteMutation.mutate(todo.id)}
                    disabled={deleteMutation.isPending}
                >
                    {deleteMutation.isPending ? '삭제중' : '삭제'}
                </button>
            )}
        </li>
    );
}