interface TodoItemProps {
    text: string;
    completed: boolean;
}

function TodoItem({ text, completed }: TodoItemProps) {
    return (
        <li className="render-container__item">
        <span className="render-container__item-text">
            {text}
        </span>

        <button
            className={`render-container__item-button ${
            completed ? "delete" : "complete"
            }`}
            type="button"
        >
            {completed ? "삭제" : "완료"}
        </button>
        </li>
    );
}

export default TodoItem;