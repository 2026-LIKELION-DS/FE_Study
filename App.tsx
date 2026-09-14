import React from 'react';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import './style.css';

export interface Todo{
  id: number;
  text: string;
  isDone: boolean;
}
export const App = () => {
  // TodoInput 잘되는지 테스트
  const handleAddTodo = (text: string) => {
    console.log('입력받은 내용:', text);
    alert(`입력 성공!: ${text}`);
  }
  // TodoItem 임의데이터
  const dummyWorkigTodo: Todo = {id:1, text: '공부하기', isDone: false};
  const dummyDoneTodo: Todo = {id:2, text: '스터디하기', isDone: true};
  // 버튼 확인
  const handleToggle = (id:number) => {
    alert(`완료 버튼 클릭 (ID: ${id})`);
  };
  const handleDelete = (id: number) => {
    alert(`삭제 버튼 클릭 (ID: ${id})`);
  };
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁LIKELION TO-DO</h1>
      <TodoInput onAdd={handleAddTodo}/>
      <div>
        <ul className="render-container__list">
          <TodoItem todo={dummyWorkigTodo} onToggle={handleToggle} onDelete={handleDelete}/>
          <TodoItem todo={dummyDoneTodo} onToggle={handleToggle} onDelete={handleDelete}/>
        </ul>
      </div>
    </div>
  );
};

export default App;