# YouTube Tab Pause Extension

This Chrome extension automatically pauses YouTube videos when you switch to another tab and resumes playback when you return to the YouTube tab.

## Features

- Automatically pauses YouTube videos when you switch to another tab
- Automatically resumes playback when you return to the YouTube tab
- Works with YouTube's HTML5 video player
- Lightweight with minimal permissions required

## Installation Instructions

1. Download or clone this repository to your computer
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" using the toggle in the top-right corner
4. Click on "Load unpacked" button
5. Select the folder containing the extension files
6. The extension is now installed and ready to use

## Usage

1. Open YouTube and start playing any video
2. Switch to another tab, and the video will automatically pause
3. Return to the YouTube tab, and the video will automatically resume
4. No configuration required - it works out of the box!

## File Structure

- `manifest.json` - Extension configuration
- `content.js` - Main logic for controlling YouTube videos
- `icons/` - Directory containing extension icons in different sizes

## Requirements

- Google Chrome browser (version 88 or higher recommended)
- Active internet connection for YouTube access

## Troubleshooting

If the extension doesn't work as expected:

1. Make sure you're on a YouTube page with a video playing
2. Try refreshing the YouTube page
3. Check if the extension is enabled in Chrome's extensions page
4. If issues persist, try reinstalling the extension

## Privacy

This extension:
- Only runs on YouTube websites
- Does not collect any user data
- Does not communicate with any external servers
- Only requires the "tabs" permission to detect tab switching