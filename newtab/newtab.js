// New Tab functionality

let shortcuts = [];
let editingIndex = -1;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadShortcuts();
  updateTime();
  updateGreeting();
  loadSettings();
  initEventListeners();
  
  // Update time every second
  setInterval(updateTime, 1000);
});

// Time and date
function updateTime() {
  const now = new Date();
  const timeEl = document.getElementById('time');
  const dateEl = document.getElementById('date');
  
  chrome.storage.sync.get(['use24Hour'], (result) => {
    const use24Hour = result.use24Hour !== false;
    
    const hours = use24Hour ? now.getHours() : now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = use24Hour ? '' : (now.getHours() >= 12 ? ' PM' : ' AM');
    
    timeEl.textContent = `${hours}:${minutes}${ampm}`;
  });
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.textContent = now.toLocaleDateString('en-US', options);
}

function updateGreeting() {
  const hour = new Date().getHours();
  const greetingEl = document.getElementById('greeting');
  
  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';
  
  greetingEl.textContent = greeting;
}

// Search
function initEventListeners() {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchInput.value);
    }
  });
  
  // Add shortcut
  document.getElementById('addShortcut').addEventListener('click', openAddModal);
  
  // Modal controls
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('cancelBtn').addEventListener('click', closeModal);
  document.getElementById('saveBtn').addEventListener('click', saveShortcut);
  
  // Settings
  document.getElementById('settingsBtn').addEventListener('click', openSettings);
  document.getElementById('closeSettings').addEventListener('click', closeSettings);
  
  // Settings toggles
  document.getElementById('toggleLinkPreview').addEventListener('change', (e) => {
    chrome.storage.sync.set({ linkPreviewEnabled: e.target.checked });
  });
  
  document.getElementById('togglePip').addEventListener('change', (e) => {
    chrome.storage.sync.set({ pipEnabled: e.target.checked });
  });
  
  document.getElementById('toggle24Hour').addEventListener('change', (e) => {
    chrome.storage.sync.set({ use24Hour: e.target.checked });
    updateTime();
  });
  
  // Click outside modal to close
  document.getElementById('shortcutModal').addEventListener('click', (e) => {
    if (e.target.id === 'shortcutModal') closeModal();
  });
  
  document.getElementById('settingsModal').addEventListener('click', (e) => {
    if (e.target.id === 'settingsModal') closeSettings();
  });
}

function handleSearch(query) {
  if (!query) return;
  
  // Check if it's a URL
  const urlPattern = /^(https?:\/\/)|(www\.)|([a-z0-9]+\.[a-z]{2,})/i;
  
  if (urlPattern.test(query)) {
    // Add https:// if missing
    const url = query.startsWith('http') ? query : `https://${query}`;
    window.location.href = url;
  } else {
    // Search with Google
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  }
}

// Shortcuts management
function loadShortcuts() {
  chrome.storage.sync.get(['shortcuts'], (result) => {
    shortcuts = result.shortcuts || getDefaultShortcuts();
    renderShortcuts();
  });
}

function getDefaultShortcuts() {
  return [
    { name: 'Gmail', url: 'https://mail.google.com', icon: '📧' },
    { name: 'YouTube', url: 'https://youtube.com', icon: '▶️' },
    { name: 'GitHub', url: 'https://github.com', icon: '💻' },
    { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
    { name: 'Reddit', url: 'https://reddit.com', icon: '🔶' },
    { name: 'Netflix', url: 'https://netflix.com', icon: '🎬' }
  ];
}

function renderShortcuts() {
  const grid = document.getElementById('shortcutsGrid');
  grid.innerHTML = '';
  
  shortcuts.forEach((shortcut, index) => {
    const card = createShortcutCard(shortcut, index);
    grid.appendChild(card);
  });
}

function createShortcutCard(shortcut, index) {
  const card = document.createElement('a');
  card.className = 'shortcut-card';
  card.href = shortcut.url;
  card.target = '_blank';
  
  const isEmoji = /\p{Emoji}/u.test(shortcut.icon);
  const isUrl = shortcut.icon.startsWith('http');
  
  card.innerHTML = `
    <div class="shortcut-icon">
      ${isUrl ? `<img src="${shortcut.icon}" alt="${shortcut.name}">` : 
        (isEmoji ? shortcut.icon : '🔗')}
    </div>
    <div class="shortcut-name">${shortcut.name}</div>
    <div class="shortcut-actions">
      <button class="shortcut-btn" data-action="edit" data-index="${index}">✏️</button>
      <button class="shortcut-btn" data-action="delete" data-index="${index}">🗑️</button>
    </div>
  `;
  
  // Prevent navigation when clicking action buttons
  card.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]');
    if (action) {
      e.preventDefault();
      const idx = parseInt(action.dataset.index);
      if (action.dataset.action === 'edit') {
        editShortcut(idx);
      } else if (action.dataset.action === 'delete') {
        deleteShortcut(idx);
      }
    }
  });
  
  return card;
}

function openAddModal() {
  editingIndex = -1;
  document.getElementById('modalTitle').textContent = 'Add Shortcut';
  document.getElementById('shortcutName').value = '';
  document.getElementById('shortcutUrl').value = '';
  document.getElementById('shortcutIcon').value = '';
  document.getElementById('shortcutModal').classList.add('active');
}

function editShortcut(index) {
  editingIndex = index;
  const shortcut = shortcuts[index];
  document.getElementById('modalTitle').textContent = 'Edit Shortcut';
  document.getElementById('shortcutName').value = shortcut.name;
  document.getElementById('shortcutUrl').value = shortcut.url;
  document.getElementById('shortcutIcon').value = shortcut.icon;
  document.getElementById('shortcutModal').classList.add('active');
}

function deleteShortcut(index) {
  if (confirm('Delete this shortcut?')) {
    shortcuts.splice(index, 1);
    saveShortcutsToStorage();
    renderShortcuts();
  }
}

function saveShortcut() {
  const name = document.getElementById('shortcutName').value.trim();
  const url = document.getElementById('shortcutUrl').value.trim();
  const icon = document.getElementById('shortcutIcon').value.trim() || '🔗';
  
  if (!name || !url) {
    alert('Please fill in all required fields');
    return;
  }
  
  // Validate URL
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
  } catch {
    alert('Please enter a valid URL');
    return;
  }
  
  const shortcut = {
    name,
    url: url.startsWith('http') ? url : `https://${url}`,
    icon
  };
  
  if (editingIndex >= 0) {
    shortcuts[editingIndex] = shortcut;
  } else {
    shortcuts.push(shortcut);
  }
  
  saveShortcutsToStorage();
  renderShortcuts();
  closeModal();
}

function saveShortcutsToStorage() {
  chrome.storage.sync.set({ shortcuts });
}

function closeModal() {
  document.getElementById('shortcutModal').classList.remove('active');
}

// Settings
function loadSettings() {
  chrome.storage.sync.get(['linkPreviewEnabled', 'pipEnabled', 'use24Hour'], (result) => {
    document.getElementById('toggleLinkPreview').checked = result.linkPreviewEnabled !== false;
    document.getElementById('togglePip').checked = result.pipEnabled !== false;
    document.getElementById('toggle24Hour').checked = result.use24Hour !== false;
  });
}

function openSettings() {
  document.getElementById('settingsModal').classList.add('active');
}

function closeSettings() {
  document.getElementById('settingsModal').classList.remove('active');
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Focus search with '/'
  if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
    e.preventDefault();
    document.getElementById('searchInput').focus();
  }
  
  // Close modals with Escape
  if (e.key === 'Escape') {
    closeModal();
    closeSettings();
  }
});
