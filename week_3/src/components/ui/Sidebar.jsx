import React from "react";

export const Sidebar = ({ children }) => (
  <aside className="w-64 h-full bg-blue-900 text-white shadow-lg flex flex-col">
    {children}
  </aside>
);
