type Props = {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
};

export const Pagination = ({ page, totalPages, setPage }: Props) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex gap-2 justify-center mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`px-3 py-1 rounded border ${
                        num === page ? 'bg-black text-white' : 'bg-white'
                    }`}
                >
                    {num}
                </button>
            ))}
        </div>
    );
};
