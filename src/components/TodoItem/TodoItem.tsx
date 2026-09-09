import type { Todo } from "../../types/todo";
import "./TodoItem.css";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li className="todo-item">
      <span
        className={todo.completed ? "todo-item__text completed" : "todo-item__text"}
        onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
};

export default TodoItem;
