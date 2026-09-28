import React, { useState } from 'react';

// [타입스크립트] 부모(App)로부터 전달받을 함수 타입 정의
interface TodoInputProps {
  // 사용자가 입력한 문자열(text:string)을 부모 컴포넌트에 넘겨줄 함수
  onAdd: (text: string) => void;
}

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  // [리액트] useState : 입력창(input)에 타이핑한 텍스트를 담아두는 상태 변수
  // text: 현재 입력창 내용, setText: 내용을 변경하는 함수, 초기값은 빈 문자열('')
  const [text, setText] = useState('');

  // 폼 제출(Enter 키 입력 또는 '추가'버튼 클릭) 시 실행되는 함수
  // [타입스크립트] e: React.FormEvent (리액트 폼 이벤트 타입 지정)
  const handleSubmit = (e: React.FormEvent) => {
    // 폼 제출 시 브라우저가 페이지를 새로고침하는 기본 동작을 막음
    e.preventDefault();

    // 앞뒤 공백을 잘라내고(trim) 아무 글자도 없다면 아무것도 안하고 종료
    if (!text.trim()) return;

    // 부모(App)가 준 onAdd 함수를 실행하여 새 할 일을 추가하도록 등록
    onAdd(text.trim());

    // 입력창을 다시 빈칸으로 비움
    setText('');
  };

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-container__input"
        placeholder="할 일을 입력해보세요!"
        value={text}  // 입력창의 값은 state인 text와 연결 (제어 컴포넌트)
        // 키보드를 칠 때마다 타이핑한 값(e.target.value)으로 text 상태를 업데이트
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="todo-container__button">
        추가
      </button>
    </form>
  );
}; 