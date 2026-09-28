import React from 'react';
import { type Todo, TodoItem } from './TodoItem';

// [타입스크립트] TodoList 컴포넌트가 받을 Props 설계도
interface TodoListProps {
  title: string;    // 섹션 제목 ("할 일" 또는 "완료")
  todos: Todo[];    // Todo 객체들이 모여있는 배열 (Todo[])
  onToggle: (id: number) => void; // 완료 함수
  onDelete: (id: number) => void; // 삭제 함수
}

export const TodoList = ({ title, todos, onToggle, onDelete }: TodoListProps) => {
  return (
    <div className="render-container__section">
      <h3 className="render-container__title">{title}</h3>
      <ul className="render-container__list">
        {/*
        [리액트] 배열 map 함수:
        todos 배열 안에 있는 아이템 개수만큼 반복하면서 <TodoItem/> 컴포넌트를 생성
        
        * key={todo.id} : 리액트가 어떤 아이템이 
        추가/삭제/수정되었는지 구분하기 위해 반복문 렌더링 시 고유한 key 값을 꼭 전달해 줘야 한다.*/}
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}; 