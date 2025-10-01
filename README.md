# Text Highlighter & Notion Saver

A minimal Chrome extension that allows you to highlight selected text on any webpage and automatically save it to Notion for easy reference and revision.

## Features

- 🖍️ **Simple Text Highlighting**: Select any text and click to highlight it
- 📝 **Notion Integration**: Automatically saves highlighted text to your Notion database
- 🚀 **Minimal & Fast**: No unnecessary features, just what you need
- 📖 **Perfect for Research**: Great for saving important points while reading articles

## Setup Instructions

### 1. Install the Extension

1. Clone this repository or download the files
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension icon should appear in your toolbar

### 2. Create Notion Integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Give it a name (e.g., "Text Highlighter")
4. Copy the "Internal Integration Token" (starts with `secret_`)

### 3. Set Up Notion Database

1. Create a new Notion page
2. Add a database with these columns:
   - **Title** (Title type)
   - **Content** (Text type)
   - **URL** (URL type)
   - **Date** (Date type)
3. Share the page with your integration:
   - Click "Share" → "Invite" → Select your integration
4. Copy the database ID from the URL (32-character string)

### 4. Configure the Extension

1. Click the extension icon in your toolbar
2. Enter your Notion Integration Token
3. Enter your Database ID
4. Click "Save Configuration"
5. You should see a success message if everything is set up correctly

## How to Use

1. **Select Text**: Highlight any text on a webpage
2. **Click Button**: A "💡 Highlight & Save" button will appear
3. **Save**: Click the button to highlight the text and save it to Notion
4. **Done**: The text is now highlighted on the page and saved to your Notion database

## File Structure

```
├── manifest.json       # Extension configuration
├── content.js          # Main highlighting functionality
├── background.js       # Notion API integration
├── popup.html          # Extension popup interface
├── popup.js            # Popup functionality
├── styles.css          # Highlighting styles
├── icons/              # Extension icons
└── README.md           # This file
```

## Development

This extension follows professional development practices:

- **Feature Branches**: All development happens in feature branches
- **Clean Commits**: Each commit represents a logical unit of work
- **Documentation**: Clear README and inline code comments
- **Error Handling**: Proper error handling and user feedback

## Troubleshooting

### "Configuration not found" error
- Make sure you've entered both the Notion token and database ID in the extension popup

### "Notion API Error" 
- Check that your integration has access to the database
- Verify the database ID is correct (32 characters)
- Ensure your token starts with `secret_`

### Highlighting not working
- Try refreshing the page after installing the extension
- Check that the extension is enabled in Chrome settings

## Privacy & Security

- Your Notion token is stored locally in Chrome's secure storage
- No data is sent to any servers except Notion's official API
- The extension only accesses the current tab when you use it

## License

MIT License - Feel free to modify and use as needed.
