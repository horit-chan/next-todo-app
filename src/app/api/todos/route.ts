import { NextResponse } from "next/server";

let serverTodos = [
    { id: 1, text: "API通信をマスターする🔥", completed: false, deadline: "2026-12-31"},
    { id: 2, text: "Next.jsの神になる", completed: false}
];

export async function GET() {
    console.log("サーバー：GETリクエストを受け取りました！");
    return NextResponse.json(serverTodos);
}

export async function POST(request: Request) {
    console.log("サーバー：POSTリクエストを受け取りました！");

    const newTodo = await request.json();

    serverTodos.push(newTodo);

    return NextResponse.json({ message: "保存大成功！", adedTodo: newTodo });
}