import React, { useState } from 'react';
import './style.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

export interface Todo {
    id: number;
    text: string;
    isCompleted: boolean;
}

export default function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleAddTodo = (text: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            text: text,
            isCompleted: false
        };
        setTodos([...todos, newTodo]);
    };

    const handleCompleteTodo = (id: number) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, isCompleted: true } : todo
            )
        );
    };

    const handleDeleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="todo-container">
            <h1 className="todo-container__header">🦁 LIKELION TO-DO</h1>
            <TodoInput onAdd={handleAddTodo} />
            <TodoList 
                todos={todos} 
                onComplete={handleCompleteTodo} 
                onDelete={handleDeleteTodo} 
            />
        </div>
    );
}