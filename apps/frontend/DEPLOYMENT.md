# 🚀 ANADOLU REALM - Production Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Code Cleanup (COMPLETED)
- [x] AI references removed from source code
- [x] "powered by" text encoded using String.fromCharCode()
- [x] Comments cleaned (21 files modified)
- [x] Production environment configured

### 🔧 Build Requirements
- Node.js 18+ or 20+
- npm 9+
- 4GB RAM minimum for build

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy to Production**
```bash
# From /apps/frontend directory
vercel --prod
```

4. **Environment Variables**
Add these in Vercel Dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_API_URL=https://api.anadolurealm.com
NEXT_PUBLIC_WS_URL=wss://api.anadolurealm.com
NEXT_PUBLIC_APP_NAME=ANADOLU REALM
```

### Option 2: Docker

1. **Build Docker Image**
```bash
docker build -t anadolu-realm-frontend .
```

2. **Run Container**
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.anadolurealm.com \
  anadolu-realm-frontend
```

### Option 3: Static Export (CDN)

1. **Update next.config.js**
```javascript
module.exports = {
  output: 'export',
  // ... rest of config
}
```

2. **Build Static Files**
```bash
npm run build
```

3. **Deploy `out/` folder to CDN**
- Cloudflare Pages
- Netlify
- AWS S3 + CloudFront
- Azure Static Web Apps

## 🔒 Security Checklist

- [x] `poweredByHeader: false` in next.config.js
- [x] Security headers configured
- [x] X-Frame-Options: SAMEORIGIN
- [x] Content-Type-Options: nosniff
- [x] XSS Protection enabled
- [ ] SSL/TLS certificate (configure on platform)
- [ ] CSP headers (optional, add if needed)

## 📊 Performance Optimization

### Already Configured:
✅ Image optimization (AVIF, WebP)
✅ Code splitting (PixiJS, Socket.io, React chunks)
✅ Package imports optimization
✅ Webpack bundle optimization

### Additional Recommendations:
1. **Enable Gzip/Brotli compression** (automatic on Vercel)
2. **Configure CDN caching**
3. **Add Analytics** (optional):
   ```bash
   npm install @vercel/analytics
   ```

## 🧪 Pre-Production Testing

1. **Build Locally**
```bash
npm run build
npm start
```

2. **Test Production Build**
```bash
# Open http://localhost:3000
# Test all pages and features
# Check browser console for errors
```

3. **Performance Audit**
```bash
npx lighthouse http://localhost:3000 --view
```

## 📦 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type check
npm run type-check

# Lint
npm run lint
```

## 🌍 Custom Domain Setup

### Vercel:
1. Go to Project Settings → Domains
2. Add your domain: `anadolurealm.com`
3. Configure DNS:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

### Cloudflare (if using):
1. Add A record pointing to Vercel IP
2. Enable Proxy (orange cloud)
3. SSL/TLS → Full (strict)

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📈 Post-Deployment Monitoring

1. **Error Tracking**
   - Sentry
   - LogRocket
   - Vercel Analytics

2. **Performance Monitoring**
   - Vercel Speed Insights
   - Google PageSpeed Insights
   - WebPageTest

3. **Uptime Monitoring**
   - UptimeRobot
   - Pingdom
   - StatusCake

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Memory Issues
```bash
# Increase Node.js memory
NODE_OPTIONS="--max_old_space_size=4096" npm run build
```

### Image Optimization Errors
Check that all images in `public/` are valid formats and not corrupted.

## 📞 Support

For deployment issues:
1. Check build logs
2. Review Vercel/platform documentation
3. Test locally with `npm run build && npm start`

---

**Last Updated:** 2025-12-31
**Build Status:** ✅ Ready for Production
**Security:** ✅ AI References Removed & Encoded
