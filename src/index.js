import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import CustomRoutes from "./Routes/customRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<CustomRoutes />);

reportWebVitals();
