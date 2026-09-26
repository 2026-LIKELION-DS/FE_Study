import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

import {
  addTodo,
  completeTodo,
  deleteTodo,
  getTodos,
} from "./api/todos";

import type { Todo } from "./types/Todo";

import "./style.css";

function App() {
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const addMutation = useMutation({
    mutationFn: addTodo,

    onSuccess: (newTodo) => {
      const todoForUI: Todo = {
        ...newTodo,
        clientId: crypto.randomUUID(),
      };

      queryClient.setQueryData<Todo[]>(
        ["todos"],
        (oldTodos = []) => [
          todoForUI,
          ...oldTodos,
        ]
      );

      queryClient.invalidateQueries({
        queryKey: ["todos"],
        refetchType: "none",
      });
    },
  });

  const completeMutation = useMutation({
    mutationFn: completeTodo,

    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<Todo[]>(
        ["todos"],
        (oldTodos = []) =>
          oldTodos.map((todo) => {
            const isSameTodo = updatedTodo.clientId
              ? todo.clientId === updatedTodo.clientId
              : todo.id === updatedTodo.id;

            return isSameTodo
              ? updatedTodo
              : todo;
          })
      );

      queryClient.invalidateQueries({
        queryKey: ["todos"],
        refetchType: "none",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,

    onSuccess: (deletedTodo) => {
      queryClient.setQueryData<Todo[]>(
        ["todos"],
        (oldTodos = []) =>
          oldTodos.filter((todo) => {
            if (deletedTodo.clientId) {
              return todo.clientId !== deletedTodo.clientId;
            }

            return todo.id !== deletedTodo.id;
          })
      );

      queryClient.invalidateQueries({
        queryKey: ["todos"],
        refetchType: "none",
      });
    },
  });

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (isError) {
    return <p>할 일 목록을 불러오지 못했습니다.</p>;
  }

  return (
    <main className="todo-container">
      <h1 className="todo-container__header">
        🌷 MY TO-DO
      </h1>

      <TodoInput
        onAdd={(text) =>
          addMutation.mutate(text)
        }
      />

      <TodoList
        todos={todos ?? []}
        onComplete={(todo) =>
          completeMutation.mutate(todo)
        }
        onDelete={(todo) =>
          deleteMutation.mutate(todo)
        }
      />
    </main>
  );
}

export default App;