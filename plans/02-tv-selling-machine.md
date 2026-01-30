# TV Selling Machine - Automated Promo Engine

## The Problem
Bar owners juggle staff, customers, and chaos. Marketing falls through the cracks:
- Ads are expensive
- Social posts vanish instantly
- No time to update screens manually
- Can't track what works

## The Solution
Turn every screen into a **hands-free promotional tool** that runs 24/7 without intervention.

## Content Types Supported

| Type | Example | Trigger |
|------|---------|---------|
| Time-based | "Happy Hour $5 Margaritas" | 5pm-7pm daily |
| Daily specials | "Wine Wednesday - 50% off bottles" | Every Wednesday |
| Upsells | "Upgrade to Patron +$3" | Always in rotation |
| Events | "Live DJ Friday 9pm" | Date range |
| Default | Menu images | Fallback |

## Architecture (3-Tier Approach)

### Tier 1: JSON Config (Immediate - No Backend)
Single `schedule.json` drives everything:

```json
{
  "promos": [
    {
      "id": "happy_hour",
      "type": "time_based",
      "image": "promos/happy_hour.png",
      "startTime": "17:00",
      "endTime": "19:00",
      "days": ["mon","tue","wed","thu","fri"],
      "priority": 10
    },
    {
      "id": "wine_wednesday", 
      "type": "daily_special",
      "image": "promos/wine_wednesday.png",
      "days": ["wed"],
      "priority": 15
    },
    {
      "id": "live_dj",
      "type": "event",
      "image": "promos/live_dj_jan31.png",
      "startDate": "2026-01-31",
      "endDate": "2026-01-31",
      "priority": 20
    }
  ],
  "screens": {
    "left": { "default": "screens/left/signature_cocktails.png", "showPromos": true },
    "center": { "default": "video", "showPromos": false },
    "right": { "default": "screens/right/premium_spirits.png", "showPromos": true }
  },
  "settings": {
    "promoDisplayDuration": 15,
    "menuDisplayDuration": 30,
    "transitionSpeed": 1
  }
}
```

### Tier 2: Scheduled Rotation Logic
JavaScript engine that:
1. Reads current time/day
2. Filters active promos by rules
3. Sorts by priority
4. Rotates: Menu (30s) -> Promo (15s) -> Menu -> Next Promo...

### Tier 3: Simple Dashboard (Future)
- Static HTML form that generates `schedule.json`
- Owner fills in fields, clicks "Generate", copies to repo
- Or: Google Sheets as CMS (fetch published CSV)

## Screen Behavior

### Left/Right Screens (Menu + Promos)
```
[Menu 30s] -> [Active Promo 15s] -> [Menu 30s] -> [Next Promo 15s] -> [Logo Video]
```

### Center Screen (Unchanged)
- Keeps looping logo animation
- Premium branding focus
- Optional: Overlay promo text on video

## File Changes Required

### New Files
- `schedule.json` - Promo configuration
- `promo-engine.js` - Scheduling logic (shared)
- `promos/` folder - Promo images

### Modified Files
- `l.html` - Add promo rotation logic
- `r.html` - Add promo rotation logic

## Why This Works for Busy Owners

1. **Set it and forget it** - Configure once, runs forever
2. **Time-aware** - Right promo at right time automatically
3. **No app needed** - Just update JSON or images
4. **Free hosting** - GitHub Pages, no monthly fees
5. **Works offline** - After initial load, no internet needed
6. **Instant updates** - Git push = live in minutes

## Implementation Phases

**Phase 1: Core Engine**
- Create `schedule.json` schema
- Build `promo-engine.js` with time/day logic
- Integrate into left/right screens

**Phase 2: Content Templates**
- Sample promo images (Happy Hour, Wine Wed, etc.)
- Canva-ready templates for owners

**Phase 3: Dashboard (Optional)**
- Simple HTML form to generate schedule
- Or Google Sheets integration

## Todos
- [ ] Design schedule.json schema with promo types, time rules, and priorities
- [ ] Build promo-engine.js with time/day filtering and rotation logic
- [ ] Integrate promo engine into l.html
- [ ] Integrate promo engine into r.html
- [ ] Create promos/ folder structure with sample placeholders
- [ ] Test rotation logic with various time scenarios
