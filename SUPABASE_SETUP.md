# Supabase Migration Guide

## What Changed

Your application has been migrated from MySQL to Supabase (PostgreSQL). The good news is that your code remains mostly the same since we're still using Sequelize ORM.

## Setup Steps

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - Project name: `skonnect` (or your preferred name)
   - Database password: Choose a strong password (save this!)
   - Region: Choose closest to your users
5. Wait for the project to be created (takes ~2 minutes)

### 2. Get Your Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (the long string under "Project API keys")

3. Go to **Settings** → **Database**
4. Scroll down to **Connection string** → **URI**
5. Copy the connection string (it will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)
6. Replace `[YOUR-PASSWORD]` with the database password you created in step 1

### 3. Update Your .env File

Open the `.env` file in your project root and replace the placeholder values:

```env
SUPABASE_URL=https://your-actual-project-ref.supabase.co
SUPABASE_KEY=your-actual-anon-key-here
DATABASE_URL=postgresql://postgres:your-actual-password@db.your-project-ref.supabase.co:5432/postgres
```

### 4. Run Migrations

Create all tables in Supabase:

```bash
npm run migrate
```

This will create these tables:
- users
- sysusers
- announcements
- projects
- expenditures
- financial_reports
- feedback
- project_files

### 5. Import Your Existing Data

Import all your MySQL data into Supabase:

```bash
npm run import-data
```

This will import:
- All system users (chairperson, secretary, treasurer, etc.)
- All projects
- All announcements
- All financial reports
- All expenditures
- All feedback

### 6. Verify Everything

1. Check your Supabase dashboard → **Table Editor**
2. You should see all tables with your data
3. Start your app:

```bash
npm run xian
```

4. Login with existing credentials:
   - Chairperson: chair@gmail.com
   - Secretary: secretary@gmail.com
   - Treasurer: treasurer@gmail.com
   - Councilor: councilor@gmail.com
   - Admin: markdaveako@gmail.com

## What's Different?

### Database Dialect
- **Before:** MySQL
- **After:** PostgreSQL (Supabase uses PostgreSQL)

### Connection
- **Before:** Local MySQL server
- **After:** Cloud-hosted Supabase PostgreSQL with SSL

### Dependencies
- **Removed:** `mysql2`
- **Added:** `pg`, `pg-hstore`, `@supabase/supabase-js`, `dotenv`

## Benefits of Supabase

1. **Hosted Database** - No need to manage your own MySQL server
2. **Built-in Auth** - Can use Supabase Auth in the future
3. **Real-time** - Built-in real-time subscriptions
4. **Storage** - File storage included
5. **Auto-generated API** - REST and GraphQL APIs
6. **Dashboard** - Easy database management UI

## Troubleshooting

### Connection Error
- Double-check your `.env` file has the correct values
- Make sure you replaced `[YOUR-PASSWORD]` with your actual password
- Verify your Supabase project is active

### SSL Error
- The SSL configuration is already set in `models/db.js`
- Supabase requires SSL connections

### Migration Issues
- Check the Supabase dashboard → Table Editor to see if tables were created
- Look at the console logs for specific error messages

## Next Steps (Optional)

You can enhance your app with Supabase features:

1. **Use Supabase Auth** instead of custom bcrypt authentication
2. **Row Level Security (RLS)** for better data protection
3. **Real-time subscriptions** for live updates
4. **Storage** for file uploads

The `supabase` client is already exported from `models/db.js` if you want to use these features.

## Need Help?

- Supabase Docs: https://supabase.com/docs
- Sequelize + PostgreSQL: https://sequelize.org/docs/v6/other-topics/dialect-specific-things/#postgresql
