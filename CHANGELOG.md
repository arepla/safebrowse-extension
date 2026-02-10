# Changelog

All notable changes to SafeBrowse will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-02-10

### Added
- 🔐 **Link Security Analysis**
  - Real-time link scanning on hover
  - Risk scoring algorithm
  - Visual safety indicators (Safe/Warning/Dangerous)
  - Detection of suspicious patterns, IP addresses, phishing keywords
  - Support for HTTP/HTTPS protocol analysis
  - URL shortener detection

- 📺 **Picture-in-Picture Mode**
  - Universal PiP button for all videos
  - One-click activation
  - Auto-hide button with hover reveal
  - Support for all major video platforms

- 🎨 **Custom New Tab Page**
  - Beautiful gradient background with animations
  - Grid pattern overlay
  - Live clock with 12/24-hour format toggle
  - Dynamic greeting based on time of day
  - Smart search bar (Google search + URL navigation)
  - Customizable shortcuts with drag-and-drop
  - Add/edit/delete shortcuts
  - Custom icons (emoji or URL)
  - Dark theme optimized

- ⚙️ **Settings & Configuration**
  - Toggle link preview on/off
  - Toggle PiP button on/off
  - 12/24-hour clock format selection
  - Settings sync across devices
  - Clean, modern settings UI

- 🎯 **Extension Popup**
  - Statistics tracking (links checked, threats blocked)
  - Quick feature toggles
  - Direct access to new tab
  - Clear statistics option
  - Version display and GitHub link

- 📱 **UI/UX Improvements**
  - Smooth animations and transitions
  - Glass-morphism design elements
  - Responsive layout for all screen sizes
  - Keyboard shortcuts (/ for search, Escape to close modals)
  - Hover effects and micro-interactions

### Technical
- Built with Manifest V3
- Vanilla JavaScript (no dependencies)
- Chrome Storage API for settings persistence
- Service worker for background tasks
- Content scripts for page injection

### Privacy & Security
- 100% local processing
- No data collection
- No external API calls
- No tracking or analytics
- Open source and transparent

## [Unreleased]

### Planned Features
- [ ] Export/import shortcuts
- [ ] Multiple new tab themes
- [ ] Custom background images
- [ ] Whitelist/blacklist for link scanner
- [ ] Advanced URL reputation checking
- [ ] Statistics dashboard
- [ ] Weather widget
- [ ] Notes/todo integration
- [ ] Browser history integration
- [ ] Keyboard shortcuts customization
- [ ] Multi-language support

---

## Version History

### Version 1.0.0
**Release Date:** February 10, 2025

**Highlights:**
- Initial public release
- Core features: Link security, PiP, New tab
- Beautiful modern UI
- Privacy-focused design

---

## Upgrade Guide

### From Beta to 1.0.0
Not applicable - this is the first public release.

---

## Support

For issues, feature requests, or questions:
- **GitHub Issues:** [Report a bug](https://github.com/yourusername/safebrowse-extension/issues)
- **Discussions:** [Feature requests & questions](https://github.com/yourusername/safebrowse-extension/discussions)
- **Email:** support@safebrowse.com

---

[1.0.0]: https://github.com/yourusername/safebrowse-extension/releases/tag/v1.0.0
