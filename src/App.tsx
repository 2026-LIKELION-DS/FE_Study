import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "./components/Header/Header";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoList from "./components/TodoList/TodoList";
import { getTodos, postTodo, patchTodo, deleteTodo } from "./api/todos";
import "./App.css";

const App = () => {
  const queryClient = useQueryClient();

  const { data: todos = [], isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const invalidateTodos = () => queryClient.invalidateQueries({ queryKey: ["todos"] });

  const addMutation = useMutation({
    mutationFn: (title: string) => postTodo(title),
    onSuccess: invalidateTodos,
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      patchTodo(id, completed),
    onSuccess: invalidateTodos,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: invalidateTodos,
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
