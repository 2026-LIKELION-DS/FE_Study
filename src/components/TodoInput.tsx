import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function TodoInput() {
    const [inputText, setInputText] = useState("");
    const queryClient = useQueryClient();

    const addMutation = useMutation({
        mutationFn: async (title: string) => {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, completed: false, userId: 1 })
            });
            if (!res.ok) throw new Error('추가 실패');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            setInputText("");
        }
    });

    const handleSubmit = () => {
        if (inputText.trim() !== "") {
            addMutation.mutate(inputText);
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
                disabled={addMutation.isPending}
            />
            <button 
                className="todo-container__button" 
                onClick={handleSubmit}
                disabled={addMutation.isPending}
            >
                {addMutation.isPending ? '추가중' : '추가'}
            </button>
        </div>
    );
}