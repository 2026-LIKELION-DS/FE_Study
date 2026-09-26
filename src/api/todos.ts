import type { Todo } from "../types/Todo";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getTodos = async (): Promise<Todo[]> => {
    const response = await fetch(`${BASE_URL}/todos`);

    if (!response.ok) {
        throw new Error("할 일 목록을 불러오지 못했습니다.");
    }

    return response.json();
};