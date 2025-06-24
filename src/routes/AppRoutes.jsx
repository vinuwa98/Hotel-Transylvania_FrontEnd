import React from 'react';

/*
    we're importing 3 things from the react-router-dom library
    | Part            | Meaning                                                                      |
| --------------- | ---------------------------------------------------------------------------- |
| `BrowserRouter` | Main routing system — it watches the browser URL and shows the correct page. |
| `as Router`     | Renames `BrowserRouter` as `Router` (to type less)                           |
| `Routes`        | Wraps multiple route definitions                                             |
| `Route`         | One specific route (like `/login`, `/dashboard`, `/`)                        |

    ⚠️ You must install this library first using
    npm install react-router-dom
*/
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage'; //This imports your LoginPage component — which shows the login form when user visits /.

/**
 * AppRoutes handles routing for the app.
 */
function AppRoutes() { //You’re creating a new component called AppRoutes that will handle all routes.
  return (

    /*
    🔸 <Router> ... </Router>
    Wraps your entire app’s routing logic.
    Keeps track of the browser's address bar (like localhost:5173/).

    🔸 <Routes> ... </Routes>
    Holds all the <Route> tags.
    New way (React Router v6+) — replaces old <Switch>.

        | Attribute                 | Meaning                                              |
    | ------------------------- | ---------------------------------------------------- |
    | `path="/"`                | If the URL is `/` (homepage), run this route         |
    | `element={<LoginPage />}` | Show the `<LoginPage />` component inside the screen |
    */
    <Router>
      <Routes>
        {/* Default route: Login Page */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

/*
| 🔧 Thing    | 📝 What it does                                      |
| ----------- | ---------------------------------------------------- |
| `Router`    | Watches the browser URL                              |
| `Routes`    | Holds your different screens                         |
| `Route`     | One route ("/" = homepage)                           |
| `LoginPage` | Page shown when visiting `/`                         |
| `AppRoutes` | A central component to manage all routes in your app |
*/