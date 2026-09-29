import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "./components/Header/Header";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoList from "./components/TodoList/TodoList";
import { getTodos, postTodo, patchTodo, deleteTodo } from "./api/todos";
import type { ApiTodo } from "./types/todo";
import "./App.css";

const App = () => {
  const queryClient = useQueryClient();

  const { data: todos = [], isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // JSONPlaceholder는 실제로 데이터를 저장하지 않으므로, 응답만 받고 끝나는
  // invalidateQueries(refetch) 대신 캐시를 직접 갱신해서 화면에 반영한다.
  // refetchType: "none"으로 invalidateQueries는 호출하되 즉시 재요청은 막는다.
  const invalidateTodos = () =>
    queryClient.invalidateQueries({ queryKey: ["todos"], refetchType: "none" });

  const addMutation = useMutation({
    mutationFn: (title: string) => postTodo(title),
    onSuccess: (newTodo) => {
      queryClient.setQueryData<ApiTodo[]>(["todos"], (old = []) => {
        // JSONPlaceholder는 POST할 때마다 항상 같은 id(201)를 돌려주므로 중복을 피한다.
        const isDuplicate = old.some((todo) => todo.id === newTodo.id);
        const id = isDuplicate ? Math.max(...old.map((t) => t.id), 0) + 1 : newTodo.id;
        return [...old, { ...newTodo, id }];
      });
      invalidateTodos();
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      patchTodo(id, completed),
    onSuccess: (updatedTodo, variables) => {
      queryClient.setQueryData<ApiTodo[]>(["todos"], (old = []) =>
        old.map((todo) =>
          todo.id === variables.id ? { ...todo, ...updatedTodo, id: todo.id } : todo
        )
      );
      invalidateTodos();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: (_data, id) => {
      queryClient.setQueryData<ApiTodo[]>(["todos"], (old = []) =>
        old.filter((todo) => todo.id !== id)
      );
      invalidateTodos();
    },
  });

  return (
    <div className="app">
      <div className="todo-container">
        <Header />
        <TodoInput onAdd={(title) => addMutation.mutate(title)} />
      </div>
      {isLoading && <p>불러오는 중...</p>}
      {isError && <p>할 일 목록을 불러오지 못했습니다.</p>}
      {!isLoading && !isError && (
        <TodoList
          todos={todos}
          onToggle={(id, completed) => toggleMutation.mutate({ id, completed: !completed })}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      )}
    </div>
  );
};

export default App;
