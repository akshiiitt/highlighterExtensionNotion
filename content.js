// Content script for text highlighting and Notion integration
class TextHighlighter {
  constructor() {
    this.highlightClass = 'notion-highlight';
    this.init();
  }

  init() {
    // Listen for text selection
    document.addEventListener('mouseup', this.handleTextSelection.bind(this));
    document.addEventListener('keyup', this.handleTextSelection.bind(this));
    
    // Listen for messages from popup
    chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
  }

  handleTextSelection() {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText.length > 0) {
      this.showHighlightOption(selection, selectedText);
    }
  }

  showHighlightOption(selection, text) {
    // Remove any existing highlight buttons
    this.removeHighlightButton();
    
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    // Create highlight button
    const button = document.createElement('div');
    button.id = 'highlight-button';
    button.innerHTML = '💡 Highlight & Save';
    button.style.cssText = `
      position: fixed;
      top: ${rect.top + window.scrollY - 40}px;
      left: ${rect.left + window.scrollX}px;
      background: #2196F3;
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      cursor: pointer;
      z-index: 10000;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      border: none;
    `;
    
    button.addEventListener('click', () => {
      this.highlightText(selection, text);
      this.removeHighlightButton();
    });
    
    document.body.appendChild(button);
    
    // Auto-remove button after 3 seconds
    setTimeout(() => this.removeHighlightButton(), 3000);
  }

  removeHighlightButton() {
    const existingButton = document.getElementById('highlight-button');
    if (existingButton) {
      existingButton.remove();
    }
  }

  highlightText(selection, text) {
    try {
      const range = selection.getRangeAt(0);
      
      // Create highlight span
      const highlightSpan = document.createElement('span');
      highlightSpan.className = this.highlightClass;
      highlightSpan.style.backgroundColor = '#ffeb3b';
      highlightSpan.style.padding = '2px 0';
      
      // Wrap the selected text
      range.surroundContents(highlightSpan);
      
      // Save to Notion
      this.saveToNotion(text, window.location.href);
      
      // Clear selection
      selection.removeAllRanges();
      
      // Show success message
      this.showNotification('Text highlighted and saved to Notion!');
      
    } catch (error) {
      console.error('Error highlighting text:', error);
      this.showNotification('Error highlighting text. Please try again.', 'error');
    }
  }

  async saveToNotion(text, url) {
    try {
      // Get Notion configuration from storage
      const config = await chrome.storage.sync.get(['notionToken', 'notionDatabaseId']);
      
      if (!config.notionToken || !config.notionDatabaseId) {
        this.showNotification('Please configure Notion settings in the extension popup', 'warning');
        return;
      }

      // Send to background script for API call
      chrome.runtime.sendMessage({
        action: 'saveToNotion',
        data: {
          text: text,
          url: url,
          timestamp: new Date().toISOString(),
          pageTitle: document.title
        }
      });

    } catch (error) {
      console.error('Error saving to Notion:', error);
      this.showNotification('Error saving to Notion. Check your settings.', 'error');
    }
  }

  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#4caf50'};
      color: white;
      padding: 12px 16px;
      border-radius: 4px;
      font-size: 14px;
      font-family: Arial, sans-serif;
      z-index: 10001;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
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

  handleMessage(request, sender, sendResponse) {
    if (request.action === 'getHighlights') {
      const highlights = Array.from(document.querySelectorAll(`.${this.highlightClass}`))
        .map(el => el.textContent);
      sendResponse(highlights);
    }
  }
}

// Initialize the highlighter when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new TextHighlighter());
} else {
  new TextHighlighter();
}
