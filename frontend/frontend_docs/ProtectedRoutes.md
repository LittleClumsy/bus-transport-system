# ProtectedRoute Component

The `ProtectedRoute` component is a higher-order component that protects routes from being accessed by unauthorized users. It checks for the presence of an authentication token in local storage and either allows access to the route or redirects to the home page.

## Overview

This component uses `react-router-dom` to manage routing. It ensures that only authenticated users can access certain routes by checking for a token in local storage.

## Code Explanation

ProtectedRoute - A functional component that checks if a token exists in local storage.
It then retrieves the token from local storage if it exists and renders the child route using 'Outlet'. If Token doesn't exist, it will redirect to the home page using 'Navigate'.

## Dependencies

```bash
npm install react-router-dom
```

### Imports

```javascript
import { Outlet, Navigate } from "react-router-dom";
```
