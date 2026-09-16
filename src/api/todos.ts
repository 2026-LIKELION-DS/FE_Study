import type { ApiTodo } from "../types/todo";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getTodos = async (): Promise<ApiTodo[]> => {
  const res = await fetch(`${BASE_URL}/todos?_limit=10`);
  if (!res.ok) throw new Error("할 일 목록을 불러오지 못했습니다.");
  return res.json();
};

export const postTodo = async (title: string): Promise<ApiTodo> => {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false, userId: 1 }),
  });
  if (!res.ok) throw new Error("할 일 추가에 실패했습니다.");
  return res.json();
};

export const patchTodo = async (id: number, completed: boolean): Promise<ApiTodo> => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  if (!res.ok) throw new Error("할 일 상태 변경에 실패했습니다.");
  return res.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("할 일 삭제에 실패했습니다.");
};
