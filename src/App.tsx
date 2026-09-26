import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

const addTodo = async (text: string): Promise<Todo> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: text, completed: false }),
  });
  const data = await res.json();
  return { id: Date.now(), text: data.title ?? text, isDone: false };
};

const deleteTodo = async (id: number): Promise<void> => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};

const toggleTodo = async ({
  id,
  isDone,
}: {
  id: number;
  isDone: boolean;
}): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: isDone }),
  });
  return res.json();
};

export const App: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["todos"] });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: invalidate,
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: invalidate,
  });

  if (isLoading) return <div style={{ padding: 20 }}>로딩 중입니다...</div>;

  const handleAddTodo = (text: string) => {
    addMutation.mutate(text);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleToggle = (id: number) => {
    const target = todos.find((todo) => todo.id === id);
    if (!target) return;
    toggleMutation.mutate({ id, isDone: !target.isDone });
  };

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