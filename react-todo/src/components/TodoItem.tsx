import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onComplete, onDelete }: TodoItemProps) {
  const handleClick = () => {
    if (todo.completed) {
      onDelete(todo.id);
    } else {
      onComplete(todo.id);
    }
  };

  return (
    <li className="render-container__item">
      <span className="render-container__item-text" title={todo.text}>
        {todo.text}
      </span>

      <button
        type="button"
        className={`render-container__item-button ${todo.completed ? "delete" : "complete"}`}
        onClick={handleClick}
      >
        {todo.completed ? "삭제" : "완료"}
      </button>
    </li>
  );
}
