# Registration and Login API

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|URL           | MongoDB connection url values            | N/A      |
|SESSIONKEY           | Cookie session key            | N/A      |
|ACCESSSECRET           | JWT Access token signing key            | N/A      |
|REFRESHSECRET           | JWT Refresh token signing key            | N/A      |


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version >=16.0.0


# Getting started
- Clone the repository
```
git clone https://github.com/Rishabh11200/UserManagement.git
```
- Install dependencies (must install [nodemon](https://github.com/remy/nodemon#installation) globally first)
```
cd UserManagement
yarn
```
- Build and run the project
```
yarn start
```
  Navigate to `http://localhost:8080`

<!-- - API Document endpoints -->

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the distributable (or output) from your TypeScript build.  |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **src**                  | Contains  source code that will be compiled to the dist dir                               |
| **configuration**        | Application configuration including environment-specific configs 
| **src/controllers**      | Controllers define functions to serve various express routes. 
| **src/middlewares**      | Express middlewares which process the incoming requests before handling them down to the routes
| **src/routes**           | Contain all express routes, separated by module/area of application                       
| **src/models**           | Models define schemas that will be used in storing and retrieving data from Application database  |
| **src/monitoring**      | Prometheus metrics |
| **src**/index.ts         | Entry point to express app                                                               |
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | tsconfig.json            | Config settings for compiling source code only written in TypeScript    
| tslint.json              | Config settings for TSLint code style checking                                                |

### Running the build
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs full build. Can be invoked with `yarn start`                  |
| `build`                   | build the js code for whole project to dist/ folder      |
