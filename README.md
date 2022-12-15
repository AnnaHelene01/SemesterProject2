# SemesterProject2

Semester Project secong year of Noroff
=======
## Link to the task:
[semester.project.2.pdf](https://github.com/AnnaHelene01/SemesterProject2/files/10057160/semester.project.2.pdf)

&nbsp;

## Table of Contents
- [Project planning](https://github.com/AnnaHelene01/SemesterProject2/edit/main/README.md#table-of-contents)
  - [Style Guide](https://github.com/AnnaHelene01/SemesterProject2/edit/main/README.md#style-guide)
  - [Gant Chart](https://github.com/AnnaHelene01/SemesterProject2/edit/main/README.md#gant-chart)
  - [Wireframe/Design/Protoype](https://github.com/AnnaHelene01/SemesterProject2/edit/main/README.md#links-to-design--wireframes)
  - [Delivery](https://github.com/AnnaHelene01/SemesterProject2/edit/main/README.md#delivery)

### Style guide:
<img width="842" alt="Skjermbilde 2022-11-21 kl  14 26 03" src="https://user-images.githubusercontent.com/91527942/203068012-3a22f43d-6f5d-4fa6-ac33-e91529a2262b.png">

&nbsp;

### Gant Chart
<img width="1428" alt="Skjermbilde 2022-11-21 kl  15 54 15" src="https://user-images.githubusercontent.com/91527942/203085886-a45ba01d-cf65-4f12-b297-64349f18b52d.png">

&nbsp;

### Trello (Planning Application)
-[Trello](https://trello.com/b/vR7ykera/semester-project-2)

### Links to design / wireframes:
- [Wireframe desktop/mobile](https://www.figma.com/file/Nkwl7HFvN0NGFYaifFg7KH/Semester-Project-2---Style-Guide?node-id=2%3A55&t=gTnywTVPSHomsbPf-1)
- [Prototype Desktop](https://www.figma.com/file/Nkwl7HFvN0NGFYaifFg7KH/Semester-Project-2---Style-Guide?node-id=78%3A2554&t=gTnywTVPSHomsbPf-1)
- [Prototype Mobile](https://www.figma.com/file/Nkwl7HFvN0NGFYaifFg7KH/Semester-Project-2---Style-Guide?node-id=113%3A3909&t=gTnywTVPSHomsbPf-1)
  Had to make some changes during coding in order to follow the KISS principle. 
- After coding the profile page i realised i wasnt happy with it, so i changed the design to a more semantic and neat looking design!

&nbsp;

### Delivery
- [Github Repo](https://github.com/AnnaHelene01/SemesterProject2)
- [Netlify host](https://world-wide-shop.netlify.app/)


&nbsp;

### How i set up my project
Initialized npm with
```
npm init -y
```
Added node with:
```
npm i
````
Added bootstrap with: 
```
npm i bootstrap
```
Installed sass
```
npm install -g sass
```
Compile my custom.scss file (when changes in custom.scss file run:)
```
sass --watch scss/custom.scss:css/style.css
```
run 
```
npm install bootstrap@latest 
```
I also ended up adding some CDN links to my project so that another user that downloads my project and wants to run it shouldnt have to to more than just clone down the project!

&nbsp;


### Report:

I will be using bootstrap as CSS-framework for this project. I added bootstrap CDN links so it should work without running anything in the terminal. In order to clone this code and make it work without my CDN links you have to run npm install bootstrap@latest vscode terminal.

 - User can scroll / watch products without being logged in.
 - User can search for products and sort by latest first or ending soon.
 - User can register a new user, with given 1000 credits.
 - User can log in to site, which gives the user more accessibility on the site.
 - User gets feedback if something isnt working as it should, like errorMessages.
 - Logged in user can see its profile, listings and listings they have bid on.
 - Logged in user can change its avatar image.
 - Logged in user can see its total credit amount.
 - Logged in user can create a new listing with title, description, one or more images and a deadline.
 - Logged in user can prewatch the listing in a preview container before actually posting it.
 - Logged in user can delete its own listing.
 -Logged in user can update its own listing, including each media if user added more than 1 to the array.
 - Logged in user can bid on another users listing.
 - Logged in user can see other biddings on a listing, sorted with highest bid first.
 - User can scroll through a media slider if there are more than 1 picture of the product.
 - When a user bids on a listing, it affects the credit-amount.
 - Logged in user can see list of other users, and also search for one. 
 - Logged in user can log out.
 
### KNOWN ERROR:
I decided to make a page to list out users, with a search bar to search for users. This runs the fetch every time you type, which CAN cause to the site crashing if it has to fetch to many times in too little time. Didnt get the time to fix this, but wanted to keep the page because of the design and user availability.



## Sources 
 - [Card inspiration for design:](https://getbootstrap.com/docs/5.2/components/card/)
 - [Countdown for auction bid time:](https://www.w3schools.com/howto/howto_js_countdown.asp)
 - [Modal for avatar update:](https://getbootstrap.com/docs/4.0/components/modal/)
 - [Inspiration for profile design:](https://bbbootstrap.com/snippets/individual-user-profile-social-network-94176986) 
 - Changed from my original profile design since i got extra time and wasnt quite happy with what i had from the beginning.
 - [Dropdown element:](https://getbootstrap.com/docs/5.2/components/dropdowns/)
 - [Create new media input:](https://codepen.io/xiaolasse/pen/LYrqgWy?editors=1011)
  - [Carousel for media:](https://getbootstrap.com/docs/5.2/components/carousel/#with-controls)

