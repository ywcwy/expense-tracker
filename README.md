# expense-tracker
to track your every cent

![Image](https://raw.githubusercontent.com/ywcwy/expense-tracker/master/expense-login.png)
![Image](https://raw.githubusercontent.com/ywcwy/expense-tracker/master/expense-list.png)

## Features
* register or login via Facebook
* record your each expense
* edit particular expense info
* delete particular expense 
* get the total amount of all expense
* get total amount of particular category or month by filtering

## Environment
* Node.js

## Packages
* express
* express-handlebars
* method-override
* body-parser
* express-session
* passport
* passport-facebook
* passport-local
* connect-flash
* bcryptjs
* dotenv

## Database
* mongoose 

## Install (for Mac OS user)
### 1. Open Terminal

### 2. Project Download
```
$git clone https://github.com/ywcwy/expense-tracker.git
```
After download, 
```
$cd expense-tracker     // to install the following Packages under this directory
```
### 3. npm Installation
```
$npm init -y     // create and initialize package.json directory
```
### 4. Package Installation
```
$npm install     // install all the Packages
```
### 5. Connect to the Database & create Seeders
```
$npm run seed      // install all the Seeders
```

### 6. Project Implement
```
$npm run dev   
```
### 7. Project Start 
```
Express is listening on localhost:3000     // if start working, termianl will show this message
```
### 8. Go to the page "localhost:3000"
