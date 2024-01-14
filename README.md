# NBA-app

This is **Next.js** web application that displays NBA team and player statistics from 2012-2013 to 2021-22 for regular season games and playoff games. 

The main page displays NBA news fetched from a public API

There is a team page where you can click on different NBA teams which to a page showing the roster for the selected team

Clicking on each player displays the player's face and his statistics from the various season, with an interactive graph that displays his statistics.

Data is web scraped from **stats.nba.com** and stored in **MongoDB** database and **Next.js API routes** handles interactions with MongoDB and the public API, while static site regeneration is used for fast loading.

User authentication is done with **NextAuth, sessions, and MongoDB**

**getServerSideProps** is used to check for the user session.
If the user is not authenticated (session is not present), it redirects the user to the login page.
If the user's session is present, the user is authenticated and the page will be updated for every request made, allowing the page to display the latest NBA news
