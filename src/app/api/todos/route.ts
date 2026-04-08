import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Todo一覧を取得する
export async function GET() {
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: true});

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

// 新しいTodoを追加する
export async function POST(request: Request) {
    const body = await request.json();

    const { data, error } = await supabase
        .from('todos')
        .insert([
            { text: body.text, completed: body.completed }
        ])
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500});
    }

    return NextResponse.json(data[0]);
}

export async function DELETE(request: Request) {
    const body = await request.json();

    const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', body.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: '削除完了！' });
}

export async function PATCH(request: Request) {
    const body = await request.json();

    const { error } = await supabase
        .from('todos')
        .update({ completed: body.completed})
        .eq('id', body.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: '更新完了！' });
}