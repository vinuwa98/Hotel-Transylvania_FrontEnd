import React from "react";
import { themeColors } from "../../Theme/colors";

/**
 * Reusable Button component using regular function.
 * Props:
 * - label: text shown on button
 * - onClick: function to run on click
 * - type: "button", "submit", etc. (default = "button")
 */

/*
function Button(props) {
  const {
    label,
    onClick,
    type = "button",
    style,
    className,
    disabled = false,
  } = props;

  console.log("Button rendered with type:", type);

  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      disabled={disabled}
      className={`w-28 px-4 py-2 rounded-md hover:opacity-90 transition ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
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

/**
 * Reusable Button component.
 * Props:
 * - label: text shown on button
 * - onClick: function to run on click
 * - type: "button", "submit", etc. (default = "button")
 * - className: Tailwind CSS classes
 * - disabled: disable the button
 * - ...rest: other native button props (e.g., form, id, etc.)
 */
function Button({
  label,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  ...rest
}) {
  const baseStyles = "w-28 px-4 py-2 rounded-md hover:opacity-90 transition";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${className} ${disabledStyles}`}
      {...rest} // Make sure to forward remaining props
    >
      {label}
    </button>
  );
}

export default Button;
