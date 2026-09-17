import React from 'react';

// [타입스크립트] 1개의 '할 일' 데이터가 어떤 필드를 가지고 있어야 하는지 정의한 설계도
// 다른 파일(App, TodoList 등)에서도 써야해서 앞에 'export'를 붙임
// export를 붙이면 다른곳에서 import해서 사용할 수 있음
export interface Todo {
  id: number;       // 각 할 일의 고유 번호
  text: string;     // 할 일 내용
  isDone: boolean;  // 완료 여부 (true: 완료, false: 해야 할 일)
}

// [타입스크립트] TodoItem 컴포넌트가 부모(TodoList)로부터 받아야 할 Props(전달값) 목록입니다.
interface TodoItemProps {
  todo: Todo;                     // 위에서 정의한 Todo 객체 1개
  onToggle: (id: number) => void; // 완료 처리할 때 호출할 함수 (숫자 id를 받고, 반환값은 없음=void)
  onDelete: (id: number) => void; // 삭제 처리할 때 호출할 함수 (숫자 id를 받고, 반환값은 없음=void)
}

// TodoItem 컴포넌트: Props로 todo, onToggle, onDelete를 받아옵니다.
export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li className="render-container__item">
      {/* 할 일 텍스트 표시 */}
      <span className="render-container__item-text">{todo.text}</span>

      {/* 
      [리액트] 삼항 연산자 조건부 렌더링:
      !todo.isDone (아직 완료되지 않은 상태라면) -> '완료' 버튼 표시
      isDone이 true (이미 완료된 상태라면) -> '삭제' 버튼 표시
      */}
      {!todo.isDone ? (
        <button
          type="button"
          className="render-container__item-button complete"
          // 클릭 시 부모에게 이 todo의 id를 넘겨주면서 완료 처리해 달라고 요청합니다.
          onClick={() => onToggle(todo.id)}
        >
          완료
        </button>
      ) : (
        <button
          type="button"
          className="render-container__item-button delete"
          onClick={() => onDelete(todo.id)}
        >
          삭제
        </button>
      )}
    </li>
  );
}; 