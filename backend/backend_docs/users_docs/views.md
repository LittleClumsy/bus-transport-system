# User Authentication and Management Viewsets

This documentation provides an overview of the viewsets used for user authentication and management in a Django Rest Framework (DRF) application. The viewsets handle user login, registration, and listing user information.

## Files

- `views.py`: Contains the definitions for `LoginViewset`, `RegisterViewset`, and `UserViewset`.

## Viewsets

### LoginViewset

The `LoginViewset` handles user login.

#### Attributes

- `permission_classes`: Specifies that any user (authenticated or not) can access this viewset.
- `serializer_class`: Specifies the serializer to use (`LoginSerializer`).

#### Methods

##### `create`

```python
def create(self, request):
    serializer = self.serializer_class(data=request.data)
    
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        
        user = authenticate(request, email=email, password=password)
        
        if user:
            _, token = AuthToken.objects.create(user)
            return Response(
                {
                    "user": self.serializer_class(user).data,
                    "token": token
                }
            )
        else: 
            return Response({"error": "Invalid credentials"}, status=401)
    else:
        return Response(serializer.errors, status=400)

