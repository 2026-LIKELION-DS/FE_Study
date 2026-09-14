import { useState } from "react";
import type { SubmitEvent } from "react";

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

export default function TodoInput({ onAddTodo }: TodoInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 제출로 페이지가 새로고침되는 것을 막습니다.

    const trimmedInput = input.trim();
    if (trimmedInput === "") return;

    onAddTodo(trimmedInput);
    setInput("");
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
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => {
          // 한글 조합을 확정하는 Enter에서는 아직 제출하지 않습니다.
          if (
            event.key === "Enter" &&
            (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229)
          ) {
            event.preventDefault();
          }
        }}
      />

      <button className="todo-container__button" type="submit">
        추가
      </button>
    </form>
  );
}