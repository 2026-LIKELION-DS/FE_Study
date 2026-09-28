import type { CreateTodoRequest, Todo, UpdateTodoRequest } from "../types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`요청 실패: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const getTodos = () => request<Todo[]>("/todos?_limit=10");

export const createTodo = (body: CreateTodoRequest) =>
  request<Todo>("/todos", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const deleteTodo = (id: number) =>
  request<Record<string, never>>(`/todos/${id}`, {
    method: "DELETE",
  });

export const updateTodo = ({ id, completed }: UpdateTodoRequest) =>
  request<Todo>(`/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ completed }),
  });
