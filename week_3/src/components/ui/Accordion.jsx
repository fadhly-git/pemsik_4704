import { useState } from "react";

const Accordion = ({ items, onToggleSelesai, onTanyaDosen }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          {/* Header Accordion */}
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition"
          >
            <div className="flex items-center space-x-3">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  item.selesai
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {item.selesai ? "✓" : index + 1}
              </span>
              <h3 className="text-left font-semibold text-gray-800">
                {item.judul}
              </h3>
            </div>
            <span
              className={`transform transition-transform ${
                activeIndex === index ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {/* Content Accordion */}
          {activeIndex === index && (
            <div className="p-4 bg-gray-50 border-t">
              <p className="text-gray-700 mb-4">{item.deskripsi}</p>
              <div className="flex space-x-2">
                {!item.selesai && (
                  <button
                    onClick={() => onToggleSelesai(item.id)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
                  >
                    Tandai Selesai
                  </button>
                )}
                {item.selesai && (
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium inline-flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Selesai</span>
                  </span>
                )}
                <button
                  onClick={() => onTanyaDosen(item)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                >
                  Tanya Dosen
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export { Accordion };
