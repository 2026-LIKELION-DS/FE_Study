import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './style.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    userId?: number;
}

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="todo-container">
                <h1 className="todo-container__header">🦁 LIKELION TO-DO</h1>
                <TodoInput />
                <TodoList />
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}