## General Assembly Project 3 - GCW Fire Esports

**Project Overview**

For the third Project on our Software Engineering Immersive Course at General Assembly, we were tasked with building a Full Stack Application using the MERN stack, within 10 days in a group of pre-assigned members.

As we were completing the course remotely it was a fantastic opportunity to utilise tools such as Slack, Zoom, Trello and GitHub. We had a morning Stand-Up where we were able to check progress and assist each other where necessary.

For the project we wanted to build an Esports generator specifically for League Of Legends that would allow a user to quickly find the best match for them saving them time in their busy schedule. The user would be able to search by rating, date added, title or use a search function. The user can register and then be able to vote and leave messages to help others see the best match possible. We also implemented Admin user functionality that allows the Admin to delete other user comments and add videos directly from the site rather than the back-end database.


**Time Frame**

10 Days

**Team Members**

 - Gary Smith 
 - Cosmas Cieplak-Mayr von Baldegg 
 - William Alvarez

#### Project Brief

-   **Build a full-stack application**  by making your own backend and your own front-end.
-   **Use an Express API**  to serve your data from a Mongo database.
-   **Consume your API with a separate front-end**  built with React.
-   **Be a complete product**  build multiple relationships.


## Technologies Used

-   HTML5
-   CSS3/ SASS
-   Bootstrap
-   JavaScript (ES6)
-   React
-   MongoDB
-   Express
-   Bcrypt
-   Insomnia
-   Axios
-   Heroku/Netlify for deployment
-   Trello
-   Git
-   GitHub
-   Google Chrome dev tools
-   Google Sheets
-   VS Code
-   Eslint
-   Gimp - image editing
-   Excalidraw - wireframing

![<insert website screenshot here>](https://github.com/CosmasC128/Project-3/blob/development/ReadMe%20sources/Homepage.png?raw=true)

## Approach

We began planning by setting up our Trello board and looked at our MVC

![<insert trello screenshot here>](https://github.com/CosmasC128/Project-3/blob/development/ReadMe%20sources/Trello.png?raw=true)

We used Excalidraw to wireframe out the project and how we would look at relationships in the back-end.

![<insert wireframe screenshot here>](https://github.com/CosmasC128/Project-3/blob/development/ReadMe%20sources/wireframe.png?raw=true)

**Backend Set Up**

Across the project, we worked either on our own or in pairs depending on what was being done and merged the code together using branches on Git. 
We set up the backend together on MongoDB and Express for the initial level views, controllers and models.
We created models for the User, to enable registration and login, and eventually store other information such as, whether they were an Admin or not. If they were registered they were able to leave comments and vote on videos all using relationships and Schemas.



##### Seeding the Data

Once the models were in place Cosmas spent time seeding the database carefully considering JSON object notation and how this would be stored on our MongoDB database for referencing during our front end development. 

![<insert schema screenshot code>](https://github.com/CosmasC128/Project-3/blob/development/ReadMe%20sources/schema.png?raw=true)

##### Authorisation

We set up authorisation for users using getTokenFromLocalStorage and Bcrypt to salt our hashed passwords.

![enter image description here](https://github.com/CosmasC128/Project-3/blob/development/ReadMe%20sources/security.png?raw=true)
 ![BCrypt Code](https://github.com/CosmasC128/Project-3/blob/development/ReadMe%20sources/Bcrypt.png?raw=true)

##### Virtual Fields

We used virtual fields for information we did not want to be saved on MongoDB and used JavaScript slice and toFixed methods to take thumbnails automatically from videos uploaded on our database and rating percentages. 

![<insert virtual field screenshot here>](https://github.com/CosmasC128/Project-3/blob/development/ReadMe%20sources/virtualfields.png?raw=true)

Routers and controllers were used throughout to keep an easy to navigate modular back and frontend!

<insert controllers>
<insert routers>

**Front End**

We used React, CSS and Bootstrap to design our site and utilised components. We imported Axios and used React-Router-Dom. 

Below is a screenshot of our matches page with thumbnails of the YouTube videos mapped in to create a grid. Above the grid is a search bar which we designed using REGEX and a drop down menu of search items that will select based on date added, rating and view amount.

![enter image description here](https://github.com/CosmasC128/Project-3/blob/development/ReadMe%20sources/MatchSearch.png?raw=true)

When you have selected a video you are taken to this page which will display the video for you. You are able to rate it using our fire/ice function and you can also leave comments. The eye will display the total views of the video which could suggest how popular the video is along with whether it was rated up or down.

![enter image description here](https://github.com/CosmasC128/Project-3/blob/development/ReadMe%20sources/Match.png?raw=true)

Below is an example of our login page and we have a similar one to allow you to register in the first place. Admin have their own login and information page.

![enter image description here](https://github.com/CosmasC128/Project-3/blob/development/ReadMe%20sources/Login.png?raw=true)

Should a user attempt to access Admin functionality via the url they will run into this page!

![enter image description here](https://github.com/CosmasC128/Project-3/blob/development/ReadMe%20sources/NotAuthorised.png?raw=true)

## Challenges

 - We wanted thumbnails of the videos to be displayed on the search page but we had to implement functionality to take this directly from the YouTube video we were referencing. This saves hours of time in the future manually entering these URLs. We noticed that the URL of the image was always in the same index places so used a slice method here which worked great.
 - We used JavaScript Map and Filter methods regularly to display the videos on the homepage and the match page.
 - We wanted Admin users to be able to have full functionality and then the ability to delete standard registered users comments. We achieved this. 
 - Using useEffect and useState to render pages when we expected them to be rendered was a good learning experience as rendering was not always as we expected.

## Wins

-   Overall we were all impressed with the site and how it turned out! We found some great resources and had a reasonable overall style for League of Legends and esports in particular.
-   Working together was fantastic for debugging! After googling and scratching our heads, usually a short screen-share over Zoom would highlight the problem to a team member with a fresh set of eyes within seconds! 
- Although this team was probably more comfortable around functionality we did have a lot of fun using Bootstrap and CSS to display the pages as we wanted them and use the skills we already have on a larger project. 

## Future Improvements

-   Pagination on videos on the matches page.
-   Add responsive design.

## Key Learnings

- Nested components on the front end. Completing our own project enforced learning we had already gone through.
-   Console logs to ensure we were getting the information we expected whether on the frontend or the backend!
- Ask the team for their thoughts often! Help from the team is invaluable. CSS and Bootstrap was often something we came together to work through.
