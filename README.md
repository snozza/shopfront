Shopfront - Basic shop with checkout
========================

### Introduction

A shop front with checkout. JavaScript was used end to end (node.js), as well as JQuery. There is no persistence, instead a mockDB object has been used which includes retrieval and modification functions. Items and checkout are populated via Ajax. Sockets are also included to provide realtime change of stock for all sessions.
Unit tests with Mocha and acceptance tests with Webdriverio + Mocha.

### Languages/Platforms/Tools

* Node.js
* Express
* Mocha
* Socket.io
* Selenium
* Webdriverio
* jQuery

### To-do List

- [ ] Add persistence (currntly using a mock database object)
- [ ] More use of Jquery animations for cool effects
- [ ] Improve the CSS and HTML (Current design is rather simple - using bootstrap).
- [ ] Find better testing tools for feature testing AJAX and JQuery.
- [ ] Removal of placeholder images
- [ ] Refactor code and remove duplication

### Instructions

No plans to deploy the app.

Clone the repository:

```
$ git clone git@github.com:snozza/shopfront.git
```

Change into the directory and npm install the modules:

```
$ cd shopfront
$ npm install
```

Setup:

```
Ensure that mocha is installed globally:

$ npm install mocha -g

Download the chromedriver executable from http://chromedriver.storage.googleapis.com/index.html and place it on your path (e.g. /usr/local/bin).
Futher information can be found at https://code.google.com/p/selenium/wiki/ChromeDriver

Download the Selenium stand-alone server from http://www.seleniumhq.org/download
and place in the root of the project directory.

```

Run the tests: 

```
Please use the following test runner (includes setup and teardown of server and database)

$ node mocha_runner.js
```

Start the node server and visit http://localhost:3000/

```
$ node app.js
