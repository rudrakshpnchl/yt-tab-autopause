// This script handles YouTube video pause/resume when tab visibility changes

// Global state tracking
let wasPlaying = false;
let videoCheckInterval = null;

// Find all potential video player elements
function findVideoElement() {
  // Main player selector patterns to try
  const selectors = [
    'video.html5-main-video',                // Standard video player
    'video.video-stream',                    // Alternative class
    '.html5-video-container video',          // Container-based lookup
    '#movie_player video',                   // Player ID-based lookup
    'video'                                  // Any video as fallback
  ];
  
  // Try each selector
  for (const selector of selectors) {
    const video = document.querySelector(selector);
    if (video) {
      return video;
    }
  }
  
  return null;
}

// Force play with user interaction simulation if needed
function forcePlay(video) {
  try {
    // First try regular play
    const playPromise = video.play();
    
    // Handle play promise (might be rejected if not from user interaction)
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.log('Play was prevented, trying alternative methods:', err);
        
        // Try to simulate user interaction for autoplay policies
        // Find and click the play button as a fallback
        const playButton = document.querySelector('.ytp-play-button');
        if (playButton) {
          playButton.click();
        }
      });
    }
  } catch (e) {
    console.log('Force play failed:', e);
  }
}

// Handle visibility change events
function handleVisibilityChange() {
  const video = findVideoElement();
  if (!video) return;
  
  if (document.hidden) {
    // Tab is hidden, check if video is playing
    wasPlaying = !video.paused && !video.ended && video.currentTime > 0;
    
    // Only pause if it was actually playing
    if (wasPlaying) {
      console.log('Tab hidden, pausing video');
      video.pause();
    }
  } else {
    // Tab is visible again, resume if it was playing before
    if (wasPlaying) {
      console.log('Tab visible, resuming video');
      forcePlay(video);
      wasPlaying = false;
    }
  }
}

// Function to continuously check for YouTube video player
// This handles page navigation in YouTube's single-page app environment
function startVideoElementCheck() {
  // Clear any existing interval
  if (videoCheckInterval) {
    clearInterval(videoCheckInterval);
  }
  
  // Set up a periodic check for the video element
  videoCheckInterval = setInterval(() => {
    const video = findVideoElement();
    
    // If we found a video element, make sure it's properly handled
    if (video && !video.hasAttribute('data-yt-tab-pause-monitored')) {
      // Mark this video as being monitored to avoid duplicate handlers
      video.setAttribute('data-yt-tab-pause-monitored', 'true');
      
      // Log that we found a video
      console.log('YouTube Tab Pause: Video player found and being monitored');
    }
  }, 1000); // Check every second
}

// Function to initialize the extension
function initializeExtension() {
  console.log('YouTube Tab Pause: Extension initialized');
  
  // Set up event listener for visibility changes
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // Start checking for video elements
  startVideoElementCheck();
  
  // Set up a mutation observer to detect significant DOM changes
  const observer = new MutationObserver((mutations) => {
    // Look for significant page changes that might indicate navigation
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        for (const node of mutation.addedNodes) {
          // If a major component was added, re-check for video elements
          if (node.nodeType === 1 && (
              node.id === 'movie_player' || 
              node.id === 'player' ||
              node.classList?.contains('html5-video-container')
          )) {
            console.log('YouTube Tab Pause: Major player element change detected');
            // Re-initialize our video detection
            startVideoElementCheck();
            return;
          }
        }
      }
    }
  });
  
  // Start observing the document with the configured parameters
  observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: false,
    characterData: false
  });
}

// Initialize when the page is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  initializeExtension();
}