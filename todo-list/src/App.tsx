import "./style.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import {
  useCreateTodo,
  useDeleteTodo,
  useTodosQuery,
  useUpdateTodo,
} from "./hooks/useTodos";

function App() {
  const { data: todos = [], isPending, isError, error } = useTodosQuery();
  const createMutation = useCreateTodo();
  const deleteMutation = useDeleteTodo();
  const updateMutation = useUpdateTodo();

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const handleAdd = (title: string) => {
    createMutation.mutate({ userId: 1, title, completed: false });
  };

  const handleComplete = (id: number) => {
    updateMutation.mutate({ id, completed: true });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁 LIKELION TO-DO</h1>

      <TodoInput onAdd={handleAdd} isPending={createMutation.isPending} />

      {isPending && <p className="todo-container__status">불러오는 중...</p>}
      {isError && (
        <p className="todo-container__status">에러: {error.message}</p>
      )}

      <div className="render-container">
        <TodoList
          title="할 일"
          todos={activeTodos}
          buttonLabel="완료"
          buttonVariant="complete"
          onButtonClick={handleComplete}
        />

        <TodoList
          title="완료"
          todos={completedTodos}
          buttonLabel="삭제"
          buttonVariant="delete"
          onButtonClick={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
