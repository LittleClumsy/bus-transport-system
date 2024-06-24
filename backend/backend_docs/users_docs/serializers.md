# User Authentication Serializers

This documentation provides an overview of the serializers used for user authentication in a Django Rest Framework (DRF) application. The serializers handle user login and registration processes.
Serialization: Converting complex data types to a format that can easily be rendered into JSON or XML

## Files

- `serializers.py`: Contains the definitions for the `LoginSerializer` and `RegisterSerializer`.

## Serializers

### LoginSerializer

The `LoginSerializer` class handles the serialization and deserialization of user login data.

#### Fields

- `email` (EmailField): The email address of the user.
- `password` (CharField): The password of the user.

#### Methods

##### `to_representation`

```python
def to_representation(self, instance):
    ret = super().to_representation(instance)
    ret.pop('password', None)
    return ret