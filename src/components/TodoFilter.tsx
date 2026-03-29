import { FilterType } from "./useTodos";

type Props = {
    filter: string;
    setFilter: (filter: FilterType) => void;
};

export default function TodoFilter({ filter, setFilter}: Props) {
    const baseStyle = "px-6 py-2 rounded-full font-bold text-sm transition-all duration-200 shadow-sm";
    const activeStyle = "bg-blue-600 text-white scale-105";
    const inactiveStyle = "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200";

    return(
        <div className="flex justify-center gap-4 mb-8">
            <button 
                onClick={() => setFilter('all')} 
                className={`${baseStyle} ${filter === 'all' ? activeStyle : inactiveStyle}`}
            >
                すべて
            </button>
            <button 
                onClick={() => setFilter('active')} 
                className={`${baseStyle} ${filter === 'active' ? activeStyle : inactiveStyle}`}
            >
                未完了
            </button>
            <button 
                onClick={() => setFilter('completed')} 
                className={`${baseStyle} ${filter === 'completed' ? activeStyle : inactiveStyle}`}
            >
                完了済み
            </button>
        </div>
    );
}