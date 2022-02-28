# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies

Your application must make use of the following libraries:

#### express

`npm i express`
`npm i -D @types/express`

#### typescript

`npm i -D typescript`

#### db-migrate

`npm install -g db-migrate`

#### g

`npm install -g n`

#### cors

`npm i cors`

#### bcrypt

`npm -i bcrypt`
`npm -i -D @types/bcrypt`

#### jsonwebtoken

`npm i jsonwebtoken`
`npm -i -D @types/jsonwebtoken`

#### cross-env

`npm i -D dotenv`

#### jasmine

`npm i -D jasmine @types/jasmine @ert78gb/jasmine-ts ts-node`

#### supertest

`npm i supertest`
`npm i --save-dev @types/supertest`

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API.

Your first task is to read the requirements and update the document with the following:

- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.
  **Example**: A SHOW route: 'blogs/:id' [GET]

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.
  **Example**: You can format this however you like but these types of information should be provided
  Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape.

### 2. DB Creation and Migrations

### Create Databases

We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user
  - `CREATE USER full_stack_user WITH PASSWORD 'password123';`
- In psql run the following to create the dev and test database
  - `CREATE DATABASE store_backend_dev;`
  - `CREATE DATABASE store_backend_test;`
- Connect to the databases and grant all privileges
  - Grant for dev database
    - `\c store_backend_dev`
    - `GRANT ALL PRIVILEGES ON DATABASE store_backend_dev TO full_stack_user;`
  - Grant for test database
    - `\c store_backend_test`
    - `GRANT ALL PRIVILEGES ON DATABASE store_backend_test TO full_stack_user;`

### migration

Run the following command in the root directory

- `test-up": "db-migrate up -e test` to migrate up the test DB
- `test-down": "db-migrate down -e test` to migrate up the test DB
- `dev-up: db-migrate up -e test`to migrate up the dev DB
- `dev-down": "db-migrate down -e test"` to migrate down the dev DB

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the endpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled.

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database.

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!

## Environment Variables

- DB_NAME = store_backend_dev
- DB_HOST = localhost
- DB_NAME_TEST = store_backend_test
- DB_PORT = 5432
- DB_USER = store_user
- DB_PASSWORD= password123
- BCRYPT_PASSWORD=my-name-is-enow-2021
- SALT_ROUNDS=10
- TOKEN_TEST = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.J8BgsyqA3Y6F71NXbfuYIfRVuvRa_qb08RStxrCVhlQ
- JWT_SECRET = 5ae8adc9731627905ebf0905dbe4a114ba7d8354ae1796772dfa523a2142761b78d48cbfcd98000bb94fbdbd8147f30de6b3484c3a060d389068204df6a50630
- ENV = test
