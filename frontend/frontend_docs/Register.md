# Register Component

The `Register` component handles user registration by capturing the user's email and password, sending them to the backend for registration, and handling the response.

## Overview

This component uses several libraries and custom components to provide a registration form. It utilizes `react-hook-form` for form management, `AxiosInstance` for making HTTP requests, and `react-router-dom` for navigation.

## Code Explanation

### State and Hooks

- `userForm` - Used to handle form submission and control input fields.
- `userNavigate` - Used to navigate programmatically after a successful registration.

## Methods

### submission

Axios Instance sends a POST request to the 'register/' endpoint with the form data.
navigate('/') navigates the user to the home page after successfully registering.

## Dependencies

    react
    react-hook-form
    @mui/material
    axios
    react-router-dom

Ensure they are installed:

```bash
npm install react react-hook-form @mui/material axios react-router-dom
```
