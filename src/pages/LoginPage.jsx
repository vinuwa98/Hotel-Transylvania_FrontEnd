import React from 'react';
import AuthSection from '../Components/organisms/AuthSection';
import loginImage from '../assets/login.png'; // 🔸 import your image

/**
 * LoginPage is the full screen page that shows the AuthSection (Login UI).
 */
function LoginPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 🔸 Left side image */}
      

      {/* 🔸 Right side login form */}
      <div className="w-full md:w-1/1 flex items-center justify-center md:flex">
        <img src={loginImage} alt="Login Visual" className="size-70" />
      
        <AuthSection />
      </div>
    </div>
  );
}

export default LoginPage;

/*
| Code Part            | What it does                                                        |
| -------------------- | ------------------------------------------------------------------- |
| `import AuthSection` | Loads the login box you created                                     |
| `<AuthSection />`    | Displays the login form inside the page                             |
| `export default`     | Makes this page available for routing (like showing it at `/login`) |
*/