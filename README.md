# Space Clouds TV Signage - Project Summary

This project provides a professional, 3-screen digital signage solution for Space Clouds, hosted via GitHub Pages and designed for integration with LG TV browsers or PosterBooking.

## 🛠 Technical Architecture

- **Hosting**: GitHub Pages (provides live, auto-updating URLs).
- **Format**: Semantic HTML5/CSS3 with Vanilla JS for timing.
- **Resolution**: Optimized for 1920x1080 (Full HD) and 2048x1152.

## 📺 Screen Configurations (Updated Jan 2026)

### 1. Left Screen (`l.html`)

- **Content**: HK Right Side Animation
- **Video**: `screens/left/V003/HK_Rt_04_baseline.mp4`
- **Logic**: Global NTP sync loop (17s) with relaxed drift correction
- **Short URL**: `tinyurl.com/sclv1`

### 2. Center Screen (`c.html`)

- **Content**: HK Center Animation
- **Video**: `screens/center/v003/HK_Center_04_baseline.mp4`
- **Logic**: Global NTP sync loop (17s) with relaxed drift correction
- **Short URL**: `tinyurl.com/scev1`

### 3. Right Screen (`r.html`)

- **Content**: HK Left Side Animation
- **Video**: `screens/right/V003/HK_Lt_04_baseline.mp4`
- **Logic**: Global NTP sync loop (17s) with relaxed drift correction
- **Short URL**: `tinyurl.com/scrgtv1`

## 🎬 Video Requirements for LG TV Browser

**IMPORTANT:** LG TV browsers have specific video codec requirements for reliable playback.

### ✅ Recommended Video Specs (Works on LG TV)

| Property | Recommended Value |
|----------|------------------|
| **Codec** | **H.264 (Baseline Profile)** |
| **Level** | **4.1** (for 1080p) |
| **Bitrate** | 3 - 5 Mbps |
| **Flags** | `+faststart` |
| **Audio** | AAC-LC (2kbps dummy track) |

### ⚠️ Known Issues

1. **H.264 at high resolutions (>1920x1080)** may not play in LG TV browser
2. **HEVC (H.265) works better** for higher resolution videos on LG TVs
3. **File size** should ideally be under 15MB for smooth streaming

### 🔧 FFmpeg Encoding Command (Baseline Profile)

```bash
ffmpeg -i input.mp4 -c:v libx264 -profile:v baseline -level 4.1 -crf 24 -pix_fmt yuv420p -c:a aac -b:a 64k -movflags +faststart output.mp4
```

> **Note:** Always use the Baseline profile for LG TV browser playback. Do NOT use the Main or High profiles as they cause stuttering due to B-frame decoding overhead.

## 🚀 How to Update Content

The system is **fully automated** for daily updates:

1. Replace the video file in the appropriate folder
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Update video content"
   git push origin main
   ```
3. Wait 1-2 minutes for GitHub Pages to rebuild
4. Refresh the TV browser (or it will auto-refresh every 6 hours)

## 📺 LG TV Deployment Guide

### Browser Method
1. Open the URL in the LG TV Web Browser
2. Click anywhere on the screen once to trigger **Fullscreen Mode**
3. The video will loop automatically

### Troubleshooting
- **Video not playing?** Ensure the video is H.264 Baseline profile (use `ffprobe` to verify)
- **Stuttering/Lagging?** Re-encode using the Baseline FFmpeg command above
- **404 Page Not Found on Live URLs?** 
  - Ensure `index.html` links correctly map to `l.html`, `c.html`, and `r.html`.
  - **IMPORTANT:** If the repository visibility is changed from "Public" to "Private" and back, GitHub Pages terminates. You must manually re-enable GitHub Pages from Settings -> Pages, or use the GitHub CLI (`gh api -X POST repos/[owner]/[repo]/pages ...`) to rebuild the site.

### Cache Busting
If the TV shows old content, add `?v=2` to the URL:
```
https://sridharankaliyamoorthy.github.io/spaceclouds-tv-display_v1/l.html?v=2
```

## 📁 Project Structure

```
├── l.html                    # Left screen
├── c.html                    # Center screen
├── r.html                    # Right screen
├── style.css                 # Shared styles
├── screens/
│   ├── left/V002/           # Left screen videos
│   ├── center/              # Center screen videos
│   └── right/v002/          # Right screen videos
└── mockups/                  # Feature mockups for future
```

## 🔗 Live URLs

- **Left**: https://sridharankaliyamoorthy.github.io/spaceclouds-tv-display_v1/l.html
- **Center**: https://sridharankaliyamoorthy.github.io/spaceclouds-tv-display_v1/c.html
- **Right**: https://sridharankaliyamoorthy.github.io/spaceclouds-tv-display_v1/r.html

## 📝 Version Notes & Issue Log

### March 2026 — V3.0: Seamless Play Optimization
- **Issue fixed:** Client reported video lagging/stuttering on LG TVs.
- **Root Cause:** H.264 Main profile videos caused excessive CPU load during sync seeks. The 250ms sync interval was too aggressive.
- **Fix:** Re-encoded all videos to **H.264 Baseline L4.1** (no B-frames). Relaxed sync drift from 0.3s to 0.7s and check interval from 250ms to 1000ms. Removed `console.log` from player loops.
- **Telemetry Fix:** Replaced `navigator.sendBeacon` with `fetch({keepalive: true})` to include Supabase auth headers.

### March 2026 — V0.0.3: LG TV WebOS Optimizations
- **Issue fixed:** Client reported 404 errors on the TV display hub.
- **Root Cause & Fix 1:** The `index.html` file had incorrect href links. Fixed to point to `l.html`, `c.html`, and `r.html`.
- **Root Cause & Fix 2:** Repository visibility toggle disabled GitHub Pages. Re-enabled via `gh` CLI.
