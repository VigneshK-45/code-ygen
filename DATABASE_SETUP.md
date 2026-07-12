# Database Setup Guide

This project uses Neon PostgreSQL with a Node/Express backend API.

## Environment Variables

Make sure these environment variables are set in your project:

1. **DATABASE_URL** - Auto-provisioned by the Neon integration
   - This is your PostgreSQL connection string
   - Set in the Vars section of project settings

## Database Schema

The following tables have been created in your Neon database:

### `user` table
- `id` (TEXT, PRIMARY KEY)
- `email` (TEXT, UNIQUE, NOT NULL)
- `name` (TEXT)
- `password` (TEXT, NOT NULL)
- `emailVerified` (BOOLEAN, DEFAULT: false)
- `createdAt` (TIMESTAMP, DEFAULT: CURRENT_TIMESTAMP)
- `updatedAt` (TIMESTAMP, DEFAULT: CURRENT_TIMESTAMP)

### `session` table
- `id` (TEXT, PRIMARY KEY)
- `userId` (TEXT, NOT NULL, FOREIGN KEY)
- `token` (TEXT, UNIQUE)
- `expiresAt` (TIMESTAMP, NOT NULL)
- `createdAt` (TIMESTAMP, DEFAULT: CURRENT_TIMESTAMP)

## Running the Application

### Development Mode

1. **Start the backend server:**
   ```bash
   pnpm run dev:server
   ```
   The server will run on `http://localhost:3001`

2. **In another terminal, start the frontend:**
   ```bash
   pnpm run dev
   ```
   The frontend will run on `http://localhost:5173`

### API Endpoints

#### Authentication

- **POST** `/api/auth/sign-up`
  - Body: `{ email, password, name }`
  - Response: `{ user, session: { token } }`

- **POST** `/api/auth/sign-in`
  - Body: `{ email, password }`
  - Response: `{ user, session: { token } }`

- **GET** `/api/auth/me`
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ user }`

- **POST** `/api/auth/sign-out`
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ success: true }`

## File Structure

```
server/
  ├── index.ts                 # Express server
  └── lib/
      ├── auth.ts              # Auth utilities
      └── db/
          ├── index.ts         # Drizzle connection
          └── schema.ts        # Database schema

src/
  └── lib/
      └── auth-context.tsx     # React auth context
```

## Authentication Flow

1. User signs up/in via the Login page
2. React component calls Express API endpoint
3. Backend validates credentials and creates session
4. Session token stored in localStorage
5. AuthContext provides user state to app
6. Protected pages check user authentication status

## Production Deployment

1. Ensure `DATABASE_URL` is set in your Vercel project environment variables
2. Build the project: `pnpm run build`
3. The backend can be deployed as a separate service or integrated with a Node.js hosting provider
