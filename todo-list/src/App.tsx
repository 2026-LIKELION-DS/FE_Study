import { useState } from "react";
import "./style.css";
import TodoInput from "./components/TodoInput";
import type { Todo } from "./types";


function App() {
  
  const [todos, setTodos] = useState<Todo[]>([]);

 // 새 할 일 추가 함수
  const handleAdd = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      isDone: false, //새로 추가됐으니 항상 할 일 상태
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">To-Do List</h1>

      <TodoInput onAdd={handleAdd} />

      <div className="render-container">
        <section className="render-container__section">
          <h2 className="render-container__title">할 일</h2>

      
          <ul className="render-container__list">
            {todos.map((todo) => (
              <li key={todo.id} className="render-container__item">
                {todo.text}
              </li>
            ))}
          </ul>
        </section>

        <section className="render-container__section">
          <h2 className="render-container__title">완료</h2>
      
        </section>
      </div>
    </div>
  );
}

export default App;
