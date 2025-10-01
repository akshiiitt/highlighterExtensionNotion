# Quick Installation Guide (Minimal)

## Step 1: Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right corner)
3. Click "Load unpacked"
4. Select the `highlightExtension` folder
5. The extension should now appear in your extensions list

## Step 2: Set Up Notion Integration

### Create Notion Integration:
1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Name it "Text Highlighter" 
4. Copy the token (starts with `secret_`)

### Prepare a Notion Page (not a database):
1. Create or open a Notion page where highlights should be stored
2. Click "Share" → "Invite" → Select your integration to grant access
3. Copy the page ID (32 characters). Hyphens are okay; the extension accepts both.

### Configure Extension:
1. Go to chrome://extensions → Details for this extension → Extension options
2. Paste your Notion token (`secret_...`)
3. Paste your Notion page ID (with or without hyphens)
4. Click Save

## Step 3: Test It Out

1. Go to any webpage with text
2. Select some text
3. Right-click → "Highlight & Save to Notion"
4. The selection is highlighted and appended as a paragraph to your Notion page

## Troubleshooting

- **Context menu not visible**: Ensure you selected text; reload the page after installing
- **Notion error**: Check token and page ID in Options, and that the page is shared with the integration
- **Permission error**: Share the page with your integration in Notion

## Professional Git Workflow Used

This project demonstrates professional development practices:

- **Feature branches**: `feature/extension-setup`
- **Descriptive commits**: Clear commit messages with scope
- **Proper merging**: Feature branch → main → push to remote
- **Documentation**: Comprehensive README and guides
- **Clean structure**: Organized file structure and code
