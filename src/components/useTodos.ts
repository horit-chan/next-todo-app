"use client";

import { useState, useEffect } from "react";

export type TodoItem = {
    id: number;
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
        const savedData = localStorage.getItem("my-todos");
        if (savedData) {
            setTodos(JSON.parse(savedData))
        }
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("my-todos", JSON.stringify(todos))
        }
    }, [todos]);

    const addTodo = (text: string, deadline: string) => {
        const newTodo: TodoItem = { 
            id: Date.now(), 
            text: text, 
            completed: false,
            deadline: deadline 
        };
        setTodos([...todos, newTodo]);
    };

    const deleteTodo = (idToRemove: number) => {
        setTodos(todos.filter((todo) => todo.id !== idToRemove));
    };

    const toggleTodo = (idToToggle: number) => {
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