<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

A sample nestjs applicaiton which demonstrate the use of

- Jwt Authentication
- NestJs Custom Guards
- NestJs Custom Strategy
- NestJs Injection Token
- Custom Context to manage user data
- Typeorm with Postgres
- Typeorm Cli commands to drop and sync schema
- Typeorm Cli commands to generate migrations
- NestJs Console to create admin credentials using console cli custom commands
- NestJs Swagger with the ability to test api in browser using JWT token
- Fixtures to load sample data for testing
- Test Clients to make testing efficient

The architecture is opinionated, comments and PR are appreciated.

## Installation

```bash
$ yarn install

```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Running console commands

```bash
# create admin credentials

yarn console create:admin --email=admin@gmail.com --password=password --displayName=Admin

```

Got to <a href="http://localhost:3000/api/docs ">http://localhost:3000/api/docs</a> to find the swagger doc.

## Roadmap

- Add third party providers Auth (Facebook, Google, Twitter, etc...)
- Add Redis cache for blacklisted access tokens (for now it's in memory)
- Update password, Lost password

## Test

```bash
# e2e tests
$ yarn test:e2e

```

## License

Nest is [MIT licensed](LICENSE).
