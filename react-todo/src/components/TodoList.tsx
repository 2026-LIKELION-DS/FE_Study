import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";

interface TodoListProps {
  title: string;
  todos: Todo[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({
  title,
  todos,
  onComplete,
  onDelete,
}: TodoListProps) {
  return (
    <section className="render-container__section" aria-label={title}>
      <h2 className="render-container__title">{title}</h2>

      <ul className="render-container__list" aria-live="polite">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}