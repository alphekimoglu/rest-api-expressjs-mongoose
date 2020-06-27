#rest-api-expressjs-mongoose
A simple project structure for express js applications and single rest api endpoint example.

I preferred to use Mongoose js in this project instead of natieve mongoDb to make easier to deal with no sql db.
Also In my opinion be able to see data schemas in code (under Models) made my code more readable and easy to get in.

In this project I used express-generator to generate general structure of my express js project.
Unfortunately, Express-generator used ECMAScript 5 notation while generating project and 
I choose to continue with ECMAScript5 to protect the integrity of project

##Working local
Before you start to work with this project, you need to define your MongoDb URL as "MONGODB_URL" env variable.