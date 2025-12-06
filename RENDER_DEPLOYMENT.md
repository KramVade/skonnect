# Deploy to Render

## Quick Setup Steps

### 1. Create a Render Account
- Go to https://render.com
- Sign up with your GitHub account

### 2. Create a New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `KramVade/skonnect`
3. Configure the service:

**Basic Settings:**
- **Name**: `skonnect` (or your preferred name)
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: leave blank
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Start with **Free** tier (can upgrade later)

### 3. Environment Variables
Click "Advanced" and add these environment variables:

```
NODE_ENV=production
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
SESSION_SECRET=your_random_secret_key_here
```

**Important:** Copy these values from your `.env` file, but generate a new strong SESSION_SECRET for production.

### 4. Deploy
- Click "Create Web Service"
- Render will automatically deploy your app
- Wait 2-5 minutes for the build to complete

### 5. Access Your App
- Your app will be available at: `https://skonnect.onrender.com` (or your chosen name)
- The URL will be shown in the Render dashboard

## Post-Deployment

### Auto-Deploy
- Every push to your `main` branch will automatically trigger a new deployment
- You can disable this in Settings if needed

### View Logs
- Click "Logs" in your service dashboard to see real-time logs
- Useful for debugging issues

### Custom Domain (Optional)
- Go to Settings → Custom Domain
- Add your domain and follow DNS instructions

## Troubleshooting

### App Won't Start
- Check logs for errors
- Verify all environment variables are set correctly
- Ensure PORT is set to 3000 or use `process.env.PORT`

### Database Connection Issues
- Verify SUPABASE_URL and SUPABASE_KEY are correct
- Check Supabase dashboard for connection limits

### Session Issues
- Make sure SESSION_SECRET is set in environment variables
- Sessions will reset on each deployment (use database sessions for persistence)

## Free Tier Limitations
- App sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- 750 hours/month free (enough for one service running 24/7)
- Upgrade to paid plan ($7/month) for always-on service

## Need Help?
- Render Docs: https://render.com/docs
- Support: https://render.com/support
