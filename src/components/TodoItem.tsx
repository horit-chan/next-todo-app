type Props = {
    todo: {
        id: number;
        text: string;
        completed: boolean;
    };

    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
};

function TodoItem(props: Props) {
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
            <button onClick={() => props.onDelete(props.todo.id)} style={{ marginLeft: ' auto', color: 'red' }}>
                削除
            </button>
        </li>
    );
}

export default TodoItem;