import {TodoItem as TodoType} from "./useTodos";

type Props = {
    todo: TodoType;

    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
};

export default function TodoItem(props: Props) {
    return (
        <li className={`flex items-center justify-between p-5 mb-4 bg-white rounded-xl shadow-sm border-l-4 transition-all duration-300 hover:shadow-md ${props.todo.completed ? 'border-gray-400 opacity-60' : 'border-blue-500'}`}>
            <input 
                type="checkbox"
                checked={props.todo.completed}
                onChange={() => props.onToggle(props.todo.id)}
                className="w-6 h-6 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer transition-colors duration-200"
            />
            <span className={`block text-lg font-bold transition-all duration-200 ${props.todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {props.todo.text}
            </span>
            {props.todo.deadline && (
                <span className="text-sm text-gray-500 font-medium">
                    ⏰️ 期限：{props.todo.deadline}
                </span>
            )}
            <button
                onClick={() => props.onDelete(props.todo.id)}                 
                className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg font-bold transition-color duration-200"
            >
                削除
            </button>
        </li>
    );
}