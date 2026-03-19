# Space Clouds TV Signage - Project Summary

This project provides a professional, 3-screen digital signage solution for Space Clouds, hosted via GitHub Pages and designed for integration with LG TV browsers or PosterBooking.

## 🛠 Technical Architecture

- **Hosting**: GitHub Pages (provides live, auto-updating URLs).
- **Format**: Semantic HTML5/CSS3 with Vanilla JS for timing.
- **Resolution**: Optimized for 1920x1080 (Full HD) and 2048x1152.

## 📺 Screen Configurations (Updated Jan 2026)

### 1. Left Screen (`l.html`)

- **Content**: Signature Cocktails Menu Video Animation
- **Video**: `screens/right/v002/Signtaure_contail_menu_2.mp4`
- **Logic**: Plays on an **infinite loop** with seamless playback
- **Short URL**: `tinyurl.com/sclv1`

### 2. Center Screen (`c.html`)

- **Content**: Logo Animation
- **Video**: `screens/center/Logo_animation_002_compressed.mp4`
- **Logic**: Plays on an **infinite loop** with `object-fit: cover`
- **Short URL**: `tinyurl.com/scev1`

### 3. Right Screen (`r.html`)

- **Content**: Signature Cocktails Menu Video Animation
- **Video**: `screens/left/V002/Signtaure_contail_menu_1.mp4`
- **Logic**: Plays on an **infinite loop** with seamless playback
- **Short URL**: `tinyurl.com/scrgtv1`

## 🎬 Video Requirements for LG TV Browser

**IMPORTANT:** LG TV browsers have specific video codec requirements for reliable playback.

### ✅ Recommended Video Specs (Works on LG TV)

| Property | Recommended Value |
|----------|------------------|
| **Codec** | HEVC (H.265) or H.264 |
| **Resolution** | Up to 2048x1152 (for HEVC) or 1920x1080 (for H.264) |
| **Container** | MP4 |
| **Audio** | AAC |

### ⚠️ Known Issues

1. **H.264 at high resolutions (>1920x1080)** may not play in LG TV browser
2. **HEVC (H.265) works better** for higher resolution videos on LG TVs
3. **File size** should ideally be under 15MB for smooth streaming

### 🔧 FFmpeg Compression (If Needed)

**For HEVC (recommended for LG TV):**
```bash
ffmpeg -i input.mp4 -c:v libx265 -crf 28 -preset medium -c:a aac -b:a 128k -movflags +faststart output.mp4
```

**For H.264 (resize to 1080p):**
```bash
ffmpeg -i input.mp4 -vf "scale=1920:1080" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart output.mp4
```

**DO NOT** compress HEVC videos to H.264 without resizing - this breaks LG TV browser compatibility!

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
- **Video not playing?** Check the codec (must be HEVC for high-res)
- **Black screen?** Clear browser cache: Settings → Clear Cache
- **Buffering?** Check internet connection (minimum 5 Mbps recommended)
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

### March 2026 Update
- **Issue fixed:** Client reported 404 errors on the TV display hub.
- **Root Cause & Fix 1:** The `index.html` file had incorrect href links pointing to `left.html`, `center.html`, and `right.html`. Fixed them to point strictly to the physical files `l.html`, `c.html`, and `r.html`.
- **Root Cause & Fix 2:** The repository visibility was temporarily toggled to "Private", which permanently disabled GitHub Pages until it was manually re-enabled. Re-enabled GitHub Pages deployment via the `gh` CLI to restore the live links.
