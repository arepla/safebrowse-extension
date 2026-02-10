// Popup functionality

document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  loadStats();
  initEventListeners();
});

// Load settings from storage
function loadSettings() {
  chrome.storage.sync.get(['linkPreviewEnabled', 'pipEnabled'], (result) => {
    document.getElementById('toggleLinkPreview').checked = result.linkPreviewEnabled !== false;
    document.getElementById('togglePip').checked = result.pipEnabled !== false;
  });
}

// Load statistics
function loadStats() {
  chrome.storage.local.get(['linksChecked', 'threatsBlocked'], (result) => {
    document.getElementById('linksChecked').textContent = result.linksChecked || 0;
    document.getElementById('threatsBlocked').textContent = result.threatsBlocked || 0;
  });
}

// Event listeners
function initEventListeners() {
  // Toggle link preview
  document.getElementById('toggleLinkPreview').addEventListener('change', (e) => {
    chrome.storage.sync.set({ linkPreviewEnabled: e.target.checked });
  });
  
  // Toggle PiP
  document.getElementById('togglePip').addEventListener('change', (e) => {
    chrome.storage.sync.set({ pipEnabled: e.target.checked });
  });
  
  // Open new tab
  document.getElementById('openNewTab').addEventListener('click', () => {
    chrome.tabs.create({ url: 'chrome://newtab' });
  });
  
  // Clear stats
  document.getElementById('clearData').addEventListener('click', () => {
    if (confirm('Clear all statistics?')) {
      chrome.storage.local.set({ linksChecked: 0, threatsBlocked: 0 });
      loadStats();
    }
  });
}
