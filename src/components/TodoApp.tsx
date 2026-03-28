"use client";

import { useTodos } from "./useTodos";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import TodoFilter from "./TodoFilter";

export default function TodoApp() {
    const { filteredTodos, filter, setFilter, addTodo, deleteTodo, toggleTodo } = useTodos();

    return (
        <div style={{ padding: '20px', border: '2px solid purple', marginTop: '20px' }}>
            <h2>📝 TS版 Todoリスト</h2>

            <TodoForm
                onAdd={addTodo}
            />

            <TodoFilter
                filter = {filter}
                setFilter = {setFilter}
            />

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {filteredTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
}