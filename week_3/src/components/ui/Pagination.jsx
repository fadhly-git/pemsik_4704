import { Button } from "./Button";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  perPage,
  onPerPageChange,
  totalCount,
  isLoading,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t">
      {/* Info */}
      <div className="text-sm text-gray-600">
        Menampilkan{" "}
        <span className="font-semibold">
          {totalCount === 0 ? 0 : (currentPage - 1) * perPage + 1}
        </span>{" "}
        -{" "}
        <span className="font-semibold">
          {Math.min(currentPage * perPage, totalCount)}
        </span>{" "}
        dari <span className="font-semibold">{totalCount}</span> data
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Per Page Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="perPage" className="text-sm text-gray-600">
            Per halaman:
          </label>
          <select
            id="perPage"
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center gap-2">
          <Button
            onClick={handlePrev}
            disabled={currentPage === 1 || isLoading}
            size="sm"
            variant="outline"
          >
            ← Prev
          </Button>

          {/* Page Numbers */}
          <div className="hidden md:flex items-center gap-1">
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={`dots-${index}`} className="px-2 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  disabled={isLoading}
                  className={`min-w-[32px] px-2 py-1 text-sm rounded transition-colors ${
                    currentPage === page
                      ? "bg-blue-600 text-white font-semibold"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  } disabled:opacity-50`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          {/* Mobile: Simple page indicator */}
          <div className="md:hidden text-sm text-gray-600">
            <span className="font-semibold">{currentPage}</span> / {totalPages}
          </div>

          <Button
            onClick={handleNext}
            disabled={currentPage === totalPages || isLoading || totalPages === 0}
            size="sm"
            variant="outline"
          >
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
