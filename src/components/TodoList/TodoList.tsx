import type { Todo } from "../../types/todo";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="render-container">
      <section className="render-container__section">
        <h2 className="render-container__title">할 일</h2>
        <ul className="render-container__list">
          {activeTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </ul>
      </section>
      <section className="render-container__section">
        <h2 className="render-container__title">완료</h2>
        <ul className="render-container__list">
          {completedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TodoList;
