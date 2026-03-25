import { useState } from "react";

type Props = {
    onAdd: (text: string, deadline: string) => void;
};

export default function TodoForm(props: Props) {

    const [inputText, setInputText] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleAddTodo = () => {
        if (inputText.trim() === '') return;

        props.onAdd(inputText,deadline);

        setInputText('');
        setDeadline('');
    };

    return(
        <div>
            <input                 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="タスクを入力..."
            />

            <input                 
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style={{ marginLeft: '10px', padding: '5px' }}
            />

            <button onClick={handleAddTodo}>追加</button>
        </div>
    );
}