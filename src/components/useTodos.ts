'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { todo } from 'node:test';

export type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
  deadline?: string;
  user_id?: string;
};

export type FilterType = 'all' | 'active' | 'completed';

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return todo.completed === false;
    if (filter === 'completed') return todo.completed === true;
    return true;
  });

  const router = useRouter();

  // 初期化：ログインチェック & データ取得
  useEffect(() => {
    const initAuthAndFetch = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        const { data, error } = await supabase
          .from('todos')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) setTodos(data);
      } else {
        router.push('/login');
      }

      setIsAuthLoading(false);
    };

    initAuthAndFetch();
  }, [router]);

  // 追加
  const addTodo = async (
    text: TodoItem['text'],
    deadline: TodoItem['deadline'],
  ) => {
    if (!userId) return;

    const tempId = crypto.randomUUID();
    const newTodo: TodoItem = {
      id: tempId,
      text,
      completed: false,
      deadline,
      user_id: userId,
    };
    setTodos([...todos, newTodo]);

    try {
      // 一旦追加して
      const { error } = await supabase
        .from('todos')
        .insert([{ text, completed: false, deadline, user_id: userId }]);

      if (error) throw error;

      // そのユーザーの全件取得
      const { data } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setTodos(data);
    } catch (error) {
      console.error('データの保存に失敗しました😭', error);
      setTodos(todos.filter((todo) => todo.id !== tempId));
    }
  };

  // 削除
  const deleteTodo = async (idToRemove: TodoItem['id']) => {
    if (!userId) return;

    // ロールバック用
    const previousTodos = [...todos];

    setTodos(todos.filter((todo) => todo.id !== idToRemove));

    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', idToRemove);

      if (error) throw error;
    } catch (error) {
      console.error('データの削除に失敗しました😭', error);

      // ロールバック
      setTodos(previousTodos);

      alert('通信エラーで消せませんでした！画面をもとに戻します🙏');
    }
  };

  // チェックボックス
  const toggleTodo = async (idToToggle: TodoItem['id']) => {
    if (!userId) return;

    const previousTodos = [...todos];

    const targetTodo = todos.find((todo) => todo.id === idToToggle);
    if (!targetTodo) return;
    const newCompletedStatus = !targetTodo.completed;

    setTodos(
      todos.map((todo) =>
        todo.id === idToToggle
          ? { ...todo, completed: newCompletedStatus }
          : todo,
      ),
    );

    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed: newCompletedStatus })
        .eq('id', idToToggle);
      if (error) throw error;
    } catch (error) {
      console.error('データの更新に失敗しました😭', error);

      setTodos(previousTodos);
      alert('通信エラーでチェックを切り替えられませんでした！');
    }
  };

  // ログアウト
  const logout = async () => {
    await supabase.auth.signOut();
    setUserId(null);
  };

  return {
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    deleteTodo,
    toggleTodo,
    userId,
    isAuthLoading,
    logout,
  };
};
