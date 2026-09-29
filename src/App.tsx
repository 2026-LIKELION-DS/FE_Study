import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import { fetchTodos, patchTodo, postTodo, removeTodo } from './todoApi'
import type { Todo } from './types'

function App() {
  const queryClient = useQueryClient()
  // 서버에 저장되지 않는 성공한 변경을 재조회 결과에 덧씌웁니다.
  // null은 삭제한 항목이며, 새로고침하면 이 임시 상태는 초기화됩니다.
  const [changes, setChanges] = useState<Record<number, Todo | null>>({})
  const nextLocalId = useRef(-1)
  const [mutationError, setMutationError] = useState<string | null>(null)
  const { data = [], isPending, error, refetch } = useQuery({
    queryKey: ['todos'],
    queryFn: ({ signal }) => fetchTodos(signal),
  })

  function startMutation() {
    setMutationError(null)
  }

  function handleError(error: Error) {
    setMutationError(error.message)
  }

  const addMutation = useMutation({
    mutationFn: postTodo,
    onMutate: startMutation,
    onError: handleError,
    onSuccess: async (todo) => {
      const added = { ...todo, id: nextLocalId.current--, apiId: todo.id }
      setChanges((current) => ({ ...current, [added.id]: added }))
      await queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const completeMutation = useMutation({
    mutationFn: patchTodo,
    onMutate: startMutation,
    onError: handleError,
    onSuccess: async (todo) => {
      setChanges((current) => ({ ...current, [todo.id]: todo }))
      await queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: removeTodo,
    onMutate: startMutation,
    onError: handleError,
    onSuccess: async (id) => {
      setChanges((current) => ({ ...current, [id]: null }))
      await queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const todos = [
    ...data.filter((todo) => !(todo.id in changes)),
    ...Object.values(changes).filter((todo): todo is Todo => todo !== null),
  ]
  const isMutating = addMutation.isPending || completeMutation.isPending || deleteMutation.isPending

  async function addTodo(text: string): Promise<boolean> {
    const trimmedText = text.trim()
    if (!trimmedText || isMutating || isPending) return false
    try {
      await addMutation.mutateAsync(trimmedText)
      return true
    } catch {
      // 오류는 onError에서 표시하고 입력 내용은 유지합니다.
      return false
    }
  }

  function completeTodo(id: number) {
    const todo = todos.find((item) => item.id === id)
    if (todo && !isMutating) completeMutation.mutate(todo)
  }

  function deleteTodo(id: number) {
    const todo = todos.find((item) => item.id === id)
    if (todo && !isMutating) deleteMutation.mutate(todo)
  }

  return (
    <main className="todo-container">
      <h1 className="todo-container__header">🦁 LIKELION TO-DO</h1>
      <TodoInput onAdd={addTodo} disabled={isPending || isMutating} />
      {isPending && <p role="status">할 일을 불러오는 중입니다...</p>}
      {error && <p role="alert">목록 조회 실패: {error.message} <button type="button" onClick={() => void refetch()}>다시 시도</button></p>}
      {mutationError && <p role="alert">{mutationError}</p>}
      <div className="render-container">
        <TodoList title="할 일" todos={todos.filter((todo) => !todo.completed)} isCompleted={false} onAction={completeTodo} disabled={isMutating} />
        <TodoList title="완료" todos={todos.filter((todo) => todo.completed)} isCompleted={true} onAction={deleteTodo} disabled={isMutating} />
      </div>
    </main>
  )
}

export default App
