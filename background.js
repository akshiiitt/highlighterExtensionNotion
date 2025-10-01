// Minimal background service worker: context menu + Notion append

const MENU_ID = 'highlight-save-to-notion';

chrome.runtime.onInstalled.addListener(() => {
  try {
    chrome.contextMenus.create({
      id: MENU_ID,
      title: 'Highlight & Save to Notion',
      contexts: ['selection']
    });
  } catch (e) {
    // menu may already exist on reload
  }
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== MENU_ID || !tab || !tab.id) return;
  const selectedText = (info.selectionText || '').trim();
  if (!selectedText) return;

  // Ask the content script to highlight the current selection
  try {
    await sendHighlightMessage(tab.id);
  } catch (e) {
    // ignore highlighting errors; still proceed to save
  }

  try {
    await appendToNotionPage({
      text: selectedText
    });
  } catch (e) {
    // Silent fail is acceptable for minimal flow; available in console for debugging
    console.error('Notion save failed:', e);
  }
});

function sendHighlightMessage(tabId) {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, { action: 'highlightSelection' }, (resp) => {
      resolve(resp && resp.ok);
    });
  });
}

async function appendToNotionPage({ text }) {
  // Read minimal config
  const { notionToken, notionPageId } = await chrome.storage.sync.get([
    'notionToken',
    'notionPageId'
  ]);

  if (!notionToken || !notionPageId) {
    throw new Error('Missing Notion token or page ID in options');
  }

  // Normalize page ID: allow hyphenated or plain UUIDs
  const pageId = String(notionPageId).replace(/-/g, '');

  // Notion allows appending block children to a page (page is a block)
  // We append a simple paragraph with the selected text (minimal)
  const body = {
    children: [
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: { content: String(text).slice(0, 2000) }
            }
          ]
        }
      }
    ]
  };

  const res = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${notionToken}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    let errMsg = res.statusText;
    try { const e = await res.json(); errMsg = e.message || errMsg; } catch (_) {}
    throw new Error(errMsg);
  }
}
