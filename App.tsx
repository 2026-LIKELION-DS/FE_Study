import React from 'react';
import { TodoInput } from './components/TodoInput';
import './style.css';

export const App = () => {
  // TodoInput 잘되는지 테스트
  const handleAddTodo = (text: string) => {
    console.log('입력받은 내용:', text);
    alert(`입력 성공!: ${text}`);
  }
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁LIKELION TO-DO</h1>
      <TodoInput onAdd={handleAddTodo}/>
    </div>
  );
};

export default App;