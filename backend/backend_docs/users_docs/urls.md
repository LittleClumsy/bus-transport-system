# Users urls docs

This is basically the 'table of content' for your web application. It tells Django how to handle different URLs that users might request.

## Router
Here we use Django's rest framework to create a DeafultRouter which will handle all the URL routing for the viewsets registered with it. 
When a viewset is regestered with the router, it automatically generates a URL pattern for the standard set of actions('list','create','retrieve','update','partial_update','destroy')