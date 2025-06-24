import React from 'react';
import AppRoutes from './routes/AppRoutes';
import './index.css'; // This imports your global styles, including Tailwind CSS setup.

/**
 * App component — this is the root of your frontend.
 * It loads all app routes from AppRoutes.
 */
function App() {
  return (
    <div className="App">
      <AppRoutes />
        
    </div>
  );
}

export default App;

/*

| Code                 | What it does                                         |
| -------------------- | ---------------------------------------------------- |
| `import AppRoutes`   | Brings in your routing logic from `AppRoutes.jsx`    |
| `<AppRoutes />`      | Loads the correct page (like LoginPage) based on URL |
| `export default App` | Makes the app usable in `main.jsx`                   |

when the app loads, it will go through
*/