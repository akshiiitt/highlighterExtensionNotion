document.addEventListener('DOMContentLoaded', async () => {
  const tokenEl = document.getElementById('token');
  const pageEl = document.getElementById('pageId');
  const saveBtn = document.getElementById('save');
  const status = document.getElementById('status');

  // Load existing settings
  try {
    const { notionToken, notionPageId } = await chrome.storage.sync.get([
      'notionToken',
      'notionPageId'
    ]);
    if (notionToken) tokenEl.value = notionToken;
    if (notionPageId) pageEl.value = notionPageId;
    
    if (notionToken && notionPageId) {
      status.textContent = '✅ Settings loaded';
      status.style.color = 'green';
    }
  } catch (e) {
    status.textContent = '❌ Error loading settings';
    status.style.color = 'red';
  }

  saveBtn.addEventListener('click', async () => {
    const notionToken = tokenEl.value.trim();
    const notionPageId = pageEl.value.trim();

    // Basic validation
    if (!notionToken || !notionPageId) {
      status.textContent = '❌ Please fill both fields';
      status.style.color = 'red';
      return;
    }

    if (!notionToken.startsWith('secret_')) {
      status.textContent = '❌ Token should start with "secret_"';
      status.style.color = 'red';
      return;
    }

    const cleanPageId = notionPageId.replace(/-/g, '');
    if (cleanPageId.length !== 32) {
      status.textContent = '❌ Page ID should be 32 characters';
      status.style.color = 'red';
      return;
    }

    try {
      await chrome.storage.sync.set({ notionToken, notionPageId });
      status.textContent = '✅ Settings saved successfully!';
      status.style.color = 'green';
      
      setTimeout(() => {
        status.textContent = '';
      }, 3000);
    } catch (e) {
      status.textContent = '❌ Error saving settings';
      status.style.color = 'red';
    }
  });
});
