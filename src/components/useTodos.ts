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
                body: JSON.stringify({ text, completed: false, deadline}),
            });

            const savedTodo = await response.json();

            setTodos([...todos, savedTodo]);

        } catch (error) {
            console.error("データの保存に失敗しました😭", error);
        }
    };

    const deleteTodo = async (idToRemove: string) => {
        // ロールバック用
        const previousTodos = [...todos];

        setTodos(todos.filter((todo) => todo.id !== idToRemove));

        try {
            const response = await fetch('/api/todos', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: idToRemove}),
            });
            
            if (!response.ok) throw new Error('サーバーでの削除に失敗しました');

        } catch(error) {
            console.error("データの削除に失敗しました😭", error);

            // ロールバック
            setTodos(previousTodos);

            alert("通信エラーで消せませんでした！画面をもとに戻します🙏")
        }
    };

    const toggleTodo = async (idToToggle: string) => {
        const previousTodos = [...todos];

        const targetTodo = todos.find(todo => todo.id === idToToggle);
        if (!targetTodo) return;
        const newCompletedStatus = !targetTodo.completed;

        setTodos(todos.map((todo) =>
            todo.id === idToToggle ? { ...todo, completed: newCompletedStatus } : todo
        ));

        try {
            const response = await fetch('/api/todos', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id: idToToggle, completed: newCompletedStatus }),
            });

            if (!response.ok) throw new Error("サーバーでの更新に失敗しました");
        } catch(error) {
            console.error("データの更新に失敗しました😭", error);

            setTodos(previousTodos);
            alert("通信エラーでチェックを切り替えられませんでした！");
        }
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