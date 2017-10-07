# Awesome Blog

This is a simple blog website where one can share its thoughts or life stories anonymously with others.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

You need to have Node vesion 6 (LTS) and npm (node package manager) installed on your machine.

### Install

After you download or clone this project, you need to change into the project folder and run

```
npm install
```

in the commandline to install all dependencies.

### Usage

After you installed all dependencies, you need to run

```
node app.js
```

to start the node server. Then you can go to localhost:8000 (you may change the port if you need to) in your

browser to see the app running. 

(You may need to use a local MongoDB since my deployed app is using [mLab](https://mlab.com/) as cloud database service.

Or you will have to use your own mLab database settings.)

## Deployed application

The project is deployed on [Heroku](https://fathomless-retreat-52004.herokuapp.com/). You may want to have a look by clicking the link :).

## Built With

* Bootstrap - Front-end CSS framework
* JQuery - Making AJAX request and some simple effects like fadeIn and fadeOut
* express handlebars - Template engine
* Express - Server side JS framework
* Node - JS server side runtime
* Mongoose - MongoDB ODM for connectting database
* Passport - Server side authentication 
* bcrypt - Encrypt user password
* Nodemailer & Nodemailer-sendgrid-transport - Send email
* generate-password - Generate random password


## Author

* **Cunxiang Yu** - [CunxiangYu](https://github.com/CunxiangYu)





## Acknowledgments

* Weather API is inspired by [Josh Bader](https://codepen.io/joshbader/full/EjXgqr/) for his fantastic CSS weather icons.
* Thanks to [Billie Thompson](https://github.com/PurpleBooth) for providing great stucture for this REAMME.md
