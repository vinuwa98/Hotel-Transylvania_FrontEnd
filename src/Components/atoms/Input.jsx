//This line loads React, which is required to create React components.

import React from "react";

/**
 * Props:
 * - type: "text", "email", "password", etc.
 * - placeholder: placeholder text
 * - value: input value (controlled)
 * - onChange: function to update state
 * - name (optional): field name
 * - required (optional): boolean
 */
function Input(props) {
  const {
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    required = false,
    isDisabled = false,
  } = props;

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={isDisabled}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

export default Input;

/*
const Input = ({ type = "text", placeholder, value, onChange, name, required = false }) => {
    
📌 This is a React functional component called Input.

It takes some props (customizable inputs):

type ➜ input type (text, password, email, etc.) — default is "text"

placeholder ➜ hint text inside the input

value ➜ the value shown in the input

onChange ➜ what happens when you type

name ➜ field name (optional)

required ➜ is it required? (true/false, default = false)
 */

/*

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );

📌 This is the real HTML input field. It's controlled by the values passed from the parent.

type={type} ➜ sets type of input (text/email/password)

value={value} ➜ connects to your state (like useState)

onChange={onChange} ➜ runs when user types

className="..." ➜ adds Tailwind CSS for styling

 */

/*
| 🔧 Part       | 📝 What it does                  |
| ------------- | -------------------------------- |
| `type`        | Input type (text, email, etc.)   |
| `placeholder` | Grey text shown inside box       |
| `value`       | Current value of input           |
| `onChange`    | Updates the value on typing      |
| `name`        | (Optional) Name for input        |
| `required`    | (Optional) Makes input required  |
| `className`   | Tailwind CSS styles              |
| `export`      | Makes it reusable in other files |
This component is a simple, reusable input field styled with Tailwind CSS. You can use it in forms or anywhere you need user input. Just pass the props you need, and it will handle the rest.
*/
