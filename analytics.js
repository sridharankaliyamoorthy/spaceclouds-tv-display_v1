/**
 * Space Clouds TV Display - Analytics Tracking
 * Tracks usage, views, and video playback events
 */

(function() {
  'use strict';

  // Configuration
  const STORAGE_KEY = 'spaceclouds_analytics';
  const MAX_EVENTS = 10000; // Limit stored events to prevent storage overflow
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

  // Get screen name from current page
  function getScreenName() {
    const path = window.location.pathname;
    if (path.includes('l.html') || path.includes('left')) return 'left';
    if (path.includes('c.html') || path.includes('center')) return 'center';
    if (path.includes('r.html') || path.includes('right')) return 'right';
    return 'unknown';
  }

  // Get or create analytics data
  function getAnalyticsData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {
        events: [],
        sessions: [],
        totals: {
          left: { views: 0, videoPlays: 0, totalDuration: 0 },
          center: { views: 0, videoPlays: 0, totalDuration: 0 },
          right: { views: 0, videoPlays: 0, totalDuration: 0 }
        },
        lastUpdated: new Date().toISOString()
      };
    } catch (e) {
      console.error('Error reading analytics:', e);
      return {
        events: [],
        sessions: [],
        totals: {
          left: { views: 0, videoPlays: 0, totalDuration: 0 },
          center: { views: 0, videoPlays: 0, totalDuration: 0 },
          right: { views: 0, videoPlays: 0, totalDuration: 0 }
        },
        lastUpdated: new Date().toISOString()
      };
    }
  }

  // Save analytics data
  function saveAnalyticsData(data) {
    try {
      // Limit events array size
      if (data.events.length > MAX_EVENTS) {
        data.events = data.events.slice(-MAX_EVENTS);
      }
      data.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving analytics:', e);
      // If storage is full, try to clear old events
      if (e.name === 'QuotaExceededError') {
        data.events = data.events.slice(-Math.floor(MAX_EVENTS / 2));
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e2) {
          console.error('Failed to save after cleanup:', e2);
        }
      }
    }
  }

  // Log an event
  function logEvent(type, data = {}) {
    const screenName = getScreenName();
    const event = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      type: type,
      screen: screenName,
      ...data
    };

    const analytics = getAnalyticsData();
    analytics.events.push(event);

    // Update totals
    if (type === 'page_view') {
      analytics.totals[screenName].views++;
    } else if (type === 'video_play') {
      analytics.totals[screenName].videoPlays++;
    } else if (type === 'video_loop' && data.duration) {
      analytics.totals[screenName].totalDuration += data.duration;
    }

    saveAnalyticsData(analytics);
    return event;
  }

  // Track session
  function trackSession() {
    const screenName = getScreenName();
    const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const startTime = Date.now();

    logEvent('session_start', { sessionId });

    // Track session end on page unload
    window.addEventListener('beforeunload', () => {
      const duration = Math.floor((Date.now() - startTime) / 1000); // seconds
      logEvent('session_end', { sessionId, duration });
    });

    // Also track visibility changes (TV might go to sleep)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        logEvent('session_pause', { sessionId });
      } else {
        logEvent('session_resume', { sessionId });
      }
    });

    return sessionId;
  }

  // Track video playback
  function trackVideo(videoElement) {
    if (!videoElement) return;

    const screenName = getScreenName();
    let loopCount = 0;
    let playStartTime = null;

    // Track play event
    videoElement.addEventListener('play', () => {
      playStartTime = Date.now();
      logEvent('video_play', {});
    });

    // Track pause event
    videoElement.addEventListener('pause', () => {
      if (playStartTime) {
        const duration = Math.floor((Date.now() - playStartTime) / 1000);
        logEvent('video_pause', { duration });
        playStartTime = null;
      }
    });

    // Track loop completion
    videoElement.addEventListener('ended', () => {
      loopCount++;
      const duration = videoElement.duration || 0;
      logEvent('video_loop', { loopCount, duration });
      // Reset for next loop
      playStartTime = Date.now();
    });

    // Track errors
    videoElement.addEventListener('error', (e) => {
      logEvent('video_error', {
        error: videoElement.error ? videoElement.error.message : 'Unknown error'
      });
    });

    // Track when video is ready
    videoElement.addEventListener('loadeddata', () => {
      logEvent('video_loaded', {
        duration: videoElement.duration,
        videoWidth: videoElement.videoWidth,
        videoHeight: videoElement.videoHeight
      });
    });
  }

  // Initialize tracking when DOM is ready
  function init() {
    // Log page view
    logEvent('page_view');

    // Start session tracking
    trackSession();

    // Track video if present
    const video = document.getElementById('video-slide');
    if (video) {
      trackVideo(video);
    }

    // Track fullscreen events
    document.addEventListener('fullscreenchange', () => {
      logEvent('fullscreen_change', {
        isFullscreen: !!document.fullscreenElement
      });
    });

    // Periodic heartbeat (every 5 minutes) to track active sessions
    setInterval(() => {
      logEvent('heartbeat', {});
    }, 5 * 60 * 1000);
  }

  // Export analytics functions for dashboard
  window.SpaceCloudsAnalytics = {
    getData: getAnalyticsData,
    logEvent: logEvent,
    clearData: function() {
      localStorage.removeItem(STORAGE_KEY);
      console.log('Analytics data cleared');
    },
    exportData: function() {
      const data = getAnalyticsData();
      return JSON.stringify(data, null, 2);
    }
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
