https://user-images.githubusercontent.com/26636478/216863041-7986b404-4d87-4690-81da-f547645adf51.mp4

### Developed by Kevin Zheng, Mayur Ryali, and Jan-Paul Schwarz

## Inspiration
Verbal harassment towards female players is an issue that has plagued the gaming community since its conception, and report systems largely fail to keep the toxicity in check. According to the 2021 Computer and Video Game Industry report, 48% of gamers in the U.S. (40% globally) are female. Unfortunately, only 12% of them feel the freedom to give away their gender identity in-game and as a result, struggle to find like-minded friends in-game. Despite the increasing popularity of gaming, women are still underrepresented and face challenges such as online harassment and discrimination. We believe that games should be fun for everyone, and hope to accomplish this by creating a safe and inclusive community where female gamers can connect with and support each other.

## What we do
Angel Shot is a safe space for female gamers to share their fears and get support against discrimination and harassment. In addition to that, it serves as a connecting platform to find other female gamers. This happens through indirect communication that is only revealed to a verified community member.

In order to Sign up for this community, each member has to go through the verification process to ensure a safe space, especially for female gamers. Next, she has to choose her favourite game and her in-game name. This name will be stored in a database on our website. When she enters a new game, we will use the API of the game publisher (e.g. Riot Games) to match our database with all players in her game and show only gamers that are also registered on our website. With that, she will be able to know that there is another female player on her or the opposite team and is able to connect either before or after the game. Our platform allows female gamers to connect with each other without revealing their identity to other players and risking being on the receiving end of harassment.

## Why the name Angel Shot?
After the #MeToo movement, ordering an Angel Shot at a bar is a code that patrons can use to let the staff know that you are in an uncomfortable situation and need help. We are now translating this code into the online gaming community and creating a secure place that helps women connect to each other without exposing their identity to strangers.

## Why are 3 dudes building a platform for female gamers?
We were motivated to create Angel Shot as a result of witnessing women being subjected to sexual harassment and negative stereotypes. We all know female gamers who love to play video games but are very cautious about communicating with other players out of fear of being treated differently for their gender. We love games, and hope to create an an environment that gives everyone the opportunity to enjoy them regardless of differences such as gender. 

## How we built it
This authentication system requires a username and password to log into a web application. Credentials are verified against a database, and if successful, the user is redirected to the "/home" endpoint. An error message is displayed if the credentials do not match. The frontend and backend communicate over the internet or a local network using protocols like HTTP/HTTPS and exchange data in formats like JSON/XML. Frontend libraries/frameworks like Axios/jQuery/Fetch and backend frameworks like Flask/Django/Express handle the communication, managed by tools like GraphQL/RESTful API design. This communication is essential for data exchange in web applications.

## Challenges we ran into
Verification process  
Connecting SQL to a .js file
Transferring data between frontend and backend using GET and POST HTTP requests  
Working with the Riot Games API  

## Accomplishments that we're proud of
Very positive feedback from female players, especially regarding indirect communication
Seamless integration between frontend and backend
Contributing towards solving a problem we are all passionate about

## What's next for Angel Shot
Finding a compromise between privacy concerns and identy verification  
Implementing text communication, private channels, and other community features  
Adding support for more games
