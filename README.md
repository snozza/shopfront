Deloitte Digital Development Test
========================

### Introduction

Deloitte Digital Development Test - A retailer that sells different categories of clothes. Includes a shopping cart and the ability to apply discount codes.

### Methodology

As this is largely a front-end test, the obvious approach would be to use a front-end framework such as Angular to expedite the development process. However, I figured that it would be of greater demonstration value to write the front-end code from scratch, using only JavaScript/JQuery. It is also a single page webapp.

I decided to build the platform with a basic Node.js server. This makes the standard server setup slightly more difficult, but with the added avantage of JavaScript end-to-end as well as simple integration of websockets. Bootstrap was used to get a simple design up and running.

Also, instead of using a live database, I have created a mock-database object (and associated access functions) to simulate the database interaction.

The core front-end code is located in public/js in the files navigation.js, popover.js, and socketListeners.js.

All products and cart items are created dynamically by using template html which is then appended to appropriate elements depending on the values in the mock database.
This makes it easier to add new content to the database, which is instantly reflected on the homepage.

Placeholder content has been included in other parts of the website.

Everything was test driven with mocha (and selenium webdriver for feature tests);

### To-Do

Major refactoring and removal of duplicate methods

### Languages/Platforms/Tools

* Node.js
* Javascript
* HTML/CSS
* Express
* Mocha
* Selenium webdriver
* Socket.io
* Webdriver.io
* jQuery
* Bootstrap


### Instructions

Ensure that Node.js and npm are installed.
Easiest way to install is to visit http://nodejs.org/ - click install
and follow instructions. This works better than using an a package manager
such as brew which doesn't defaul with NPM.

Change into the directory and npm install the modules:

```
$ cd /path_to/deloitte_shop
$ npm install
```

Setup:

```
Ensure that mocha is installed globally:

$ npm install mocha -g

Download the chromedriver executable from http://chromedriver.storage.googleapis.com/index.html and place it on your path (e.g. /usr/local/bin).
Futher information can be found at https://code.google.com/p/selenium/wiki/ChromeDriver

Download the Selenium stand-alone server from http://www.seleniumhq.org/download
then in a separate terminal run:

$ java -jar /pathtofile/selenium-server-standalone-2.44.0.jar

```

Run the tests: 

```
Please use the following test runner (includes setup and teardown of server and database)
This will run a live browser.

$ node mocha_runner.js
```

Start the node server and visit http://localhost:3000/

```
$ node server.js
