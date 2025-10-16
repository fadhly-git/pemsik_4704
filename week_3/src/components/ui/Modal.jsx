import React from "react";

const Modal = ({ isOpen, children }) => {
  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } fixed inset-0 items-center justify-center bg-black/30 z-50`}
      style={isOpen ? { backgroundColor: "rgba(0,0,0,0.3)" } : undefined}
    >
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-8 relative">
        {children}
      </div>
    </div>
  );
};

export default Modal;
