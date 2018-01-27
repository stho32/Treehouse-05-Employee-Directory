# Requirements

Communicating with APIs allows you to work with microservices and with vast databases to build useful tools and relevant information quickly and easily. You can build utilities, games, infographics, and more. You can also integrate, display, and analyze social media and large data sets without having to create and curate them yourself.

Awesome Startup is a distributed company with employees working all over the world. They need a smart way to for employees to share contact information with each other. In this project, you’ll use the Random User Generator API (https://randomuser.me/) to grab information for 12 random “employees,” and use that data to build a prototype for an Awesome Startup employee directory. You’ll request a JSON object from the API and parse the data so that 12 employees are listed in a grid with their thumbnail image, full name, email, and location. Clicking the employee’s image or name will open a modal window with more detailed information, such as the employee’s birthday and address.

Documentation for the random user API can be found here: https://randomuser.me/documentation


- [x] (R1) Get and display 12 random users from The Random User Generator API

    - [x] (R2) Using photos and information that the API provides, you’ll display 12 users, along with some basic information:
      - [x] (R3) Image
      - [x] (R4) First and Last Name
      - [x] (R5) Email
      - [x] (R6) City


- [x] (R7) Create a modal window that will pop up when any part of the user’s row is clicked. The following details should display in the modal window:

    - [x] (R8) Image
    - [x] (R9) Name
    - [x] (R10) Username
    - [x] (R11) Email
    - [x] (R12) Cell Number
    - [x] (R13) Detailed Address, including street name and number, city, country and post code.
    - [x] (R14) Birthdate

- [x] (R15) Structure and style the user directory so that it roughly matches the provide mockup.

    - [x] (R16) Display the users in a grid or table
    - [x] (R17) Add a hover state to the rows of the user table.
    - [x] (R18) Make sure there’s a way to close the modal window


- [ ] (R19) Add a way to filter the directory by name or username. To do this, you’ll need to request a random user nationality that will only return data in the English alphabet. Note: you don't have to rely on the API to return search results. You'll need to write functionality that filters results once they already on the page.

- [ ] (R20) Add a way to move back and forth between employee detail windows when the modal window is open.

# How-You'll-be-graded-checklist

- [ ] (R21) 12 random users are pulled from the the API
- [ ] (R22) New random employee information displays each time the page refreshes
- [ ] (R23) The directory includes the following: Employee Image, First and Last Name, Email, City
- [ ] (R24) Employees can be filtered by name or username 
- [ ] (R25) Modal window displays the following details: Employee image, Name, Email, Cell Number, Detailed Address, including street name and number, city, country and post code.,  Birthdate
- [ ] (R26) There is a way to close the modal window
- [ ] (R27) Functionality has been added to switch back and forth between employees when the detail modal window is open.
- [ ] (R28) Directory has been styled so that all the major elements are in place and roughly matches the mockups 
