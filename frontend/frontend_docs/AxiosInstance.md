# AxiosInstance Docs
This configures an Axios Instance for making HTTP requests. 

BaseUrl points towards the Django server.

## Request Interceptor
This request interceptor retrieves the token from local storage. 
It then sets the 'Authorization' header with the token if it exisstss, otherwise it sets it to an empty string.

## Response Interceptor
This response will give the response object from the server.
If there is an error and it responds with 401, it will remove the Token from the local storage and redirect the user to the home page. 






