import { useState } from "react";
import "./style.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import type { Todo } from "./types";

function App() {

  const [todos, setTodos] = useState<Todo[]>([]);

  const activeTodos = todos.filter((todo) => !todo.isDone);

 //할 일 추가
  const handleAdd = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      isDone: false, // 새로 추가된 항목은 항상 할 일 상태로 표시되게
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };


  const handleComplete = (id: number) => {
  
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: true } : todo,
      ),
    );
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">To-Do List</h1>

      <TodoInput onAdd={handleAdd} />

      <div className="render-container">
        <TodoList
          title="할 일"
          todos={activeTodos}
          buttonLabel="완료"
          buttonVariant="complete"
          onButtonClick={handleComplete}
        />

        <section className="render-container__section">
          <h2 className="render-container__title">완료</h2>
        
        </section>
      </div>
    </div>
  );
}

export default App;
