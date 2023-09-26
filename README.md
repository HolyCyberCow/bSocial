# BSocial

This is a simple social app.

Users can register, login, follow other users, create posts and comments.

## Requirements

- Node (v20.6.1)
- Docker
- [Optional] Postman

## How to run

### ENV

Create a `.env` file and put your environment variables in there. You can use
the example file `.example.env` to generate the starting `.env` file, just copy
it:

```bash
cp .example.env .env
```

Although the **app** itself has defaults and can run fine without this file, the
**docker-compose** needs it.

### Docker

Make sure you have `docker` and `docker-compose` installed on your machine. Run:

```bash
docker-compose up -d
```

which will:

- create a database docker contanier called **database** and expose it to
  `http://localhost:5432` by default
- create a docker container for the app called `bsocial-webserver`, expose it to
  `http://localhost:8081` and run the Dockerfile inside `src` directory that
  builds the app:
  - copies the project files and some other required files like `package.json`
    and `.env`
  - installs the dependencies
  - runs the migrations
  - runs the development server
- network for the app containers.

The API Docs should be available at: `http://localhost:8081/api/docs`

### Local development

Make sure to install the dependencies:

```bash
npm i
```

You can run:

```bash
npm run dev
```

To run the development server locally on your machine. This should not conflict
with the docker container since it exposes the web server to
`http://localhost:8081`. The server in this case can be accessed via
`http://localhost:8080` and the corresponding API docs via
`http://localhost:8080/api/docs`.

## How it works

There are several applications / components:

- The main `web server`
  - manages user register and auth
  - post and comment creation
  - user follow
- `PostgreSQL`
  - serving as the main web server's database
- `Kafka`, which handles events on:
  - User registration
  - Post creation
  - Comment creation
- `Notifications microservice`
  - subscribes to the comment creation topic in `Kafka`
  - notifies users when their posts have been commented on
- `Elasticsearch`
- `Telemetry microservice`
  - depends on the `Elasticsearch`
  - consumes all messages sent to Kafka and writes them to `Elasticsearch`

### Commands

Commands as defined inside `package.json`:

Run tests (not specified at the moment!):

```bash
npm run test
```

Build the app (**TS**):

```bash
npm run build
```

Clean the build files (**delete**/**remove** them):

```bash
npm run clean
```

Clean build - deletes the build files and builds again (**TS**):

```bash
npm run build:clean
```

Start the application (web server) from the built files (_**build required
beforehand**_):

```bash
npm run start
```

Start the development server (watches for changes with **nodemon**):

```bash
npm run dev
```

Format the entire project with **prettier**:

```bash
npm run format
```

Lint the project using **eslint**:

```bash
npm run lint
```

Format and lint the whole project (**fl** is short for **format-lint**):

```bash
npm run fl
```

Access **typeorm** cli:

```bash
npm run typeorm
```

Access the **typeorm** cli migrations:

```bash
npm run migration
```

Generate **migrations** (based on changes to the **entities**):

```bash
npm run migration:generate
```

Run the **migrations**:

```bash
npm run migration:run
```

Revert **migrations**:

```bash
npm run migration:revert
```

### Notes

#### General

App uses:

- `express` pacakge to create a server
- `typeorm` to manage database connection, entity and migration management
- `zod` to validate incoming request data

#### Auth

The app uses **cookie** based auth and stores **JWT** tokens inside **cookies**,
signed by the **RSA** keys stored in the environment.

#### App Config and Defaults

The app uses the `.dotenv` package to pick up contents of the `.env` file and
export them to the app runtime. There is a `config` file
(`./src/config/config.ts`) that exports the app configuration populated with the
**environment variables** and _substituted_ by **default values** from
`defaults` file (`./src/config/defaults`). This is so that we avoid _**Magic
Strings**_.

#### API Docs

Api docs are served using `swagger-ui-express` package and generated using
`swagger-jsdoc` package. The API docs are wirtten in swagger jsdoc format and
are located mostly inside `./src/routes/*` files. Additional components are
defined in `./src/entities` and `src/schemas` and some responses in
`./src/server.ts`.

#### Postman

You can find 2 postman files inside the `postman` directory:

- `./postman/bSocial.postman_collection.json` - postman collection
- `./postman/bSocial.postman_environment.json` - postman environment

and you can import them in your **Postman** app(if you are using it) to test the
API.

## Development

This project uses a simple version of `GitFlow`. The first, initial commit
inside the `master` branch will contain the minimal project setup, further
features / additions will be implemented via `feature` branches and merged into
the `develop` branch, then into `master`.

For now, no `release` branches will be made, due to the app still being in the
early stages of the development.

### Features

- `Web server`
  - [x] **SETUP** PostgreSQL inside a docker container
  - [ ] **SETUP** Kafka inside a docker container
    - [ ] Create Kafka topics
  - [x] **SETUP** Database connection
  - [x] _ENDPOINT_ - User registration
    - [ ] Publish user registration to kafka
  - [x] _ENDPOINT_ user login
  - [x] _ENDPOINT_ user logout
  - [x] _ENDPOINT_ create posts
    - [ ] Publish create post message to kafka
  - [x] _ENDPOINT_ create post comment
    - [ ] Publish create post comment message to kafka
  - [x] _ENDPOINT_ get posts, paginatied, user can only see own or followed
        users's posts (no need to return comments for posts)
  - [x] _ENDPOINT_ get all post comments
  - [x] _ENDPOINT_ follow user (one way relationship)
  - [x] API docs
- `Notifications microservice`
  - [ ] Consume create post comments feed from kafka and send notifications to
        post publisher whenever someone comments their post
    - [ ] implement notifications via WebSockets (requires frontend)
    - [ ] _ENDPOINT_ get all unsent notifications
- `Telemetry microservice`
  - [ ] **SETUP** Elasticsearch inside a docker container
  - [ ] Consume all messages sent to kafka and write them to Elasticsearch
  - [ ] Write elasticsearch query (store in a file)
    - [ ] count of registered users per day
    - [ ] top 10 posts (by number of comments) per day in the last 10 days
    - [ ] all-time top post from a given user (highest number of comments) and
          all time worst post (lowest number of comments). If there are
          duplicates it does not matter which one is returned
