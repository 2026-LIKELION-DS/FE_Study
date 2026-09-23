import type { CreateTodo, Todo, TodoItemData } from "../types/todo";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(`요청에 실패했습니다. (HTTP ${response.status})`);
  }

  return response.json() as Promise<T>;
}

const jsonHeaders = {
  "Content-Type": "application/json; charset=UTF-8",
};

export const todosApi = {
  getAll: (signal?: AbortSignal) =>
    request<Todo[]>("", { signal }),

  create: (todo: CreateTodo) =>
    request<Todo>("", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(todo),
    }),

  complete: (id: number) =>
    request<Partial<Todo>>(`/${id}`, {
      method: "PATCH",
      headers: jsonHeaders,
      body: JSON.stringify({ completed: true }),
    }),

  remove: (id: number) =>
    request<Record<string, never>>(`/${id}`, {
      method: "DELETE",
    }),
};

// API가 변경을 실제 저장하지 않아 성공한 변경을 임시로 보관합니다.
// 새로고침하면 초기화됩니다.
export function createDemoSession() {
  const added = new Map<string, TodoItemData>();

  return {
    add(todo: Todo) {
      const item = {
        ...todo,
        clientKey: crypto.randomUUID(),
      };

      added.set(item.clientKey, item);
    },

    complete(key: string) {
      const todo = added.get(key);

      if (todo) {
        added.set(key, { ...todo, completed: true });
      }
    },

    remove(key: string) {
      added.delete(key);
    },

    // 조회 결과 대신 직접 추가한 할 일만 반환합니다.
    merge(_todos: Todo[]): TodoItemData[] {
      return [...added.values()];
    },
  };
}