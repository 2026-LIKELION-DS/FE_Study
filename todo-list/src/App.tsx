import { useState } from "react";
import "./style.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import type { Todo } from "./types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const activeTodos = todos.filter((todo) => !todo.isDone);

  const completedTodos = todos.filter((todo) => todo.isDone);

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

  //할 일 삭제하기
  const handleDelete = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁 LIKELION TO-DO</h1>

      <TodoInput onAdd={handleAdd} />

      <div className="render-container">
        <TodoList
          title="할 일"
          todos={activeTodos}
          buttonLabel="완료"
          buttonVariant="complete"
          onButtonClick={handleComplete}
        />

        <TodoList
          title="완료"
          todos={completedTodos}
          buttonLabel="삭제"
          buttonVariant="delete"
          onButtonClick={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
