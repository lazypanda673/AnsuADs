# 📊 AnsuADs - Advertisement Campaign Management Prototype

> **Phase 1**: A privacy-first, client-side campaign management tool for planning and organizing advertisement strategies without backend infrastructure.

A modern, browser-based campaign management prototype built with vanilla JavaScript. Plan campaigns for multiple platforms, visualize performance metrics, and configure A/B tests—all while keeping your data completely private on your device.

## ✨ Key Features

### 🔐 **Privacy-First Architecture**
- All data stays on your device (localStorage)
- No external servers or data transmission
- Zero tracking, zero analytics
- GDPR compliant by design

### 📝 **Campaign Planning & Management**
- Create, edit, and organize campaigns
- Multi-platform planning (Google Ads, Facebook, LinkedIn, etc.)
- Campaign status tracking (Active, Paused, Completed)
- Budget and date range management

### 📈 **Analytics Dashboard**
- Real-time metric calculations
- 7-day performance trend visualization
- KPI cards with percentage changes
- Interactive bar chart displays

### 🧪 **A/B Test Configuration**
- Plan and organize A/B test scenarios
- Track variants with target metrics
- Date-based test scheduling
- Test status management

### 🎨 **Modern UI/UX**
- Responsive design (mobile to desktop)
- Gradient-based visual design
- Intuitive navigation and workflows
- Professional enterprise-grade interface

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6 Modules), HTML5, CSS3
- **Storage**: Browser localStorage API
- **Routing**: Client-side SPA router
- **Architecture**: Component-based modular design
- **Deployment**: Static hosting (GitHub Pages)
- **Build Tools**: None (pure browser-native code)

## 📁 Project Structure

```
AnsuADs/
├── index.html                          # Entry point
├── 404.html                            # GitHub Pages routing
├── assets/
│   ├── css/
│   │   ├── base.css                    # Global styles & CSS variables
│   │   └── components/
│   │       ├── landing.css             # Landing page styles
│   │       ├── login.css               # Auth pages styles
│   │       ├── dashboard-enhanced.css  # Dashboard & all pages
│   │       ├── modal.css               # Modal component styles
│   │       └── campaign-form.css       # Campaign form styles
│   └── js/
│       ├── main.js                     # App initialization & routing
│       ├── router.js                   # Client-side router
│       ├── components/
│       │   ├── landing.js              # Landing page
│       │   ├── login.js                # Login page
│       │   ├── register.js             # Registration page
│       │   ├── dashboard-new.js        # Main dashboard
│       │   ├── campaigns.js            # Campaigns page
│       │   ├── analytics.js            # Analytics page
│       │   ├── abTests.js              # A/B Tests page
│       │   ├── settings.js             # Settings page
│       │   ├── profile.js              # User profile page
│       │   ├── modal.js                # Reusable modal component
│       │   ├── campaignModal.js        # Campaign create/edit modal
│       │   └── abTestModal.js          # A/B test create/edit modal
│       └── utils/
│           ├── auth.js                 # Authentication utilities
│           ├── dom.js                  # DOM manipulation helpers
│           ├── layout.js               # Shared layout components
│           └── validation.js           # Form validation
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **VS Code** with **Live Server** extension (or any static file server)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/lazypanda673/AnsuADs.git
   cd AnsuADs
   ```

2. **Open in VS Code**
   ```bash
   code .
   ```

3. **Install Live Server** (if not already installed)
   - Open Extensions (Ctrl+Shift+X)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

4. **Start the application**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Browser opens at `http://127.0.0.1:5500`

### Alternative: Simple HTTP Server

```bash
# Using Python 3
python -m http.server 5500

# Using Node.js (with http-server package)
npx http-server -p 5500
```

## 👤 Demo Access

This is a prototype with simulated authentication. Use any credentials:

- **Email**: `demo@example.com` (or any valid email format)
- **Password**: `password` (or any password)

The system demonstrates login flows without actual authentication.

## 📖 Usage Guide

### Dashboard Navigation

After logging in, access different sections via the sidebar:
- **📊 Dashboard** - Overview with quick stats and charts
- **📣 Campaigns** - Full campaign CRUD management
- **📈 Analytics** - Performance metrics and trends
- **🧪 A/B Tests** - Test configuration and planning
- **⚙️ Settings** - User preferences
- **👤 Profile** - User information (top-right avatar)

### Creating a Campaign

1. Navigate to **Campaigns** page
2. Click **"Create New Campaign"** button
3. Fill in the form:
   - Campaign Name (required)
   - Platform (Google Ads, Facebook, Instagram, etc.)
   - Budget (required)
   - Start/End Dates (required)
   - Target Audience
   - Objectives
4. Click **"Create Campaign"**
5. Campaign appears in the grid

### Viewing Analytics

1. Navigate to **Analytics** page
2. View total metrics at the top (Impressions, Clicks, CTR, Conversions)
3. See 7-day trend charts for Impressions and Clicks
4. Metrics auto-calculate from all campaigns

### Configuring A/B Tests

1. Navigate to **A/B Tests** page
2. Click **"Create New Test"**
3. Fill in test configuration:
   - Test Name
   - Variant Descriptions (e.g., "Variant A: Blue button")
   - Start/End Dates
   - Target Metric (Clicks, Conversions, CTR, Revenue)
   - Description
   - Status
4. Click **"Create Test"**
5. Tests are saved for future execution (Phase 2)

## 🌐 Live Demo

**GitHub Pages**: [https://lazypanda673.github.io/AnsuADs/](https://lazypanda673.github.io/AnsuADs/)

## 🎯 Use Cases

### For Students
- Learn campaign management concepts
- Understand advertising metrics and analytics
- Practice UI/UX with a real-world application
- Portfolio project demonstrating technical skills

### For Marketers
- Plan campaign strategies before platform execution
- Organize multiple campaigns visually
- Prototype budget allocations
- Present campaign ideas to stakeholders

### For Developers
- Study modular vanilla JavaScript architecture
- Learn client-side routing patterns
- Understand localStorage persistence
- Example of zero-build-tool development

## 🔒 Data Privacy

- **Local Only**: All data stored in browser localStorage
- **No Backend**: No servers, databases, or APIs
- **No Tracking**: Zero analytics or external scripts
- **Offline Capable**: Works offline after first load
- **Device Specific**: Data doesn't sync across browsers/devices

## 🚧 Limitations (Phase 1)

- **Single User**: No multi-user or collaboration features
- **No Platform Integration**: Plans campaigns but doesn't publish to actual platforms
- **Local Storage**: Data limited to ~5-10MB per domain
- **No Cloud Sync**: Data doesn't transfer between devices
- **Client-Side Only**: All logic runs in browser (no server validation)

## 📅 Roadmap (Phase 2)

### Planned Features
- ✅ Backend API with database integration
- ✅ Real platform API connections (Google Ads, Facebook Marketing API)
- ✅ Multi-user support with role-based access control
- ✅ Budget tracking with actual spend monitoring
- ✅ Team collaboration and workflow management
- ✅ Automated report generation (PDF, Excel)
- ✅ Real-time data synchronization
- ✅ OAuth 2.0 security implementation
- ✅ Cloud deployment (AWS/Azure/GCP)
- ✅ A/B test execution with statistical analysis
- ✅ Advanced analytics and forecasting
- ✅ Mobile native apps (iOS/Android)

## 🛠️ Development

### Code Style
- **Modular ES6**: Component-based architecture
- **Vanilla JavaScript**: No frameworks or libraries
- **CSS Variables**: Centralized theming in `base.css`
- **Semantic HTML**: Clean, accessible markup

### Adding New Features

1. **Create component file** in `assets/js/components/`
2. **Export main function** that renders to container
3. **Add route** in `main.js` routes object
4. **Import and register** in router logic
5. **Add styles** in `assets/css/components/`

Example:
```javascript
// assets/js/components/myFeature.js
import { createElement } from '../utils/dom.js';

export async function showMyFeature(container) {
    container.innerHTML = '';
    const content = createElement('div', { className: 'my-feature' });
    content.innerHTML = '<h1>My Feature</h1>';
    container.appendChild(content);
}
```

### Customization

**Change Brand Colors**:
Edit `assets/css/base.css`:
```css
:root {
    --primary-color: #2563eb;
    --primary-hover: #1d4ed8;
    /* ... modify other colors ... */
}
```

**Modify Logo**:
Update emoji in `assets/js/utils/layout.js` and component files:
```javascript
const logo = createElement('div', { className: 'logo' });
logo.innerHTML = '📊 AnsuADs';  // Change emoji here
```

## 🐛 Troubleshooting

### Live Server Issues
- Ensure you installed "Live Server" by Ritwick Dey
- Right-click on `index.html` (not other files)
- Check that port 5500 isn't in use

### Module Loading Errors
- Use Live Server (not `file://` protocol)
- Check browser console for path errors
- Ensure browser supports ES modules (all modern browsers do)

### Data Not Saving
- Check browser localStorage quota (usually 5-10MB)
- Ensure localStorage is enabled in browser settings
- Clear localStorage if corrupted: `localStorage.clear()`

### Blank Page
- Open browser console (F12) to see errors
- Verify all files are in correct directories
- Check network tab for failed file loads

## 📄 License

This project is created for **educational purposes** as part of a Software Engineering course at Techno Main Salt Lake.

## 👤 Author

**Sumit Kumar**  
Techno Main Salt Lake  
Email: sumitsonata673@gmail.com

## 🙏 Acknowledgments

- Inspired by enterprise ad management platforms
- Built for SE course project requirements
- Demonstrates modern web development practices

## 📊 Project Stats

- **Version**: 1.0 (Phase 1 Complete)
- **Last Updated**: November 2025
- **Lines of Code**: ~3000+ (JS + CSS)
- **Components**: 14 major UI components
- **Supported Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Bundle Size**: ~50KB (uncompressed, no dependencies)

---

**Note**: This is a Phase 1 prototype focused on UI/UX and client-side architecture. Backend integration and platform APIs are planned for Phase 2 development.
