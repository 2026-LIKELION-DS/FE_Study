import type { Todo } from "../types/Todo";

interface TodoItemProps {
  todo: Todo;
  onComplete: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

function TodoItem({
  todo,
  onComplete,
  onDelete,
}: TodoItemProps) {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">
        {todo.title}
      </span>

      <button
        className={`render-container__item-button ${
          todo.completed ? "delete" : "complete"
        }`}
        type="button"
        onClick={() =>
          todo.completed
            ? onDelete(todo)
            : onComplete(todo)
        }
      >
        {todo.completed ? "삭제" : "완료"}
      </button>
    </li>
  );
}

export default TodoItem;