<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework base repository for modular API development

## Build dev containers and run the project

```bash
# development
$ docker compose up --build

```

## Running migrations

The project is configured to not synchronise DB schema changes.

After schema / entity modification, generate and then run a new migration.

```bash
# Generate Migration
# This generates a new migration file based on the diff between the current db schema and pending changes to TypeORM entities
$ docker compose run nest-app su -c 'npx typeorm-ts-node-commonjs migration:generate src/db/migrations/MigrationName -o -d src/app.datasource.ts' node

# Run Migrations
$ docker compose run nest-app su -c 'npx typeorm-ts-node-commonjs migration:run -d src/app.datasource.ts' node

# Revert Last Migration
$ docker compose run nest-app su -c 'npx typeorm-ts-node-commonjs migration:revert -d src/app.datasource.ts' node

```
