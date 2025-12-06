# Quick Start - Supabase Setup

## 🚀 3-Minute Setup

### Step 1: Create Supabase Project
1. Go to https://supabase.com → New Project
2. Save your database password!

### Step 2: Get Your Credentials
In Supabase Dashboard:
- **Settings → API**: Copy Project URL and anon key
- **Settings → Database**: Copy Connection string (URI format)

### Step 3: Update .env File
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGc...your-key-here
DATABASE_URL=postgresql://postgres:your-password@db.xxxxx.supabase.co:5432/postgres
```

### Step 4: Run Your App
```bash
npm run xian
```

That's it! Your app now uses Supabase instead of MySQL.

## ✅ Verify It Works
- App starts without errors
- Check Supabase Dashboard → Table Editor
- You should see `Users` and `sysusers` tables

## 📚 Full Guide
See `SUPABASE_SETUP.md` for detailed instructions and troubleshooting.
