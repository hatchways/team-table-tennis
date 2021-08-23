## Project Name

Kanban board is an application used in the agile environment that allows users to constatnly control and improve their flow of work. The application that we have developed allows users to signup and login by creating their own secured accounts. It also allows users to manage work flow through the dashboard and calendar page as well as allowing for personal profile picture to be added. 

**Tech Stack:** MongoDB, Express.js, React.js, Node.js, Typescript, JavaScript

**Contributors**: [Hamid Charkhian](https://github.com/hamidrc), [Peter Szadurski](https://github.com/PeterSzadurski), [Alex Yoon](https://github.com/alexyoon97), [Maxson Yang](https://github.com/maxsonyang)

---

### Getting Started

1. Clone or download repository

---

## Server

1. Go into the server directory `cd server`
2. Run `npm install` to install packages
3. Create your environment variable (.env) file
4. Run `npm run dev` to start the server

---

## Client

1. Go into the client directory `cd client`
2. Run `npm install` to install packages
3. Run `npm start` to start the client side
4. Head to http://localhost:3000/ on the browser
---

## Cloudinary
  
Cloudinary is used to store pictures of each user as they upload them into the cloud. Follow the instructions below to setup cloudinary.

1. Go to https://cloudinary.com/
2. Create new account.
3. Take note of Cloud name, Api Key, and Api Secret in the Dashboard tab and add them to (.env) file.
4. Go to **settings** then click on **upload** tab. 
5. Scroll down and in the Upload Presets section click on **Add upload preset**.
6. Use **KanbanCloud** as the name and folder name. The preset should be unsigned. Save the new setting.
7. Navigate to the Media Library tab at the top and create a new folder, name it **KanbanCloud**
8. Upload picture through the profile page of Kanban board app and you should be able to see it uploaded into the cloud.

---

## Feature Overview

1. Create account and login
2. Navigate through the dashboard
3. Create task-specific cards
4. Create columns to group progress
5. Drag and drop cards to new columns
6. Add details to each card (comment, description, attachment)
7. Create new boards and rename them
8. Add profile picture, navigate through the Profile page by clicking on the profile icon in the top right corner
9. Add deadlines to each task, navigate through the Calendar page
---

### Demo

1. Registration. Users will be able to create a new account using their email and password

![Signup Demo](https://user-images.githubusercontent.com/77899847/130470017-7ca9b7ee-b5c3-4e97-b8ff-59e06bfeb172.PNG)

2. Dashboard. Here is a description about what a user can expect to see.

![Dashboard](https://user-images.githubusercontent.com/77899847/130470273-e0e413ff-11a1-40d7-8f54-9402fee58255.PNG)
![](https://user-images.githubusercontent.com/77899847/130470348-ef608977-1c7d-4cea-b0d1-61c9e12c407c.PNG)

3. Calendar. Here is a description about what a user can expect to see
![Calendar](https://user-images.githubusercontent.com/77899847/130470731-0c66e05c-ed45-4fef-9bfd-304d62ef4b0b.PNG)

