import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../api/todos";
import type { Todo, UpdateTodoRequest } from "../types";

export const todoKeys = {
  all: ["todos"] as const,
};

const SERVER_TODO_MAX_ID = 200;

export function useTodosQuery() {
  return useQuery({
    queryKey: todoKeys.all,
    queryFn: getTodos,
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: (createdTodo) => {
      queryClient.setQueryData<Todo[]>(todoKeys.all, (prev = []) => [
        ...prev,
        { ...createdTodo, id: Date.now() },
      ]);
      queryClient.invalidateQueries({
        queryKey: todoKeys.all,
        refetchType: "none",
      });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      id > SERVER_TODO_MAX_ID ? Promise.resolve({}) : deleteTodo(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<Todo[]>(todoKeys.all, (prev = []) =>
        prev.filter((todo) => todo.id !== id),
      );
      queryClient.invalidateQueries({
        queryKey: todoKeys.all,
        refetchType: "none",
      });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: UpdateTodoRequest) =>
      variables.id > SERVER_TODO_MAX_ID
        ? Promise.resolve(variables)
        : updateTodo(variables),
    onSuccess: (_, { id, completed }) => {
      queryClient.setQueryData<Todo[]>(todoKeys.all, (prev = []) =>
        prev.map((todo) => (todo.id === id ? { ...todo, completed } : todo)),
      );
      queryClient.invalidateQueries({
        queryKey: todoKeys.all,
        refetchType: "none",
      });
    },
  });
}
