# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 2023-09-22

#### Added

- package-lock.json
- docker-compose.yml for building the webserver with its postgres dependency
- .dockerignore file
- initial web server structure, with db entities, db connections, controllers,
  services, validation schemas, utilities, config, expanded env vars where
  needed
- added redis for session management

#### Changed

- README; added app goals, features and requirements
- env variables
- directory structure
- docker-compose: added redis

## [0.0.1] - 2023-09-21

### Added

- initial project files (README, configs for ts, preetier, eslint, .gitignore)
- initial project management scripts via package.json file - build, run, dev,
  lint, format
- documented aobe scripts inside README, added simple introduction to the app
  and a development flow / process (GitFlow details)
- dotenv, a simple .env file (added to gitignore, see .exmaple.env in README)
- a simple express webserver with a "/ping" endpoint
