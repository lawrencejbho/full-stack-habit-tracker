# HaTr

## Background

Habit trackers are valuable tools to increase productivity for any individual and can also be useful for teams.  Currently, most habit trackers require users to follow a specific process that is too cumbersome causing users to feel fatigue when using the tool.  HaTr is full servicing allowing users to have more control of their own habit tracking process while still providing deep insights into their habits.  

## Project Design
HaTr was created from scratch over a 6 month period starting in April 2022 to help me learn full stack development.  Planning and development has changed many times as I've gone through obstacles at each phase of the project.  New features are continuously being added to the project as I use this to help track my own learning.  

![](https://media.giphy.com/media/yk31mqq0v96av19hLD/giphy.gif)
## Technologies
HaTr was built using a MongoDB database with Express.js framework for the backend.  API requests were used to communicate with the backend and all responses render JSON back to the frontend which uses React.  React sets up the frontend state such that components are updated in a simple and controlled manner leading to a better UX design.  

Additional Sources:
* [MERN Stack](http://mern.io/)

## Key Features
* Habits 
* Habit Tracking can be done using a counter, entered in manually, using pomodoro timers, or clicking on a specific date for the habit's contribution graph
* Github style Contribution Graphs per habit 
* O-Auth, which allows sign in via Google, Facebook, or LinkedIn

### OAuth
User Authorization utilizes Google passport to incorporate different methods of logging in. User login is required to use the app and view your own habits.  The user will be redirected to the login page if trying to use the app and they are not currently signed in.


## Future Plans
* Users can fully customized any habit's contribution graph - colors, scale, timeframe 
* Frontend redesign to make the website look more modern.  Will most likely use prebuilt React components.  