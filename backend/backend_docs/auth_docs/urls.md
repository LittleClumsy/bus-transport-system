# urls docs

This is basically the 'table of content' for your web application. It tells Django how to handle different URLs that users might request.

## URL patterns
These URLs are used to match a requested URL to a corresponding view. When a pattern matches a request, Django calls the specified view, which handles the request and returns a response.

### Include Function

For larger projects, you can split URLs across multiple modules using the include() function. The helps in keeping the URL config clean and maintainable by including other URLconfs.

### Views
Each URL pattern is associated with a view, which is a python function or class that receives a web request and returns a web response. The URLs file maps URL patterns to these views.