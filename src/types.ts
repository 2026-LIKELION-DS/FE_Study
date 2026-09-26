export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  userId: number;
  // POST 응답 ID는 중복될 수 있으므로 화면의 고유 ID와 구분합니다.
  apiId?: number;
}

export type ApiTodo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
