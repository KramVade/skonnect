# SKONNECT - Barangay Management System

A comprehensive web-based management system for Sangguniang Kabataan (SK) barangay operations, built with Node.js, Express, and Supabase.

## Features

- 👥 **User Management** - Multi-role system (Chairperson, Secretary, Treasurer, Councilor, Admin, Public User)
- 📁 **Project Management** - Propose, approve, and track barangay projects
- 📢 **Announcements** - Create and manage community announcements
- 💰 **Financial Tracking** - Budget management, expenditure tracking, and financial reporting
- 💬 **Feedback System** - Collect and manage community feedback
- 📊 **Dashboard** - Role-based dashboards with real-time data
- 🔐 **Authentication** - Secure login with bcrypt password hashing
- 📎 **File Management** - Upload and view attachments inline in browser (PDFs, images, documents)

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: Supabase (PostgreSQL)
- **ORM**: Sequelize
- **Template Engine**: Handlebars (HBS)
- **Styling**: Tailwind CSS
- **Authentication**: bcrypt, express-session

## Prerequisites

- Node.js v14 or higher
- npm or yarn
- Supabase account (free tier available)

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd skonnect-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get credentials from Settings → API and Settings → Database

### 4. Configure Environment

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your Supabase credentials
```

### 5. Setup Database

```bash
# Create tables
npm run migrate

# Option A: Generate mock data (recommended for testing)
npm run seed

# Option B: Import real data from MySQL dump
npm run import-data
```

### 6. Start the Application

```bash
# Development (with auto-reload)
npm run xian

# Production
npm run xian-start
```

Visit http://localhost:3000

## Mock Data Login

After running `npm run seed`, use these credentials:

| Role | Email | Password |
|------|-------|----------|
| Chairperson | chairperson@barangay.gov | password123 |
| Secretary | secretary@barangay.gov | password123 |
| Treasurer | treasurer@barangay.gov | password123 |
| Admin | admin@barangay.gov | password123 |

See [MOCK_DATA_GUIDE.md](MOCK_DATA_GUIDE.md) for complete list.

## Available Commands

```bash
npm run xian              # Start dev server with auto-reload
npm run xian-start        # Start production server
npm run migrate           # Create/update database tables
npm run seed              # Generate mock data
npm run import-data       # Import MySQL data
npm run create:model      # Generate new model
npm run create:controller # Generate new controller
```

See [COMMANDS_REFERENCE.md](COMMANDS_REFERENCE.md) for details.

## Project Structure

```
skonnect-main/
├── controllers/          # Route controllers
├── models/              # Sequelize models
├── routes/              # Express routes
├── views/               # Handlebars templates
│   └── partials/        # Reusable view components
├── public/              # Static assets
├── .env                 # Environment variables (not in git)
├── .env.example         # Environment template
├── index.js             # Application entry point
├── migrate.js           # Database migration script
├── seed-mock-data.js    # Mock data generator
└── import-data.js       # MySQL data importer
```

## Database Schema

### Core Tables
- **sysusers** - System users with roles
- **users** - Regular users
- **projects** - Project proposals and tracking
- **announcements** - Community announcements
- **financial_reports** - Financial reports per project
- **expenditures** - Detailed expense tracking
- **feedback** - Community feedback
- **project_files** - File attachments

## Documentation

- [START_HERE.md](START_HERE.md) - Quick start guide
- [MIGRATION_CHECKLIST.md](MIGRATION_CHECKLIST.md) - MySQL to Supabase migration
- [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Detailed Supabase setup
- [MOCK_DATA_GUIDE.md](MOCK_DATA_GUIDE.md) - Mock data documentation
- [COMMANDS_REFERENCE.md](COMMANDS_REFERENCE.md) - Command reference
- [README_SUPABASE.md](README_SUPABASE.md) - Complete Supabase documentation

## User Roles

- **Chairperson** - Approve projects, financial reports, and announcements
- **Secretary** - Create announcements, propose projects
- **Treasurer** - Submit financial reports, record expenditures
- **Councilor** - Propose projects, create announcements
- **Admin** - User management, system administration
- **Public User** - View announcements, submit feedback

## Development

### Creating New Models

```bash
npm run create:model
```

### Creating New Controllers

```bash
npm run create:controller
```

### Database Migrations

After modifying models:

```bash
npm run migrate
```

## Deployment

1. Set up Supabase production project
2. Update `.env` with production credentials
3. Run migrations: `npm run migrate`
4. Import/seed data as needed
5. Start with: `npm run xian-start`

## File Management

The system includes a robust file management system for handling attachments:

### File Types Supported
- **PDFs** - Display inline in browser
- **Images** (JPG, PNG, GIF, SVG) - Display inline in browser  
- **Documents** (DOC, DOCX, XLS, XLSX, PPT, PPTX) - Force download
- **Text files** - Display inline in browser

### File Serving Routes
- `/file/:type/:filename` - View files inline when possible
- `/download/:type/:filename` - Force download any file

### Upload Directories
- `public/uploads/attachments/` - Project attachments
- `public/uploads/financials/` - Financial report documents
- `public/uploads/announcements/` - Announcement images
- `public/uploads/receipts/` - Expenditure receipts

### Usage in Views
Files are automatically served with proper MIME types and Content-Disposition headers to ensure PDFs and images display in the browser instead of downloading.

## Security Notes

- Never commit `.env` file
- Use strong passwords in production
- Enable Row Level Security (RLS) in Supabase
- Use HTTPS in production
- Regularly update dependencies

## Troubleshooting

### Connection Issues
- Verify `.env` credentials are correct
- Use Session Pooler connection (not Direct) for IPv4 networks
- Check Supabase project is active

### Migration Errors
- Ensure Supabase connection is working
- Run `npm run migrate` before seeding data
- Check Supabase dashboard for error logs

See documentation files for more troubleshooting tips.

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

MIT License

Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
Mindoro State University - Philippines

## Acknowledgments

- Built with [XianFire Framework](https://github.com/yourusername/xianfire)
- Powered by [Supabase](https://supabase.com)
- UI styled with [Tailwind CSS](https://tailwindcss.com)

## Support

For issues and questions:
- Check the [documentation files](/)
- Visit [Supabase Docs](https://supabase.com/docs)
- Open an issue on GitHub

---

**Made with ❤️ for Barangay Communities**
