import TodoItem from "./TodoItem";

function TodoList() {
    return (
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
    );
}

export default TodoList;