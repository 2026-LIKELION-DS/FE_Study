import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDemoSession, todosApi } from "../api/todos";
import type { TodoItemData } from "../types/todo";

export const todoKeys = { all: ["todos"] as const };
const sessions = new WeakMap<QueryClient, ReturnType<typeof createDemoSession>>();

export function useTodos() {
  const queryClient = useQueryClient();
  if (!sessions.has(queryClient)) sessions.set(queryClient, createDemoSession());
  const demoSession = sessions.get(queryClient)!;
  const query = useQuery({
    queryKey: todoKeys.all,
    queryFn: async ({ signal }) => demoSession.merge(await todosApi.getAll(signal)),
  });

  // Promise를 반환해 재조회가 끝날 때까지 isPending을 유지합니다.
  const refresh = () => queryClient.invalidateQueries({ queryKey: todoKeys.all });

  const addTodo = useMutation({
    mutationFn: (title: string) => todosApi.create({ userId: 1, title, completed: false }),
    onSuccess: (created) => {
      demoSession.add(created);
      return refresh();
    },
  });

  const completeTodo = useMutation({
    mutationFn: (todo: TodoItemData) => todosApi.complete(todo.id),
    onSuccess: (_response, todo) => {
      demoSession.complete(todo.clientKey);
      return refresh();
    },
  });

  const deleteTodo = useMutation({
    mutationFn: (todo: TodoItemData) => todosApi.remove(todo.id),
    onSuccess: (_response, todo) => {
      demoSession.remove(todo.clientKey);
      return refresh();
    },
  });

  return { query, addTodo, completeTodo, deleteTodo };
}
