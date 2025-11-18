# Vercel Deployment Guide

## Prerequisites

- Vercel account (create at [vercel.com](https://vercel.com))
- Successfully built project (`pnpm build`)

## Method 1: Deploy via CLI (Faster)

### Step 1: Login
```bash
npx vercel login
```
Or if you have Vercel CLI installed globally:
```bash
vercel login
```

### Step 2: Deploy
```bash
npx vercel
```

### Step 3: Follow the instructions
- Choose your scope (personal account or organization)
- Confirm the project name
- Confirm the settings

### Step 4: Deploy to Production
```bash
npx vercel --prod
```

## Method 2: Deploy via Dashboard

1. Visit [vercel.com/new](https://vercel.com/new)
2. Log in with GitHub/GitLab/Bitbucket
3. Import your repository
4. Vercel will automatically detect:
   - Framework: Next.js
   - Build Command: `pnpm build`
   - Output Directory: `.next`
5. Click "Deploy"

## Post-Deployment Verification

After deployment, verify:
- ✅ The application loads correctly
- ✅ Dynamic routes work (`/[center]`)
- ✅ i18n is working (EN/PT)
- ✅ Booking form works
- ✅ LocalStorage works in the browser

## URLs

After deployment, you will receive:
- **Preview URL**: `https://your-project-xxx.vercel.app` (for each commit)
- **Production URL**: `https://your-project.vercel.app` (after `vercel --prod`)

## Troubleshooting

### Build Error
If the build fails, verify:
```bash
pnpm build
```

### Authentication Error
```bash
npx vercel logout
npx vercel login
```

### Clear Cache
```bash
rm -rf .next
pnpm build
```
