## Running Guide

- Create an .env file in the server folder containing the following things:

`MONGODB_URI=<YOUR MONGODB URI>`

`JWTSECRET=<YOUR JWT SECRET>`

- npm install both in the client and the server folder

- npm start both on the client and server folder

- Sign up on the client app and you'll be redirected to the dashboard where there is a ag-grid table containing all the users. The route is JWT protected which is stored on the localStorage.

- The logout button clears the jwt token and redirectes you to the login page.

- The server signs the JWT with the JWTSECRET from the server which is a base64 hexadecimal string on login route and sends it as a response.
