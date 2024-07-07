# Blog API - Private Frontend

## Overview
This is a fullstack MERN (MongoDB, Express, React, Node.js) blogging app split across 3 repositories: a backend, a public frontend for reading and commenting, and a private frontend for managing posts and moderating comments.  Links to the other repos are below. 

Public Frontend repo: https://github.com/JakeBrowning90/blog-public-frontend
Backend repo: https://github.com/JakeBrowning90/blog-api

Live site: https://blog-public-frontend.fly.dev/

I built this project as part of The Odin Project curriculum: https://www.theodinproject.com/lessons/nodejs-blog-api

## Technologies
In addition to the MERN stack, this project uses Passport.js and jsonwebtoken for authentication. Styling is vanilla CSS. The backend uses EJS as the templating language

## Challenges/To-dos
I originally worked on this project from March to April of 2024, but misunderstood that the TOP curriculum intended for learners use a frontend framework or plain HTML/CSS/JS. I had instead made my frontend as an Express-app, based on the precedent of several earlier projects in the curriculum. This had the unfortunate side effect of preventing authentication from working as intended: localStorage does not exist in Node, so my app was not RESTful: one user’s session was visible to any other user accessing the site at that time.

I picked this project up again to rebuild the frontend sites using React and correctly implement JWT authentication after practicing with some other projects. This time, I used React and conditional rendering to simulate page navigation, although I know I could use React Router as an alternative. I also gave serious thought to using Tailwind CSS for styling, but ultimately decided to save that for a simpler project on which to practice. 

At the moment, I’ve written but otherwise left out a few operations for the sake of simplicity: the ability to grant a user “isAuthor” status, editing comments, and deleting users. I might implement them if it would be a better demonstration of my knowledge, though for a brief showcase it might be better to leave those operations for the backend.

## How to use
From the Home screen, you will see a list of published blog posts. Older posts are at the bottom and can be reached by scrolling. Click any item on the list to see that post in its entirety, along with any comments added by users. Click “Home” at the upper left of the screen to return to the list of blog posts.

Only signed-in users can add comments. To create an account, click “Sign up” in the upper-right corner of the screen, and fill out the form which appears. Your username will appear at the head of any comments you post. Your email will be what you use to sign in, and must be unique. 

Once you have successfully created a user, click “Log in” at the upper right to view the login screen. Once you have correctly entered your email and password, you will be taken to the homescreen and allowed to post comments on any post. You are also able to delete your own comments using the button below each one. 

Note that you are logged in for a 30-minute session, and will be prompted to log in again if you attempt to add or delete a comment after that time. You can end your session  early by clicking “Log out” at the upper right of the screen.

## Credits
The Odin Project is an open-source web development curriculum: https://www.theodinproject.com/
