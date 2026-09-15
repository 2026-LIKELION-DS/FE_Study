import React, { useState } from 'react';

interface TodoInputProps {
    onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
    const [inputText, setInputText] = useState("");

    const handleSubmit = () => {
        if (inputText.trim() !== "") {
            onAdd(inputText);
            setInputText("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // 한글 입력 시 엔터 이벤트 중복 실행 방지용
        if (e.nativeEvent.isComposing) {
            return; 
        }
        
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="todo-container__form">
            <input
                type="text"
                className="todo-container__input"
                placeholder="할 일을 입력해보세요!"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button className="todo-container__button" onClick={handleSubmit}>
                추가
            </button>
        </div>
    );
}