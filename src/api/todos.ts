import type { Todo } from "../types/Todo";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// GET /todos
export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${BASE_URL}/todos`);

  if (!response.ok) {
    throw new Error("할 일 목록을 불러오지 못했습니다.");
  }

  const data: Todo[] = await response.json();

  return data.slice(0, 20);
};

// POST /todos
export const addTodo = async (title: string): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: 1,
      title,
      completed: false,
    }),
  });

  if (!response.ok) {
    throw new Error("할 일을 추가하지 못했습니다.");
  }

  return response.json();
};

export const completeTodo = async (
  todo: Todo
): Promise<Todo> => {
  // JSONPlaceholder에 실제 존재하는 항목
  if (todo.id <= 200) {
    const response = await fetch(
      `${BASE_URL}/todos/${todo.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("할 일을 완료하지 못했습니다.");
    }
  }

  return {
    ...todo,
    completed: true,
  };
};

export const deleteTodo = async (
  todo: Todo
): Promise<Todo> => {
  // JSONPlaceholder에 실제 존재하는 항목
  if (todo.id <= 200) {
    const response = await fetch(
      `${BASE_URL}/todos/${todo.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("할 일을 삭제하지 못했습니다.");
    }
  }

  return todo;
};