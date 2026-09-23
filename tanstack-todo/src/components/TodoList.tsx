import TodoItem from "./TodoItem";
import type { TodoActions } from "./TodoItem";
import type { TodoItemData } from "../types/todo";

interface TodoListProps extends TodoActions {
  title: string;
  todos: TodoItemData[];
}

export default function TodoList({ title, todos, ...actions }: TodoListProps) {
  return (
    <section className="render-container__section" aria-label={title}>
      <h2 className="render-container__title">{title} <span className="todo-count">{todos.length}</span></h2>
      {todos.length === 0 && <p className="empty-message">{title === "완료" ? "완료한 일이 없습니다." : "할 일이 없습니다."}</p>}
      <ul className="render-container__list">
        {todos.map((todo) => <TodoItem key={todo.clientKey} todo={todo} {...actions} />)}
      </ul>
    </section>
  );
}
