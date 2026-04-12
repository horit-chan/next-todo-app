"use client";

import { useTodos } from "./useTodos";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import TodoFilter from "./TodoFilter";
import Link from "next/link"

export default function TodoApp() {
    const { filteredTodos, filter, setFilter, addTodo, deleteTodo, toggleTodo } = useTodos();

    return (
        <div className="bg-slate-100 min-h-screen p-8">
            <h1 className="text-4xl font-extrabold text-blue-600 mb-8 text-center">
                📝 TS版 Todoリスト
            </h1>

            <div className="text-center mb-8">
                <Link
                    href="/login"
                    className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-200 transition-colors"
                >
                    👤 ログイン画面へ行く
                </Link>
            </div>

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