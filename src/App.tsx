import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import "./style.css";

export interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${BASE_URL}?_limit=10`);
  const data = await res.json();
  return data.map((item: any) => ({
    id: item.id,
    text: item.title,
    isDone: item.completed,
  }));
};

export const App: React.FC = () => {
  const { data: todos = [], isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return <div style={{ padding: 20 }}>로딩 중입니다...</div>;

  // useMutation 연결하기...
  const handleAddTodo = (_text: string) => {};
  const handleToggle = (_id: number) => {};
  const handleDelete = (_id: number) => {};

  const workingTodos = todos.filter((todo) => !todo.isDone);
  const doneTodos = todos.filter((todo) => todo.isDone);

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁LIKELION TO-DO</h1>
      <TodoInput onAdd={handleAddTodo} />
      <div className="render-container">
        <TodoList
          title="할 일"
          todos={workingTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
        <TodoList
          title="완료"
          todos={doneTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;