// Content script for link preview and picture-in-picture features

let previewTimeout;
let previewElement;
let pipButton;

// Initialize features
function init() {
  chrome.storage.sync.get(['linkPreviewEnabled', 'pipEnabled'], (result) => {
    if (result.linkPreviewEnabled !== false) {
      initLinkPreview();
    }
    if (result.pipEnabled !== false) {
      initPictureInPicture();
    }
  });
}

// Link Preview Feature
function initLinkPreview() {
  document.addEventListener('mouseover', handleLinkHover);
  document.addEventListener('mouseout', handleLinkLeave);
}

function handleLinkHover(e) {
  const link = e.target.closest('a');
  if (!link || !link.href) return;

  clearTimeout(previewTimeout);
  previewTimeout = setTimeout(() => {
    showLinkPreview(link, e.clientX, e.clientY);
  }, 500);
}

function handleLinkLeave(e) {
  clearTimeout(previewTimeout);
  if (previewElement && !previewElement.contains(e.relatedTarget)) {
    hidePreview();
  }
}

async function showLinkPreview(link, x, y) {
  const url = link.href;
  
  // Analyze URL for security
  const analysis = analyzeURL(url);
  
  // Create preview element
  previewElement = createPreviewElement(url, analysis, x, y);
  document.body.appendChild(previewElement);
  
  // Position preview
  positionPreview(previewElement, x, y);
  
  // Animate in
  requestAnimationFrame(() => {
    previewElement.classList.add('sb-preview-visible');
  });
}

function analyzeURL(url) {
  try {
    const urlObj = new URL(url);
    const suspiciousPatterns = [
      /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, // IP addresses
      /[a-z0-9]{20,}/, // Long random strings
      /(.)\1{4,}/, // Repeated characters
      /-(login|secure|account|verify|update)/i, // Phishing keywords
    ];
    
    let riskScore = 0;
    let warnings = [];
    
    // Check for suspicious patterns
    suspiciousPatterns.forEach(pattern => {
      if (pattern.test(url)) {
        riskScore += 20;
      }
    });
    
    // Check protocol
    if (urlObj.protocol !== 'https:' && urlObj.protocol !== 'http:') {
      riskScore += 30;
      warnings.push('Unusual protocol detected');
    } else if (urlObj.protocol === 'http:') {
      riskScore += 10;
      warnings.push('Unencrypted connection (HTTP)');
    }
    
    // Check for URL shorteners
    const shorteners = ['bit.ly', 't.co', 'goo.gl', 'tinyurl.com', 'ow.ly'];
    if (shorteners.some(s => urlObj.hostname.includes(s))) {
      riskScore += 15;
      warnings.push('URL shortener - destination hidden');
    }
    
    // Check for suspicious TLDs
    const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz'];
    if (suspiciousTLDs.some(tld => urlObj.hostname.endsWith(tld))) {
      riskScore += 25;
      warnings.push('Suspicious domain extension');
    }
    
    // Determine safety level
    let level = 'safe';
    if (riskScore >= 50) level = 'dangerous';
    else if (riskScore >= 25) level = 'warning';
    
    return {
      level,
      score: riskScore,
      warnings,
      hostname: urlObj.hostname,
      protocol: urlObj.protocol
    };
  } catch (e) {
    return {
      level: 'warning',
      score: 30,
      warnings: ['Invalid URL format'],
      hostname: 'Unknown',
      protocol: 'Unknown'
    };
  }
}

function createPreviewElement(url, analysis, x, y) {
  const preview = document.createElement('div');
  preview.className = 'sb-link-preview';
  
  const statusColors = {
    safe: '#10b981',
    warning: '#f59e0b',
    dangerous: '#ef4444'
  };
  
  const statusIcons = {
    safe: '✓',
    warning: '⚠',
    dangerous: '✕'
  };
  
  preview.innerHTML = `
    <div class="sb-preview-header" style="background: ${statusColors[analysis.level]};">
      <span class="sb-preview-icon">${statusIcons[analysis.level]}</span>
      <span class="sb-preview-status">${analysis.level.toUpperCase()}</span>
    </div>
    <div class="sb-preview-body">
      <div class="sb-preview-url">${analysis.hostname}</div>
      <div class="sb-preview-protocol">${analysis.protocol}</div>
      ${analysis.warnings.length > 0 ? `
        <div class="sb-preview-warnings">
          ${analysis.warnings.map(w => `<div class="sb-warning-item">• ${w}</div>`).join('')}
        </div>
      ` : '<div class="sb-preview-safe-msg">No threats detected</div>'}
      <div class="sb-preview-score">Risk Score: ${analysis.score}/100</div>
    </div>
  `;
  
  return preview;
}

function positionPreview(preview, x, y) {
  const padding = 10;
  const rect = preview.getBoundingClientRect();
  
  let left = x + padding;
  let top = y + padding;
  
  // Adjust if goes off screen
  if (left + rect.width > window.innerWidth) {
    left = x - rect.width - padding;
  }
  
  if (top + rect.height > window.innerHeight) {
    top = y - rect.height - padding;
  }
  
  preview.style.left = left + 'px';
  preview.style.top = top + 'px';
}

function hidePreview() {
  if (previewElement) {
    previewElement.classList.remove('sb-preview-visible');
    setTimeout(() => {
      if (previewElement && previewElement.parentNode) {
        previewElement.parentNode.removeChild(previewElement);
      }
      previewElement = null;
    }, 200);
  }
}

// Picture-in-Picture Feature
function initPictureInPicture() {
  document.addEventListener('mouseover', handleVideoHover);
}

function handleVideoHover(e) {
  const video = e.target.closest('video');
  if (!video || video.hasAttribute('data-pip-button')) return;
  
  video.setAttribute('data-pip-button', 'true');
  addPiPButton(video);
}

function addPiPButton(video) {
  const button = document.createElement('button');
  button.className = 'sb-pip-button';
  button.innerHTML = '⧉';
  button.title = 'Picture-in-Picture';
  
  button.onclick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch (err) {
      console.error('PiP error:', err);
    }
  };
  
  // Position button over video
  const wrapper = document.createElement('div');
  wrapper.className = 'sb-pip-wrapper';
  video.parentNode.insertBefore(wrapper, video);
  wrapper.appendChild(video);
  wrapper.appendChild(button);
  
  // Show button on hover
  wrapper.addEventListener('mouseenter', () => {
    button.style.opacity = '1';
  });
  
  wrapper.addEventListener('mouseleave', () => {
    button.style.opacity = '0';
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
