// Popup script for managing Notion configuration
document.addEventListener('DOMContentLoaded', async function() {
  const notionTokenInput = document.getElementById('notionToken');
  const notionDatabaseIdInput = document.getElementById('notionDatabaseId');
  const saveConfigButton = document.getElementById('saveConfig');
  const configStatus = document.getElementById('configStatus');

  // Load existing configuration
  await loadConfiguration();

  // Save configuration
  saveConfigButton.addEventListener('click', saveConfiguration);

  async function loadConfiguration() {
    try {
      const config = await chrome.storage.sync.get(['notionToken', 'notionDatabaseId']);
      
      if (config.notionToken) {
        notionTokenInput.value = config.notionToken;
      }
      
      if (config.notionDatabaseId) {
        notionDatabaseIdInput.value = config.notionDatabaseId;
      }

      // Show status if configuration exists
      if (config.notionToken && config.notionDatabaseId) {
        showStatus('Configuration loaded successfully!', 'success');
      }
    } catch (error) {
      console.error('Error loading configuration:', error);
      showStatus('Error loading configuration', 'error');
    }
  }

  async function saveConfiguration() {
    const notionToken = notionTokenInput.value.trim();
    const notionDatabaseId = notionDatabaseIdInput.value.trim();

    // Validate inputs
    if (!notionToken || !notionDatabaseId) {
      showStatus('Please fill in both fields', 'error');
      return;
    }

    if (!notionToken.startsWith('secret_')) {
      showStatus('Notion token should start with "secret_"', 'error');
      return;
    }

    if (notionDatabaseId.length !== 32) {
      showStatus('Database ID should be 32 characters long', 'error');
      return;
    }

    try {
      // Save to Chrome storage
      await chrome.storage.sync.set({
        notionToken: notionToken,
        notionDatabaseId: notionDatabaseId
      });

      showStatus('Configuration saved successfully!', 'success');
      
      // Test the configuration
      await testNotionConnection(notionToken, notionDatabaseId);

    } catch (error) {
      console.error('Error saving configuration:', error);
      showStatus('Error saving configuration', 'error');
    }
  }

  async function testNotionConnection(token, databaseId) {
    try {
      const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Notion-Version': '2022-06-28'
        }
      });

      if (response.ok) {
        showStatus('✅ Notion connection successful!', 'success');
      } else {
        const errorData = await response.json();
        showStatus(`❌ Notion connection failed: ${errorData.message}`, 'error');
      }
    } catch (error) {
      showStatus('❌ Unable to test connection. Please check your settings.', 'error');
    }
  }

  function showStatus(message, type) {
    configStatus.textContent = message;
    configStatus.className = `status ${type}`;
    
    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
      setTimeout(() => {
        configStatus.textContent = '';
        configStatus.className = '';
      }, 3000);
    }
  }
});
