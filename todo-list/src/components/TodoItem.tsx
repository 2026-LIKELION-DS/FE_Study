import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo; //할 일 하나
  buttonLabel: string; //완료 또는 삭제
  buttonVariant: "complete" | "delete";
  onButtonClick: (id: number) => void;
}

function TodoItem({
  todo,
  buttonLabel,
  buttonVariant,
  onButtonClick,
}: TodoItemProps) {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{todo.text}</span>

      <button
        type="button"
        className={`render-container__item-button ${buttonVariant}`}
        onClick={() => onButtonClick(todo.id)}
      >
        {buttonLabel}
      </button>
    </li>
  );
}

export default TodoItem;
