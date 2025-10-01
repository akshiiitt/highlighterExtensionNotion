// Background script for handling Notion API calls
class NotionService {
  constructor() {
    this.setupMessageListener();
  }

  setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'saveToNotion') {
        this.saveToNotion(request.data)
          .then(result => sendResponse({ success: true, result }))
          .catch(error => sendResponse({ success: false, error: error.message }));
        return true; // Keep message channel open for async response
      }
    });
  }

  async saveToNotion(data) {
    try {
      // Get Notion configuration
      const config = await chrome.storage.sync.get(['notionToken', 'notionDatabaseId']);
      
      if (!config.notionToken || !config.notionDatabaseId) {
        throw new Error('Notion configuration not found');
      }

      const notionData = {
        parent: {
          database_id: config.notionDatabaseId
        },
        properties: {
          "Title": {
            title: [
              {
                text: {
                  content: data.pageTitle || "Highlighted Text"
                }
              }
            ]
          },
          "Content": {
            rich_text: [
              {
                text: {
                  content: data.text
                }
              }
            ]
          },
          "URL": {
            url: data.url
          },
          "Date": {
            date: {
              start: data.timestamp.split('T')[0]
            }
          }
        }
      };

      const response = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.notionToken}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28'
        },
        body: JSON.stringify(notionData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Notion API Error: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('Successfully saved to Notion:', result);
      return result;

    } catch (error) {
      console.error('Error saving to Notion:', error);
      throw error;
    }
  }
}

// Initialize the service
new NotionService();
