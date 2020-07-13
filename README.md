# Node Js Boilerplate
> Starter project with node js, express and passport

## Scripts
- `npm start`
- `npm run dev`
- `npm run lint`
- `npm run test`

## Code overview

### Dependencies
```bash
npm i express cors @hapi/boom express-validator helmet bcrypt jsonwebtoken passport passport-http passport-jwt mongoose
```

- express: Server for handling and routing Http requests
- jsonwebtoken: For generating JWTs for authentication
- mongooose: Modeling and mapping MongoDB javascript
- passport: For user athentication

### DevDependencies
```bash
 npm i -D dotenv nodemon mocha nyc prettier eslint eslint-config-prettier eslint-plugin-prettier husky lint-staged
```

### Application Structure
- `index.js`: This file is the entry point of the application
- `config/`: The folder contains configuration for environments variables
- `routes/`: The folder contains the routes definitios for the API
- `models/`: The folder contains the schema definitions for Mongoose

## Athentication
The routes that require authentication need the Authentication header in the Request with a valid Json Web Token(JWT)