# Mean

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# EntryManager
A simple web app for managing Entry of visitors (live at )


## API 

1. Register user (POST)
```sh
> http://localhost:4000/users/register 
  Request body
 { 
  "name":"test5",
  "email":"test5@test.com",
  "password":"password",
  "username":"test5"
  }
```
2. Login User (POST)
```sh
> http://localhost:4000/users/authenticate
  Request body 
  { 
  "password":"password",
  "username":"test5"
  }
```
3. Check In submit (POST)
```sh
> http://localhost:4000/check/in/submit
  Request body 
  {
	"vistorPhone": "9123456789",
  "vistorCheckIn": "9:30"
  }
```
4. Check Out Submit (POST)
```sh
> http://localhost:4000/check/out/submit
  Request body 
  {
    "checkout": "9:30"
  }
```
## Usage 

1. Add .env file in the root directory and add the following:
```sh
  mongoUri = '<YOUR_MONGODB_URL>'
  secret = 'helloworld'
  sendgridUsername = "<YOUR_SENDGRID_URL>"
  sendgridPassword = "<YOUR_SENDGRID_PASSWORD>"
  mailService = "SendGrid"
```
2. Install dependencies
```sh
   npm install
```
3. To run backend (only)
```sh
   npm run server
```
4. To run the app (both client and server at a time)
```sh
   npm run build
```
5. Open your browser and move to ```http://localhost:4000``` (You are good to go!)

### Project Structure 
```sh
1. Backend files: /server
2. Client Side: /src
```
## Running application:

### 1. Home page 
![home](https://user-images.githubusercontent.com/31209617/69600760-d326c300-1037-11ea-9e50-a60ec35e92aa.png)

### 2. Login Page
![login](https://user-images.githubusercontent.com/31209617/69600800-01a49e00-1038-11ea-97c0-f075d20fdb02.png)


### 3. Register page 
![register](https://user-images.githubusercontent.com/31209617/69600822-12edaa80-1038-11ea-812c-9958a7e8af3a.png)


### 4. Check In 
![checkIn](https://user-images.githubusercontent.com/31209617/69600861-331d6980-1038-11ea-87b9-78fa43b7875c.png)


### 5. Check Out
![checkout](https://user-images.githubusercontent.com/31209617/69600883-47f9fd00-1038-11ea-86eb-76b3f1d45f05.png)

### 6. Email sent
<p align="center">
<img src="https://user-images.githubusercontent.com/31209617/69601287-a7a4d800-1039-11ea-9861-d1e340948b40.png" width=250 height=400>
</p>


### Made with :heart: by Rupeshiya 
