// Minimal content script: highlights the current selection when asked
(function () {
  function highlightCurrentSelection() {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return false;
    const text = sel.toString().trim();
    if (!text) return false;

    try {
      const range = sel.getRangeAt(0);

      // Try clean surround first with <mark>
      const mark = document.createElement('mark');
      try {
        range.surroundContents(mark);
      } catch (_) {
        // Fallback: extract and wrap
        const frag = range.extractContents();
        mark.appendChild(frag);
        range.insertNode(mark);
      }
      sel.removeAllRanges();
      return true;
    } catch (e) {
      return false;
    }
  }

  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'error' ? '#ff4444' : '#44aa44'};
      color: white;
      padding: 12px 16px;
      border-radius: 4px;
      font-size: 14px;
      font-family: Arial, sans-serif;
      z-index: 10000;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }

  chrome.runtime.onMessage.addListener((req, _sender, sendResponse) => {
    if (req && req.action === 'highlightSelection') {
      const ok = highlightCurrentSelection();
      sendResponse({ ok });
      return true;
    }
    
    if (req && req.action === 'showNotification') {
      showNotification(req.message, req.type);
      sendResponse({ ok: true });
      return true;
    }
  });
})();
