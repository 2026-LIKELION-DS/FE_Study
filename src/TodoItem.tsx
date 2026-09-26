import type { Todo } from './types'

type TodoItemProps = {
  todo: Todo
  isCompleted: boolean
  onAction: (id: number) => void
  disabled: boolean
}

function TodoItem({ todo, isCompleted, onAction, disabled }: TodoItemProps) {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text" title={todo.text}>{todo.text}</span>
      <button
        className={`render-container__item-button ${isCompleted ? 'delete' : 'complete'}`}
        type="button"
        disabled={disabled}
        onClick={() => onAction(todo.id)}
      >
        {isCompleted ? '삭제' : '완료'}
      </button>
    </li>
  )
}

export default TodoItem
