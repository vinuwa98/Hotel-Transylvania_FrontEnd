import React from 'react';

/**
 * Reusable Button component using regular function.
 * Props:
 * - label: text shown on button
 * - onClick: function to run on click
 * - type: "button", "submit", etc. (default = "button")
 */
function Button(props) {
  const { label, onClick, type = "button" } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
    >
      {label}
    </button>
  );
}

export default Button;

/*

| Part        | Meaning                                                  |
| ----------- | -------------------------------------------------------- |
| `label`     | What text shows on the button (e.g., “Login”)            |
| `onClick`   | What happens when button is clicked                      |
| `type`      | HTML button type: `"button"` or `"submit"`               |
| `className` | Tailwind CSS styling: blue button, rounded, hover effect |

*/