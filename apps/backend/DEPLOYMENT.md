# Turk Dijital Metropol Backend - Deployment Guide

## Development Deployment

### Using Docker Compose (Recommended)

```bash
# Start PostgreSQL and Redis
docker-compose up -d

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Start development server
npm run dev
```

Server will run on: http://localhost:3001

### Without Docker

```bash
# Install PostgreSQL
brew install postgresql@15
brew services start postgresql@15

# Install Redis
brew install redis
brew services start redis

# Create database
createdb turk_dijital_metropol

# Install dependencies
npm install

# Setup and migrate database
npm run prisma:generate
npm run prisma:migrate

# Start development server
npm run dev
```

## Production Deployment

### Option 1: Docker (Recommended)

#### Build Image
```bash
docker build -t turk-metropol-backend .
```

#### Run Container
```bash
docker run -d \
  --name turk-metropol-api \
  -p 3001:3001 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  -e REDIS_HOST="your-redis-host" \
  -e JWT_SECRET="your-secret" \
  -e NODE_ENV="production" \
  turk-metropol-backend
```

### Option 2: PM2 (Node.js Process Manager)

```bash
# Install PM2
npm install -g pm2

# Build project
npm run build

# Start with PM2
pm2 start dist/server.js --name turk-metropol-api

# Save PM2 config
pm2 save

# Setup startup script
pm2 startup
```

### Option 3: Systemd (Linux)

Create `/etc/systemd/system/turk-metropol-api.service`:

```ini
[Unit]
Description=Turk Dijital Metropol API
After=network.target postgresql.service redis.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/turk-metropol-backend
ExecStart=/usr/bin/node dist/server.js
Restart=on-failure
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=turk-metropol-api
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl enable turk-metropol-api
sudo systemctl start turk-metropol-api

# Check status
sudo systemctl status turk-metropol-api
```

## Cloud Platforms

### Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create turk-metropol-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Add Redis
heroku addons:create heroku-redis:hobby-dev

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret-key

# Deploy
git push heroku main

# Run migrations
heroku run npm run prisma:migrate
```

### DigitalOcean App Platform

1. Create a new app from your Git repository
2. Add PostgreSQL database
3. Add Redis database
4. Set environment variables
5. Deploy

### AWS (EC2 + RDS + ElastiCache)

#### Setup EC2
```bash
# SSH to EC2 instance
ssh -i key.pem ubuntu@your-instance-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone your-repo-url
cd turk-metropol-backend

# Install dependencies
npm install

# Build
npm run build

# Setup environment
cp .env.example .env
nano .env  # Edit with your RDS and ElastiCache credentials

# Run migrations
npm run prisma:migrate

# Start with PM2
pm2 start dist/server.js --name turk-metropol-api
pm2 save
pm2 startup
```

#### Setup RDS (PostgreSQL)
1. Create RDS PostgreSQL instance
2. Update security group to allow EC2 access
3. Update DATABASE_URL in .env

#### Setup ElastiCache (Redis)
1. Create ElastiCache Redis instance
2. Update security group to allow EC2 access
3. Update REDIS_HOST in .env

### Google Cloud Platform (Cloud Run)

```bash
# Build and push to GCR
gcloud builds submit --tag gcr.io/PROJECT_ID/turk-metropol-api

# Deploy to Cloud Run
gcloud run deploy turk-metropol-api \
  --image gcr.io/PROJECT_ID/turk-metropol-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production,DATABASE_URL=...,REDIS_HOST=...
```

## Environment Variables (Production)

```env
# Server
NODE_ENV=production
PORT=3001
HOST=0.0.0.0

# Database (use connection pooling)
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=5&pool_timeout=20"

# Redis
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# Security (MUST CHANGE!)
JWT_SECRET=generate-strong-random-secret-32-chars-min
JWT_REFRESH_SECRET=generate-another-strong-secret

# CORS (your frontend domain)
CORS_ORIGIN=https://yourdomain.com
SOCKET_CORS_ORIGIN=https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=warn
LOG_FILE_PATH=/var/log/turk-metropol
```

## Database Migration in Production

### Manual Migration
```bash
# SSH to server
ssh user@your-server

# Navigate to project
cd /path/to/turk-metropol-backend

# Run migration
npm run prisma:migrate

# Restart service
pm2 restart turk-metropol-api
```

### Zero-Downtime Migration
```bash
# 1. Create backup
pg_dump -U postgres turk_dijital_metropol > backup.sql

# 2. Run migration on staging
npm run prisma:migrate

# 3. Test staging thoroughly

# 4. Run migration on production during low traffic
npm run prisma:migrate

# 5. Monitor logs
pm2 logs turk-metropol-api
```

## SSL/TLS Setup

### Using Nginx as Reverse Proxy

```nginx
# /etc/nginx/sites-available/turk-metropol-api
server {
    listen 80;
    listen [::]:80;
    server_name api.yourdomain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.yourdomain.com;

    # SSL certificates (use Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Proxy to Node.js
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket support (for Socket.io)
    location /socket.io/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/turk-metropol-api /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Let's Encrypt SSL Certificate

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d api.yourdomain.com

# Auto-renewal (already configured)
sudo certbot renew --dry-run
```

## Monitoring

### Health Check Endpoint
```bash
# Check if server is healthy
curl https://api.yourdomain.com/api/v1/health
```

### PM2 Monitoring
```bash
# View logs
pm2 logs turk-metropol-api

# Monitor resources
pm2 monit

# View status
pm2 status
```

### System Monitoring

#### Install Monitoring Tools
```bash
# Prometheus + Grafana
# New Relic
# DataDog
# Or use cloud provider monitoring
```

## Backup Strategy

### Database Backup
```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/postgres"
DB_NAME="turk_dijital_metropol"

mkdir -p $BACKUP_DIR
pg_dump -U postgres $DB_NAME > $BACKUP_DIR/backup_$DATE.sql
gzip $BACKUP_DIR/backup_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete
```

```bash
# Add to crontab
crontab -e

# Daily backup at 2 AM
0 2 * * * /path/to/backup-script.sh
```

### Redis Backup
```bash
# Redis automatically creates dump.rdb
# Configure in redis.conf:
save 900 1      # Save after 900 sec if 1 key changed
save 300 10     # Save after 300 sec if 10 keys changed
save 60 10000   # Save after 60 sec if 10000 keys changed
```

## Scaling

### Horizontal Scaling

#### Using PM2 Cluster Mode
```bash
# Start multiple instances
pm2 start dist/server.js -i max --name turk-metropol-api

# Or specify number of instances
pm2 start dist/server.js -i 4 --name turk-metropol-api
```

#### Using Load Balancer
```nginx
# Nginx load balancer
upstream turk_metropol_backend {
    least_conn;
    server localhost:3001;
    server localhost:3002;
    server localhost:3003;
    server localhost:3004;
}

server {
    location / {
        proxy_pass http://turk_metropol_backend;
    }
}
```

### Vertical Scaling
- Upgrade server resources (CPU, RAM)
- Optimize database queries
- Implement caching
- Use Redis for sessions

## Performance Optimization

### Database
- Add indexes for frequently queried fields
- Use connection pooling
- Implement query caching with Redis
- Use database read replicas

### Redis
- Use Redis for session storage
- Cache frequently accessed data
- Implement pub/sub for real-time features

### Application
- Enable gzip compression (already enabled)
- Use CDN for static assets
- Implement rate limiting (already enabled)
- Monitor and optimize slow endpoints

## Security Checklist

- [ ] Use strong JWT secrets (32+ characters)
- [ ] Enable HTTPS only
- [ ] Configure CORS properly
- [ ] Implement rate limiting
- [ ] Use helmet for security headers
- [ ] Sanitize user input
- [ ] Hash passwords with bcrypt
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Enable database SSL connections
- [ ] Implement request logging
- [ ] Set up firewall rules
- [ ] Regular security audits

## Troubleshooting

### Check Logs
```bash
# PM2 logs
pm2 logs turk-metropol-api --lines 100

# System logs
journalctl -u turk-metropol-api -f

# Application logs
tail -f /var/log/turk-metropol/application.log
```

### Database Issues
```bash
# Check connection
psql $DATABASE_URL

# Check connections
SELECT count(*) FROM pg_stat_activity;

# Kill idle connections
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = 'idle';
```

### Redis Issues
```bash
# Check connection
redis-cli -h $REDIS_HOST ping

# Monitor commands
redis-cli monitor

# Check memory
redis-cli info memory
```

## Support

- Documentation: See README.md and API.md
- Logs: Check application and system logs
- Monitoring: Use monitoring dashboards
- Backup: Ensure regular backups are running

## License

MIT
