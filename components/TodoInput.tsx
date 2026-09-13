import React, { useState } from 'react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText('');
  };

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-container__input"
        placeholder="할 일을 입력해보세요!"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="todo-container__button">
        추가
      </button>
    </form>
  );
};