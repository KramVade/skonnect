# Integration Plan: Merging Test Project Frontend

## Overview
Integrating the better frontend design from the `test` folder into the main SKONNECT project while keeping the working Supabase database connection.

## What We're Keeping from Main Project
✅ Working Supabase connection (models/db.js)
✅ All model files with proper relationships
✅ Migration and seed scripts
✅ Documentation files
✅ .env configuration

## What We're Taking from Test Project
✅ Better frontend views (Tailwind CSS design)
✅ Enhanced controllers (project, announcement, feedback, expenditure)
✅ File upload functionality (multer)
✅ Better organized partials
✅ Additional Handlebars helpers

## Integration Steps

### Phase 1: Backup Current State
- [x] Current project is already committed to git
- [ ] Create integration branch

### Phase 2: Copy Enhanced Controllers
- [ ] Copy projectController.js
- [ ] Copy announcementController.js
- [ ] Copy feedbackController.js
- [ ] Update chairpersonController.js
- [ ] Update secretaryController.js
- [ ] Update treasurerController.js

### Phase 3: Copy Better Views
- [ ] Copy all view files from test/views/
- [ ] Copy partials from test/views/partials/
- [ ] Keep current database connection

### Phase 4: Update Dependencies
- [ ] Add multer for file uploads
- [ ] Verify all dependencies

### Phase 5: Update Routes
- [ ] Merge route files
- [ ] Add new routes for projects, announcements, feedback

### Phase 6: Update index.js
- [ ] Add additional Handlebars helpers
- [ ] Keep current database connection
- [ ] Add multer configuration

### Phase 7: Create Upload Directories
- [ ] public/uploads/attachments/
- [ ] public/uploads/announcements/
- [ ] public/uploads/financials/
- [ ] public/uploads/receipts/

### Phase 8: Testing
- [ ] Test database connection
- [ ] Test all user roles
- [ ] Test file uploads
- [ ] Test CRUD operations

## Files to Copy

### Controllers (from test/)
- controllers/projectController.js
- controllers/announcementController.js
- controllers/feedbackController.js
- controllers/chairpersonController.js (enhanced)
- controllers/secretaryController.js (enhanced)
- controllers/treasurerController.js (enhanced)

### Views (from test/)
- All .xian files in views/
- All partials in views/partials/

### Routes (from test/)
- routes/admin-routes.js
- routes/feedback.js
- Merge with existing routes/index.js

### Public Assets
- public/images/ (if any)
- public/uploads/ structure

## Database Connection
**IMPORTANT**: We keep the main project's database configuration:
- Use main project's .env
- Use main project's models/db.js
- Use main project's model files

## Post-Integration Tasks
- [ ] Update .gitignore for uploads/
- [ ] Test all features
- [ ] Update documentation
- [ ] Commit changes

## Rollback Plan
If integration fails:
```bash
git checkout main
git branch -D integration
```

## Notes
- Test project uses different Supabase instance (ryeuwjqxnqzdmddyllmn)
- Main project uses (vlngrfpatmkckxzhobbp)
- We keep main project's database
- Frontend design from test is superior
