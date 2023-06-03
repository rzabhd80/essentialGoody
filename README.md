## Description

esseintial goody, a simplistic modular CQRS based monolothic application.

## Installation

```bash
$ npm install
```

## Running the app
in order to run the application you can use docker compose file in infra directory with given command
```bash
docker-compose up
```
alternatively, you can fistly install  and then run the application as given below :

```bash
$ npm install
```
and then run the application using :
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
be aware that in order to run the application without docker, 
you need to set a postgress connection for your database

## Test
due to lack of time, i could not manage to add all tests for each and every endpoint, 
in tests module you can find supplier module with a test in it. thats how tests are implemented, i will gradually add more.
