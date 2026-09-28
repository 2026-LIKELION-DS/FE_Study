import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import './style.css';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import type { Todo } from './components/TodoItem';

// JSONPlaceholder API 응답 타입
interface ApiTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

// 1. [GET] 목록 조회 함수 (_limit=10 으로 깔끔하게 10개만 조회)
const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${BASE_URL}?_limit=10`);
  if (!response.ok) throw new Error('할 일 목록을 불러오지 못했습니다.');
  
  const data: ApiTodo[] = await response.json();
  // UI 컴포넌트(Todo) 규격에 맞게 title -> text, completed -> isDone 변환
  return data.map((item) => ({
    id: item.id,
    text: item.title,
    isDone: item.completed,
  }));
};

export const App = () => {
  const queryClient = useQueryClient();

  // 1. [GET /todos] 조회 쿼리
  const { data: todos = [], isPending, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  // 2. [POST /todos] 할 일 추가
  const addMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: text,
          completed: false,
          userId: 1,
        }),
      });
      if (!response.ok) throw new Error('할 일 추가 실패');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // 3. [PATCH /todos/:id] 할 일 완료 상태 토글
  const toggleMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      });
      if (!response.ok) throw new Error('할 일 완료 처리 실패');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // 4. [DELETE /todos/:id] 할 일 삭제
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('할 일 삭제 실패');
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  if (isPending) return <div className="todo-container">로딩 중...</div>;
  if (isError) return <div className="todo-container">에러 발생: {(error as Error).message}</div>;

  const activeTodos = todos.filter((todo) => !todo.isDone);
  const doneTodos = todos.filter((todo) => todo.isDone);

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁 LIKELION TO-DO</h1>
      <TodoInput onAdd={(text) => addMutation.mutate(text)} />

      <div className="render-container">
        <TodoList
          title="할 일"
          todos={activeTodos}
          onToggle={(id) => toggleMutation.mutate(id)}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
        <TodoList
          title="완료"
          todos={doneTodos}
          onToggle={(id) => toggleMutation.mutate(id)}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      </div>
    </div>
  );
};

export default App;