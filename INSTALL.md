# Installation Guide

## Quick Start

### For Chrome/Edge Users

1. **Download the Extension**
   ```bash
   git clone https://github.com/yourusername/safebrowse-extension.git
   ```
   
   OR download the [latest release](https://github.com/yourusername/safebrowse-extension/releases) and extract the ZIP file.

2. **Open Extension Settings**
   - Open Chrome/Edge
   - Navigate to `chrome://extensions/` (or `edge://extensions/`)
   - Enable **Developer mode** using the toggle in the top-right corner

3. **Load the Extension**
   - Click **Load unpacked**
   - Select the `safebrowse-extension` folder
   - The extension icon should appear in your toolbar!

4. **Pin the Extension** (Recommended)
   - Click the puzzle piece icon in the toolbar
   - Find SafeBrowse
   - Click the pin icon to keep it visible

5. **Test It Out**
   - Open a new tab to see the custom new tab page
   - Visit any website and hover over a link
   - Find a video and look for the PiP button

## Troubleshooting

### Extension Not Loading

**Problem:** Error when loading unpacked extension

**Solutions:**
- Make sure you selected the root folder containing `manifest.json`
- Check that all files are present
- Ensure Developer mode is enabled
- Try restarting Chrome/Edge

### Link Preview Not Showing

**Problem:** No preview appears when hovering over links

**Solutions:**
1. Check if the feature is enabled:
   - Click the SafeBrowse icon in toolbar
   - Make sure "Link Preview" is toggled ON
2. Refresh the webpage
3. Try a different website
4. Check the browser console for errors (F12 → Console)

### PiP Button Not Appearing

**Problem:** PiP button doesn't show on videos

**Solutions:**
1. Verify the feature is enabled in settings
2. Refresh the page with the video
3. Hover directly over the video element
4. Some custom video players may not be supported yet

### New Tab Not Changing

**Problem:** Still seeing the default Chrome new tab

**Solutions:**
1. Close ALL Chrome windows completely
2. Reopen Chrome
3. Open a new tab
4. If still not working:
   - Go to `chrome://extensions/`
   - Find SafeBrowse
   - Click "Details"
   - Scroll to "Site access"
   - Ensure permissions are granted

### Settings Not Saving

**Problem:** Changes to settings don't persist

**Solutions:**
1. Check if Chrome Sync is working
2. Clear extension storage:
   - Open `chrome://extensions/`
   - Find SafeBrowse
   - Click "Details"
   - Scroll down and click "Clear storage and data"
3. Reload the extension
4. Reconfigure settings

## Updating the Extension

### Manual Update

1. **Download** the latest version
2. **Extract** files to the same location (overwrite old files)
3. **Go to** `chrome://extensions/`
4. **Click** the refresh icon on the SafeBrowse card

### Auto-Update (Coming Soon)

Once published to Chrome Web Store, updates will be automatic.

## Uninstalling

1. Go to `chrome://extensions/`
2. Find SafeBrowse
3. Click **Remove**
4. Confirm removal

Your settings and shortcuts will be deleted. To keep a backup:
- Export shortcuts before uninstalling (feature coming soon)
- Check Chrome's sync data settings

## Browser Compatibility

| Browser | Supported | Notes |
|---------|-----------|-------|
| Chrome | ✅ Yes | Fully supported (v88+) |
| Edge | ✅ Yes | Chromium-based Edge |
| Brave | ✅ Yes | Should work perfectly |
| Opera | ✅ Yes | Chromium-based Opera |
| Firefox | ❌ No | Uses different extension API |
| Safari | ❌ No | Different extension system |

## Permissions Explained

SafeBrowse requests the following permissions:

- **activeTab** - To inject link preview functionality
- **storage** - To save your shortcuts and settings
- **tabs** - To open new tabs for shortcuts
- **<all_urls>** - To work on any website you visit

**We respect your privacy:** All processing happens locally. No data is sent anywhere.

## Getting Help

If you're still having issues:

1. Check [GitHub Issues](https://github.com/yourusername/safebrowse-extension/issues)
2. Search [Discussions](https://github.com/yourusername/safebrowse-extension/discussions)
3. Create a new issue with:
   - Chrome version
   - Operating system
   - Detailed description of the problem
   - Screenshots if relevant
   - Console errors (F12 → Console)

## Next Steps

Now that SafeBrowse is installed:

- ⭐ **Star the repository** on GitHub
- 📝 **Add your favorite shortcuts** to the new tab
- ⚙️ **Customize settings** to your preference
- 🐛 **Report bugs** if you find any
- 💡 **Suggest features** you'd like to see

Happy browsing! 🎉
