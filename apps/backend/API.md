# Turk Dijital Metropol API Documentation

## Base URL
```
http://localhost:3001/api/v1
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-token>
```

## Endpoints

### Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "displayName": "Display Name" // optional
}

Response: 201 Created
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "username",
      "displayName": "Display Name",
      "role": "PLAYER",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token"
  },
  "message": "Registration successful",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "username",
      "displayName": "Display Name",
      "role": "PLAYER"
    },
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token"
  },
  "message": "Login successful",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Get Profile
```http
GET /auth/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "displayName": "Display Name",
    "avatar": null,
    "role": "PLAYER",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "lastLoginAt": "2024-01-01T00:00:00.000Z",
    "characters": []
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Characters

#### Create Character
```http
POST /characters
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "CharacterName",
  "class": "ENTREPRENEUR", // ENTREPRENEUR, DEVELOPER, DESIGNER, MARKETER, TRADER
  "appearance": {} // optional
}

Response: 201 Created
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "CharacterName",
    "class": "ENTREPRENEUR",
    "level": 1,
    "balance": 10000,
    ...
  },
  "message": "Character created successfully",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Get All Characters
```http
GET /characters
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "CharacterName",
      "class": "ENTREPRENEUR",
      "level": 1,
      ...
    }
  ],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Get Character by ID
```http
GET /characters/:id

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "CharacterName",
    "class": "ENTREPRENEUR",
    "level": 1,
    ...
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Chat

#### Send Message
```http
POST /chat/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "roomId": "global",
  "content": "Hello, world!",
  "type": "TEXT", // TEXT, EMOTE, SYSTEM, WHISPER
  "characterId": "uuid" // optional
}

Response: 201 Created
{
  "success": true,
  "data": {
    "id": "uuid",
    "content": "Hello, world!",
    "type": "TEXT",
    "roomId": "global",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "user": {
      "id": "uuid",
      "username": "username",
      "displayName": "Display Name"
    }
  },
  "message": "Message sent successfully",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Get Messages
```http
GET /chat/messages/:roomId?page=1&limit=50
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "content": "Hello, world!",
      "type": "TEXT",
      "roomId": "global",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "user": {
        "username": "username",
        "displayName": "Display Name"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 100,
    "totalPages": 2
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Economy

#### Create Transaction
```http
POST /economy/transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "TRANSFER", // TRANSFER, PURCHASE, SALE, REWARD, PENALTY
  "amount": 1000,
  "fromCharacterId": "uuid",
  "toCharacterId": "uuid",
  "description": "Payment for services"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "id": "uuid",
    "type": "TRANSFER",
    "amount": 1000,
    "status": "COMPLETED",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Transaction completed successfully",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Get Balance
```http
GET /economy/balance/:characterId
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "CharacterName",
    "balance": 10000
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### World

#### Get Active Zones
```http
GET /world/zones

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "zone": "spawn",
      "playerCount": 5,
      "lastUpdated": "2024-01-01T00:00:00.000Z"
    }
  ],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Get Zone State
```http
GET /world/zones/:zone

Response: 200 OK
{
  "success": true,
  "data": {
    "zone": "spawn",
    "state": {},
    "playerCount": 5,
    "isActive": true,
    "lastUpdated": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Socket.io Events

### Connection
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', {
  auth: {
    token: 'your-jwt-token'
  }
});
```

### Client Events

#### Character Movement
```javascript
socket.emit('character:move', {
  characterId: 'uuid',
  position: {
    x: 100,
    y: 0,
    z: 50,
    rotation: 0,
    zone: 'spawn'
  },
  velocity: {
    x: 1,
    y: 0,
    z: 0.5
  },
  timestamp: Date.now()
});
```

#### Send Chat Message
```javascript
socket.emit('chat:send', {
  roomId: 'global',
  content: 'Hello, world!',
  type: 'TEXT'
});
```

#### Subscribe to World Updates
```javascript
socket.emit('world:subscribe', 'spawn');
```

### Server Events

#### Character Moved
```javascript
socket.on('character:moved', (data) => {
  console.log('Character moved:', data);
});
```

#### Chat Message Received
```javascript
socket.on('chat:message', (message) => {
  console.log('New message:', message);
});
```

#### World Update
```javascript
socket.on('world:update', (update) => {
  console.log('World updated:', update);
});
```

#### Player Joined
```javascript
socket.on('player:joined', (player) => {
  console.log('Player joined:', player);
});
```

#### Player Left
```javascript
socket.on('player:left', (data) => {
  console.log('Player left:', data.characterId);
});
```

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Common Error Codes
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication failed)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## Rate Limits

- General API: 100 requests per 15 minutes
- Authentication: 5 requests per 15 minutes
- Chat: 30 messages per minute
- Transactions: 10 transactions per minute
