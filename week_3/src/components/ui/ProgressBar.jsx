const ProgressBar = ({ progress, className = "" }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Progress Belajar</span>
        <span className="text-sm font-semibold text-blue-600">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`bg-blue-600 h-full rounded-full transition-all duration-300 ${className}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export { ProgressBar };
