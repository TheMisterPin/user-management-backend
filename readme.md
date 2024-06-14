### User Management API

This repository contains a simple user management API built with Express, TypeScript, and Prisma. The API supports user registration, login, friend management, and more.

### Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm or yarn

### Installing

1. Clone the repository:
    
    ```
    shCopia codice
    git clone https://github.com/your-username/user-management.git
    cd user-management
    
    ```
    
2. Install the dependencies:
    
    ```
    shCopia codice
    npm install
    # or
    yarn install
    
    ```
    
3. Set up the database:
    
    ```
    shCopia codice
    npx prisma migrate dev
    npm run seed
    
    ```
    
4. Generate Prisma client:
    
    ```
    shCopia codice
    npm run postinstall
    
    ```
    

### Running the API

To start the development server, run:

```
shCopia codice
npm run dev

```

To build the project, run:

```
shCopia codice
npm run build

```

To start the production server, run:

```
shCopia codice
npm start

```

### Running Tests

To run tests, use:

```
shCopia codice
npm test

```

### Linting

To lint the code, use:

```sh
npm run lint

```

### Seeding the Database

To seed the database with initial data, use:

```sh
npm run seed

```

### Project Structure

```graphql
.
├── src
│   ├── controllers      # API controllers
│   ├── middleware       # Custom middleware
│   ├── routes           # API routes
│   ├── utils            # Utility functions
│   └── index.ts         # Entry point
├── prisma
│   ├── schema.prisma    # Prisma schema
│   └── seed.ts          # Database seeding script
├── tests
│   ├── controller.test.ts   # Test cases for controllers
│   └── mocks                # Mock data for tests
├── .eslintrc.js         # ESLint configuration
├── .prettierrc          # Prettier configuration
├── jest.config.js       # Jest configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project configuration

```



