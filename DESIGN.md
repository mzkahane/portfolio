# Portfolio Site Design Document
**Project:** Pokemon Gen 3 Inspired Portfolio  
**Status:** Draft v2 — Pending Review  
**Last Updated:** April 26, 2026

---

## 1. Project Overview

A personal portfolio site styled after a Pokemon Generation 3 (GBA/GBA SP era) game. The user navigates a top-down tile-based town, with each building representing a section of the portfolio. The site is designed to be genuinely fun for explorers while remaining fast and accessible for hiring managers who want to get straight to the content.

---

## 2. Design Goals

1. Capture the visual and interactive feel of Gen 3 Pokemon games.
2. Provide multiple navigation paths so no user is forced to "play the game" to see content.
3. Be fully navigable by keyboard and mouse independently.
4. Remain accessible: high contrast, focus indicators, no motion required.
5. Perform well on desktop-first, with a usable mobile fallback.

---

## 3. Screen Layout

### 3.1 Zone Map (Desktop)

```
┌──────────────────────────────────────────────────────────────────┐
│                           HEADER TEXT                            │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────┐  ┌───────────────┐         │
│  │                                  │  │   NAV MENU    │         │
│  │                                  │  │ About         │         │
│  │            GAME VIEW             │  │ Projects      │         │
│  │          (~3:2 viewport)         │  │ Experience    │         │
│  │                                  │  │ Contact       │         │
│  │                                  │  │ ...           │         │
│  └──────────────────────────────────┘  └───────────────┘         │
│  ┌──────────────────────────────────┐  ┌───────────────┐         │
│  │          DIALOGUE BOX            │  │   CONTROLS    │         │
│  │   (same width as game viewport)  │  │ WASD Move     │         │
│  │   battle style OR dialogue style │  │ Enter / Esc   │         │
│  └──────────────────────────────────┘  └───────────────┘         │
└──────────────────────────────────────────────────────────────────┘

Notes:
- Dialogue box is only as wide as the game viewport.
- Controls panel sits to the right of dialogue, below the nav menu.
- Controls panel is for instructions (W/A/S/D, Enter, Esc).
- Dialogue box can switch style between battle style and dialogue style.
```

### 3.2 Zone Descriptions

| Zone | Description |
|---|---|
| Header | Header text bar above both the game viewport and right panel. Exact wording is intentionally deferred. |
| Game Viewport | Central canvas, fixed 3:2 aspect ratio. Renders game world or map view. |
| Dialogue Box | Single UI component below the game viewport (same width as viewport). It changes style by state: battle style or dialogue style. |
| Controls Panel | Static help/instruction panel below the nav menu (for movement and interaction controls). This is not the same as toggle commands. |
| Right Panel | Narrow in-game menu styled list of buildings/portfolio sections. |
| Toggle Commands | MAP, AUDIO, and future toggles are shown inside the dialogue box only when in battle style mode. |

### 3.3 Right Panel Width

The panel mirrors the proportions of the in-game player menu — relatively narrow. Header placement is above the viewport+menu row, not in right-side whitespace.

---

## 4. Game Viewport

### 4.1 Aspect Ratio and Resolution

- **Aspect ratio:** 3:2 (native GBA resolution: 240×160 pixels)
- **Scaling:** Integer scaling only (2x, 3x, etc.) — never fractional, to preserve pixel crispness
- **Default scale:** Determined at runtime based on available viewport height
- **CSS:** `image-rendering: pixelated` on canvas element

### 4.2 Camera Behavior

- Camera follows the player, keeping the character centered in the viewport
- Camera clamps at map edges (does not show area outside the map)
- Dead zone: small buffer around center so camera does not reposition on every single tile step
- No fractional pixel camera offsets — camera snaps to whole pixels

### 4.3 Map View Mode

- Toggled by the MAP button in the bottom bar, or by pressing `M`
- Replaces the game canvas content with a fully zoomed-out render of the entire town
- Buildings are clickable hotspots in this view
- Clicking a building hotspot teleports the player into that building's interior and returns to game view
- Keyboard navigation in map view: `Tab` cycles through building hotspots, `Enter` selects
- `Escape` or pressing MAP again returns to game view without teleporting

---

## 5. Navigation System

### 5.1 Three Navigation Lanes

| Lane | Entry Point | Destination | User Type |
|---|---|---|---|
| Express | Right panel building list | Content screen opens immediately | Hiring manager / fast user |
| Middle | Map view building hotspot | Player teleports into building interior | Orientation-minded user |
| Immersive | Walk to door manually | Player enters building interior | Explorer |

### 5.2 Express Lane Detail (Right Panel)

- Clicking a building name in the right panel immediately opens the Pokédex-style content screen for that section
- The player is silently repositioned inside the corresponding building interior in the background
- When the content screen is closed, the player finds themselves in that building — world stays coherent

### 5.3 Middle Lane Detail (Map View)

- Clicking a building hotspot on the map teleports the player to the interior of that building
- Returns to game view (player is now inside the building)
- Player must walk to the content object and press `Enter` to open the content screen
- Provides orientation and faster physical entry without bypassing in-world interaction

### 5.4 Immersive Lane Detail (Exploration)

- Player walks to a building door and triggers a door transition
- Interior room loads, player appears at the entrance
- Player walks to the interactive content object and presses `Enter`
- Content screen opens

### 5.5 Content Object Interaction

- Each building interior contains at least one clearly identifiable interactive object (PC terminal, bookshelf, NPC, etc.)
- Object emits a subtle visual indicator when the player is adjacent and can interact (e.g., small prompt icon)
- NPCs may offer one short flavor line of dialogue before the content screen opens (optional, immersive path only)
- Pressing `Enter` or clicking the object opens the content screen

---

## 6. Building Interiors

- Each building has a unique interior map representing its portfolio section thematically
  - About Me: player's home room
  - Projects: lab or PC room with monitors
  - Experience: office or gym
  - Contact: post office or communications room
- The exterior town includes additional buildings beyond core sections so the map feels inhabited and complete
  - Optional support buildings (examples): Library (skills/tools), Hall of Fame (featured work), Daycare (learning timeline), Mart (resources/downloads), Gym side-room (achievements)
  - Support buildings may provide flavor, shortcuts, collectibles, or lightweight content, but are not required for core hiring-manager flow
- Interiors are fully rendered tile maps (same engine as exterior)
- Player enters via a door tile that triggers a map transition
- Player exits via the same or a designated exit tile, returning to the exterior at the corresponding door position

---

## 7. Content Screen (Pokédex / Item Bag / Storage PC Style)

### 7.1 Behavior

- Fills the game canvas entirely (canvas swap, not browser overlay)
- Styled as a Gen 3 in-game full-screen menu (Pokédex, item bag, or Storage PC aesthetic)
- Contains the portfolio section's content as structured, scrollable text
- Close with `Escape`, `B` key, or a visible close button in the UI
- On close: returns to building interior (player position preserved)

### 7.2 Content Structure Per Section

| Section | Content |
|---|---|
| About Me | Personal bio, technologies, interests |
| Projects | List of projects with descriptions, links |
| Experience | Work history, roles, timeline |
| Contact | Contact form or links (email, GitHub, LinkedIn) |

### 7.3 Scrolling

- Scrollable within the canvas content screen
- Keyboard: `Up`/`Down` arrows or `W`/`S` while content screen is open
- Mouse: scroll wheel or drag scrollbar

---

## 8. Dialogue Box (Single Component, Two Modes)

- There is only one dialogue box in the page layout.
- The dialogue box is always below the game viewport and exactly matches viewport width.
- The dialogue box has two presentation modes:
  - Battle style mode (default): dialogue text + 2x2 toggle commands
    - Slot 1: **MAP** toggle — switches game canvas to map view
    - Slot 2: **AUDIO** toggle — enables/disables audio
    - Slot 3: Reserved for future feature (TBD)
    - Slot 4: Reserved for future feature (TBD)
  - Dialogue style mode (interaction): text-only layout for NPC/object interaction
- Mode switching rules:
  - Enter dialogue style mode when player interacts with NPCs or non-main content objects
  - Return to battle style mode when interaction/dialogue ends
- Keyboard shortcuts: `M` for map, other slots reachable by `Tab` and `Enter` when battle style mode is active
- Sound preference persists in `localStorage`
- Sound defaults to **off** (respects browser autoplay policy)

---

## 9. Audio

- Background music: looping BGM track styled to fit the Gen 3 aesthetic
- Sound effects: footsteps, door transitions, menu open/close, interaction confirm
- Master toggle in bottom bar (on/off for MVP; independent BGM/SFX toggle as future enhancement)
- Default state: off
- Preference stored in `localStorage`

---

## 10. Keyboard Navigation

| Key | Context | Action |
|---|---|---|
| `W` `A` `S` `D` / Arrow keys | Game world | Move player |
| `Enter` / `Space` | Adjacent to interactable | Interact / open content |
| `M` | Anywhere | Toggle map view |
| `Tab` | UI panels, map view | Cycle through focusable elements |
| `Enter` | Focused UI element | Activate (teleport, open content) |
| `1` `2` `3` `4` (optional) | Dialogue box (battle style only) | Trigger corresponding command slot |
| `Escape` | Map view, content screen | Close / return |
| `Up` / `Down` | Content screen open | Scroll content |
| `B` | Content screen open | Close content screen (Gen 3 convention) |

Player movement keys (`WASD` / arrows) are only active when no UI overlay is focused.

---

## 11. Accessibility

- All right panel items are real `<button>` elements with visible focus styles
- Map view hotspots are keyboard focusable and labeled
- Focus styles use the retro aesthetic (cursor indicator) but meet WCAG contrast requirements
- `aria-label` attributes on all interactive elements
- Reduced-motion: smooth camera/teleport animations are replaced with instant transitions when `prefers-reduced-motion` is set
- Text in content screens meets WCAG AA contrast against background
- Content screen is the single source of truth for portfolio info — no content is exclusively in-world

---

## 12. Responsive / Mobile

- Desktop: full three-zone layout as described
- Tablet: game viewport shrinks, right panel may collapse to a bottom sheet or icon row
- Mobile (MVP): express lane is the default behavior
  - Prioritize teleport menu and bottom dialogue/command box
  - Section selection opens content quickly with minimal movement requirements
  - Middle and immersive lanes can be deferred or simplified in mobile MVP
- Touch: tap on map hotspots and right panel items works identically to mouse click
- Player movement on mobile: TBD (virtual D-pad or swipe gestures as future enhancement; teleport via panel/map is the primary mobile navigation path)

---

## 13. Tech Stack (Flexible)

The implementation stack is intentionally not locked yet. Current repo uses Vite + vanilla JS/Canvas, but the design should remain framework-agnostic.

| Layer | Current Baseline | Notes |
|---|---|---|
| Build tool | Vite | Can be replaced if needed |
| Language | JavaScript (ES modules) | TypeScript is a valid future upgrade |
| Rendering | HTML5 Canvas 2D | Core requirement is pixel-precise rendering, not specific library |
| Styling | CSS (vanilla) | Utility framework optional |
| Assets | Sprite sheets and tilesets (PNG) in `public/assets/` | Asset pipeline can evolve |
| Data | Map data as JS modules in `src/data/maps/` | JSON/Tiled format remains an option |
| Audio | Web Audio API or `<audio>` element (TBD) | Keep API abstracted behind an audio manager |

---

## 14. Build Phases

### Phase 1 — Layout Shell
Desktop layout with abstract grid: Header, [Game view][Nav menu], [Dialogue box][Controls]. Dialogue box width equals viewport width. Responsive skeleton. No game logic yet.  
**Done when:** Layout matches grid, dialogue/controls are distinct, and all blocks align without overflow.

### Phase 2 — Camera Follow + Integer Scaling
Player-centered camera, map edge clamping, dead zone, integer scale calculation.  
**Done when:** Player movement keeps character centered; map boundaries clamp correctly; no fractional pixel rendering.

### Phase 3 — Map System + Door Transitions
Multiple tile maps (exterior + building interiors), door trigger tiles, map transition logic, player repositioning on transition.  
**Done when:** Player can walk between exterior and at least one interior; position is consistent on both sides of transition.

### Phase 4 — Map View Toggle
Zoomed-out map render, building hotspots, click-to-teleport-interior behavior, keyboard navigation within map view.  
**Done when:** MAP toggle opens/closes cleanly; all building hotspots are reachable by keyboard and mouse; teleport lands player in correct interior.

### Phase 5 — Right Panel Navigation (Express Lane)
Building list buttons, click opens content screen directly, silent player repositioning.  
**Done when:** Each building entry in right panel opens the correct content screen; player is repositioned in background.

### Phase 6 — Content Screen
Canvas-swap Pokédex-style content screen, scrollable text, close behavior, returns to interior.  
**Done when:** All three access paths (express, middle, immersive) open the same content screen; scroll and close work with keyboard and mouse.

### Phase 7 — Audio
BGM loop, SFX for movement/interaction/menus, master toggle, localStorage persistence, default-off behavior.  
**Done when:** Sound toggle works; preference survives page reload; no autoplay violation.

### Phase 8 — Keyboard Navigation Pass
Full Tab/Enter/Escape flow through all UI; WASD/arrow movement deactivates when UI is focused; all interactive elements labeled.  
**Done when:** Full user journey (enter site → view content → exit content) is completable without a mouse.

### Phase 9 — Accessibility Pass
ARIA labels, focus styles, reduced-motion support, contrast audit.  
**Done when:** No WCAG AA failures; reduced-motion mode is smooth; screen reader can reach all content.

### Phase 10 — Content Integration
Real portfolio content in each section for SPA navigation. Linkable deep-link sections are deferred beyond MVP.  
**Done when:** Each section has real content and is reachable through in-app navigation.

### Phase 10.5 — Post-MVP Linkable Sections
Add URL-based linking while keeping SPA behavior.
- Recommended approaches: hash routes (`#projects`) or query routes (`?section=projects`)
- Route state should open/sync the corresponding section view
**Done when:** Sections are bookmarkable/shareable and route state restores the correct UI context.

### Phase 11 — Visual Polish
Retro typography, dialogue/menu border treatments, cursor indicators, panel transitions, sprite art integration.  
**Done when:** Site reads as Gen 3 inspired; all placeholder colors replaced with sprites and themed UI.

### Phase 12 — QA
Cross-browser, mobile layout, movement speed tuning, first-time user path timing (target: any section reachable in under 10 seconds).  
**Done when:** No blocking bugs; first-time usability target met.

---

## 15. MVP Acceptance Criteria

1. User can reach any portfolio section in two or fewer interactions (right panel click or map hotspot + object interact).
2. Full journey is completable with keyboard only.
3. Game viewport maintains correct 3:2 aspect ratio and integer pixel scale.
4. Sound is off by default and preference persists.
5. Reduced-motion mode is supported.
6. Content screen contains real portfolio content for at least: About Me, Projects, Contact.
7. Mobile layout is readable and all content is reachable.
8. Bottom command area supports at least 2 active commands and preserves 2 additional command slots in UI.
9. Bottom dialogue text area displays controls/help prompts and reflects actual controls.
10. Mobile MVP defaults to express-lane style access for speed and simplicity.
11. MVP ships as SPA without required linkable URL sections.

---

## 16. Open Questions

1. Virtual D-pad or swipe for mobile player movement?
2. Independent BGM/SFX toggles in MVP, or single master toggle?
3. NPC flavor dialogue: present in MVP or deferred to polish phase?
4. Post-MVP route format: hash (`#projects`) or query (`?section=projects`)?
5. Final building roster: which additional support buildings are worth implementing for MVP vs later?
6. Which two future bottom command slots should be reserved first (for example: Journal, Settings, Quest Log, Help)?
7. Should Storage PC style be global across all sections, or used only for content-heavy sections?
