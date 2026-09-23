// JSONPlaceholder /todos 응답과 동일한 타입입니다.
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type CreateTodo = Pick<Todo, "userId" | "title" | "completed">;

// 가짜 API는 POST마다 같은 id(201)를 반환하므로 화면 식별자를 분리합니다.
export interface TodoItemData extends Todo {
  clientKey: string;
}
