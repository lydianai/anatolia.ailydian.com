# Turk Dijital Metropol - Backend API

Production-ready backend API built with Express.js, Socket.io, Prisma, Redis, and TypeScript.

## Features

- **RESTful API** with Express.js
- **Real-time Communication** with Socket.io
- **Database ORM** with Prisma (PostgreSQL)
- **Caching & Pub/Sub** with Redis
- **Queue System** with Bull
- **Authentication** with JWT
- **Validation** with Joi
- **Rate Limiting** with Express Rate Limit
- **Logging** with Winston
- **Security** with Helmet
- **TypeScript** for type safety
- **ESLint** for code quality

## Tech Stack

- Node.js 18+
- TypeScript
- Express.js
- Socket.io
- Prisma
- PostgreSQL
- Redis
- Bull (Job Queue)
- JWT
- Bcrypt
- Joi
- Winston

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 6+

## Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your database credentials

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start development server
npm run dev
```

## Environment Variables

```env
NODE_ENV=development
PORT=3001
DATABASE_URL="postgresql://user:password@localhost:5432/turk_dijital_metropol"
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/profile` - Get user profile
- `PATCH /api/v1/auth/profile` - Update user profile
- `POST /api/v1/auth/logout` - Logout user

### Characters
- `POST /api/v1/characters` - Create character
- `GET /api/v1/characters` - Get user's characters
- `GET /api/v1/characters/:id` - Get character by ID
- `PATCH /api/v1/characters/:id` - Update character
- `DELETE /api/v1/characters/:id` - Delete character
- `GET /api/v1/characters/:id/nearby` - Get nearby characters

### Chat
- `POST /api/v1/chat/messages` - Send message
- `GET /api/v1/chat/messages/:roomId` - Get messages
- `DELETE /api/v1/chat/messages/:id` - Delete message
- `POST /api/v1/chat/rooms` - Create room
- `GET /api/v1/chat/rooms` - Get all rooms
- `GET /api/v1/chat/rooms/:id` - Get room by ID

### Economy
- `POST /api/v1/economy/transactions` - Create transaction
- `GET /api/v1/economy/transactions` - Get user transactions
- `GET /api/v1/economy/transactions/:characterId` - Get character transactions
- `GET /api/v1/economy/balance/:characterId` - Get character balance

### World
- `GET /api/v1/world/zones` - Get active zones
- `GET /api/v1/world/zones/:zone` - Get zone state
- `GET /api/v1/world/zones/:zone/players` - Get players in zone
- `PATCH /api/v1/world/zones/:zone` - Update zone state

## Socket.io Events

### Client -> Server
- `character:move` - Update character position
- `character:action` - Perform character action
- `chat:send` - Send chat message
- `chat:join` - Join chat room
- `chat:leave` - Leave chat room
- `world:subscribe` - Subscribe to zone updates
- `world:unsubscribe` - Unsubscribe from zone updates
- `ping` - Ping server

### Server -> Client
- `character:moved` - Character position updated
- `character:update` - Character updated
- `chat:message` - New chat message
- `world:update` - World state updated
- `player:joined` - Player joined zone
- `player:left` - Player left zone
- `error` - Error occurred
- `pong` - Pong response

## Database Schema

- **User** - User accounts and authentication
- **Character** - Player characters
- **InventoryItem** - Character inventory
- **Transaction** - Economy transactions
- **ChatMessage** - Chat messages
- **ChatRoom** - Chat rooms
- **WorldState** - World/zone state
- **Achievement** - Available achievements
- **UserAchievement** - User achievement progress
- **Friendship** - User friendships

## Project Structure

```
src/
├── config/          # Configuration files
│   ├── database.ts  # Prisma database config
│   ├── redis.ts     # Redis config
│   ├── logger.ts    # Winston logger config
│   └── queue.ts     # Bull queue config
├── controllers/     # Route controllers
│   ├── auth.controller.ts
│   ├── character.controller.ts
│   ├── chat.controller.ts
│   ├── economy.controller.ts
│   └── world.controller.ts
├── middleware/      # Express middleware
│   ├── auth.ts      # Authentication
│   ├── validation.ts # Request validation
│   ├── error.ts     # Error handling
│   └── rate-limit.ts # Rate limiting
├── routes/          # API routes
│   ├── auth.routes.ts
│   ├── character.routes.ts
│   ├── chat.routes.ts
│   ├── economy.routes.ts
│   ├── world.routes.ts
│   └── index.ts
├── services/        # Business logic
│   ├── auth.service.ts
│   ├── character.service.ts
│   ├── chat.service.ts
│   ├── economy.service.ts
│   └── world.service.ts
├── socket/          # Socket.io handlers
│   ├── index.ts
│   ├── character.handler.ts
│   ├── chat.handler.ts
│   └── world.handler.ts
├── types/           # TypeScript types
│   └── index.ts
├── utils/           # Utility functions
│   ├── jwt.ts
│   ├── bcrypt.ts
│   ├── response.ts
│   └── validators.ts
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint code
npm run lint:fix     # Fix linting issues
npm run test         # Run tests
npm run test:coverage # Run tests with coverage
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate  # Run database migrations
npm run prisma:studio   # Open Prisma Studio
```

## License

MIT
