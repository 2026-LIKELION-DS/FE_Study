import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import "./style.css";

function App() {
  return (
    <main className="todo-container">
      <h1 className="todo-container__header">⛄︎ YEBIN'S TO-DO ⛄︎</h1>
      <TodoInput />

      <div className="render-container">
        <section className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul className="render-container__list">
            <TodoItem text="예시 할 일" completed={false} />
          </ul>
        </section>

        <section className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul className="render-container__list">
            <TodoItem text="예시 완료 항목" completed={true} />
          </ul>
        </section>
      </div>
    </main>
  );
}

export default App;