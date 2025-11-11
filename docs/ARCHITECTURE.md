# AnsuADs Architecture Documentation

## System Overview

AnsuADs is a lightweight, modular web application for managing advertising campaigns. The v0.1 prototype focuses on frontend-only functionality with mock data, designed for easy extension with a backend API.

## Architecture Principles

### 1. Modular Design

- **Separation of Concerns**: Each module handles a specific aspect (UI, data, utilities)
- **ES Modules**: Native browser module system for clean imports/exports
- **Component-Based**: Reusable UI components as functions
- **Layered Architecture**: Clear separation between presentation, business logic, and data

### 2. Technology Choices

#### Why Vanilla JavaScript?

- **Zero Dependencies**: No framework overhead, faster initial load
- **Learning**: Better understanding of core web technologies
- **Simplicity**: Easy to debug and maintain for small projects
- **Browser Native**: Leverages modern browser capabilities (ES6+, modules, fetch)

#### Why No Build Process?

- **Rapid Development**: Immediate feedback, no compilation step
- **Simplicity**: Lower barrier to entry for contributors
- **Debugging**: Source code matches what runs in browser
- **Appropriate Scale**: Build tools add complexity not needed for v0.1

### 3. Layers

``` bash
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (Components: login, dashboard, etc.)   │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│        Application Layer                │
│    (Router, Navigation, State)          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│          Data Layer                     │
│      (Mock API, LocalStorage)           │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│       Utilities Layer                   │
│  (DOM, Validation, Auth helpers)        │
└─────────────────────────────────────────┘
```

## Component Breakdown

### Core Components

#### 1. Main App (`main.js`)

- **Responsibility**: Application initialization and routing
- **Key Functions**:
  - `init()`: Bootstrap the app, check auth state
  - `router()`: Route requests to appropriate components
  - `navigate()`: Programmatic navigation
- **Dependencies**: login, dashboard components; auth utilities

#### 2. Login Component (`login.js`)

- **Responsibility**: User authentication UI
- **Features**:
  - Email/password form
  - Client-side validation
  - Mock authentication
  - Error handling
- **Dependencies**: auth, validation, DOM utilities

#### 3. Dashboard Component (`dashboard.js`)

- **Responsibility**: Main application view
- **Features**:
  - Campaign statistics
  - Campaign list with cards
  - Create/Edit/Delete actions
  - Empty state handling
- **Dependencies**: header, modal, campaignModal; mockData API

#### 4. Campaign Modal (`campaignModal.js`)

- **Responsibility**: Campaign creation and editing
- **Features**:
  - Form validation
  - Variant management
  - Date range validation
  - Budget validation
- **Dependencies**: modal, mockData API, validation

#### 5. Header Component (`header.js`)

- **Responsibility**: Application header and navigation
- **Features**:
  - Logo and branding
  - User display
  - Logout functionality
- **Dependencies**: auth utilities

#### 6. Modal Component (`modal.js`)

- **Responsibility**: Reusable modal dialog system
- **Features**:
  - Overlay with click-outside to close
  - Customizable content
  - Confirmation dialogs
  - Accessible close button
- **Dependencies**: DOM utilities

### Utility Modules

#### 1. Authentication (`utils/auth.js`)

- **Responsibility**: Mock authentication and session management
- **Functions**:
  - `login(email, password)`: Authenticate user
  - `logout()`: Clear session
  - `getAuthUser()`: Get current user
  - `isAuthenticated()`: Check auth status
- **Storage**: localStorage with key `ansuads_auth`

#### 2. DOM Utilities (`utils/dom.js`)

- **Responsibility**: DOM manipulation helpers
- **Functions**:
  - `createElement(tag, attrs, children)`: Programmatic element creation
  - `clearElement(element)`: Remove all children
- **Why**: Reduces boilerplate and ensures consistency

#### 3. Validation (`utils/validation.js`)

- **Responsibility**: Form validation and formatting
- **Functions**:
  - `validateEmail(email)`: Email format validation
  - `validateRequired(value)`: Required field check
  - `validateNumber(value)`: Numeric validation
  - `validateDate(dateString)`: Date validation
  - `validateDateRange(start, end)`: Date range check
  - `formatCurrency(amount)`: Currency formatting
  - `formatDate(dateString)`: Date formatting

### Data Layer

#### Mock Data API (`api/mockData.js`)

- **Responsibility**: Simulate backend API
- **Features**:
  - In-memory campaign storage
  - CRUD operations for campaigns
  - CRUD operations for variants
  - Statistics calculation
  - Async/await interface (mimics real API)
- **Functions**:
  - Campaign: `fetchCampaigns()`, `fetchCampaign(id)`, `createCampaign()`, `updateCampaign()`, `deleteCampaign()`
  - Variants: `createVariant()`, `deleteVariant()`
  - Stats: `fetchStats()`
- **Data Source**: `data/seed.json` loaded on initialization

## Data Flow

### 1. Application Startup

``` bash
Browser → index.html → main.js → init()
                                    ↓
                            Check Auth State
                                    ↓
                        ┌───────────┴───────────┐
                        ↓                       ↓
                Not Authenticated        Authenticated
                        ↓                       ↓
                  Navigate /login        Navigate /dashboard
```

### 2. User Login

``` bash
User Input → login.js → validate → auth.login()
                                        ↓
                               Store in localStorage
                                        ↓
                               navigate('/dashboard')
```

### 3. Campaign CRUD

``` bash
User Action → dashboard.js → campaignModal.js
                                    ↓
                            Validate Input
                                    ↓
                          mockData API Call
                                    ↓
                         Update UI (refresh)
```

## State Management

### Current Approach

- **Auth State**: localStorage (`ansuads_auth` key)
- **Campaign Data**: In-memory (resets on page reload)
- **UI State**: Component-local (function closures, DOM state)

### Why This Approach?

- **Simplicity**: No state management library needed for v0.1
- **Appropriate Scale**: Few components, limited shared state
- **Upgrade Path**: Easy to add Redux/MobX or backend persistence later

### Future Considerations

- Persist campaigns to localStorage or IndexedDB
- Add global state management for complex features
- Implement backend API with server-side state

## Security Considerations

### Current Implementation (Prototype)

- ⚠️ **Mock Authentication**: Accepts any credentials
- ⚠️ **Client-Side Only**: No real security
- ⚠️ **LocalStorage**: Not encrypted

### Production Requirements

- Implement real authentication (email verification, password hashing)
- Use secure tokens (JWT with httpOnly cookies)
- Backend API with authorization checks
- HTTPS only
- CSRF protection
- Input sanitization
- Rate limiting

## Performance Optimization

### Current Optimizations

- **Lazy Component Loading**: Components only loaded when navigated to
- **Event Delegation**: Where appropriate to reduce listeners
- **Minimal Reflows**: Batch DOM updates
- **CSS Variables**: Efficient theming

### Future Optimizations

- Code splitting for larger components
- Virtual scrolling for large campaign lists
- Service worker for offline capability
- Image lazy loading for campaign creatives

## Browser Compatibility

### Minimum Requirements

- ES6 Modules support
- Fetch API
- LocalStorage
- CSS Variables
- Arrow functions, template literals, destructuring

### Supported Browsers

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Not Supported

- Internet Explorer (any version)
- Older mobile browsers

## Testing Strategy

### Current State

- Manual testing only
- No automated tests in v0.1

### Recommended Testing (Future)

- **Unit Tests**: Utilities and API functions (Jest)
- **Integration Tests**: Component interactions (Testing Library)
- **E2E Tests**: User flows (Playwright, Cypress)
- **Visual Regression**: UI consistency (Percy, Chromatic)

## Migration Path to Backend

### Phase 1: Add Backend API

1. Create Node.js + Express server
2. Implement SQLite database
3. Add API endpoints (mirror mockData functions)
4. Replace mockData imports with real fetch calls
5. Implement real JWT authentication

### Phase 2: Enhanced Features

1. Add real-time updates (WebSockets)
2. Implement file uploads (campaign creatives)
3. Add analytics and reporting
4. Integrate with ad platforms (Google, Facebook APIs)

### Phase 3: Production Deployment

1. Set up PostgreSQL (production database)
2. Implement proper authentication flow
3. Add monitoring and logging
4. Deploy to cloud (Render, Railway, Vercel)
5. Set up CI/CD pipeline

## File Naming Conventions

- **Components**: camelCase (e.g., `campaignModal.js`)
- **Utilities**: camelCase (e.g., `validation.js`)
- **CSS**: kebab-case (e.g., `campaign-form.css`)
- **Data**: kebab-case (e.g., `seed.json`)

## Code Style Guidelines

### JavaScript

- Use ES6+ features (arrow functions, destructuring, etc.)
- Prefer `const` over `let`
- Use meaningful variable names
- Add comments for complex logic
- Export functions/objects explicitly

### CSS

- Use CSS variables for theming
- BEM naming for component styles
- Mobile-first responsive design
- Avoid `!important` unless necessary

### HTML

- Semantic HTML5 elements
- Accessible markup (ARIA when needed)
- Minimal inline styles/scripts

## Deployment

### Current (Development)

- Local server (Python, Node.js, or Live Server)
- No build process required

### Production Ready

- Static hosting: GitHub Pages, Netlify, Vercel
- Backend hosting: Render, Railway, Fly.io
- Database: Supabase, ElephantSQL, Railway

## Monitoring and Debugging

### Development

- Browser DevTools (Console, Network, Sources)
- Vue DevTools (if migrating to Vue)
- React DevTools (if migrating to React)

### Production (Future)

- Error tracking: Sentry
- Analytics: Google Analytics, Plausible
- Performance: Lighthouse, Web Vitals
- Logs: Centralized logging (LogRocket, DataDog)

## Summary

This architecture prioritizes:

- ✅ Simplicity and maintainability
- ✅ Rapid development and iteration
- ✅ Easy onboarding for new developers
- ✅ Clear upgrade path to production-ready system
- ✅ Modern web standards and best practices

The modular design ensures components can be independently developed, tested, and replaced as the application grows.
