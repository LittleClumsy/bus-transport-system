# Apps Docs

This is part of Django application configuration. django.apps.AppConfig is the base class provided for configuring an application.

```python
class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
```

Here UsersConfig will inherit from 'AppConfig' and be used to configure the 'users' application.
default_auto_field sets the default type for primary key fields in models within the 'users' application. BigAutoField is a 64-bit integer.
'name' just specifies that this configuration is for the 'users' application.
