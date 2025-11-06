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
                <button
                  onClick={() => onToggleSelesai(item.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    item.selesai
                      ? "bg-gray-400 hover:bg-gray-500 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {item.selesai ? "Tandai Belum Selesai" : "Tandai Selesai"}
                </button>
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
