import type { Todo } from "../../types/todo";
import "./TodoItem.css";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{todo.text}</span>
      <button
        className="render-container__item-button complete"
        onClick={() => onToggle(todo.id)}
      >
        {todo.completed ? "취소" : "완료"}
      </button>
      <button
        className="render-container__item-button delete"
        onClick={() => onDelete(todo.id)}
      >
        삭제
      </button>
    </li>
  );
};

export default TodoItem;
