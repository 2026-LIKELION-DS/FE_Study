import type { ApiTodo } from "../../types/todo";
import "./TodoItem.css";

interface TodoItemProps {
  todo: ApiTodo;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{todo.title}</span>
      <button
        className="render-container__item-button complete"
        onClick={() => onToggle(todo.id, todo.completed)}
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
