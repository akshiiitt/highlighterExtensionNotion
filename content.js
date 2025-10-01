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

  chrome.runtime.onMessage.addListener((req, _sender, sendResponse) => {
    if (req && req.action === 'highlightSelection') {
      const ok = highlightCurrentSelection();
      sendResponse({ ok });
      return true;
    }
  });
})();
