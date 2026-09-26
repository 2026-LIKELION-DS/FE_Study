import { useState } from 'react'
import type { FormEvent } from 'react'

type TodoInputProps = {
  onAdd: (text: string) => Promise<boolean>
  disabled: boolean
}

function TodoInput({ onAdd, disabled }: TodoInputProps) {
  const [text, setText] = useState<string>('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (disabled || text.trim() === '') return

    if (await onAdd(text)) setText('')
  }

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        className="todo-container__input"
        type="text"
        aria-label="할 일 입력"
        placeholder="할 일을 입력하세요"
        value={text}
        disabled={disabled}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => {
          // 한글 조합을 확정하는 Enter로 폼이 제출되지 않게 합니다.
          if (event.key === 'Enter' && event.nativeEvent.isComposing) {
            event.preventDefault()
          }
        }}
      />
      <button className="todo-container__button" type="submit" disabled={disabled}>추가</button>
    </form>
  )
}

export default TodoInput
