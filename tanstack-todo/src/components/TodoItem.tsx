import type { TodoItemData } from "../types/todo";

export interface TodoActions {
  disabled: boolean;
  onComplete: (todo: TodoItemData) => void;
  onDelete: (todo: TodoItemData) => void;
}

export default function TodoItem({ todo, disabled, onComplete, onDelete }: TodoActions & { todo: TodoItemData }) {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text" title={todo.title}>{todo.title}</span>
      <button
        type="button"
        disabled={disabled}
        className={`render-container__item-button ${todo.completed ? "delete" : "complete"}`}
        aria-label={`${todo.title} ${todo.completed ? "삭제" : "완료"}`}
        onClick={() => todo.completed ? onDelete(todo) : onComplete(todo)}
      >
        {todo.completed ? "삭제" : "완료"}
      </button>
    </li>
  );
}
