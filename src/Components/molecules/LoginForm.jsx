import React, { useState } from 'react';
/*
🔹 import React, { useState } from 'react';
React: Used to create the component.
useState: A special React function (called a hook) used to create and manage state (memory) inside the component.
*/
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import authService from '../../services/authService'; // API call file
/*
🔹 import authService from '../../services/authService';
This will handle the API call to the backend to do the actual login.
*/

/*
🔹 function LoginForm() {
This is the start of the LoginForm component. Everything inside this function makes the login form work.
*/
function LoginForm() {
  // State for input fields
  const [email, setEmail] = useState('');
  /*
  🔹 State: const [email, setEmail] = useState('');
    email stores the current email value typed by the user.
    setEmail() is the function to update it.
    useState('') means the initial value is empty.
    The same happens for below password part
  */
  const [password, setPassword] = useState('');

  /*
  🔹 handleLogin Function
    This function runs when the user clicks the Login button.
    e.preventDefault() stops the form from reloading the page.
    authService.login(...) will call the backend with the email and password.
  */
  const handleLogin = async (e) => {
    e.preventDefault(); // stops page from refreshing


    await authService.login({ email, password });
  }; // call the API with user input

  return (
    /*
    🔹 JSX: What the Form Renders
    <form> tag starts the login form.
    onSubmit={handleLogin}: when user presses "Login", run the handleLogin() function.
    className="space-y-4": Tailwind class — adds vertical space between form elements.
    */
    <form onSubmit={handleLogin} className="space-y-4">
      <Input
        /*
        🔹 Input Component
        type="email": Makes the input expect an email address.
        placeholder="Email": Shows “Email” inside the box before typing.
        value={email}: This links the box to the state (controlled component).
        onChange={(e) => setEmail(e.target.value)}: When the user types, update the email state.
        required: Makes this field required before submitting the form.
        */
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password" //type="password" hides the characters.
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      /*
      Renders your custom button.
        label="Login" ➜ text shown on the button
        type="submit" ➜ triggers the form’s onSubmit function
        */
      <Button label="Login" type="submit" />
    </form>
  );
}

export default LoginForm;
