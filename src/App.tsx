import TodoInput from "./components/TodoInput";
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
            <li className="render-container__item">
              <span className="render-container__item-text">예시 할 일</span>
              <button className="render-container__item-button complete" type="button">
                완료
              </button>
            </li>
          </ul>
        </section>

        <section className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul className="render-container__list">
            <li className="render-container__item">
              <span className="render-container__item-text">예시 완료 항목</span>
              <button className="render-container__item-button delete" type="button">
                삭제
              </button>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

export default App;