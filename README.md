Auth Endpoints

POST    /api/auth/register  Expects username and password, returns username on success.



POST    /api/auth/login     Expects username and password, returns token and welcome message on success.

Notes: Register will return "missing user data" if req.body is empty..