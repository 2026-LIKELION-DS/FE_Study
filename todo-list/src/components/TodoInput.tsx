import { useState } from "react";

import type { ChangeEvent, FormEvent } from "react";

interface TodoInputProps {
  //새 할 일을 추가할 때 부모에게 알려준다

  onAdd: (text: string) => void;
}

function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState("");

  // 입력창에 글자가 바뀔 때마다 state를 갱신
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // form의 기본 동작을 막는다
    event.preventDefault();

    // 앞뒤 공백 제거하고, 공백만 입력한 경우는 추가하지 않는다
    const trimmedText = text.trim();
    if (trimmedText === "") return;

    onAdd(trimmedText);
    setText(""); // 추가 후 입력창을 비워 다음 입력을 바로 받을 수 있게 한다
  };

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        className="todo-container__input"
        placeholder="할 일을 입력하세요"
        value={text}
        onChange={handleChange}
      />

      <button type="submit" className="todo-container__button">
        추가
      </button>
    </form>
  );
}

export default TodoInput;
