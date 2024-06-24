# Login Component

The `Login` component handles user login by capturing the user's email and password, sending them to the backend for authentication, and handling the response.

## Overview

This component uses several libraries and custom components to provide a login form. It utilizes `react-hook-form` for form management, `AxiosInstance` for making HTTP requests, and `react-router-dom` for navigation.

## Code Explanation

    useForm: Used to handle form submission and control input fields.
    useNavigate: Used to navigate programmatically after a successful login.

## Methods
`submission` - Handles the submission and sends a POST request to the backend to log in the user.

```javascript
const submission = (data) => {
    AxiosInstance.post(`login/`, {
        email: data.email,
        password: data.password,
    })
    .then((response) => {
        console.log(response);
        localStorage.setItem('Token', response.data.token);
        navigate(`/home`);
    })
    .catch((error) => {
        console.error('Error during login', error);
    });
};

```
- Parameters: data (object) - Contains the form data (email and password).
- AxiosInstance.post: Sends a POST request to the login/ endpoint with the form data.
- localStorage.setItem('Token', response.data.token): Stores the authentication token in local storage.
- navigate(/home): Redirects the user to the home page after successful login.
- console.error('Error during login', error): Logs any errors that occur during the login process.
