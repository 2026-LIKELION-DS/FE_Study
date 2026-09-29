import TodoItem from "./TodoItem";
import type { Todo } from "../types/Todo";

interface TodoListProps {
  todos: Todo[];
  onComplete: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

function TodoList({
  todos,
  onComplete,
  onDelete,
}: TodoListProps) {
  const activeTodos = todos.filter(
    (todo) => !todo.completed
  );

  const completedTodos = todos.filter(
    (todo) => todo.completed
  );

  return (
    <div className="render-container">
      <section className="render-container__section">
        <h2 className="render-container__title">할 일</h2>

        <ul className="render-container__list">
          {activeTodos.map((todo) => (
            <TodoItem
              key={todo.clientId ?? `server-${todo.id}`}
              todo={todo}
              onComplete={onComplete}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </section>

      <section className="render-container__section">
        <h2 className="render-container__title">완료</h2>

        <ul className="render-container__list">
          {completedTodos.map((todo) => (
            <TodoItem
              key={todo.clientId ?? `server-${todo.id}`}
              todo={todo}
              onComplete={onComplete}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default TodoList;