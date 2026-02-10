# SafeBrowse Architecture

## Overview

SafeBrowse is a Chrome extension built with Manifest V3, using vanilla JavaScript and modern CSS. The architecture follows a modular design with clear separation of concerns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Chrome Browser                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │  New Tab   │  │  Popup   │  │  Service Worker  │   │
│  │    Page    │  │   UI     │  │   (Background)   │   │
│  └────────────┘  └──────────┘  └──────────────────┘   │
│         │              │                 │              │
│         └──────────────┴─────────────────┘              │
│                        │                                │
│                 Chrome Storage API                      │
│                        │                                │
│  ┌─────────────────────────────────────────────────┐   │
│  │            Content Scripts                      │   │
│  │  ┌──────────────┐  ┌───────────────────────┐   │   │
│  │  │ Link Preview │  │ Picture-in-Picture    │   │   │
│  │  │   Scanner    │  │      Button           │   │   │
│  │  └──────────────┘  └───────────────────────┘   │   │
│  └─────────────────────────────────────────────────┘   │
│                        │                                │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Web Pages                          │   │
│  │    (User's browsing context)                    │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Component Breakdown

### 1. Manifest (manifest.json)
**Purpose:** Extension configuration and permissions

**Key Settings:**
- Manifest V3 compliance
- Permissions: `activeTab`, `storage`, `tabs`
- Chrome URL override for new tab
- Content script injection rules

### 2. Service Worker (background/service-worker.js)
**Purpose:** Background tasks and extension lifecycle

**Responsibilities:**
- Initialize default settings on install
- Handle context menu actions
- Manage inter-component communication
- Future: API calls for advanced threat detection

**Key Events:**
- `chrome.runtime.onInstalled`
- `chrome.runtime.onMessage`
- `chrome.contextMenus.onClicked`

### 3. Content Scripts (content/)

#### content.js
**Purpose:** Inject functionality into web pages

**Features:**
- Link hover detection
- URL analysis algorithm
- Preview UI creation and positioning
- PiP button injection
- Video element detection

**Algorithm - URL Analysis:**
```javascript
function analyzeURL(url) {
  1. Parse URL
  2. Check for suspicious patterns:
     - IP addresses
     - Long random strings
     - Repeated characters
     - Phishing keywords
  3. Validate protocol (HTTPS/HTTP)
  4. Check domain TLD
  5. Detect URL shorteners
  6. Calculate risk score (0-100)
  7. Return analysis result
}
```

#### content.css
**Purpose:** Styling for injected elements

**Design System:**
- Glass-morphism effects
- Smooth animations
- Dark mode support
- Responsive positioning

### 4. New Tab Page (newtab/)

#### newtab.html
**Structure:**
```
├── Background Effects (gradients + grid)
├── Header (time + greeting)
├── Search Bar
├── Shortcuts Grid
├── Settings Button
└── Modals (Add/Edit + Settings)
```

#### newtab.js
**State Management:**
```javascript
{
  shortcuts: Array<{name, url, icon}>,
  settings: {
    linkPreviewEnabled: boolean,
    pipEnabled: boolean,
    use24Hour: boolean
  },
  editingIndex: number
}
```

**Key Functions:**
- `updateTime()` - Clock updates
- `updateGreeting()` - Dynamic greeting
- `handleSearch()` - Smart search/navigate
- `loadShortcuts()` - Load from storage
- `saveShortcut()` - Add/edit shortcuts
- `loadSettings()` - Sync settings

#### newtab.css
**Design Philosophy:**
- Modern, clean aesthetic
- Gradient backgrounds
- Glass-morphism cards
- Smooth animations
- Mobile responsive

**CSS Variables:**
```css
--primary: #6366f1
--primary-dark: #4f46e5
--bg-base: #0a0a0f
--text-primary: #f9fafb
/* ... */
```

### 5. Popup (popup/)

#### popup.html
**Components:**
- Header with logo
- Statistics cards
- Feature toggles
- Quick action buttons
- Footer with links

#### popup.js
**Functions:**
- Load current settings
- Display statistics
- Handle toggle changes
- Open new tab
- Clear statistics

#### popup.css
**Style:** Compact, consistent with new tab design

## Data Flow

### Link Preview Flow
```
1. User hovers over link
   ↓
2. content.js detects hover event
   ↓
3. Waits 500ms (debounce)
   ↓
4. Extracts URL
   ↓
5. Runs analyzeURL()
   ↓
6. Creates preview element
   ↓
7. Positions near cursor
   ↓
8. Animates in
   ↓
9. User moves away
   ↓
10. Animates out
   ↓
11. Removes element
```

### Picture-in-Picture Flow
```
1. User loads page with video
   ↓
2. content.js detects video element
   ↓
3. Creates PiP button
   ↓
4. Wraps video in container
   ↓
5. Positions button over video
   ↓
6. User hovers → button visible
   ↓
7. User clicks button
   ↓
8. Calls video.requestPictureInPicture()
   ↓
9. Video pops out
```

### Settings Sync Flow
```
1. User changes setting in popup/new tab
   ↓
2. JavaScript saves to chrome.storage.sync
   ↓
3. Chrome syncs across devices
   ↓
4. Other components listen for changes
   ↓
5. Update their behavior accordingly
```

## Storage Structure

### chrome.storage.sync
```javascript
{
  // Settings
  linkPreviewEnabled: boolean,
  pipEnabled: boolean,
  use24Hour: boolean,
  
  // User data
  shortcuts: [
    {
      name: string,
      url: string,
      icon: string
    },
    // ...
  ]
}
```

### chrome.storage.local
```javascript
{
  // Statistics
  linksChecked: number,
  threatsBlocked: number
}
```

## Security Considerations

### Content Security Policy
- No inline scripts
- No eval() or new Function()
- No external scripts
- All code in extension package

### Privacy
- No external API calls
- All processing local
- No telemetry or tracking
- No data collection

### Permissions
- `activeTab` - Only active tab access
- `storage` - For settings only
- `tabs` - For new tab functionality
- `<all_urls>` - For content script injection

## Performance Optimizations

### Link Preview
- 500ms debounce to prevent spam
- Single element reuse
- CSS animations (GPU accelerated)
- Event delegation

### New Tab
- Lazy load shortcuts
- CSS transitions over JavaScript
- Minimal DOM manipulation
- Efficient event listeners

### Content Scripts
- Run at `document_end`
- Minimal initial footprint
- Progressive enhancement
- No blocking operations

## Future Enhancements

### Planned Improvements
1. **Advanced Threat Detection**
   - Integration with safe browsing APIs
   - Machine learning for better detection
   - Community-driven blocklists

2. **Enhanced New Tab**
   - Multiple theme options
   - Custom backgrounds
   - Widget system (weather, news, etc.)
   - Productivity features (todos, notes)

3. **Performance**
   - Service worker optimization
   - Lazy loading improvements
   - Better caching strategies

4. **Features**
   - Import/export functionality
   - Cloud backup (optional)
   - Multi-profile support
   - Advanced customization

## Testing Strategy

### Manual Testing
- Link preview on various sites
- PiP on different video platforms
- New tab functionality
- Settings persistence
- Cross-browser testing

### Automated Testing (Future)
- Unit tests for utility functions
- Integration tests for components
- E2E tests for user flows
- Performance benchmarks

## Build & Deployment

### Development
```bash
# Load unpacked extension
chrome://extensions/ → Load unpacked
```

### Production (Future)
```bash
# Package for Chrome Web Store
zip -r safebrowse.zip * -x "*.git*" "node_modules/*"
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code style guidelines
- Development workflow
- Pull request process
- Testing requirements

---

**Last Updated:** February 10, 2025
**Version:** 1.0.0
