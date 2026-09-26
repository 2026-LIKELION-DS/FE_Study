import TodoItem from './TodoItem'
import type { Todo } from './types'

type TodoListProps = {
  title: string
  todos: Todo[]
  isCompleted: boolean
  onAction: (id: number) => void
  disabled: boolean
}

function TodoList({ title, todos, isCompleted, onAction, disabled }: TodoListProps) {
  return (
    <section className="render-container__section" aria-label={title}>
      <h2 className="render-container__title">{title}</h2>
      <ul className="render-container__list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} isCompleted={isCompleted} onAction={onAction} disabled={disabled} />
        ))}
      </ul>
    </section>
  )
}

export default TodoList
