import React from 'react';
import AuthSection from '../Components/organisms/AuthSection';
import loginImage from '../assets/login.png';
import { themeColors } from '../Theme/colors';

/**
 * LoginPage is the full screen page that shows the AuthSection (Login UI).
 */
function LoginPage() {
  return (
    <div
      className="flex justify-center items-center min-h-screen px-4"
      style={{ backgroundColor: themeColors.White }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center bg-blue-200 shadow-lg rounded-lg overflow-hidden max-w-5xl w-full h-[80vh]">
        {/* 🔸 Left side image */}
        <div className="hidden md:flex w-1/2 h-full">
          <img
            src={loginImage}
            alt="Login Visual"
            className="object-cover w-full h-full"
          />
        </div>

        {/* 🔸 Right side login form */}
        <div className="w-full md:w-1/2 px-6 py-8">
          <AuthSection />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

/*
| Code Part             | What it does                                                                 |
| ---------------------|------------------------------------------------------------------------------ |
| `min-h-screen`        | Ensures the page fills the full height of the screen                         |
| `themeColors.secondary` | Applies your custom background color                                       |
| `h-[80vh]`            | Restricts inner login card height to 80% of screen                           |
| `shadow-lg`           | Adds card-style shadow to the login box                                      |
| `object-cover`        | Makes the login image neatly fill the left side                              |
| `max-w-5xl`           | Keeps the form from stretching too much on wide screens                      |
*/

