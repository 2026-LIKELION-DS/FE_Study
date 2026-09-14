import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import type { Todo } from "./types/todo";

export default function App() {
  // 해야 할 일과 완료한 일을 하나의 배열에서 관리합니다.
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleCompleteTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo,
      ),
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // completed 값에 따라 두 목록에 나누어 표시합니다.
  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <main className="todo-container">
      <h1 className="todo-container__header">🦁 LIKELION TO-DO</h1>

      <TodoInput onAddTodo={handleAddTodo} />

      <div className="render-container">
        <TodoList
          title="할 일"
          todos={pendingTodos}
          onComplete={handleCompleteTodo}
          onDelete={handleDeleteTodo}
        />

        <TodoList
          title="완료"
          todos={completedTodos}
          onComplete={handleCompleteTodo}
          onDelete={handleDeleteTodo}
        />
      </div>
    </main>
  );
}