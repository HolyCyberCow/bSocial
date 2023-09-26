# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2023-09-26

### Added

- `.example.env` file, since `.env` is in gitignore, as an example
- **docker** related files (`Dockerfile`, `docker-compose.yml`, `.dockerignore`)
- additional project structure directories
  - app **config** loading
  - app **middleware** (auth & request data validation)
  - **database entities** (**base**, **user**, **post**, **postComment**)
  - **database migrations**
  - **data schemas** (for validation with zod)
  - app **controllers**
  - app **services**
  - app **routes**
  - app **utils** (jwt signing and database connection management)
- **tests** directory
- **postman** directory with exported **collection** and **environment**
- **api docs** in form of `jsdocs`, using `swagger-jsdoc` and served using
  `swagger-ui-express`

### Changed

- README, added a lot of additional instructions and project description
- project management scripts (package.json)
- .env

### Removed

## [0.0.1] - 2023-09-21

### Added

- initial project files (README, configs for ts, preetier, eslint, .gitignore)
- initial project management scripts via package.json file - build, run, dev,
  lint, format
- documented above scripts inside README, added simple introduction to the app
  and a development flow / process (GitFlow details)
- dotenv, a simple .env file (added to gitignore, see .exmaple.env in README)
- a simple express webserver with a "/ping" endpoint
