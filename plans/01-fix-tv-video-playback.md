# Fix TV Video Playback Issues

## Root Cause
- `Logo_Animation_HD_test.mp4` is **14MB** - too large for TV browsers
- TV browsers have ~50-100MB RAM limit
- No error recovery when video fails

## Solution Options

### Option A: Use Optimized Video (Quickest)
Switch left/right screens to use `Logo_Animation_HD_Opt1.mp4` (2MB) instead of `test.mp4` (14MB)

**Changes in l.html and r.html:**
```html
<!-- Change this -->
<source src="Logo_Animation_HD_test.mp4" type="video/mp4" />

<!-- To this -->
<source src="Logo_Animation_HD_Opt1.mp4" type="video/mp4" />
```

### Option B: Compress the Test Video
If you need to keep different videos, compress `test.mp4` to under 5MB:

```bash
ffmpeg -i Logo_Animation_HD_test.mp4 -c:v libx264 -crf 28 -preset slow \
  -c:a aac -b:a 128k -movflags +faststart Logo_Animation_HD_compressed.mp4
```

Key flags:
- `-crf 28` - Higher compression (lower = better quality)
- `-movflags +faststart` - Critical for streaming (moves metadata to start)

### Option C: Add Error Recovery (Recommended for both)
Add robust error handling to prevent freezing:

```javascript
const videoSlide = document.getElementById("video-slide");

// Recovery on error
videoSlide.onerror = () => {
  console.log("Video error, reloading...");
  videoSlide.load();
  setTimeout(() => videoSlide.play(), 1000);
};

// Recovery on stall (buffering too long)
videoSlide.onstalled = () => {
  console.log("Video stalled, attempting recovery...");
  videoSlide.load();
  videoSlide.play();
};

// Watchdog timer - if video freezes for 10s, restart
let lastTime = 0;
setInterval(() => {
  if (videoSlide.classList.contains('active') && !videoSlide.paused) {
    if (videoSlide.currentTime === lastTime) {
      console.log("Video frozen, restarting...");
      videoSlide.currentTime = 0;
      videoSlide.play();
    }
    lastTime = videoSlide.currentTime;
  }
}, 10000);
```

## LG TV-Specific Optimizations

Add to all screen HTML files:

```html
<video id="video-slide" muted playsinline 
       preload="auto" 
       webkit-playsinline="true"
       x-webkit-airplay="allow">
```

And in JavaScript:
```javascript
// Force play on visibility (TV sleep recovery)
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && videoSlide.classList.contains('active')) {
    videoSlide.play();
  }
});

// Periodic page refresh to clear memory (every 6 hours)
setTimeout(() => location.reload(), 6 * 60 * 60 * 1000);
```

## Recommended Implementation

1. **Immediate**: Switch to `Opt1.mp4` (2MB) for all screens
2. **Add**: Error recovery + watchdog timer
3. **Add**: 6-hour auto-refresh for memory clearing
4. **Optional**: Compress `test.mp4` if different video needed

## Video Encoding Best Practices for TV

For future videos, use these settings:
- **Format**: MP4 (H.264 + AAC)
- **Size**: Under 5MB
- **Resolution**: 1920x1080 max
- **Bitrate**: 2-4 Mbps
- **Faststart**: Always enable `-movflags +faststart`

## Todos
- [ ] Switch l.html and r.html to use Opt1.mp4 (2MB) instead of test.mp4 (14MB)
- [ ] Add error recovery handlers (onerror, onstalled, watchdog timer)
- [ ] Add 6-hour auto-refresh to clear TV browser memory
- [ ] Add LG TV-specific video attributes (webkit-playsinline, etc.)
