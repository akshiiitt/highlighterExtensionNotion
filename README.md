# Text Highlighter & Notion Saver (Minimal)

A minimal Chrome extension to highlight selected text on a page and save it to a Notion page via a right‑click context menu.

## Features

- 🖍️ **Highlight**: Select text and use the right‑click menu → "Highlight & Save to Notion"
- 📝 **Notion Integration**: Appends the selected text to a single Notion page
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

### 3. Set Up a Notion Page (not a database)

1. Create (or pick) a Notion page where highlights should be stored
2. Share the page with your integration (Share → Invite → your integration)
3. Copy the page ID:
   - From the page URL, copy the 32‑character ID segment (hyphens allowed)

### 4. Configure the Extension

1. Go to chrome://extensions → find this extension → Details → Extension options
2. Paste your Notion integration token (`secret_...`)
3. Paste your Notion page ID (with or without hyphens)
4. Click Save

## How to Use

1. Select any text on a webpage
2. Right‑click → "Highlight & Save to Notion"
3. The selection is highlighted in place and appended as a paragraph to your Notion page

## File Structure

```
├── manifest.json       # Extension configuration
├── background.js       # Context menu + Notion page append
├── content.js          # Minimal highlighting of selection
├── options.html        # Minimal options to store token + page ID
├── options.js          # Options logic
└── README.md           # This file
```

## Development

This extension follows professional development practices:

- **Feature Branches**: All development happens in feature branches
- **Clean Commits**: Each commit represents a logical unit of work
- **Documentation**: Clear README and inline code comments
- **Error Handling**: Proper error handling and user feedback

## Troubleshooting

### "Missing Notion token or page ID" error
- Open Options and ensure both fields are saved

### "Notion API Error"
- Ensure the Notion page is shared with your integration
- Verify the page ID is correct (32 characters, hyphens allowed)
- Ensure your token starts with `secret_`

### Highlighting not working
- Make a fresh selection and try again
- Reload the page after installing the extension

## Privacy & Security

- Your Notion token is stored locally in Chrome's secure storage
- No data is sent to any servers except Notion's official API
- The extension only accesses the current tab when you use it

## License

MIT License - Feel free to modify and use as needed.
