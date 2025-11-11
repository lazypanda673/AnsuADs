# AnsuADs - Quick Reference Guide

## 🚀 Quick Start (2 Steps)

### Step 1: Open Project in VS Code

```powershell
cd S:\college\SE_project\AnsuADs
code .
```

### Step 2: Start Live Server

1. Navigate to `frontend/index.html` in VS Code Explorer
2. Right-click on the file
3. Select **"Open with Live Server"**
4. Browser opens automatically at `http://127.0.0.1:5500`

---

## 📂 Project Structure at a Glance

``` bash
AnsuADs/
├── frontend/           # All frontend code
│   ├── index.html     # Entry point
│   ├── css/           # Styles
│   ├── js/            # JavaScript modules
│   └── data/          # Mock data
├── docs/              # Documentation
├── README.md          # Main documentation
└── .gitignore         # Git ignore rules
```

---

## 🎯 Core Features Implemented

✅ User Login/Logout (mock authentication)  
✅ Dashboard with campaign statistics  
✅ Create/Edit/Delete campaigns  
✅ Campaign variants (A/B testing)  
✅ Form validation  
✅ Responsive design  
✅ Modal dialogs  
✅ Mock data with 5 sample campaigns  

---

## 📝 Quick Commands

### Start Live Server

**Option 1:** Right-click `frontend/index.html` → "Open with Live Server"  
**Option 2:** Click "Go Live" button in VS Code status bar (bottom-right)

### Stop Live Server

Click "Port: 5500" button in VS Code status bar

### View Project Structure

```powershell
cd S:\college\SE_project\AnsuADs
tree /F
```

### Deploy to GitHub Pages

```powershell
git add .
git commit -m "Update AnsuADs"
git push origin main
# Wait 1-2 minutes, then visit: https://lazypanda673.github.io/AnsuADs/
```

---

## 🔑 Demo Credentials

Use any email and password to login (mock auth):

- **Email**: <demo@example.com>
- **Password**: password123

---

## 📖 Key Files to Know

| File | Purpose |
|------|---------|
| `frontend/index.html` | Main entry point |
| `frontend/js/main.js` | App initialization & routing |
| `frontend/js/components/dashboard.js` | Main dashboard UI |
| `frontend/js/components/login.js` | Login page |
| `frontend/js/api/mockData.js` | Mock API (data management) |
| `frontend/data/seed.json` | Sample campaign data |
| `frontend/css/base.css` | CSS variables & utilities |

---

## 🎨 Customization Quick Tips

### Change Colors

Edit `frontend/css/base.css`:

```css
:root {
    --primary-color: #2563eb;  /* Change this */
    --primary-hover: #1d4ed8;  /* And this */
}
```

### Add Mock Campaigns

Edit `frontend/data/seed.json` and add more campaign objects.

### Modify Components

All UI components are in `frontend/js/components/` - edit as needed.

---

## 🐛 Common Issues

### Live Server Not Starting

- Install "Live Server" extension by Ritwick Dey from VS Code marketplace
- Right-click on `index.html` specifically (not just any file)
- Check that port 5500 is not already in use

### "Module not found" Error

- Ensure Live Server is running (not opening file:// directly)
- Check browser console for the exact missing module
- Verify file paths are correct (case-sensitive)

### Changes Not Showing

- Live Server should auto-reload, but try: Ctrl+F5 (hard refresh)
- Check browser console for JavaScript errors
- Restart Live Server if needed

### CORS Errors

- Make sure you're using Live Server, not opening HTML file directly
- Clear browser cache and hard refresh

---

## 🌐 GitHub Pages Deployment

### First Time Setup

1. Push your code to GitHub:

```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/lazypanda673/AnsuADs.git
git push -u origin main
```

2. Enable GitHub Pages:
   - Go to repo Settings → Pages
   - Source: `main` branch, `/frontend` folder
   - Save

3. Visit your site (after 1-2 minutes):

   ```
   https://lazypanda673.github.io/AnsuADs/
   ```

### Updating Your Site

```powershell
git add .
git commit -m "Update description here"
git push origin main
# Wait 1-2 minutes for deployment
```

---

## 💡 Development Workflow

1. **Make Changes** - Edit files in `frontend/`
2. **See Changes** - Live Server auto-refreshes browser
3. **Test Features** - Use the UI to verify
4. **Commit** - When ready: `git add .` → `git commit` → `git push`
5. **Deploy** - GitHub Pages updates automatically on push

---

## 📚 Documentation

- **README.md** - Complete setup and usage guide
- **docs/ARCHITECTURE.md** - Technical architecture details
- **Code Comments** - Inline documentation in source files

---

## 🔄 Next Development Steps

1. **Add More Features**
   - Campaign metrics visualization (Chart.js)
   - Export to CSV/PDF
   - Search and filtering

2. **Add Backend** (Future)
   - Node.js + Express
   - SQLite database
   - Real authentication with JWT

3. **Enhance UI**
   - Charts and graphs
   - Advanced filtering
   - Drag-and-drop

---

**Version**: 0.1 (Prototype)  
**Last Updated**: November 2025  
**Tech Stack**: Vanilla JS, HTML5, CSS3
