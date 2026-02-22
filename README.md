<div align="center">

# Anadolu Realm - Turkish Digital Metropolis MMO

<p><em>Pixel Art MMO with PixiJS 8 Engine, Real-Time Economy, and Authentic Turkish Cultural Heritage</em></p>

<p>
  <a href="#overview"><img src="https://img.shields.io/badge/Docs-Overview-blue?style=for-the-badge" alt="Overview"></a>
  <a href="#game-architecture"><img src="https://img.shields.io/badge/Docs-Architecture-purple?style=for-the-badge" alt="Architecture"></a>
  <a href="#key-features"><img src="https://img.shields.io/badge/Docs-Features-green?style=for-the-badge" alt="Features"></a>
  <a href="#getting-started"><img src="https://img.shields.io/badge/Docs-Setup-orange?style=for-the-badge" alt="Setup"></a>
</p>

<p>
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Status">
  <img src="https://img.shields.io/badge/License-Proprietary-red?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/PixiJS-8.x-E72264?style=flat-square" alt="PixiJS">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL">
</p>

<br>

<table>
<tr>
<td width="50%">

**Platform Highlights**
- Living Istanbul recreation with full Anatolian expansion
- 60 FPS hardware-accelerated PixiJS 8 pixel art rendering
- Unlimited concurrent multiplayer via Socket.io engine
- Fully functioning digital economy: jobs, real estate, trading

</td>
<td width="50%">

**Technical Excellence**
- 5 character classes with 150+ fluid animations each
- Authentic Turkish mini-games: Tavla, Okey, and Batak
- 30+ modular UI components with extensible architecture
- PostgreSQL 16 with Prisma ORM for persistent game state

</td>
</tr>
</table>

</div>

---

## Overview

Anadolu Realm is a living Turkish digital metropolis — an MMO simulation game that places players in a pixel art recreation of Istanbul and the broader Anatolian landscape. The game features a fully functioning digital economy, authentic Turkish mini-games, unlimited multiplayer via Socket.io, and 60 FPS rendering powered by PixiJS 8.

## Game Architecture

```mermaid
graph TD
    subgraph "Client"
        A[Next.js 15 App] --> B[PixiJS 8 Engine]
        A --> C[UI Layer - React]
        B --> D[Sprite System]
        B --> E[Animation Engine]
        B --> F[Tile Map Renderer]
    end
    subgraph "Server"
        G[Socket.io Hub] --> H[Game State Manager]
        H --> I[Economy Engine]
        H --> J[Social System]
        H --> K[Match System]
    end
    subgraph "Data"
        L[PostgreSQL] --> H
        M[Redis] --> G
    end
    A <-->|WebSocket| G
```

## Key Features

- **Living Turkish City Simulation** — Istanbul recreation with Anatolia expansion planned
- **60 FPS PixiJS 8 Rendering** — Hardware-accelerated 32x32 pixel art sprites at 60 frames per second
- **Unlimited Multiplayer** — Socket.io real-time engine for concurrent player management
- **5 Character Classes** — Business, Developer, Designer, Marketer, and Merchant archetypes
- **150+ Character Animations** — Fluid character movement and action sequences
- **30+ UI Components** — Modular UI system built for extensibility
- **Turkish Mini-Games** — Authentic Backgammon (Tavla), Okey, and Batak (Turkish card game)
- **Digital Economy** — Jobs, real estate, trading system, and marketplace
- **Social System** — In-game chat, friends list, guild formation, and marketplace

## Tech Stack

| Layer | Technology | Badge |
|:------|:-----------|:------|
| Frontend Framework | Next.js 15, React 19 | ![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js) ![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black) |
| Game Engine | PixiJS 8 | ![PixiJS](https://img.shields.io/badge/PixiJS-8-E72264?style=flat-square) |
| Animation | GSAP, Three.js | ![GSAP](https://img.shields.io/badge/GSAP-latest-88CE02?style=flat-square) |
| Real-Time | Socket.io | ![Socket.io](https://img.shields.io/badge/Socket.io-latest-black?style=flat-square&logo=socket.io) |
| Database | PostgreSQL 16, Prisma ORM | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white) |
| Language | TypeScript | ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| Build | Turborepo | ![Turborepo](https://img.shields.io/badge/Turborepo-latest-EF4444?style=flat-square) |
| Container | Docker | ![Docker](https://img.shields.io/badge/Docker-latest-2496ED?style=flat-square&logo=docker&logoColor=white) |

## Project Structure

```
anatolia.ailydian.com/
├── apps/
│   ├── web/              # Next.js 15 game client
│   │   ├── src/
│   │   │   ├── engine/   # PixiJS 8 game engine
│   │   │   ├── scenes/   # Game scenes and maps
│   │   │   ├── sprites/  # Character and tile sprites
│   │   │   ├── ui/       # React UI overlay
│   │   │   └── economy/  # Digital economy logic
│   │   └── public/
│   │       └── assets/   # Pixel art sprites and tiles
│   └── server/           # Socket.io game server
│       ├── src/
│       │   ├── rooms/    # Game room management
│       │   ├── economy/  # Server-side economy engine
│       │   ├── social/   # Chat, friends, guilds
│       │   └── games/    # Mini-game servers
├── packages/
│   ├── shared/           # Shared types and utilities
│   └── assets/           # Shared sprite and audio assets
├── infra/                # Infrastructure configs
└── tools/                # Build and development tools
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+
- PostgreSQL 16
- Redis 7

### Installation

```bash
# Clone the repository
git clone https://github.com/lydianai/anatolia.ailydian.com.git
cd anatolia.ailydian.com

# Install dependencies
pnpm install

# Configure environment variables
cp apps/web/.env.example apps/web/.env.local
cp apps/server/.env.example apps/server/.env

# Run database migrations
pnpm db:migrate

# Start the development stack
pnpm dev
```

The game client will be available at `http://localhost:3000` and the game server at `ws://localhost:4000`.

### Docker Quick Start

```bash
docker compose up -d
```

## Character Classes

| Class | Role | Strengths |
|---|---|---|
| Business | CEO / Entrepreneur | Real estate, trade, finance |
| Developer | Software Engineer | Tech jobs, digital products |
| Designer | Creative Director | Art, branding, content |
| Marketer | Growth Specialist | Advertising, social reach |
| Merchant | Trader | Marketplace, arbitrage, bulk deals |

## Economy System

The digital economy mirrors real-world dynamics:

- **Jobs** — Characters can work in virtual companies to earn in-game currency
- **Real Estate** — Buy, sell, and develop virtual properties across the city
- **Trading** — Player-to-player marketplace with supply and demand mechanics
- **Businesses** — Establish and run virtual companies employing other players

## Mini-Games

| Game | Type | Players |
|---|---|---|
| Tavla (Backgammon) | Strategy Board Game | 2 |
| Okey | Tile-Based Rummy | 2-4 |
| Batak | Turkish Card Game | 4 |

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `REDIS_URL` | Redis connection string | Yes |
| `NEXTAUTH_SECRET` | Authentication secret | Yes |
| `SOCKET_SERVER_URL` | WebSocket server URL | Yes |
| `NEXT_PUBLIC_GAME_SERVER` | Client-side game server URL | Yes |

## Security

See [SECURITY.md](SECURITY.md) for the vulnerability reporting policy.

- JWT-based session management
- Rate limiting on all game API endpoints
- Anti-cheat server-side validation for economy transactions
- OWASP Top 10 mitigations applied

## License

Copyright (c) 2024-2026 Lydian (AiLydian). All Rights Reserved.

This is proprietary software. See [LICENSE](LICENSE) for full terms.

---

Built by [AiLydian](https://www.ailydian.com)
