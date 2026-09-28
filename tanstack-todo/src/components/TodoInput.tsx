import { useState } from "react";
import type { SubmitEvent } from "react";

interface TodoInputProps {
  onAddTodo: (title: string) => Promise<void>;
  disabled: boolean;
  isAdding: boolean;
}

export default function TodoInput({ onAddTodo, disabled, isAdding }: TodoInputProps) {
  // 입력창의 값은 UI 상태이므로 useState로 관리합니다.
  const [input, setInput] = useState("");

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = input.trim();
    if (!title || disabled) return;
    try {
      await onAddTodo(title);
      setInput("");
    } catch {
      // 실패하면 입력을 유지하고 App에서 mutation 오류를 표시합니다.
    }
  };

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        className="todo-container__input"
        type="text"
        aria-label="할 일 입력"
        placeholder="할 일을 입력해보세요!"
        autoComplete="off"
        value={input}
        disabled={disabled}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229)) {
            event.preventDefault();
          }
        }}
      />
      <button className="todo-container__button" type="submit" disabled={disabled || !input.trim()}>
        {isAdding ? "추가 중…" : "추가"}
      </button>
    </form>
  );
}
