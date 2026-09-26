import { useQuery } from "@tanstack/react-query";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { getTodos } from "./api/todos";
import "./style.css";

function App() {
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return (
    <main className="todo-container">
      <h1 className="todo-container__header">🌷 MY TO-DO</h1>

      <TodoInput onAdd={() => {}} />

      {isLoading && <p>로딩 중...</p>}
      {isError && <p>할 일 목록을 불러오지 못했습니다.</p>}

      {todos && (
        <TodoList
          todos={todos}
          onComplete={() => {}}
          onDelete={() => {}}
        />
      )}
    </main>
  );
}

export default App;