# GitHub Setup Guide 🚀

Your code is committed locally! Now let's push it to GitHub.

## Option 1: Create New Repository on GitHub

### Step 1: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `skonnect` (or your preferred name)
3. Description: "Barangay Management System with Supabase"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 2: Push Your Code

GitHub will show you commands. Use these:

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR-USERNAME/skonnect.git

# Push your code
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Option 2: Push to Existing Repository

If you already have a repository:

```bash
# Add remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# Push
git branch -M main
git push -u origin main
```

## Verify Your Push

After pushing, visit your GitHub repository URL. You should see:
- All your code files
- README.md displayed on the main page
- 65 files committed
- Complete documentation

## Important Notes

### ✅ What's Included in Git
- All source code
- Documentation files
- `.env.example` (template)
- `.gitignore` (protection)
- Models, controllers, views
- Migration and seed scripts

### ❌ What's NOT Included (Protected)
- `.env` (your actual credentials)
- `node_modules/` (dependencies)
- Log files
- `.DS_Store` (Mac files)

## After Pushing

### For Collaborators

Others can now clone and set up:

```bash
# Clone repository
git clone https://github.com/YOUR-USERNAME/skonnect.git
cd skonnect

# Install dependencies
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env with their Supabase credentials

# Setup database
npm run migrate
npm run seed

# Start app
npm run xian
```

### Update README

After pushing, you might want to update the clone URL in README.md:

```bash
# Edit README.md and replace <your-repo-url> with actual URL
git add README.md
git commit -m "docs: Update clone URL in README"
git push
```

## Future Updates

When you make changes:

```bash
# Check what changed
git status

# Add changes
git add .

# Commit with message
git commit -m "feat: Add new feature"

# Push to GitHub
git push
```

## Common Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline

# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Pull latest changes
git pull

# View remotes
git remote -v
```

## Troubleshooting

### Authentication Issues

If you get authentication errors:

1. **Use Personal Access Token (PAT)**
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` scope
   - Use token as password when pushing

2. **Or use SSH**
   ```bash
   # Generate SSH key
   ssh-keygen -t ed25519 -C "your_email@example.com"
   
   # Add to GitHub: Settings → SSH and GPG keys
   # Change remote to SSH
   git remote set-url origin git@github.com:YOUR-USERNAME/skonnect.git
   ```

### Push Rejected

If push is rejected:

```bash
# Pull first, then push
git pull origin main --rebase
git push
```

## Repository Settings (Optional)

After pushing, configure on GitHub:

1. **Add Topics**: `nodejs`, `express`, `supabase`, `barangay`, `management-system`
2. **Add Description**: "Barangay Management System with Supabase"
3. **Enable Issues**: For bug tracking
4. **Add License**: MIT (already in code)
5. **Enable Discussions**: For community questions

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Add repository description and topics
3. ✅ Share repository URL with team
4. ✅ Set up GitHub Actions (optional - for CI/CD)
5. ✅ Enable branch protection (optional - for main branch)

---

**Your code is ready to share!** 🎉
