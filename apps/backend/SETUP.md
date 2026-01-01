# Turk Dijital Metropol Backend - Setup Guide

## Quick Start

### 1. Prerequisites
```bash
# Node.js 18+
node --version

# PostgreSQL 14+
psql --version

# Redis 6+
redis-cli --version
```

### 2. Install Dependencies
```bash
cd /Users/sardag/Desktop/TURK-DIJITAL-METROPOL/apps/backend
npm install
```

### 3. Setup Database

#### PostgreSQL
```bash
# Create database
createdb turk_dijital_metropol

# Or using psql
psql -U postgres
CREATE DATABASE turk_dijital_metropol;
\q
```

#### Redis
```bash
# Start Redis server
redis-server

# Or with Homebrew
brew services start redis
```

### 4. Environment Configuration

The `.env` file is already created. Update these values if needed:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/turk_dijital_metropol?schema=public"
```

### 5. Database Migration
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Open Prisma Studio (optional)
npm run prisma:studio
```

### 6. Start Development Server
```bash
npm run dev
```

Server will start at: `http://localhost:3001`

## Verification

### Test API
```bash
# Health check
curl http://localhost:3001/api/v1/health

# Expected response:
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Test Registration
```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123"
  }'
```

### Test Socket.io Connection
```javascript
// In browser console or Node.js
const socket = io('http://localhost:3001', {
  auth: { token: 'your-jwt-token' }
});

socket.on('connect', () => {
  console.log('Connected!');
});
```

## Project Structure

```
apps/backend/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── config/                # Configuration files
│   │   ├── database.ts        # Prisma setup
│   │   ├── redis.ts           # Redis setup
│   │   ├── logger.ts          # Winston logger
│   │   ├── queue.ts           # Bull queue
│   │   └── socket.ts          # Socket.io config
│   ├── controllers/           # Route controllers
│   │   ├── auth.controller.ts
│   │   ├── character.controller.ts
│   │   ├── chat.controller.ts
│   │   ├── economy.controller.ts
│   │   └── world.controller.ts
│   ├── middleware/            # Express middleware
│   │   ├── auth.ts            # JWT authentication
│   │   ├── validation.ts      # Joi validation
│   │   ├── error.ts           # Error handling
│   │   └── rate-limit.ts      # Rate limiting
│   ├── routes/                # API routes
│   │   ├── auth.routes.ts
│   │   ├── character.routes.ts
│   │   ├── chat.routes.ts
│   │   ├── economy.routes.ts
│   │   ├── world.routes.ts
│   │   └── index.ts
│   ├── services/              # Business logic
│   │   ├── auth.service.ts
│   │   ├── character.service.ts
│   │   ├── chat.service.ts
│   │   ├── economy.service.ts
│   │   └── world.service.ts
│   ├── socket/                # Socket.io handlers
│   │   ├── index.ts
│   │   ├── character.handler.ts
│   │   ├── chat.handler.ts
│   │   └── world.handler.ts
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   ├── utils/                 # Utilities
│   │   ├── jwt.ts
│   │   ├── bcrypt.ts
│   │   ├── response.ts
│   │   └── validators.ts
│   ├── app.ts                 # Express setup
│   └── server.ts              # Entry point
├── .env                       # Environment variables
├── .env.example               # Environment template
├── .gitignore                 # Git ignore
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── .eslintrc.json             # ESLint config
├── jest.config.js             # Jest config
├── README.md                  # Documentation
├── API.md                     # API documentation
└── SETUP.md                   # This file
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Production
npm run build            # Build TypeScript
npm run start            # Start production server

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio GUI

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues

# Testing
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/profile` - Get profile
- `PATCH /api/v1/auth/profile` - Update profile
- `POST /api/v1/auth/logout` - Logout

### Characters
- `POST /api/v1/characters` - Create character
- `GET /api/v1/characters` - Get all characters
- `GET /api/v1/characters/:id` - Get character
- `PATCH /api/v1/characters/:id` - Update character
- `DELETE /api/v1/characters/:id` - Delete character
- `GET /api/v1/characters/:id/nearby` - Get nearby characters

### Chat
- `POST /api/v1/chat/messages` - Send message
- `GET /api/v1/chat/messages/:roomId` - Get messages
- `DELETE /api/v1/chat/messages/:id` - Delete message
- `POST /api/v1/chat/rooms` - Create room
- `GET /api/v1/chat/rooms` - Get rooms
- `GET /api/v1/chat/rooms/:id` - Get room

### Economy
- `POST /api/v1/economy/transactions` - Create transaction
- `GET /api/v1/economy/transactions` - Get transactions
- `GET /api/v1/economy/balance/:characterId` - Get balance

### World
- `GET /api/v1/world/zones` - Get active zones
- `GET /api/v1/world/zones/:zone` - Get zone state
- `GET /api/v1/world/zones/:zone/players` - Get players in zone
- `PATCH /api/v1/world/zones/:zone` - Update zone state

## Socket.io Events

### Client -> Server
- `character:move` - Update position
- `character:action` - Perform action
- `chat:send` - Send message
- `chat:join` - Join room
- `chat:leave` - Leave room
- `world:subscribe` - Subscribe to zone
- `world:unsubscribe` - Unsubscribe from zone
- `ping` - Ping server

### Server -> Client
- `character:moved` - Character moved
- `character:update` - Character updated
- `chat:message` - New message
- `world:update` - World updated
- `player:joined` - Player joined
- `player:left` - Player left
- `error` - Error occurred
- `pong` - Pong response

## Database Models

### Core Tables
- **User** - Authentication and profile
- **Character** - Player characters
- **InventoryItem** - Character inventory
- **Transaction** - Economy transactions
- **ChatMessage** - Chat messages
- **ChatRoom** - Chat rooms
- **WorldState** - World/zone state
- **Achievement** - Achievements
- **UserAchievement** - User progress
- **Friendship** - Social connections

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Helmet security headers
- CORS protection
- Rate limiting
- Request validation
- Error handling
- Logging

## Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
pg_isready

# Verify connection string in .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/turk_dijital_metropol"
```

### Redis Connection Error
```bash
# Check Redis is running
redis-cli ping
# Should return: PONG

# Start Redis if not running
redis-server
```

### Port Already in Use
```bash
# Find process on port 3001
lsof -i :3001

# Kill process
kill -9 <PID>
```

### Prisma Migration Issues
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Force migration
npx prisma migrate deploy
```

## Production Deployment

### Environment Variables
Update `.env` for production:
```env
NODE_ENV=production
DATABASE_URL=your-production-db-url
REDIS_HOST=your-redis-host
JWT_SECRET=strong-random-secret
```

### Build and Run
```bash
npm run build
npm run start
```

### Docker Support (Optional)
```dockerfile
# Create Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## Support

For issues or questions:
1. Check the logs: `logs/` directory
2. Review API documentation: `API.md`
3. Check database with Prisma Studio: `npm run prisma:studio`
4. Enable debug logging: `LOG_LEVEL=debug` in `.env`

## Next Steps

1. Start the backend server: `npm run dev`
2. Test the API endpoints
3. Connect frontend application
4. Set up Socket.io client
5. Implement game logic
6. Add more features

## License

MIT
