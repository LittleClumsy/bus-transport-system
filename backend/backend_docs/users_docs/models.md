# Custom User Model and Manager for Django

This documentation describes the custom user model and manager implementation for a Django project, using email as the primary identifier for user authentication.

## Overview

In this implementation, we define a custom user model and user manager to handle user creation and authentication using email instead of the default username.

## Files

- `models.py`: Contains the definitions for the custom user model and manager.

## Custom User Manager

### CustomUserManager Class

The `CustomUserManager` class is a custom manager for the user model. It inherits from `BaseUserManager` and provides methods to create regular users and superusers.

#### Methods

##### `create_user`

```python
def create_user(self, email, password=None, **extra_fields):
    if not email:
        raise ValueError('The Email field must be set')
    
    email = self.normalize_email(email)
    user = self.model(email=email, **extra_fields)
    user.set_password(password)
    user.save(using=self._db)
    return user
