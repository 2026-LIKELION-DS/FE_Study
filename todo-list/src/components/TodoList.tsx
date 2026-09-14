import TodoItem from "./TodoItem";
import type { Todo } from "../types";

//할 일과 완료 섹션 보여주는 컴포넌트
interface TodoListProps {
  title: string; //세션 제목
  todos: Todo[]; //이 세션에 들어갈 할 일 목록ㄹ (완료 구분하지 않고)
  buttonLabel: string;
  buttonVariant: "complete" | "delete";
  onButtonClick: (id: number) => void;
}

function TodoList({
  title,
  todos,
  buttonLabel,
  buttonVariant,
  onButtonClick,
}: TodoListProps) {
  return (
    <section className="render-container__section">
      <h2 className="render-container__title">{title}</h2>

      <ul className="render-container__list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            buttonLabel={buttonLabel}
            buttonVariant={buttonVariant}
            onButtonClick={onButtonClick}
          />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
