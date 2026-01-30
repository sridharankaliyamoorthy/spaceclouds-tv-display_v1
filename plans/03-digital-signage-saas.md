# Digital Signage SaaS Platform

## Market Competitors

| Platform | Pricing | Strengths | Weaknesses |
|----------|---------|-----------|------------|
| PosterBooking | $8/screen/mo | Simple, affordable | Basic features |
| Yodeck | $8/screen/mo | Raspberry Pi focus | Hardware dependent |
| ScreenCloud | $20/screen/mo | Enterprise features | Expensive |
| OptiSigns | $10/screen/mo | Good templates | Complex UI |
| Rise Vision | Free tier | Open source | Dated interface |

## Your Opportunity
Target: **Bars, restaurants, small retail** - underserved by enterprise tools, need simplicity.

## Core Features (MVP)

### 1. Screen Management
- Add screens with unique pairing code
- Group screens by location
- Name and organize screens

### 2. Content Upload
- Drag-and-drop images/videos
- Auto-optimization (resize, compress)
- Content library with folders

### 3. Scheduling
- Time-based rules (Happy Hour 5-7pm)
- Day-based rules (Wine Wednesday)
- Date ranges (Event Jan 31)
- Priority system

### 4. Monitoring
- Online/offline status
- Last seen timestamp
- Screenshot preview
- Error alerts

### 5. Remote Control
- Force refresh
- Clear cache
- Reboot player
- Push immediate content

## Tech Stack Recommendation

### Option A: Supabase Stack (Fastest to MVP)
```
Frontend:    Next.js + Tailwind
Backend:     Supabase (Auth, DB, Storage, Realtime)
Player:      Vanilla JS (current approach, enhanced)
Hosting:     Vercel (dashboard) + Supabase
Cost:        ~$25/month to start
```

### Option B: Full Control Stack
```
Frontend:    Next.js + Tailwind
Backend:     Node.js/Express API
Database:    PostgreSQL (Railway/Supabase)
Storage:     Cloudflare R2 (cheap)
Realtime:    Socket.io
Hosting:     Railway or Render
Cost:        ~$20-50/month
```

## Player App (TV Side)

Enhanced version of current player:

```javascript
// Player connects to backend on load
const socket = new WebSocket('wss://api.yoursaas.com/player');

socket.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  
  switch(msg.type) {
    case 'content_update':
      loadNewContent(msg.playlist);
      break;
    case 'refresh':
      location.reload();
      break;
    case 'screenshot':
      captureAndSendScreenshot();
      break;
  }
};

// Report health every 30s
setInterval(() => {
  socket.send(JSON.stringify({
    type: 'heartbeat',
    screenId: SCREEN_ID,
    currentContent: getCurrentSlide(),
    uptime: getUptime()
  }));
}, 30000);
```

## Database Schema (Simplified)

```
users
  - id, email, password_hash, plan

screens  
  - id, user_id, name, pairing_code, status, last_seen

content
  - id, user_id, type, url, thumbnail, created_at

playlists
  - id, user_id, name, screen_ids[]

playlist_items
  - id, playlist_id, content_id, duration, order

schedules
  - id, playlist_id, start_time, end_time, days[], priority
```

## MVP Development Phases

### Phase 1: Core Infrastructure
- Set up Supabase project
- User auth (signup, login)
- Basic dashboard layout

### Phase 2: Screen Management
- Screen pairing system
- Player app with WebSocket
- Online/offline detection

### Phase 3: Content System
- File upload to storage
- Content library UI
- Basic playlist creation

### Phase 4: Scheduling
- Time/day rules
- Priority system
- Player schedule sync

### Phase 5: Monitoring
- Health dashboard
- Screenshot capture
- Remote refresh/reboot

## Pricing Strategy

| Plan | Price | Screens | Features |
|------|-------|---------|----------|
| Free | $0 | 1 screen | Basic, watermark |
| Starter | $5/screen | Up to 5 | Full features |
| Pro | $4/screen | Up to 20 | + Analytics |
| Business | $3/screen | Unlimited | + API access |

## Key Differentiators

1. **Bar/Restaurant Focus** - Pre-built templates (Happy Hour, Daily Specials)
2. **Dead Simple** - 5-minute setup, no hardware needed
3. **Works on Any TV** - Browser-based, no Raspberry Pi required
4. **Affordable** - Undercut competitors at $5/screen

## Next Steps

1. Validate: Talk to 5 bar owners about pain points
2. MVP: Build core pairing + content upload
3. Beta: Deploy at Space Clouds as proof of concept
4. Launch: Product Hunt, bar owner communities

## Todos
- [ ] Interview 5 bar/restaurant owners about digital signage pain points
- [ ] Set up Supabase project (auth, db, storage, realtime)
- [ ] Build Next.js dashboard with auth and screen management
- [ ] Enhance player app with WebSocket connection and remote control
- [ ] Implement screen pairing flow with unique codes
- [ ] Build content upload and library management
- [ ] Create scheduling engine with time/day rules
- [ ] Add health monitoring and screenshot capture
