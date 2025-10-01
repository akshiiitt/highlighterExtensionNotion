document.addEventListener('DOMContentLoaded', async () => {
  const tokenEl = document.getElementById('token');
  const pageEl = document.getElementById('pageId');
  const saveBtn = document.getElementById('save');
  const status = document.getElementById('status');

  // Load existing
  try {
    const { notionToken, notionPageId } = await chrome.storage.sync.get([
      'notionToken',
      'notionPageId'
    ]);
    if (notionToken) tokenEl.value = notionToken;
    if (notionPageId) pageEl.value = notionPageId;
  } catch (_) {}

  saveBtn.addEventListener('click', async () => {
    const notionToken = tokenEl.value.trim();
    const notionPageId = pageEl.value.trim();

    await chrome.storage.sync.set({ notionToken, notionPageId });

    status.textContent = 'Saved';
    setTimeout(() => (status.textContent = ''), 1500);
  });
});
