**Team 8: Web-Anwendung zur Ressourcenverwaltung von Baufirmens**

To setup the project, [NodeJS](https://nodejs.org/en/) should be installed in your computer.
And for the database you can install either [MySQL](https://www.mysql.com/) or [XAMPP](https://www.apachefriends.org/index.html).

You can visit the production version of this project in https://bau.developmore.net
(Attention: the production version may not be the latest version of this project)

To open or edit this project, you may want to follow these instructions:
1. Clone this repository.
2. Import bau.sql in your SQL-database.
3. Open the terminal and cd to the cloned repository.
4. Cd to client/ and type npm install and enter.
5. Cd to server/ and type npm install and enter.
6. In the server/ repository, make a .env file.
7. Add variables SESSION_SECRET, TOKEN_SECRET, COOKIE, DB_HOST, DB_USER, DB_DATABASE and eventually DB_PASSWORD.

![Inkedsql-connection_LI](/uploads/816a5e0e5f2d5806e9378199dec8dda4/Inkedsql-connection_LI.jpg)

8. In above case, the database doesn't have a password. So it only contains an empty string. If your database has a password you can replace the empty string with process.env.DB_PASSWORD. And set the variable DB_PASSWORD in the .env file.
9. Still in the server/, type node server.js to start the backend server. Or you can install [nodemon](https://nodemon.io/) and use it.
10. Cd to client/ and type npm start to start the frontend server.