import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

export default function App() {
  const { query, addTodo, completeTodo, deleteTodo } = useTodos();
  const todos = query.data ?? [];
  const busy = addTodo.isPending || completeTodo.isPending || deleteTodo.isPending;
  const mutationError = addTodo.error ?? completeTodo.error ?? deleteTodo.error;
  const resetErrors = () => {
    addTodo.reset();
    completeTodo.reset();
    deleteTodo.reset();
  };

  return (
    <main className="todo-container">
      <h1 className="todo-container__header">🦁 LIKELION TO-DO</h1>
      <TodoInput
        disabled={busy || !query.data}
        isAdding={addTodo.isPending}
        onAddTodo={async (title) => {
          resetErrors();
          await addTodo.mutateAsync(title);
        }}
      />

      <div className="status-message" role="status">
        {query.isPending ? "할 일을 불러오는 중입니다…" :
          busy ? "변경 사항을 반영하는 중입니다…" :
          query.isFetching ? "목록을 갱신하는 중입니다…" :
          `전체 ${todos.length}개 · 완료 ${todos.filter((todo) => todo.completed).length}개`}
      </div>
      {query.isError && (
        <div className="error-message" role="alert">
          <p>{query.data ? "목록 갱신에 실패했습니다." : "목록을 불러오지 못했습니다."} {query.error.message}</p>
          <button type="button" onClick={() => void query.refetch()} disabled={query.isFetching}>다시 불러오기</button>
        </div>
      )}
      {mutationError && <p className="error-message" role="alert">변경하지 못했습니다. {mutationError.message} 다시 시도해 주세요.</p>}
      {query.data && (
        <div className="render-container">
          {[false, true].map((completed) => (
            <TodoList
              key={String(completed)}
              title={completed ? "완료" : "할 일"}
              todos={todos.filter((todo) => todo.completed === completed)}
              disabled={busy}
              onComplete={(todo) => { resetErrors(); completeTodo.mutate(todo); }}
              onDelete={(todo) => { resetErrors(); deleteTodo.mutate(todo); }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
