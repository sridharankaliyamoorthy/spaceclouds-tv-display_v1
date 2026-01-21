# Space Clouds TV Signage - Project Summary

This project provides a professional, 3-screen digital signage solution for Space Clouds, hosted via GitHub Pages and designed for integration with LG TV browsers or PosterBooking.

## 🛠 Technical Architecture

- **Hosting**: GitHub Pages (provides live, auto-updating URLs).
- **Format**: Semantic HTML5/CSS3 with Vanilla JS for timing.
- **Resolution**: Optimized for 1920x1080 (Full HD).

## 📺 Screen Configurations

### 1. Left Screen (`l.html`)

- **Content**: Signature Cocktails menu + Logo Animation.
- **Logic**: Static menu for **30 seconds**, followed by a **1s cross-fade** to the logo animation. The video plays its full duration before returning to the menu.
- **Short URL**: `tinyurl.com/sclv1`

### 2. Center Screen (`c.html`)

- **Content**: High-definition Logo Animation (`Opt1`).
- **Logic**: Plays on an **infinite loop** with `object-fit: cover` to ensure a premium, borderless look.
- **Short URL**: `tinyurl.com/scev1`

### 3. Right Screen (`r.html`)

- **Content**: Premium Spirits menu + Logo Animation.
- **Logic**: Static menu for **30 seconds**, followed by a **1s cross-fade** to the logo animation. The video plays its full duration before returning to the menu.
- **Short URL**: `tinyurl.com/scrgtv1`

## 🚀 How to Update Content (Automation)

The system is **fully automated** for daily updates. You do NOT need to touch PosterBooking or the TV browser settings to change an image or video:

1. Replace the file in the local folder (e.g., replace `screens/left/signature_cocktails.png` with a new version).
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Update cocktail menu"
   git push origin main
   ```
3. The TV will update automatically on its next refresh cycle.

## 📺 LG TV Deployment Guide

- **Browser Method**: Open the URL (e.g., `tinyurl.com/scev1`) in the LG TV Web Browser. Click anywhere on the screen once to trigger **True Fullscreen Mode**.
- **PosterBooking Method**: Add the URLs as "Websites" in your PosterBooking dashboard and assign them to your screens.
