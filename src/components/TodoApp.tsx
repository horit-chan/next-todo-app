"use client";

import { useState } from "react";
import { useTodos } from "./useTodos";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";


type FilterType = 'all' | 'active' | 'completed' ;

export default function TodoApp() {
    const { todos, addTodo, deleteTodo, toggleTodo } = useTodos();

    const [filter, setFilter] = useState<FilterType>('all');

    const filterdTodos = todos.filter((todo) => {
        if (filter === 'active') return todo.completed === false;
        if (filter === 'completed') return todo.completed === true;
        return true;
    });

    return (
        <div style={{ padding: '20px', border: '2px solid purple', marginTop: '20px' }}>
            <h2>📝 TS版 Todoリスト</h2>

            <TodoForm
                onAdd={addTodo}
            />

            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                <button onClick={() => setFilter('all')} style={{ fontWeight: filter === 'all' ? 'bold' : 'normal'}}>すべて</button>
                <button onClick={() => setFilter('active')} style={{ fontWeight: filter === 'active' ? 'bold' : 'normal'}}>未完了</button>
                <button onClick={() => setFilter('completed')} style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal'}}>完了済み</button>
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {filterdTodos.map((todo) => (
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