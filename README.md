# Boleto API

## Introduction

The boleto api is an app to verify a boleto number.

## Installation

Open the terminal, then download the project from the Github repository\*. Access the main folder of the application, you should be able to see a file named "app.dockerfile", then run the following command to install the project.

```bash
docker-compose up
```

\*You have to have Docker installed in your computer.

## Starting the application

You don't need to do anything else. Once the docker image and containers are created, and the node modules are installed, the app will start automatically. All that might take a little while.

## Open the app

You just need to [click here](http://localhost:3000) or open the URL <http://localhost:3000> in your browser.

## How to use it

After the api is running, send a boleto number as a parameter to the url /boleto. You can use a browser, POSTMAN or you favorite API testing tool.

Example:

```
http://localhost:3000/boleto/34191.79001 01043.510047 91020.150008 9 87820026300
```

\*Do not worry about removing spaces, dots etc, the api will remove them for you.

### Unit tests

To run tests, run the application, open one more terminal, then copy and paste the following command.

```bash
docker exec -t boleto-api npm test
```

If you are running Git Bash in Windows, add &quot;winpty&quot; before the command line.

```bash
winpty docker exec -t boleto-api npm test
```

### I don't have Docker

You don't have Docker, but you should have node, right?
If you do, just install the node_modules with `npm install`, then run the api with `npm start` and the tests with `npm test`.
