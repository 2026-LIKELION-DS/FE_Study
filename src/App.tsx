import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

import "./style.css";

function App() {
  return (
    <main className="todo-container">
      <h1 className="todo-container__header">⛄︎ YEBIN'S TO-DO ⛄︎</h1>
      <TodoInput />

      <TodoList />
    </main>
  );
}

export default App;