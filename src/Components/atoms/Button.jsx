import React from 'react';
import { themeColors } from '../../Theme/colors';

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
      style={{ backgroundColor: themeColors.accent }}
      className="w-full px-4 py-2 rounded-md hover:opacity-90 transition"
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