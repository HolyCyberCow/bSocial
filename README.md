# BSocial

This is a simple social app.

Users can register, login, follow other users, create posts and comments.

Users will recieve notifications when a user they followed submits / creates a
post.

## Requirements

- node (v20.6.1)
- PostgreSQL
- Kafka
- ElasticSearch

## How to run

First install the dependencies:

```bash
npm i
```

Then use one of the scripts (defined in the package.json) to build:

```bash
npm run build
```

run:

```bash
npm run start
```

format:

```bash
npm run format
```

lint:

```bash
npm run lint
```

or just run for development by watching for changes with nodemon.

```bash
npm run dev
```

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

All of these can be ran through their respective `dockerfiles` or by using
`docker-compose`

## Development

This project uses a simple version of `GitFlow`. The first, initial commit
inside the `master` branch will contain the minimal project setup, further
features / additions will be implemented via `feature` branches and merged into
the `develop` branch.

For now, no `release` branches will be made, due to the app still being in the
early stages of the development.

### Features

- `Web server`
  - [x] **SETUP** PostgreSQL inside a docker
  - [ ] **SETUP** Kafka inside a docker
    - [ ] Create Kafka topics
  - [ ] **SETUP** Database connection
  - [ ] _ENDPOINT_ - User registration
    - [ ] Publish user registration to kafka
  - [ ] _ENDPOINT_ user login
  - [ ] _ENDPOINT_ user logout
  - [ ] _ENDPOINT_ create posts
    - [ ] Publish create post message to kafka
  - [ ] _ENDPOINT_ create post comment
    - [ ] Publish create post comment message to kafka
  - [ ] _ENDPOINT_ get posts, paginatied, user can only see own or followed
        users's posts (no need to return comments for posts)
  - [ ] _ENDPOINT_ get all post comments
  - [ ] _ENDPOINT_ follow user (one way relationship)
  - [ ] API docs
- `Notifications microservice`
  - [ ] Consume create post comments feed from kafka and send notifications to
        post publisher whenever someone comments their post
    - [ ] implement notifications via WebSockets (requires frontend)
    - [ ] _ENDPOINT_ get all unsent notifications
- `Telemetry microservice`
  - [ ] Consume all messages sent to kafka and write them to Elasticsearch
  - [ ] Write elasticsearch query (store in a file)
    - [ ] count of registered users per day
    - [ ] top 10 posts (by number of comments) per day in the last 10 days
    - [ ] all-time top post from a given user (highest number of comments) and
          all time worst post (lowest number of comments). If there are
          duplicates it does not matter which one is returned
