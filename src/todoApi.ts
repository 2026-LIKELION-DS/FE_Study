import type { ApiTodo, Todo } from './types'

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos'

function toTodo(todo: ApiTodo): Todo {
  return { id: todo.id, text: todo.title, completed: todo.completed, userId: todo.userId }
}

function checkResponse(response: Response): void {
  if (!response.ok) {
    throw new Error(`요청에 실패했습니다. (HTTP ${response.status})`)
  }
}

export async function fetchTodos(signal: AbortSignal): Promise<Todo[]> {
  const response = await fetch(TODOS_URL, { signal })
  checkResponse(response)
  const todos: ApiTodo[] = await response.json()
  return todos.map(toTodo)
}

export async function postTodo(text: string): Promise<Todo> {
  const response = await fetch(TODOS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: text, completed: false, userId: 1 }),
  })
  checkResponse(response)
  const todo: ApiTodo = await response.json()
  return toTodo(todo)
}

export async function patchTodo(todo: Todo): Promise<Todo> {
  const completed = !todo.completed
  const response = await fetch(`${TODOS_URL}/${todo.apiId ?? todo.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  })
  // JSONPlaceholder는 POST로 생성한 리소스를 저장하지 않습니다.
  // 해당 항목에 대한 PATCH의 미존재 응답만 로컬 변경으로 보완합니다.
  if (todo.apiId !== undefined && (response.status === 404 || response.status === 500)) {
    return { ...todo, completed }
  }
  checkResponse(response)
  const updated: ApiTodo = await response.json()
  return { ...todo, completed: updated.completed }
}

export async function removeTodo(todo: Todo): Promise<number> {
  const response = await fetch(`${TODOS_URL}/${todo.apiId ?? todo.id}`, { method: 'DELETE' })
  if (!(todo.apiId !== undefined && response.status === 404)) {
    checkResponse(response)
  }
  return todo.id
}
