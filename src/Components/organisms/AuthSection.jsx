import React from 'react';
import LoginForm from '../molecules/LoginForm';

/**
 * AuthSection component wraps the LoginForm in a styled card layout.
 */
function AuthSection() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200 ">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">Hotel Transylvania Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default AuthSection;

/*
| Code Part                          | What it does                                     |
| ---------------------------------- | ------------------------------------------------ |
| `min-h-screen`                     | Full page height                                 |
| `flex items-center justify-center` | Center the login box vertically and horizontally |
| `bg-gray-100`                      | Light gray background                            |
| `max-w-md`                         | Makes the login box a nice width                 |
| `p-8`                              | Padding inside the box                           |
| `shadow-md`                        | Adds shadow for card effect                      |
| `rounded-md`                       | Rounded corners                                  |
| `<LoginForm />`                    | Renders the login form inside the box            |

*/