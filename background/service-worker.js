// Background service worker for SafeBrowse extension

// Initialize default settings on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    linkPreviewEnabled: true,
    pipEnabled: true,
    use24Hour: true
  });
  
  console.log('SafeBrowse extension installed successfully');
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeURL') {
    // Could add server-side URL analysis here
    sendResponse({ success: true });
  }
  return true;
});

// Optional: Add context menu items
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'checkLink',
    title: 'Check link safety',
    contexts: ['link']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'checkLink') {
    // Send message to content script to show preview
    chrome.tabs.sendMessage(tab.id, {
      action: 'showPreview',
      url: info.linkUrl
    });
  }
});
