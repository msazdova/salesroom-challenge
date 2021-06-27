# salesroom-challenge

GraphQL API to keep track of meetings and their guests in a video chat application.


## Prerequisities

- [Node](https://nodejs.org/en/) 14.15.4 installed
- [TypeScript](https://www.typescriptlang.org) 4.3.4 installed
- [MySQL](https://www.mysql.com/) database server running

### Built with

- [TypeGraphQL](https://typegraphql.com/) 
- [apollo-server](https://www.apollographql.com/docs/apollo-server)
- [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)

### Environment variables

Copy `.env.example` file to `.env` and replace the variable values.

- DATABASE_URL


## Getting started

### 1. Install dependencies

Install npm dependencies:

```
npm install
```

### 2. Create and seed the database

First, run `prisma generate` to start using Prisma Client into the code.

Next, run the following command to create your PostgreSQL database file. This also creates the User and Meeting tables defined in `prisma/schema.prisma`:

```
npx prisma migrate dev --name init
```

Finally, seed the database with the sample data in `prisma/seed.ts`. This creates a few initial users for testing.

```
npx prisma db seed --preview-feature
```

### 3. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run start
```

or run the server with ts-node-dev in development mode:

```
npm run start-dev
```

Server is ready at [http://localhost:4000](http://localhost:4000). 🚀


### 4. Testing

Get the Postman collection and run the API against your running server.

[Postman Collection](https://www.postman.com/collections/afb06337a6de49a4eb7d)

** 🤓 Fix: In order for AddMeetingGuests and RemoveMeetingGuests to work

```
mutation AddMeetingGuests($meetingId: ID!, $userIds: [ID!]) {
```

and

```
mutation RemoveMeetingGuests($meetingId: ID!, $userIds: [ID!]) {
```

have to be changed to send `$userIds: [ID!]!`