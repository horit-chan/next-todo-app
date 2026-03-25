import {TodoItem as TodoType} from "./useTodos";

type Props = {
    todo: TodoType;

    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
};

export default function TodoItem(props: Props) {
    return (
        <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <input 
                type="checkbox"
                checked={props.todo.completed}
                onChange={() => props.onToggle(props.todo.id)}
                style={{ marginRight: '10px'}}
            />
            <span style={{ textDecoration: props.todo.completed ? 'line-through' : 'none', color: props.todo.completed ? 'gray' : 'black'}}>
                {props.todo.text}
            </span>
            {props.todo.deadline && (
                <span style={{ marginLeft: '10px', color: '#ff4444', fontSize: '0.9em', fontWeight: 'bold' }}>
                    ⏰️ 期限：{props.todo.deadline}
                </span>
            )}
            <button onClick={() => props.onDelete(props.todo.id)} style={{ marginLeft: ' auto', color: 'red' }}>
                削除
            </button>
        </li>
    );
}