# Quick Installation Guide

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

### Create Notion Database:
1. Create a new Notion page
2. Type `/database` and select "Table - Inline"
3. Add these columns:
   - **Title** (already exists - Title type)
   - **Content** (Text type)
   - **URL** (URL type) 
   - **Date** (Date type)
4. Click "Share" → "Invite" → Select your integration
5. Copy database ID from URL (32-character string after the last `/`)

### Configure Extension:
1. Click the extension icon in Chrome toolbar
2. Paste your Notion token
3. Paste your database ID
4. Click "Save Configuration"
5. You should see "✅ Notion connection successful!"

## Step 3: Test It Out

1. Go to any webpage with text
2. Select some text
3. Click the "💡 Highlight & Save" button that appears
4. Text should be highlighted and saved to Notion!

## Troubleshooting

- **No button appears**: Refresh the page after installing
- **Notion error**: Check token and database ID are correct
- **Permission error**: Make sure database is shared with integration

## Professional Git Workflow Used

This project demonstrates professional development practices:

- **Feature branches**: `feature/extension-setup`
- **Descriptive commits**: Clear commit messages with scope
- **Proper merging**: Feature branch → main → push to remote
- **Documentation**: Comprehensive README and guides
- **Clean structure**: Organized file structure and code
