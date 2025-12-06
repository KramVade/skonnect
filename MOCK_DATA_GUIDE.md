# Mock Data Guide 🎭

## What is Mock Data?

Mock data is realistic test data that helps you:
- Test your application without real user data
- Demo your system to stakeholders
- Develop and debug features
- Train users on the system

## Quick Start

### Option 1: Use Mock Data (Recommended for Testing)

```bash
# 1. Create tables
npm run migrate

# 2. Generate mock data
npm run seed

# 3. Start your app
npm run xian
```

### Option 2: Import Your Real MySQL Data

```bash
# 1. Create tables
npm run migrate

# 2. Import from MySQL dump
npm run import-data

# 3. Start your app
npm run xian
```

## What Mock Data is Created?

### 👥 System Users (8 users)
All with password: **password123**

| Role | Email | Name |
|------|-------|------|
| Chairperson | chairperson@barangay.gov | Maria Santos |
| Secretary | secretary@barangay.gov | Juan Dela Cruz |
| Treasurer | treasurer@barangay.gov | Ana Reyes |
| Councilor | councilor1@barangay.gov | Pedro Garcia |
| Councilor | councilor2@barangay.gov | Rosa Martinez |
| Admin | admin@barangay.gov | Admin User |
| Public User | public1@gmail.com | Carlos Mendoza |
| Public User | public2@gmail.com | Linda Fernandez |

### 📁 Projects (8 projects)

1. **Community Sports Complex** - In Progress (₱2.5M)
2. **Youth Leadership Training** - Approved (₱150K)
3. **Scholarship Program** - Completed (₱500K)
4. **Medical & Dental Mission** - Completed (₱200K)
5. **Tree Planting & Coastal Clean-up** - Pending (₱80K)
6. **Livelihood Skills Training** - In Progress (₱120K)
7. **Street Lighting Installation** - Completed (₱750K)
8. **Senior Citizens Assistance** - Rejected (₱300K)

### 📢 Announcements (6 announcements)

- Barangay Assembly Meeting (Approved)
- Christmas Festival (Approved)
- New Curfew Hours (Approved)
- Basketball League Registration (Approved)
- Free Skills Training (Pending Approval)
- Garbage Collection Schedule (Draft)

### 💰 Financial Reports (4 reports)

- Sports Complex Q1 Report (Approved)
- Scholarship Final Report (Verified)
- Medical Mission Report (Approved)
- Livelihood Interim Report (Pending)

### 💸 Expenditures (6 expenditures)

- Construction materials (₱850K)
- Labor costs (₱320K)
- Equipment rental (₱180K)
- Medical supplies (₱120K)
- Professional fees (₱45K)
- Training materials (₱35K)

### 💬 Feedback (5 entries)

- Street light suggestion (In Progress)
- Noise complaint (Resolved)
- Clearance inquiry (Resolved)
- Medical mission appreciation (Archived)
- Garbage complaint (New)

## Testing Scenarios

### Test User Roles

1. **Login as Chairperson** (chairperson@barangay.gov)
   - Approve pending projects
   - Review financial reports
   - Approve announcements

2. **Login as Secretary** (secretary@barangay.gov)
   - Create new announcements
   - Propose new projects
   - View project status

3. **Login as Treasurer** (treasurer@barangay.gov)
   - Submit financial reports
   - Record expenditures
   - Track budgets

4. **Login as Councilor** (councilor1@barangay.gov)
   - Propose projects
   - Create announcements
   - View reports

5. **Login as Public User** (public1@gmail.com)
   - View announcements
   - Submit feedback
   - View public projects

## Resetting Mock Data

To clear and regenerate mock data:

```bash
npm run seed
```

This will:
1. Delete all existing data
2. Create fresh mock data
3. Reset all IDs

## Customizing Mock Data

Edit `seed-mock-data.js` to:
- Add more users
- Create different projects
- Change budget amounts
- Add more announcements
- Customize feedback

## Tips

1. **Password**: All mock users have password `password123`
2. **Realistic Data**: Mock data includes realistic Filipino names and barangay scenarios
3. **Various Statuses**: Projects have different statuses (Pending, Approved, In Progress, Completed, Rejected)
4. **Relationships**: All data is properly linked (projects → users, expenditures → projects, etc.)
5. **Dates**: Uses relative dates based on current date

## Troubleshooting

### "Seeding failed" error
- Make sure you ran `npm run migrate` first
- Check your `.env` file has correct Supabase credentials
- Verify your Supabase connection is working

### Duplicate email errors
- Run `npm run seed` again (it clears existing data first)
- Or manually delete data from Supabase dashboard

### Can't login with mock credentials
- Make sure you used `npm run seed` (not `npm run import-data`)
- Password is `password123` (all lowercase, no spaces)
- Check email is exactly as shown in the table above

## Next Steps

After seeding mock data:
1. ✅ Test all user roles
2. ✅ Try creating new projects
3. ✅ Submit financial reports
4. ✅ Create announcements
5. ✅ Test the approval workflow
6. ✅ Submit feedback as public user

---

**Happy Testing!** 🚀
