import { useState } from "react";
import { FilterType } from "./TodoApp";

type Props = {
    filter: string;
    setFilter: (filter: FilterType) => void;
};

export default function TodoFilter({ filter, setFilter}: Props) {
    return(
        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
            <button onClick={() => setFilter('all')} style={{ fontWeight: filter === 'all' ? 'bold' : 'normal'}}>すべて</button>
            <button onClick={() => setFilter('active')} style={{ fontWeight: filter === 'active' ? 'bold' : 'normal'}}>未完了</button>
            <button onClick={() => setFilter('completed')} style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal'}}>完了済み</button>
        </div>
    );
}