"use client";

import { useState, useEffect } from "react";

export type TodoItem = {
    id: string;
    text: string;
    completed: boolean;
    deadline?: string;
};

export type FilterType = 'all' | 'active' | 'completed' ;

export const useTodos = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);

    const [filter, setFilter] = useState<FilterType>('all');

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'active') return todo.completed === false;
        if (filter === 'completed') return todo.completed === true;
        return true;
    });

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('/api/todos');
                const data = await response.json();
                setTodos(data);
            } catch (error) {
                console.error("データの取得に失敗しました😭", error);
            }
        };
        
        fetchTodos();
    }, []);

    const addTodo = async (text: string, deadline: string) => {

        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text, completed: false, deadline: deadline}),
            });

            const savedTodo = await response.json();

            setTodos([...todos, savedTodo]);

        } catch (error) {
            console.error("データの保存に失敗しました😭", error);
        }
    };

    const deleteTodo = (idToRemove: string) => {
        setTodos(todos.filter((todo) => todo.id !== idToRemove));
    };

    const toggleTodo = (idToToggle: string) => {
        setTodos(todos.map((todo) =>
            todo.id === idToToggle ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return {
        filteredTodos,
        filter,
        setFilter,
        addTodo,
        deleteTodo,
        toggleTodo
    };
};