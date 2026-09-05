interface TodoItemProps {
    id: number;
    text: string;
    completed: boolean;
    onComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

function TodoItem({
    id,
    text,
    completed,
    onComplete,
    onDelete,
    }: TodoItemProps) {
    return (
        <li className="render-container__item">
        <span className="render-container__item-text">{text}</span>

        <button className={`render-container__item-button ${
            completed ? "delete" : "complete"
            }`}
            type="button" onClick={() =>
            completed ? onDelete(id) : onComplete(id)
            }
        >
            {completed ? "삭제" : "완료"}
        </button>
        </li>
    );
}

export default TodoItem;