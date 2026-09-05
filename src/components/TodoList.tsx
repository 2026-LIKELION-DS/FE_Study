import TodoItem from "./TodoItem";
import type { Todo } from "../types/Todo";

interface TodoListProps {
    todos: Todo[];
    onComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

function TodoList({
    todos,
    onComplete,
    onDelete,
    }: TodoListProps) {
    const activeTodos = todos.filter((todo) => !todo.completed);
    const completedTodos = todos.filter((todo) => todo.completed);

    return (
        <div className="render-container">
        <section className="render-container__section">
            <h2 className="render-container__title">할 일</h2>

            <ul className="render-container__list">
            {activeTodos.map((todo) => (
                <TodoItem key={todo.id} id={todo.id} text={todo.text}
                    completed={todo.completed} onComplete={onComplete} onDelete={onDelete}
                />
            ))}
            </ul>
        </section>

        <section className="render-container__section">
            <h2 className="render-container__title">완료</h2>

            <ul className="render-container__list">
            {completedTodos.map((todo) => (
                <TodoItem key={todo.id} id={todo.id} text={todo.text}
                    completed={todo.completed} onComplete={onComplete} onDelete={onDelete}
                />
            ))}
            </ul>
        </section>
        </div>
    );
}

export default TodoList;