import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);

/*
| Code                       | What it does                                                          |
| -------------------------- | --------------------------------------------------------------------- |
| `ReactDOM.createRoot(...)` | Tells React where to put your app (inside the HTML `<div id="root">`) |
| `<App />`                  | Loads your full app (which loads routing, pages, components)          |
| `import './index.css'`     | Loads global styles (includes Tailwind CSS setup)                     |
*/
