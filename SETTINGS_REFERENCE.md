# AnymeX — Complete Settings Reference

> Generated from source: `lib/screens/settings/sub_settings/` and `lib/database/data_keys/keys.dart`

---

## Settings Categories Overview

The main Settings page has these top-level categories:

| Category | Page File | Description |
|---|---|---|
| Accounts & Sync | `settings_accounts.dart` | Discord RPC, AniList, MAL, Simkl |
| Common | `settings_common.dart` | Bridge mode, tracking, community recs, list management |
| Backup & Restore | `settings_backup.dart` | Backup/restore library, cloud sync |
| Storage Manager | `settings_storage_manager.dart` | Cache management, factory reset |
| UI | `settings_ui.dart` | Animations, nav, cards, font, sliders |
| Theme | `settings_theme.dart` | Light/Dark/System, colors, wallpaper, OLED |
| Player | `settings_player.dart` | Decoder, subtitles, gestures, auto-skip, Anime4K |
| Reader | `settings_reader.dart` | Manga reader + Novel reader settings |
| Download Settings | `settings_downloads.dart` | Concurrency, path, chunks |
| Extensions | `settings_extensions.dart` | Extension management (add/remove repos) |
| Logs | `settings_logs.dart` | Log file capture |
| About | `settings_about.dart` | Social links, updates, TOS |
| Anilist API | `settings_anilist_api.dart` | AniList remote settings |
| Extension Manager | `settings_extension_manager.dart` | Plugin download/update/rollback |
| Tap Zones | `settings_tap_zones.dart` | Custom tap gestures for manga reader |

---

## 1. Accounts & Sync

### Social Presence

| Setting | Type | Description |
|---|---|---|
| **Discord Rich Presence** | Toggle | Share your activity on Discord. On desktop shows "Discord Desktop" with connection status. On mobile requires OAuth login. |
| **Discord Login** | Button | Connect Discord account (mobile) via OAuth. Shows avatar and display name when connected. |
| **Discord Disconnect** | Button | Disconnect Discord account. Shows confirmation: "Your rich presence activity will stop updating." |

### Tracking Services

| Setting | Type | Description |
|---|---|---|
| **AniList Connect/Manage** | Button | Connect to AniList. Manage opens bottom sheet with "AniList Settings" and "Log Out". |
| **MyAnimeList Connect/Manage** | Button | Connect to MAL. Same flow as AniList. |
| **Simkl Connect/Manage** | Button | Connect to Simkl. Same flow. |

---

## 2. Common

### Bridge Settings (Desktop only — Windows/Linux)

| Setting | Type | Default | Description |
|---|---|---|---|
| **Bridge Mode** | Radio: JNI / Sidecar | JNI | JNI Mode (faster) vs Sidecar Mode (more stable, separate process). Requires restart. |

### Universal

| Setting | Type | Default | Description |
|---|---|---|---|
| **Ask for tracking permission** | Toggle | `true` | If enabled, asks before tracking; if disabled, tracks automatically. |
| **Unified Library** | Toggle | `true` | Share library items across all tracking services. |
| **Hide Adult Content** | Toggle | `true` | Disable adult content prompt on AniList/MAL. |

### Community Recommendations

| Setting | Type | Default | Description |
|---|---|---|---|
| **Show Community Recommendations** | Toggle | `true` | Show community recs on home page. |
| **Hide NSFW Recommendations** | Toggle | — | Filter out adult entries. |
| **Hide by List Status** | Toggle | — | Filter entries already in your list. |
| **Hide Completed** | Toggle | — | Hide completed entries (requires "Hide by List Status" on). |
| **Hide Watching / Reading** | Toggle | — | Hide currently watching/reading. |
| **Hide Dropped** | Toggle | — | Hide dropped entries. |
| **Hide Planning** | Toggle | — | Hide plan-to-watch/read. |
| **Hide On Hold / Paused** | Toggle | — | Hide on-hold/paused. |
| **Hide Rewatching** | Toggle | — | Hide rewatching. |

### List Management

| Setting | Type | Description |
|---|---|---|
| **Manage [Service] Lists** | Dialog (multi-toggle) | Choose which list categories appear on home. Options: Watching/Reading, Plan to Watch/Read, Completed, On-Hold/Paused, Dropped. Default: all on. |

---

## 3. Backup & Restore

| Setting | Type | Description |
|---|---|---|
| **Library Dashboard** | Info widget | Shows library statistics. |
| **Create Backup** | Button | Options: "Use Password" (toggle), "Include Settings" (toggle, default on), "Include Auth Tokens" (toggle, default off). Exports `.anymex` file. |
| **Restore Data** | Button | Imports `.anymex` file. Shows preview with restore options. Requires restart. |
| **Cloud Sync** | Widget | GitHub Gist-based sync. |

---

## 4. Storage Manager

| Setting | Type | Range | Description |
|---|---|---|---|
| **Cache Overview** | Info | — | Shows current cache size with progress bar. |
| **Auto-clear threshold** | Slider | min–max GB (39 steps) | Auto-clear cache when it reaches this size. |
| **Clear app cache now** | Button + dialog | — | Checkboxes: Cached Images, Torrent Stream Cache, Novel Snapshots, Other Temporary Files. |
| **Factory Reset** | Button (destructive) | — | Permanently deletes ALL AnymeX data. Cannot be undone. |

---

## 5. UI

### Common

| Setting | Type | Description |
|---|---|---|
| **Enable Animation** | Toggle | Carousel animations. |
| **Translucent Nav** | Toggle | Translucent navigation bar. |
| **Use Legacy Header** | Toggle | Classic simple header on home screens. |
| **Immersive Mode** | Toggle (Android/iOS) | Hide system status and navigation bars. |
| **Card Style** | Selector | Media card presentation. |
| **History Card Style** | Selector | History card presentation. |
| **Carousel Style** | Selector | Home screen hero carousel style. |
| **Nav Bar Style** | Selector | Navigation bar look. |
| **Reorder Navigation Tabs** | Dialog (drag & drop) | Reorder: Home, Anime, Manga, Library, Novel, Extensions. Can hide tabs (min 2 visible). |

### Font

| Setting | Type | Default | Options |
|---|---|---|---|
| **Font Family** | Radio list | Linotte (default) | Linotte, Outfit, Inter, Poppins, Montserrat, Lato, Lexend, Ubuntu, JetBrains Mono |

### Extras (Sliders)

| Setting | Type | Range |
|---|---|---|
| **Glow Multiplier** | Slider | 0–5.0 |
| **Radius Multiplier** | Slider | 0–3.0 |
| **Blur Multiplier** | Slider | 0–5.0 |
| **Card Roundness** | Slider | 0–5.0 |
| **Card Animation Duration** | Slider | 0–1000ms |
| **Bottom Nav Bar Margin** | Slider | 0–100 |

---

## 6. Theme

### Theme Mode

| Setting | Type | Options |
|---|---|---|
| **Theme Mode** | Card selector | Light, Dark, System |

### Theme Source

| Setting | Type | Description |
|---|---|---|
| **Default Theme** | Toggle group | Built-in theme colors. |
| **Material You** | Toggle group | Dynamic colors from wallpaper (Android 12+). |
| **Custom Theme** | Expandable | Color swatches + full HSV color picker + hex input. |

### Appearance

| Setting | Type | Description |
|---|---|---|
| **Bloom** | Toggle | Soft glowing gradient. Disabled when Liquid Mode is on. |
| **Palette** | Selector | Choose color palette variant. |
| **Grain Texture Overlay** | Toggle | Subtle film grain texture. |
| **Grain Intensity** | Segmented | Low (0.03), Medium (0.07), High (0.15). |
| **Oled Mode** | Toggle | Pure black backgrounds (super dark). |

### Wallpaper

| Setting | Type | Description |
|---|---|---|
| **Liquid Mode** | Toggle | Glassy/liquid effect. Disables bloom. |
| **Liquid Background** | Button | Choose custom background image. |
| **Retain Original Color** | Toggle | Keep original wallpaper color. |
| **Use Poster Color** | Toggle | Apply poster color on details page. |
| **Reset to Default Picture** | Button | Reset wallpaper. |

### Miscellaneous

| Setting | Type | Platform | Description |
|---|---|---|---|
| **Logo Animation** | Selector | All | Logo animation style with preview. |
| **Refresh Rate** | Selector | Android | Device display modes (resolution × refresh rate). Auto or device-specific. |

---

## 7. Player

### Playback

| Setting | Type | Options | Description |
|---|---|---|---|
| **Decoder** | Selector | HW+ / HW / SW | Varies by platform. Android: mediacodec-copy/mediacodec. iOS/macOS: videotoolbox. Windows: d3d11va. Linux: vaapi. |
| **Video Renderer** | Selector | Auto(GPU) / GPU / GPU Next(Vulkan) / MediaCodec Embed(Android) | Video output backend. |
| **Audio Engine** | Selector | Varies by platform | Android: Auto/AudioTrack/OpenSL ES. Windows: Auto/WASAPI/SDL. iOS/macOS: Auto/CoreAudio. Linux: Auto/PulseAudio/ALSA/SDL. |

### Anime 4K Enhancement

| Setting | Type | Description |
|---|---|---|
| **Download Shaders** | Button | Downloads Anime4K shader pack (~17MB). |
| **Enable Shaders** | Toggle | Apply shaders via HDR menu (mobile) or keybindings (desktop). Default: off. |
| **Choose Shader Profile** | Dropdown | MID-END (GTX 980/1060/RX 570), HIGH-END (GTX 1080/RTX 2070/3060/RX 590/Vega 56). |
| **Delete Shaders** | Button | Remove shader files. |
| **Keybindings** | Info | Desktop: CTRL+1 through CTRL+6 for different Anime4K modes. |

### MPV Core (Experimental)

| Setting | Type | Default | Range |
|---|---|---|---|
| **Interpolation** | Toggle | `false` | — |
| **Audio Pitch Correction** | Toggle | `true` | — |
| **Cache Minutes** | Slider | 5 | 0–60 (60 steps) |
| **Demuxer Readahead** | Slider | 30 | 0–120 (24 steps) |
| **Demuxer Max Buffer** | Slider | 128 | 16–512 MB (62 steps) |
| **Decoder Threads** | Slider | 4 | 0–16 (0=auto) |

### Common

| Setting | Type | Description |
|---|---|---|
| **Use Libass for Subtitles** | Toggle | Better subtitle rendering. |
| **Use External Player** | Toggle | Open in external player by default. |
| **Player Theme** | Selector | Player control visual theme. |
| **JSON Theme Manager** | Button | Import/manage custom JSON player themes. |
| **Swipe Indicator Theme** | Selector | Swipe indicator visual theme. |
| **Default Portrait** | Toggle | Watch in portrait mode. |
| **Playback Speed** | Selector | 0.25x–10x speeds. |
| **Resize Mode** | Selector | Video fit mode. |
| **Auto Skip OP** | Toggle | Skip opening song. |
| **Auto Skip ED** | Toggle | Skip ending song. |
| **Auto Skip Recap** | Toggle | Skip recap section. |
| **Auto Skip Once Only** | Toggle | Skip only once per watch. |
| **Auto Skip Filler** | Toggle | Skip filler episodes. |
| **Gesture for Brightness & Volume** | Toggle | Vertical swipe on sides. |
| **Hold to Speed Up** | Toggle | Hold to temporarily speed up. |
| **Swipe to Seek** | Toggle | Horizontal swipe to seek. |
| **Save Last Frame** | Toggle | Screenshot of last frame. Reduces storage if off. |
| **Media Session (Bluetooth)** | Toggle | Background controls for Bluetooth/system. More battery. |
| **Animate Control Overlay** | Toggle | Show/hide controls with animation. |
| **DoubleTap to Seek** | Slider | Seek duration (0–50 seconds, 10 steps). |
| **MegaSkip Duration** | Slider | Skip duration (0–120 seconds, 24 steps). |
| **Mark As Watched** | Slider | Percentage to mark as watched (0–100%, 20 steps). |

### Subtitles

| Setting | Type | Range/Options | Description |
|---|---|---|---|
| **Preferred Subtitle Language** | Selector | None + language codes | Default subtitle language. |
| **Transition Subtitle** | Toggle | — | Smooth subtitle transitions. |
| **Auto Translate Subtitles** | Toggle | — | AI translate soft-subs live. |
| **Translate To** | Selector | Languages | Target language (when auto-translate on). |
| **Subtitle Font** | Selector | Default, Latin, Japanese | Font groups. |
| **Outline Type** | Selector | Multiple types | Outline rendering style. |
| **Subtitle Transparency** | Slider | 0.1–1.0 | Text visibility. |
| **Bottom Margin** | Slider | 0.0–500.0 | Distance from bottom. |
| **Subtitle Color** | Color | — | Text color. |
| **Subtitle Outline Color** | Color | — | Outline color. |
| **Subtitle Background Color** | Color | — | Background color. |
| **Subtitle Size** | Slider | 12.0–90.0 | Text size. |
| **Subtitle Outline Width** | Slider | 1.0–8.0 | Outline thickness. |
| **Subtitle Preview** | Live preview | — | Shows current subtitle styling. |

### Bottom Controls

| Element | Type | Description |
|---|---|---|
| **Layout Editor** | Reorderable lists | Left side, Right side, Hidden. Buttons: Playlist, Shaders, Quality, Subtitles, Audio, Sync Subs, Speed, Orientation, Aspect Ratio, External Player, Watch Together. |

---

## 8. Reader

### Manga Reader

| Setting | Type | Default | Options/Range | Description |
|---|---|---|---|---|
| **Control Theme** | Selector | — | Reader control visual theme. |
| **Layout** | Selector | Continuous | Continuous / Paged |
| **Direction** | Selector | Top-Down | Bottom-Up / Top-Down / RTL / LTR |
| **Dual Page Mode** | Selector | Standard | Standard(single) / Auto(laptop) / Force(dual) |
| **Image Filter Quality** | Selector | Medium | None / Low / Medium / High / Lanczos |
| **Chapter Tile Style** | Selector | — | Compact / Detailed (Classic) |
| **Spaced Pages** | Toggle | `false` | Add spacing in continuous mode. |
| **Overscroll** | Toggle | `true` | Overscroll to prev/next chapter. |
| **Persistent Page Indicator** | Toggle | `false` | Always show page indicator. |
| **Crop Borders** | Toggle | `false` | Remove white/black borders. |
| **Fit to Screen Width** | Toggle | `false` | Stretch to screen width. |
| **Auto Scroll** | Toggle | `false` | Auto-scroll pages. |
| **Auto Scroll Speed** | Slider | 3.0 | 1.0–10.0 sec/page (lower=faster). |
| **Volume Keys Navigation** | Toggle (Android) | `false` | Volume keys to change pages. |
| **Invert Volume Keys** | Toggle (Android) | `false` | Swap up/down actions. |
| **Keep Screen On** | Toggle | `true` | Prevent screen sleep. |
| **Auto Webtoon Mode** | Toggle | `false` | Auto switch to vertical mode. |
| **Always Show Chapter Transition** | Toggle | `false` | Show transition even without gaps. |
| **Long Press Page Actions** | Toggle | `true` | Enable long-press quick actions. |

### Novel Reader

| Setting | Type | Default | Range/Options | Description |
|---|---|---|---|---|
| **Theme** | Selector | System | Light / Dark / Sepia / System |
| **Font Family** | Selector | System | System, Serif, Roboto, Open Sans, Lato, Merriweather, Crimson Text, Libre Baskerville |
| **Font Size** | Slider | 16.0 | 12–24 (12 steps) |
| **Line Height** | Slider | 1.6 | 1.0–3.0 (20 steps) |
| **Background Opacity** | Slider | 1.0 | 0.3–1.0 (7 steps) |
| **Letter Spacing** | Slider | 0.0 | -1.0–2.0 (30 steps) |
| **Word Spacing** | Slider | 0.0 | 0.0–5.0 (25 steps) |
| **Paragraph Spacing** | Slider | 16.0 | 8.0–32.0 (12 steps) |
| **Page Reader Mode** | Toggle | `false` | Read one page at a time. |
| **Auto Scroll** | Toggle | `false` | Auto-scroll. |
| **Auto Scroll Speed** | Slider | 3.0 | 1.0–10.0 (18 steps) |
| **TTS Auto Advance** | Toggle | `true` | Auto-advance to next text (when TTS on). |
| **Reset Novel Reader Settings** | Button | — | Restore all defaults. |

---

## 9. Download Settings

| Setting | Type | Range | Description |
|---|---|---|---|
| **Download Path** | Folder picker | — | Choose download directory. |
| **Reset Download Path** | Button | — | Restore to internal storage. |
| **Global Concurrency Limit** | Slider | 1–10 (9 steps) | Active download tasks. |
| **HLS Parallel Segments** | Slider | 1–10 (9 steps) | Parallel segments for video. |
| **Download Chunks** | Slider | 1–8 (7 steps) | Parallel chunks per download. |

---

## 10. Extensions

Management page (no traditional settings):

| Element | Description |
|---|---|
| **Type Tabs** | Anime / Manga / Novel |
| **Manager Bar** | Switch between extension managers (Mangayomi, Aniyomi, CloudStream, etc.) |
| **Add Repository** | FAB button → add repo URL dialog |
| **Extension List** | Installed extensions with update/delete |

---

## 11. Logs

| Setting | Type | Description |
|---|---|---|
| **Write log to a file** | Toggle | Save logs locally until disabled. |
| **Share logs** | Button | Share saved log file. |
| **Log directory** | Folder picker | Custom log directory. |

---

## 12. About

| Setting | Type | Description |
|---|---|---|
| **Telegram** | Link | Telegram group. |
| **Discord** | Link | Discord server. |
| **Reddit** | Link | r/AnymeX_. |
| **GitHub** | Link | Source code. |
| **Contributors** | Link | Contributors page. |
| **Ko-fi** | Link | Donations. |
| **Features/Issues** | Link | GitHub issues. |
| **Forks** | Link | Community forks. |
| **TOS / Privacy Policy** | Link | Terms of service. |
| **Comment Policy** | Link | Comment policy. |
| **Watch Together Policy** | Link | Watch Together policy. |
| **Check for Updates** | Button | Manual update check. |
| **Enable Beta Updates** | Toggle | Check beta channel for updates. |

---

## 13. Anilist API Settings

### Anime & Manga

| Setting | Type | Options |
|---|---|---|
| **Title Language** | Selector | ROMAJI / ENGLISH / NATIVE |
| **Staff & Character Name Language** | Selector | ROMAJI_WESTERN / ROMAJI / NATIVE |
| **Activity Merge Time** | Selector | 6h / 12h / 1d / 2d / 3d / 1w / 2w / Always |
| **Airing Anime Notifications** | Toggle | — |
| **18+ Content** | Toggle | — |

### List Options

| Setting | Type | Options |
|---|---|---|
| **Scoring System** | Selector | 100 Point / 10 Point Decimal / 10 Point / 5 Star / 3 Point Smiley |
| **Default List Order** | Selector | Score / Title / Last Updated / Last Added |
| **Split Completed Anime List** | Toggle | Separate by format (TV, Movie, OVA, ONA, TV Short, Special, Music) |
| **Split Completed Manga List** | Toggle | Separate by format (Manga, Novel, One Shot) |
| **Anime/Manga Custom Lists** | Editor | Add/remove custom list names. |
| **Anime/Manga Section Order** | Reorderable | Drag to reorder list sections. |

### Other

| Setting | Type | Description |
|---|---|---|
| **Restrict Messages To Following** | Toggle | Only followed users can message. |
| **Select Timezone** | Selector | All UTC offsets from -12:00 to +14:00 (30-min increments). |
| **About (Bio)** | Text editor | Markdown editor with full toolbar. |
| **Save AniList Settings** | Button | Push all changes to AniList API. |

---

## 14. Extension Manager

| Setting | Type | Description |
|---|---|---|
| **Plugin Status** | Info card | Installed version, release title, storage status, bridge ready. |
| **Download/Update Plugin** | Button | Downloads latest plugin from GitHub. |
| **Load Plugin APK from Storage** | Button (Android) | Select local APK/JAR for manual install. |
| **Force Re-download** | Button | Re-download from scratch. Requires restart. |
| **Rollback Version** | Button | Select any previous version. Requires restart. |

---

## 15. Tap Zones

| Setting | Type | Description |
|---|---|---|
| **Reader Mode** | Segmented | Paged / Webtoon |
| **Orientation** | Segmented | Horizontal / Vertical |
| **Enable Tap Zones** | Toggle | Custom tap gestures. |
| **Zone Editor** | Visual grid | Tap zone → set action: Next Page, Prev Page, Toggle Menu, Scroll Up, Scroll Down, Next Chapter, Prev Chapter, None. |

---

## Total: ~200+ unique setting keys across 18 key enums
