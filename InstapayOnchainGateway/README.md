# InstapayOnchainGateway

## Dependencies
- docker
- node + npm
- yarn

## Setup

```bash
cd webclient && yarn
cd gateway && yarn
```

## Start

There are two ways to run it:

### 1. With docker
```bash
docker-compose up --build
```

### 2. With separate local servers

- Database
```bash
docker-compose up postgres
```
- Webclient
```bash
cd webclient && yarn dev
```
- Gateway
```bash
cd gateway && yarn dev
```

## Project Structure

### Webclient

Entrypoint: index.js
Main file: main.js

- constructors - primary entrypoint for large modules, such as Apollo, ReactRouter, etc.
- components - reusable React components.
- pages - Components that are meant to be viewed as a "page" from the user's perspective.


### Gateway

Entrypoint: index.js
Main file: main.js

- constructors - primary entrypoint for large modules, such as Express, Apollo Graphql, Sequelize, etc.
- bin - internal infrastructure executables, such as migrate scripts
- constants - common constant values
- utils - common utility files
- public - public files served in http requests
- logs - server log files


### Infrastructure

- infrastructure - Contains the lifecycle logic for cloud deployments.

Uses Terraform to define, version, and create/update/destroy AWS resources.


## Migrations

See gateway/constructors/sequelize

Uses Sequelize migrations. In gateway, run "yarn migrate" to execute.


## TODO

- Table for employer data pages: https://react-table.js.org
- Update Contract Daemons
- Update policy coverage
- Update policy beneficiaries
- Set policy default term
- Frontend - Designs => UI Development

Queued
- Unit Test Framework
- Functional (Automation) Test Framework

## License

Unlicensed
