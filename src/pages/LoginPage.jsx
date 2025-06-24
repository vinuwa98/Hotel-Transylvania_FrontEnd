import React from 'react';
import AuthSection from '../Components/organisms/AuthSection';

/**
 * LoginPage is the full screen page that shows the AuthSection (Login UI).
 */
function LoginPage() {
  return (
    <div>
      <AuthSection />
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