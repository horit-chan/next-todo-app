"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js"
import Link from "next/link";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");
    const [message, setMessage ] = useState("");

    // 👤 新規登録（サインアップ）の処理
    const handleSignUp = async () => {
        setMessage("登録中...");
        const { error } = await supabase.auth.signUp({ email, password });

        if (error) setMessage(`❌️ エラー: ${error.message}`);
        else setMessage("✅️ 登録成功！ログインしてください！");
    };

    // 🔑 ログイン（サインイン）の処理
    const handleLogin = async () => {
        setMessage("ログイン中...");
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) setMessage(`❌️ エラー：${error.message}`);
        else setMessage("✅️ ログイン大成功!（※後でTodo画面へワープさせます）")
    };

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col items-center justify-center p-8">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    🔑 ログイン画面
                </h1>

                <div className="text-gray-600 text-center mb-6">
                    <input
                        type="email"
                        placeholder="メールアドレス"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg focus: outlinej-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="パスワード（6文字以上）"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex=col gap-3 mb-6">
                    <button
                        onClick={handleLogin}
                        className="bg-blue-600 text-white font-bold p-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        ログイン
                    </button>
                    <button
                        onClick={handleSignUp}
                        className="bg-green-500 text-white font-bold p-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        新規登録（アカウント作成）
                    </button>
                </div>

                {message && (
                    <p className="text=center fontj-bold text-sm mb-4 text-re-500">
                        {message}
                    </p>
                )}

                <Link
                    href="/"
                    className="block text-center text-blue-500 hover:text-blue-700 font-bold transition-colors"
                >
                    ← Todo画面に戻る
                </Link>
            </div>
        </div>
    )
}