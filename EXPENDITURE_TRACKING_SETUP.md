# Expenditure Tracking Feature Setup

## Overview
The Expenditure Tracking feature allows the SK Treasurer to record, track, and manage all project-related expenses with receipt uploads and categorization.

## Features
- ✅ Record expenditures with detailed information
- ✅ Upload receipts/proof of payment
- ✅ Categorize expenses (Materials, Services, Transportation, Food, etc.)
- ✅ Link expenditures to specific projects
- ✅ View total expenditure and breakdown by category
- ✅ Delete expenditure entries
- ✅ Track date of expenditure

## Setup Instructions

### 1. Create the Database Table
Run the following command to create the expenditures table:

```bash
node create-expenditure-table.js
```

This will create the `expenditures` table with the following structure:
- expenditure_id (Primary Key)
- project_id (Foreign Key to projects)
- description
- category
- amount
- date_incurred
- receipt_path
- recorded_by (Foreign Key to sysusers)
- remarks
- date_created
- last_updated

### 2. Access the Feature
Once the table is created, the Treasurer can access the feature at:
- **Main Page**: `/treasurer/expenditure-tracking`
- **Add Expenditure**: `/treasurer/expenditure-tracking/add`

### 3. Using the Feature

#### Adding an Expenditure:
1. Navigate to Expenditure Tracking from the Treasurer sidebar
2. Click "Add Expenditure" button
3. Fill in the form:
   - Select the project
   - Enter description (e.g., "Venue rental", "Food supplies")
   - Choose a category
   - Enter the amount
   - Select the date (optional, defaults to today)
   - Upload receipt (optional)
   - Add remarks (optional)
4. Click "Add Expenditure"

#### Viewing Expenditures:
- View summary cards showing:
  - Total expenditure amount
  - Total number of entries
  - Number of categories
- See breakdown by category
- View detailed table of all expenditures with:
  - Date
  - Project name
  - Description
  - Category
  - Amount
  - Receipt link
  - Delete action

#### Deleting an Expenditure:
- Click the "Delete" button on any expenditure entry
- Confirm the deletion

## File Structure

### New Files Created:
```
models/expenditureModel.js          - Expenditure data model
views/expenditure-tracking.xian     - Main expenditure tracking page
views/add-expenditure.xian          - Add new expenditure form
create-expenditure-table.js         - Database table creation script
EXPENDITURE_TRACKING_SETUP.md       - This documentation file
```

### Modified Files:
```
controllers/treasurerController.js  - Added expenditure tracking functions
routes/index.js                     - Added expenditure tracking routes
views/partials/treasidebar.xian     - Made expenditure link functional
index.js                            - Added Object helper for Handlebars
```

## Categories Available:
- Materials
- Services
- Transportation
- Food
- Equipment
- Venue
- Supplies
- Other
- Uncategorized (default if none selected)

## Permissions
Only users with the "treasurer" position can:
- View expenditure tracking page
- Add new expenditures
- Delete expenditures

## Notes
- Receipts are stored in `public/uploads/financials/`
- Supported receipt formats: Images (JPG, PNG) and PDF
- All amounts are in Philippine Peso (₱)
- Expenditures are linked to projects for better tracking
- The feature automatically calculates totals and category breakdowns
