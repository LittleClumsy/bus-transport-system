# Admin Docs
This is where you register your models to make them accessible via the Django admin interface. This interface is used to manage the content of your database.

```python
from django.contrib import admin
from .models import *

admin.site.register(CustomUser)
```

First you need to import the models that you want to manage through the admin interface.
Then you register your models with the admin.site.register() function.







