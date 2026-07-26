# WalletIQ Deployment Guide

## 🚀 Quick Deployment Options

WalletIQ is a frontend-only application with no backend or database requirements, making it incredibly easy to deploy.

## Option 1: Vercel (Recommended)

### One-Click Deploy
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

### Manual Deploy
```bash
npm install -g vercel
vercel
```

### Environment Variables (Optional)
Add in Vercel dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_ETHERSCAN_API_KEY`
- `NEXT_PUBLIC_BSCSCAN_API_KEY`

## Option 2: Netlify

### Deploy Steps
1. Push code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Click "Deploy"

## Option 3: Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

## Option 4: Docker

### Dockerfile (create this file)
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

### Build and Run
```bash
docker build -t walletiq .
docker run -p 3000:3000 walletiq
```

## Option 5: Static Export (GitHub Pages, etc.)

Since this is a client-side only app, you can export it as static HTML:

### Update next.config.ts
```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

### Build Static Files
```bash
npm run build
```

The `out` directory will contain static files ready to deploy to:
- GitHub Pages
- Amazon S3
- Cloudflare Pages
- Any static hosting

## Environment Variables

### Required
None! The app works without any environment variables.

### Optional (for better rate limits)

#### Etherscan API Key
1. Visit [etherscan.io/apis](https://etherscan.io/apis)
2. Sign up for free account
3. Generate API key
4. Add to environment:
```bash
NEXT_PUBLIC_ETHERSCAN_API_KEY=your_key_here
```

#### BscScan API Key
1. Visit [bscscan.com/apis](https://bscscan.com/apis)
2. Sign up for free account
3. Generate API key
4. Add to environment:
```bash
NEXT_PUBLIC_BSCSCAN_API_KEY=your_key_here
```

## Performance Optimization

### Before Deployment
1. Run production build locally:
```bash
npm run build
npm start
```

2. Check for errors:
```bash
npm run typecheck
```

3. Test on different devices/browsers

### After Deployment
1. Enable Gzip/Brotli compression
2. Add CDN (most platforms do this automatically)
3. Monitor API rate limits
4. Consider adding analytics (optional)

## Custom Domain

### Vercel
1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Netlify
1. Go to site settings
2. Click "Domain management"
3. Add custom domain
4. Configure DNS

## Monitoring

### Recommended Tools
- **Vercel Analytics** - Built-in for Vercel deployments
- **Google Analytics** - Add to track usage
- **Sentry** - Error monitoring (optional)
- **LogRocket** - Session replay (optional)

### Health Check
The app includes a health endpoint at `/api/health` that returns:
```json
{"ok": true}
```

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### API Rate Limits
- Add environment variables for Etherscan and BscScan
- Consider implementing request caching
- Add retry logic with exponential backoff

### CORS Issues
- Should not occur since APIs are called client-side
- If issues arise, consider adding a proxy API route

## Security Considerations

### What's Secure
✅ No backend = no server vulnerabilities
✅ No database = no data breaches
✅ No user authentication = no password leaks
✅ All API calls are read-only
✅ No sensitive data storage

### Best Practices
- Keep dependencies updated
- Monitor for npm security advisories
- Use HTTPS (automatic on most platforms)
- Add Content Security Policy headers
- Enable security headers on hosting platform

## Scaling

### This app scales naturally because:
1. **No backend** - All processing is client-side
2. **No database** - No connection limits
3. **Static assets** - Served from CDN
4. **API calls** - Direct to third-party services

### If You Need More:
- **Rate Limiting**: Add API keys (see above)
- **Caching**: Implement service worker
- **Performance**: Add React.lazy for code splitting

## Cost

### Completely Free on:
- Vercel (Hobby plan)
- Netlify (Free tier)
- GitHub Pages
- Cloudflare Pages
- Railway (Free tier with limits)

### No Costs For:
- Database (none needed)
- Backend servers (none needed)
- API keys (optional, free tiers available)

## Maintenance

### Regular Updates
```bash
# Update dependencies monthly
npm update

# Check for vulnerabilities
npm audit

# Update major versions carefully
npm outdated
```

### Monitoring
- Check CoinGecko API status
- Monitor blockchain API uptime
- Test wallet lookups weekly

---

## 🎉 You're Ready!

WalletIQ is designed to be deployment-friendly. Choose any platform above and you'll be live in minutes.

**Recommended for beginners**: Vercel
**Recommended for static hosting**: Cloudflare Pages
**Recommended for Docker**: Railway or your own VPS

Happy deploying! 🚀
