# SafeBrowse - Smart Security & Productivity Extension 🛡️

<div align="center">

![SafeBrowse Logo](icons/icon128.png)

**Advanced link scanning, picture-in-picture for videos, and a beautiful customizable new tab experience**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Chrome](https://img.shields.io/badge/Chrome-Extension-green.svg)](https://www.google.com/chrome/)
[![Version](https://img.shields.io/badge/version-1.0.0-orange.svg)](https://github.com/yourusername/safebrowse-extension)

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Screenshots](#screenshots) • [Development](#development)

</div>

---

## 🌟 Features

### 🔐 Smart Link Security Analysis
- **Real-time link scanning** - Hover over any link to see instant security analysis
- **Risk scoring system** - Intelligent algorithm detects suspicious patterns
- **Visual warnings** - Color-coded indicators (Safe/Warning/Dangerous)
- **Threat detection** including:
  - IP addresses in URLs
  - Suspicious domain extensions (.tk, .ml, .ga, etc.)
  - URL shorteners masking destinations
  - Phishing keywords
  - Unencrypted HTTP connections
  - Random character strings

### 📺 Picture-in-Picture for All Videos
- **Universal PiP button** - Automatically adds a floating PiP button to every video element
- **One-click activation** - Simply click the button to pop out any video
- **Works everywhere** - YouTube, Netflix, Vimeo, embedded videos, and more
- **Elegant design** - Minimal, non-intrusive overlay that appears on hover

### 🎨 Stunning New Tab Experience
- **Beautiful modern design** - Gradient backgrounds, smooth animations, glass-morphism effects
- **Customizable shortcuts** - Add, edit, and organize your favorite sites
- **Drag-and-drop layout** - Arrange shortcuts exactly how you want
- **Live clock** - Choose between 12-hour or 24-hour format
- **Dynamic greeting** - Changes based on time of day
- **Quick search** - Smart search bar with Google integration and direct URL navigation
- **Dark theme** - Eye-friendly dark mode design

### ⚙️ Full Customization
- Toggle features on/off individually
- Personalize your new tab with custom icons
- Choose between 12/24-hour time formats
- Clean, intuitive settings interface

---

## 📥 Installation

### From Source (Recommended for now)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/safebrowse-extension.git
   cd safebrowse-extension
   ```

2. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top right)
   - Click **Load unpacked**
   - Select the `safebrowse-extension` folder

3. **You're all set!** 🎉
   - The extension icon will appear in your toolbar
   - Open a new tab to see the new tab page
   - Hover over any link to test the security scanner

### From Chrome Web Store
*Coming soon!*

---

## 🚀 Usage

### Link Security Preview

1. **Simply hover** over any link on any webpage
2. **Wait 500ms** - A preview card will appear
3. **Review the analysis**:
   - Green header = Safe ✓
   - Yellow header = Warning ⚠
   - Red header = Dangerous ✕
4. **See details** including:
   - Domain name
   - Protocol (HTTP/HTTPS)
   - Specific warnings
   - Overall risk score

### Picture-in-Picture

1. **Hover over any video** on a webpage
2. **Click the PiP button** (⧉) that appears in the top-right corner
3. **Video pops out** into a floating window
4. **Continue browsing** while watching the video
5. **Click the PiP button again** to return video to page

### New Tab Page

#### Adding Shortcuts
1. Click the **"+ Add"** button
2. Fill in:
   - **Name** - Display name (e.g., "Gmail")
   - **URL** - Website address
   - **Icon** - Emoji (📧) or image URL (optional)
3. Click **Save**

#### Managing Shortcuts
- **Edit**: Click the ✏️ button on any shortcut
- **Delete**: Click the 🗑️ button
- **Rearrange**: Drag and drop shortcuts (coming soon)

#### Search Bar
- Type a **website** and press Enter to navigate
- Type a **search query** and press Enter to Google it
- Press **/** key to focus the search bar

#### Settings
1. Click the **⚙️ gear icon** in bottom-right
2. Toggle features:
   - Link Security Preview
   - Picture-in-Picture Button
   - 24-hour Clock Format

---



## 🛠️ Development

### Tech Stack
- **Manifest V3** - Latest Chrome extension API
- **Vanilla JavaScript** - No frameworks, pure performance
- **Modern CSS** - Gradients, animations, glass-morphism
- **Chrome Storage API** - Sync settings across devices

### Project Structure
```
safebrowse-extension/
├── manifest.json              # Extension configuration
├── background/
│   └── service-worker.js      # Background tasks
├── content/
│   ├── content.js             # Link preview & PiP logic
│   └── content.css            # Content script styles
├── newtab/
│   ├── newtab.html            # New tab page
│   ├── newtab.css             # New tab styles
│   └── newtab.js              # New tab functionality
├── popup/
│   ├── popup.html             # Extension popup
│   ├── popup.css              # Popup styles
│   └── popup.js               # Popup logic
└── icons/                     # Extension icons
```

### Building from Source

**Prerequisites:**
- Chrome browser (version 88+)
- Basic understanding of Chrome extensions

**Development:**
```bash
# Clone repository
git clone https://github.com/yourusername/safebrowse-extension.git

# Navigate to folder
cd safebrowse-extension

# Load in Chrome
# 1. Go to chrome://extensions/
# 2. Enable Developer mode
# 3. Click "Load unpacked"
# 4. Select the folder
```

### Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Future Features
- [ ] Advanced URL reputation checking via API
- [ ] Whitelist/blacklist management
- [ ] Export/import shortcuts
- [ ] Multiple new tab themes
- [ ] Statistics dashboard
- [ ] Browser history integration
- [ ] Custom background images
- [ ] Weather widget
- [ ] Notes/todo integration

---

## 🔒 Privacy & Security

SafeBrowse is designed with **privacy-first** principles:

- ✅ **No data collection** - We don't collect or store any user data
- ✅ **Local analysis** - All link scanning happens locally in your browser
- ✅ **No external requests** - Security checks are performed offline
- ✅ **Open source** - Complete transparency - inspect the code yourself
- ✅ **No tracking** - No analytics, no telemetry, no phone home

Your browsing data stays **100% private** on your device.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 SafeBrowse

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---


---

## 🙏 Acknowledgments

- Icons designed with love
- Inspired by modern web design trends
- Built with the Chrome Extension community in mind
- Thanks to all contributors!

---

<div align="center">

**Made with ❤️ for a safer, more productive browsing experience**

[⬆ Back to Top](#safebrowse---smart-security--productivity-extension-)

</div>
