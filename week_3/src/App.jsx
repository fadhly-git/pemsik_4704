import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "@/Pages/Home";
import { Login } from "./Pages/Login";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Home />
    <Login />
  </StrictMode>
);
