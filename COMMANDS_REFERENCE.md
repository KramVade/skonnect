# Commands Reference 📝

Quick reference for all available commands in your SKONNECT system.

## Database Commands

### Create Tables
```bash
npm run migrate
```
Creates all database tables in Supabase. Run this first before any other database command.

### Generate Mock Data
```bash
npm run seed
```
Populates your database with realistic test data:
- 8 system users (password: password123)
- 8 projects with various statuses
- 6 announcements
- 4 financial reports
- 6 expenditures
- 5 feedback entries

**Note:** This clears existing data first!

### Import Real MySQL Data
```bash
npm run import-data
```
Imports your existing data from the MySQL dump file (`test (1).sql`).
Use this if you want to migrate your real production data.

## Application Commands

### Start Development Server
```bash
npm run xian
```
Starts the app with nodemon (auto-reload on file changes).
Best for development.

### Start Production Server
```bash
npm run xian-start
```
Starts the app with node (no auto-reload).
Best for production deployment.

## Code Generation Commands

### Create New Model
```bash
npm run create:model
```
Interactive command to generate a new Sequelize model file.

### Create New Controller
```bash
npm run create:controller
```
Interactive command to generate a new controller file.

## Typical Workflows

### First Time Setup
```bash
# 1. Setup Supabase and update .env
# 2. Create tables
npm run migrate

# 3. Add data (choose one)
npm run seed          # For testing with mock data
# OR
npm run import-data   # For real data migration

# 4. Start app
npm run xian
```

### Daily Development
```bash
npm run xian
```

### Reset Database with Fresh Mock Data
```bash
npm run seed
```

### After Model Changes
```bash
npm run migrate
```

## Environment Variables

Make sure your `.env` file is configured:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
DATABASE_URL=postgresql://postgres.xxx:password@aws-0-region.pooler.supabase.com:5432/postgres
```

## Troubleshooting Commands

### Test Database Connection
```bash
node -e "import('./models/db.js').then(m => m.sequelize.authenticate().then(() => console.log('✅ Connected!')))"
```

### Check Node Version
```bash
node --version
```
Should be v14 or higher.

### Check Installed Packages
```bash
npm list --depth=0
```

### Reinstall Dependencies
```bash
npm install
```

## Quick Tips

- Always run `npm run migrate` before `npm run seed` or `npm run import-data`
- Use `npm run seed` for testing and demos
- Use `npm run import-data` for production migration
- Check Supabase dashboard to verify data after seeding/importing
- Use `npm run xian` (with nodemon) during development
- Use `npm run xian-start` for production deployment

## Port Information

- Default port: **3000**
- Access at: http://localhost:3000
- Change port: Set `PORT` environment variable

## Documentation Files

- **START_HERE.md** - Quick start guide
- **MOCK_DATA_GUIDE.md** - Mock data details
- **MIGRATION_CHECKLIST.md** - Migration steps
- **SUPABASE_SETUP.md** - Detailed Supabase setup
- **README_SUPABASE.md** - Complete documentation
- **COMMANDS_REFERENCE.md** - This file

---

**Need help?** Check the documentation files above or visit https://supabase.com/docs
