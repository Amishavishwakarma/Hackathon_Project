# userEvent_App_expressjs

Created an app. User can sing-up and login and able to create update and delete events.

In this project, I have made a backend of a app website using Express framework of NodeJS. I have also used JWT-authentication token to verify the if the user is valid or not.

# Task Details:

Create a nodejs application which contains 2 models -> 

1.User model with user details like name, email, phone number, role(should be either admin or user).

2. Event model with event name, description, start date , end date, city.

App summary - 

User should be able to sign up and login with email. Use JWT token for authentication. Post that user can create events. Api calls needed

1. Sign up api, Login api (Without auth token)

2. Create event, update event and delete event. (With auth token, only user who created the event can update or delete)

3. Search events based on name and city. It should have sort also. ex - sort_by=“name”, sort_type=“asc/desc” (Without auth token, user can view all events)

4. Fetch all users (only admin should be able to do this)(With auth token)

5. Fetch all users and corresponding events (only admin)(With auth token)

6. Fetch all events by the user (With auth token)

# Requirements

Installation process and Execution First, If you'are using Linux-based-OS, open your terminal and install the latest version of NodeJS and npm. You do also need to install mysql database onto your system. by writing the following commands.

## install knex
 ```npm i knex```
 
 ## install express
 ```npm i express```
 
 ## install mysql
 ```npm i mysql```
 
 ## install jwt
 ```npm i jsonwebtoken```
 
 Install postman, that helps you to develop APIs and getting responses from it, by writing the following commands on your terminal.
 
 ```sudo apt-get install snap $ snap install postman```
 
