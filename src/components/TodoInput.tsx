import { useState } from "react";

interface TodoInputProps {
    onAdd: (text: string) => void;
}

function TodoInput({ onAdd }: TodoInputProps) {
    const [text, setText] = useState("");

    const handleAdd = () => {
        if (text.trim() === "") return;

        onAdd(text);
        setText("");
    };

    return (
        <form className="todo-container__form">
        <input className="todo-container__input" type="text"
            placeholder="할 일을 입력하세요" value={text} onChange={(e) => setText(e.target.value)}
        />

        <button className="todo-container__button" type="button" onClick={handleAdd}>
            추가
        </button>
        </form>
    );
}

export default TodoInput;