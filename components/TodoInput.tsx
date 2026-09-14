import React, { useState } from 'react';
interface TodoInputProps {
    onAdd: (text: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!text.trim()) return;
        onAdd(text.trim());
        setText('');
    };
    return(
        <form onSubmit={handleSubmit} className="todo-container__form">
            <input type="text" className="todo-container__input" placeholder="할 일을 입력하세요!"
            value={text} onChange={(e)=>setText(e.target.value)} />
            <button type="submit" className="todo-container__button">추가</button>
        </form>
    )

}