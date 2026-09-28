export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface CreateTodoRequest {
  userId: number;
  title: string;
  completed: boolean;
}

export interface UpdateTodoRequest {
  id: number;
  completed: boolean;
}
