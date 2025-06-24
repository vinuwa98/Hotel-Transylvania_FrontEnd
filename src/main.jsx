import React, { StrictMode } from 'react'; 
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);


/*
| Code                       | What it does                                                          |
| -------------------------- | --------------------------------------------------------------------- |
| `ReactDOM.createRoot(...)` | Tells React where to put your app (inside the HTML `<div id="root">`) |
| `<App />`                  | Loads your full app (which loads routing, pages, components)          |
| `import './index.css'`     | Loads global styles (includes Tailwind CSS setup)                     |
*/