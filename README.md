# AnsuADs - Online Advertisement Management System

A modern, lightweight advertisement management platform built with vanilla JavaScript, HTML, and CSS.

## 🚀 Features

- **User Authentication** - Mock login system with localStorage
- **Campaign Management** - Create, edit, and delete advertising campaigns
- **Dashboard Analytics** - View campaign statistics and performance metrics
- **Campaign Variants** - Create and manage A/B test variants
- **Responsive Design** - Works on desktop and mobile devices
- **Modular Architecture** - Clean, organized codebase with ES modules

## 📁 Project Structure

``` bash
AnsuADs/
├── frontend/
│   ├── index.html              # Main entry point
│   ├── css/
│   │   ├── base.css           # Base styles and CSS variables
│   │   └── components/        # Component-specific styles
│   ├── js/
│   │   ├── main.js            # App initialization and routing
│   │   ├── components/        # UI components
│   │   ├── utils/             # Utility functions
│   │   └── api/               # Data layer
│   └── data/
│       └── seed.json          # Mock campaign data
├── docs/
│   └── ARCHITECTURE.md        # Architecture documentation
└── README.md                  # This file
```

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+ Modules), HTML5, CSS3
- **No Build Tools**: Direct browser execution using ES modules
- **Data Storage**: LocalStorage (for auth), in-memory (for campaigns)
- **Styling**: Custom CSS with CSS variables for theming

## 📋 Prerequisites

- **VS Code** with Live Server extension
- A modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

## 🚀 Getting Started

### Step 1: Install Live Server Extension

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Live Server" by Ritwick Dey
4. Click Install

### Step 2: Open the Project

```powershell
# Open the project folder in VS Code
cd S:\college\SE_project\AnsuADs
code .
```

### Step 3: Start Live Server

1. In VS Code, navigate to `frontend/index.html`
2. Right-click on the file
3. Select **"Open with Live Server"**
4. Your browser will open automatically at `http://127.0.0.1:5500`

That's it! The app is now running.

## 👤 Demo Login

Since this is a prototype with mock authentication, you can login with any email and password:

- **Email**: any valid email format (e.g., `demo@example.com`)
- **Password**: any password (e.g., `password123`)

The system will accept any credentials for demonstration purposes.

## 📖 Usage Guide

### Creating a Campaign

1. Log in to the dashboard
2. Click the "Create Campaign" button
3. Fill in the campaign details:
   - Name (required)
   - Objective
   - Budget (required)
   - Status (draft, active, paused, completed)
   - Start and End dates (required)
4. Click "Create" to save

### Editing a Campaign

1. Find the campaign card on the dashboard
2. Click the "Edit" button
3. Modify the campaign details
4. Add or remove variants in the Variants section
5. Click "Update" to save changes

### Deleting a Campaign

1. Find the campaign card on the dashboard
2. Click the "Delete" button
3. Confirm the deletion in the popup dialog

### Managing Variants

(Only available when editing a campaign)

1. In the edit modal, scroll to the "Variants" section
2. Click "+ Add Variant"
3. Enter variant details when prompted
4. Click "Delete" next to a variant to remove it

## 🌐 Deploying to GitHub Pages

### Step 1: Push Your Code to GitHub

```powershell
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - AnsuADs v0.1"

# Add remote and push
git remote add origin https://github.com/lazypanda673/AnsuADs.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source":
   - **Branch**: Select `main`
   - **Folder**: Select `/frontend`
4. Click **Save**

### Step 3: Access Your Live Site

After 1-2 minutes, your site will be live at:

``` bash
https://lazypanda673.github.io/AnsuADs/
```

## 🎨 Customization

### Changing Colors

Edit `frontend/css/base.css` and modify the CSS variables in `:root`:

```css
:root {
    --primary-color: #2563eb;    /* Main brand color */
    --primary-hover: #1d4ed8;    /* Hover state */
    /* ... other colors ... */
}
```

### Adding New Components

1. Create a new file in `frontend/js/components/`
2. Export functions that return DOM elements
3. Import and use in other components or `main.js`

Example:

```javascript
// frontend/js/components/myComponent.js
import { createElement } from '../utils/dom.js';

export function createMyComponent() {
    return createElement('div', { className: 'my-component' }, ['Hello!']);
}
```

## 🔧 Development

### Code Organization

- **Components**: UI components that render DOM elements
- **Utils**: Reusable utility functions (auth, validation, DOM helpers)
- **API**: Data layer that simulates backend API calls
- **Main**: App initialization, routing, and navigation

### Adding Mock Data

Edit `frontend/data/seed.json` to add more sample campaigns:

```json
{
  "campaigns": [
    {
      "id": 6,
      "name": "My New Campaign",
      "objective": "Conversions",
      "budget": 1000.00,
      "start_date": "2025-06-01",
      "end_date": "2025-08-31",
      "status": "draft",
      "variants": []
    }
  ]
}
```

## 📝 Next Steps (Future Enhancements)

- [ ] Add backend API (Node.js + Express + SQLite)
- [ ] Implement real authentication with JWT
- [ ] Add campaign metrics visualization (charts)
- [ ] Export campaigns to CSV/PDF
- [ ] Real-time campaign updates
- [ ] Multi-platform integration (Google Ads, Facebook Ads)
- [ ] Advanced filtering and search
- [ ] User role management (Admin, Manager, Viewer)
- [ ] Activity logs and audit trails

## 🐛 Troubleshooting

### Live Server Not Working

- Make sure you installed the "Live Server" extension by Ritwick Dey
- Right-click on `index.html` specifically (not just any file)
- Check that no other server is using port 5500

### CORS Errors

- Ensure you're using Live Server (not opening file:// directly)
- Check browser console for specific error messages

### ES Module Errors

If modules fail to load:

- Ensure your browser supports ES modules (modern browsers do)
- Check that file paths in imports are correct
- Verify Live Server is running

### Data Not Persisting

Currently, campaign data is stored in memory and resets on page reload. This is intentional for the prototype. To persist data:

- Use localStorage (limited storage)
- Implement a backend API with a database

## 📄 License

This project is created for educational purposes as part of a Software Engineering course.

## 👥 Author

- **Sumit Kumar** - Techno Main Salt Lake

## 📅 Version

- **Version**: 0.1 (Prototype)
- **Last Updated**: November 2025
