# Auth backend Docs

This defines a custom authentication backend for this project.

We assign 'get_user_model()' to a variable User. This will allow us to return the user model that is currently active.

We then get the users email and password. It checks if the email exists and if the password exists. If both pass, it will return the user. If the email does not exist, it wil throw an error.
