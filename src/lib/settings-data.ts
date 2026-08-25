export interface SettingItem {
  name: string
  description: string
  type: 'toggle' | 'selector' | 'slider' | 'button' | 'dialog' | 'info' | 'editor' | 'reorderable'
  options?: string[]
  range?: string
  default?: string
  platform?: string
  conditional?: string
  warning?: string
}

export interface SettingsSection {
  title: string
  items: SettingItem[]
}

export interface SettingsCategory {
  slug: string
  name: string
  description: string
  icon: string
  color: string
  path: string[]
  sections: SettingsSection[]
}

export const SETTINGS_CATEGORIES: SettingsCategory[] = [
  // ============ 1. accounts ============
  {
    slug: 'accounts',
    name: 'Accounts & Sync',
    description: 'Connect and manage your tracking service accounts and social presence.',
    icon: 'User',
    color: 'text-violet-400',
    path: ['Profile', 'Settings'],
    sections: [
      {
        title: 'Social Presence',
        items: [
          {
            name: 'Discord Rich Presence',
            description: 'Show what you\'re watching/reading on your Discord profile as a status activity.',
            type: 'toggle',
          },
          {
            name: 'Discord Login',
            description: 'Authenticate with your Discord account to enable rich presence.',
            type: 'button',
          },
          {
            name: 'Discord Disconnect',
            description: 'Disconnect your Discord account and disable rich presence.',
            type: 'button',
          },
        ],
      },
      {
        title: 'Tracking Services',
        items: [
          {
            name: 'AniList Connect',
            description: 'Connect your AniList account to sync your anime & manga lists.',
            type: 'button',
          },
          {
            name: 'AniList Manage',
            description: 'Manage your connected AniList account settings and data.',
            type: 'button',
          },
          {
            name: 'MyAnimeList Connect',
            description: 'Connect your MyAnimeList account to sync your anime & manga lists.',
            type: 'button',
          },
          {
            name: 'MyAnimeList Manage',
            description: 'Manage your connected MyAnimeList account settings and data.',
            type: 'button',
          },
          {
            name: 'Simkl Connect',
            description: 'Connect your Simkl account to track your watch history.',
            type: 'button',
          },
          {
            name: 'Simkl Manage',
            description: 'Manage your connected Simkl account settings and data.',
            type: 'button',
          },
        ],
      },
    ],
  },

  // ============ 2. common ============
  {
    slug: 'common',
    name: 'Common',
    description: 'General app settings including bridge mode, library, community recommendations, and list management.',
    icon: 'Settings',
    color: 'text-sky-400',
    path: ['Profile', 'Settings'],
    sections: [
      {
        title: 'Bridge Settings',
        items: [
          {
            name: 'Bridge Mode',
            description: 'Choose how the desktop bridge connects to the app for extension execution.',
            type: 'selector',
            options: ['JNI', 'Sidecar'],
            default: 'JNI',
            platform: 'Desktop only',
            warning: 'Requires app restart to take effect.',
          },
        ],
      },
      {
        title: 'Universal',
        items: [
          {
            name: 'Ask for Tracking Permission',
            description: 'Prompt for tracking service permission before accessing protected features.',
            type: 'toggle',
            default: 'true',
          },
          {
            name: 'Unified Library',
            description: 'Combine anime, manga, and novel entries into a single library view.',
            type: 'toggle',
            default: 'true',
          },
          {
            name: 'Hide Adult Content',
            description: 'Filter out 18+ content from search results and recommendations.',
            type: 'toggle',
            default: 'true',
          },
        ],
      },
      {
        title: 'Community Recommendations',
        items: [
          {
            name: 'Show Community Recs',
            description: 'Display community-driven recommendations on the home screen.',
            type: 'toggle',
            default: 'true',
          },
          {
            name: 'Hide NSFW Recommendations',
            description: 'Remove NSFW entries from community recommendations.',
            type: 'toggle',
          },
          {
            name: 'Hide by List Status',
            description: 'Enable hiding recommendations based on your list status.',
            type: 'toggle',
          },
          {
            name: 'Hide Completed',
            description: 'Hide recommendations for entries you\'ve already completed.',
            type: 'toggle',
            conditional: 'Requires "Hide by List Status" to be enabled.',
          },
          {
            name: 'Hide Watching/Reading',
            description: 'Hide recommendations for entries currently on your watching/reading list.',
            type: 'toggle',
            conditional: 'Requires "Hide by List Status" to be enabled.',
          },
          {
            name: 'Hide Dropped',
            description: 'Hide recommendations for entries you\'ve dropped.',
            type: 'toggle',
            conditional: 'Requires "Hide by List Status" to be enabled.',
          },
          {
            name: 'Hide Planning',
            description: 'Hide recommendations for entries on your plan-to-watch/read list.',
            type: 'toggle',
            conditional: 'Requires "Hide by List Status" to be enabled.',
          },
          {
            name: 'Hide On Hold/Paused',
            description: 'Hide recommendations for entries you\'ve put on hold or paused.',
            type: 'toggle',
            conditional: 'Requires "Hide by List Status" to be enabled.',
          },
          {
            name: 'Hide Rewatching',
            description: 'Hide recommendations for entries you\'re currently rewatching/rereading.',
            type: 'toggle',
            conditional: 'Requires "Hide by List Status" to be enabled.',
          },
        ],
      },
      {
        title: 'List Management',
        items: [
          {
            name: 'Manage [Service] Lists',
            description: 'Open a dialog to manage entries across different list statuses.',
            type: 'dialog',
            options: ['Watching/Reading', 'Plan to Watch/Read', 'Completed', 'On-Hold/Paused', 'Dropped'],
          },
        ],
      },
    ],
  },

  // ============ 3. backup ============
  {
    slug: 'backup',
    name: 'Backup & Restore',
    description: 'Create, restore, and sync your AnymeX library data and settings.',
    icon: 'HardDrive',
    color: 'text-amber-400',
    path: ['Profile', 'Settings'],
    sections: [
      {
        title: 'Current Library',
        items: [
          {
            name: 'Library Dashboard',
            description: 'Overview of your current library statistics, including entries by status, type, and tracking service.',
            type: 'info',
          },
        ],
      },
      {
        title: 'Actions',
        items: [
          {
            name: 'Create Backup',
            description: 'Export your library and settings to a backup file.',
            type: 'button',
            options: ['Use Password', 'Include Settings (default: on)', 'Include Auth Tokens (default: off)'],
          },
          {
            name: 'Restore Data',
            description: 'Import a previously created backup file to restore your library.',
            type: 'button',
            warning: 'Requires app restart after restoring.',
          },
        ],
      },
      {
        title: 'Cloud Sync',
        items: [
          {
            name: 'Cloud Sync',
            description: 'Automatically sync your library to GitHub Gist for cross-device backup and restore.',
            type: 'info',
          },
        ],
      },
    ],
  },

  // ============ 4. storage ============
  {
    slug: 'storage',
    name: 'Storage Manager',
    description: 'Monitor cache usage, set auto-clear thresholds, and manage app storage.',
    icon: 'Database',
    color: 'text-rose-400',
    path: ['Profile', 'Settings'],
    sections: [
      {
        title: 'Cache Overview',
        items: [
          {
            name: 'Temporary App Cache',
            description: 'Displays the current size of temporary cached data including images, streams, and other files.',
            type: 'info',
          },
        ],
      },
      {
        title: 'Storage Options',
        items: [
          {
            name: 'Auto-clear Threshold',
            description: 'Set the cache size limit. When exceeded, oldest cache entries are automatically cleared.',
            type: 'slider',
            range: '0–8 GB',
          },
          {
            name: 'Clear App Cache Now',
            description: 'Manually clear cached data. Select which types to remove.',
            type: 'button',
            options: ['Cached Images', 'Torrent Stream Cache', 'Novel Snapshots', 'Other Temporary Files'],
          },
          {
            name: 'Factory Reset',
            description: 'Erase ALL app data including settings, library, and downloads. Returns the app to its initial state.',
            type: 'button',
            warning: 'This cannot be undone. All data will be permanently deleted.',
          },
        ],
      },
    ],
  },

  // ============ 5. ui ============
  {
    slug: 'ui',
    name: 'UI',
    description: 'Customize the interface including animations, card styles, navigation, fonts, and visual multipliers.',
    icon: 'Layout',
    color: 'text-cyan-400',
    path: ['Profile', 'Settings'],
    sections: [
      {
        title: 'Common',
        items: [
          {
            name: 'Enable Animation',
            description: 'Enable or disable UI animations and transitions throughout the app.',
            type: 'toggle',
          },
          {
            name: 'Translucent Nav',
            description: 'Make the navigation bar translucent with a blur effect.',
            type: 'toggle',
          },
          {
            name: 'Use Legacy Header',
            description: 'Switch to the older header style instead of the modern design.',
            type: 'toggle',
          },
          {
            name: 'Immersive Mode',
            description: 'Hide system bars for a full-screen immersive experience.',
            type: 'toggle',
            platform: 'Android / iOS only',
          },
          {
            name: 'Card Style',
            description: 'Choose the visual style for media cards on browse and home screens.',
            type: 'selector',
          },
          {
            name: 'History Card Style',
            description: 'Choose the layout style for the continue watching/reading history cards.',
            type: 'selector',
          },
          {
            name: 'Carousel Style',
            description: 'Choose the carousel appearance for featured content sections.',
            type: 'selector',
          },
          {
            name: 'Nav Bar Style',
            description: 'Choose the bottom navigation bar appearance.',
            type: 'selector',
          },
          {
            name: 'Reorder Navigation Tabs',
            description: 'Drag and drop to reorder the bottom navigation tabs. At least 2 must be visible.',
            type: 'reorderable',
            options: ['Home', 'Anime', 'Manga', 'Library', 'Novel', 'Extensions'],
          },
        ],
      },
      {
        title: 'Font',
        items: [
          {
            name: 'Font Family',
            description: 'Set the default font used throughout the app interface.',
            type: 'selector',
            options: ['Linotte', 'Outfit', 'Inter', 'Poppins', 'Montserrat', 'Lato', 'Lexend', 'Ubuntu', 'JetBrains Mono'],
            default: 'Linotte',
          },
        ],
      },
      {
        title: 'Extras',
        items: [
          {
            name: 'Glow Multiplier',
            description: 'Adjust the intensity of glow effects on UI elements.',
            type: 'slider',
            range: '0 – 5.0',
          },
          {
            name: 'Radius Multiplier',
            description: 'Scale the corner radius of all rounded UI elements.',
            type: 'slider',
            range: '0 – 3.0',
          },
          {
            name: 'Blur Multiplier',
            description: 'Scale the backdrop blur intensity on translucent surfaces.',
            type: 'slider',
            range: '0 – 5.0',
          },
          {
            name: 'Card Roundness',
            description: 'Fine-tune the border radius specifically for content cards.',
            type: 'slider',
            range: '0 – 5.0',
          },
          {
            name: 'Card Animation Duration',
            description: 'How long card entrance/exit animations take in milliseconds.',
            type: 'slider',
            range: '0 – 1000 ms',
          },
          {
            name: 'Bottom Nav Bar Margin',
            description: 'Adjust the bottom margin of the navigation bar for devices with gesture navigation.',
            type: 'slider',
            range: '0 – 100',
          },
        ],
      },
    ],
  },

  // ============ 6. theme ============
  {
    slug: 'theme',
    name: 'Theme',
    description: 'Customize colors, wallpaper, bloom effects, grain texture, and visual appearance.',
    icon: 'Palette',
    color: 'text-pink-400',
    path: ['Profile', 'Settings'],
    sections: [
      {
        title: 'Theme Mode',
        items: [
          {
            name: 'Theme Mode',
            description: 'Choose between light, dark, or system-following theme.',
            type: 'selector',
            options: ['Light', 'Dark', 'System'],
          },
        ],
      },
      {
        title: 'Theme Source',
        items: [
          {
            name: 'Default Theme',
            description: 'Select from the built-in preset themes.',
            type: 'selector',
          },
          {
            name: 'Material You',
            description: 'Generate a theme from your device\'s wallpaper colors.',
            type: 'selector',
            platform: 'Android 12+',
          },
          {
            name: 'Custom Theme',
            description: 'Fully customize your theme with color swatches, HSV picker, and hex input.',
            type: 'editor',
          },
        ],
      },
      {
        title: 'Appearance',
        items: [
          {
            name: 'Bloom',
            description: 'Add a soft bloom glow effect to the theme accent color.',
            type: 'toggle',
            warning: 'Automatically disabled when Liquid Mode is on.',
          },
          {
            name: 'Palette',
            description: 'Select the color palette used for accent colors throughout the app.',
            type: 'selector',
          },
          {
            name: 'Grain Texture Overlay',
            description: 'Add a subtle film grain texture over the background.',
            type: 'toggle',
          },
          {
            name: 'Grain Intensity',
            description: 'Adjust how strong the grain texture overlay appears.',
            type: 'selector',
            options: ['Low', 'Medium', 'High'],
            conditional: 'Only available when Grain Texture Overlay is enabled.',
          },
          {
            name: 'Oled Mode',
            description: 'Use pure black (#000000) as the background for true OLED black.',
            type: 'toggle',
          },
        ],
      },
      {
        title: 'Wallpaper',
        items: [
          {
            name: 'Liquid Mode',
            description: 'Enable animated liquid/fluid wallpaper backgrounds.',
            type: 'toggle',
            warning: 'Disables the Bloom effect.',
          },
          {
            name: 'Liquid Background',
            description: 'Choose or upload a liquid-style animated background.',
            type: 'button',
          },
          {
            name: 'Retain Original Color',
            description: 'Keep the original colors of the wallpaper without tinting.',
            type: 'toggle',
          },
          {
            name: 'Use Poster Color',
            description: 'Tint the wallpaper using the dominant color from the current poster/cover.',
            type: 'toggle',
          },
          {
            name: 'Reset to Default Picture',
            description: 'Remove your custom wallpaper and revert to the default background.',
            type: 'button',
          },
        ],
      },
      {
        title: 'Miscellaneous',
        items: [
          {
            name: 'Logo Animation',
            description: 'Choose the animation style for the AnymeX logo, with a live preview.',
            type: 'selector',
          },
          {
            name: 'Refresh Rate',
            description: 'Set the display refresh rate for smoother animations.',
            type: 'selector',
            platform: 'Android only',
          },
        ],
      },
    ],
  },

  // ============ 7. player ============
  {
    slug: 'player',
    name: 'Player',
    description: 'Video player settings including decoder, subtitles, gestures, controls, and MPV core options.',
    icon: 'Play',
    color: 'text-emerald-400',
    path: ['Profile', 'Settings'],
    sections: [
      {
        title: 'Playback',
        items: [
          {
            name: 'Decoder',
            description: 'Choose the video decoding method. Options vary by platform capabilities.',
            type: 'selector',
            options: ['HW+', 'HW', 'SW'],
          },
          {
            name: 'Video Renderer',
            description: 'Select the rendering backend for video output.',
            type: 'selector',
            options: ['Auto', 'GPU', 'GPU Next', 'MediaCodec Embed'],
          },
          {
            name: 'Audio Engine',
            description: 'Choose the audio output engine. Options vary by platform.',
            type: 'selector',
          },
        ],
      },
      {
        title: 'Anime 4K Enhancement',
        items: [
          {
            name: 'Download Shaders',
            description: 'Download upscaling shader files (~17 MB) for anime 4K enhancement.',
            type: 'button',
          },
          {
            name: 'Enable Shaders',
            description: 'Activate anime upscaling shaders for improved visual quality.',
            type: 'toggle',
            default: 'false',
          },
          {
            name: 'Choose Shader Profile',
            description: 'Select the shader quality profile based on your device capabilities.',
            type: 'selector',
            options: ['MID-END', 'HIGH-END'],
          },
          {
            name: 'Delete Shaders',
            description: 'Remove downloaded shader files to free up storage.',
            type: 'button',
          },
          {
            name: 'Keybindings',
            description: 'Keyboard shortcuts for quick shader switching. Desktop: CTRL+1 through CTRL+6.',
            type: 'info',
            platform: 'Desktop only',
          },
        ],
      },
      {
        title: 'MPV Core (Experimental)',
        items: [
          {
            name: 'Interpolation',
            description: 'Smooth video by interpolating between frames. May increase CPU/GPU usage.',
            type: 'toggle',
            default: 'false',
          },
          {
            name: 'Audio Pitch Correction',
            description: 'Maintain audio pitch when interpolation changes playback speed.',
            type: 'toggle',
            default: 'true',
          },
          {
            name: 'Cache Minutes',
            description: 'How many minutes of video to pre-cache for smoother playback.',
            type: 'slider',
            range: '0 – 60 min',
            default: '5',
          },
          {
            name: 'Demuxer Readahead',
            description: 'How far ahead (in seconds) the demuxer reads.',
            type: 'slider',
            range: '0 – 120 s',
            default: '30',
          },
          {
            name: 'Demuxer Max Buffer',
            description: 'Maximum demuxer buffer size for caching.',
            type: 'slider',
            range: '16 – 512 MB',
            default: '128',
          },
          {
            name: 'Decoder Threads',
            description: 'Number of threads for video decoding. Set to 0 for auto-detection.',
            type: 'slider',
            range: '0 – 16',
            default: '4',
          },
        ],
      },
      {
        title: 'Common',
        items: [
          {
            name: 'Use Libass',
            description: 'Use the libass library for advanced subtitle rendering.',
            type: 'toggle',
          },
          {
            name: 'External Player',
            description: 'Open videos in an external media player app instead of the built-in one.',
            type: 'toggle',
          },
          {
            name: 'Player Theme',
            description: 'Choose the color theme for the video player controls.',
            type: 'selector',
          },
          {
            name: 'JSON Theme Manager',
            description: 'Import, export, or create custom player themes using JSON.',
            type: 'button',
          },
          {
            name: 'Swipe Indicator Theme',
            description: 'Choose the style of the seek/brightness/volume swipe indicators.',
            type: 'selector',
          },
          {
            name: 'Default Portrait',
            description: 'Lock the player in portrait orientation by default.',
            type: 'toggle',
          },
          {
            name: 'Playback Speed',
            description: 'Set the default playback speed for all videos.',
            type: 'selector',
            options: ['0.25x', '0.5x', '0.75x', '1.0x', '1.25x', '1.5x', '1.75x', '2.0x', '3.0x', '5.0x', '10.0x'],
          },
          {
            name: 'Resize Mode',
            description: 'Choose how the video fills the screen (fit, crop, stretch, etc.).',
            type: 'selector',
          },
          {
            name: 'Auto Skip OP/ED/Recap',
            description: 'Automatically skip opening, ending, and recap segments.',
            type: 'toggle',
          },
          {
            name: 'Auto Skip Once Only',
            description: 'Only auto-skip once per episode instead of every occurrence.',
            type: 'toggle',
          },
          {
            name: 'Auto Skip Filler',
            description: 'Automatically skip known filler episodes/arcs.',
            type: 'toggle',
          },
          {
            name: 'Brightness/Volume Gestures',
            description: 'Swipe up/down on the left/right side to adjust brightness/volume.',
            type: 'toggle',
          },
          {
            name: 'Hold to Speed Up',
            description: 'Hold anywhere on the screen to temporarily speed up playback.',
            type: 'toggle',
          },
          {
            name: 'Swipe to Seek',
            description: 'Swipe horizontally on the video to seek forward or backward.',
            type: 'toggle',
          },
          {
            name: 'Save Last Frame',
            description: 'Save the last frame as a preview thumbnail when you stop watching.',
            type: 'toggle',
          },
          {
            name: 'Media Session Bluetooth',
            description: 'Enable media session controls for Bluetooth devices and notification bar.',
            type: 'toggle',
            warning: 'Uses more battery due to persistent media session.',
          },
          {
            name: 'Animate Controls',
            description: 'Smoothly animate player controls in and out.',
            type: 'toggle',
          },
          {
            name: 'DoubleTap Seek',
            description: 'How many seconds to seek when double-tapping left or right.',
            type: 'slider',
            range: '0 – 50 s',
          },
          {
            name: 'MegaSkip Duration',
            description: 'How many seconds to skip when using the long-press mega skip gesture.',
            type: 'slider',
            range: '0 – 120 s',
          },
          {
            name: 'Mark As Watched',
            description: 'At what percentage of the episode to automatically mark it as watched.',
            type: 'slider',
            range: '0 – 100%',
          },
        ],
      },
      {
        title: 'Subtitles',
        items: [
          {
            name: 'Preferred Language',
            description: 'Default subtitle language to select when multiple are available.',
            type: 'selector',
          },
          {
            name: 'Transition Subtitle',
            description: 'Smoothly fade subtitles in and out instead of appearing instantly.',
            type: 'toggle',
          },
          {
            name: 'Auto Translate',
            description: 'Automatically translate subtitles to your preferred language.',
            type: 'toggle',
          },
          {
            name: 'Translate To',
            description: 'Target language for auto-translation.',
            type: 'selector',
            conditional: 'Only available when Auto Translate is enabled.',
          },
          {
            name: 'Font',
            description: 'Choose the font used for subtitle rendering.',
            type: 'selector',
          },
          {
            name: 'Outline Type',
            description: 'Choose the subtitle outline/shadow style.',
            type: 'selector',
          },
          {
            name: 'Transparency',
            description: 'Adjust the subtitle background transparency.',
            type: 'slider',
            range: '0.1 – 1.0',
          },
          {
            name: 'Bottom Margin',
            description: 'Distance from the bottom of the screen to the subtitle text.',
            type: 'slider',
            range: '0 – 500',
          },
          {
            name: 'Color',
            description: 'Set the subtitle text color.',
            type: 'selector',
          },
          {
            name: 'Outline Color',
            description: 'Set the subtitle outline color.',
            type: 'selector',
          },
          {
            name: 'Background Color',
            description: 'Set the subtitle background color.',
            type: 'selector',
          },
          {
            name: 'Size',
            description: 'Subtitle font size.',
            type: 'slider',
            range: '12 – 90',
          },
          {
            name: 'Outline Width',
            description: 'Thickness of the subtitle text outline.',
            type: 'slider',
            range: '1 – 8',
          },
          {
            name: 'Preview',
            description: 'Preview how your subtitle settings look with a sample subtitle.',
            type: 'info',
          },
        ],
      },
      {
        title: 'Bottom Controls',
        items: [
          {
            name: 'Layout Editor',
            description: 'Drag and drop to reorder the player\'s bottom control bar buttons.',
            type: 'reorderable',
            options: ['Playlist', 'Shaders', 'Quality', 'Subtitles', 'Audio', 'Sync Subs', 'Speed', 'Orientation', 'Aspect Ratio', 'External Player', 'Watch Together'],
          },
        ],
      },
    ],
  },

  // ============ 8. reader ============
  {
    slug: 'reader',
    name: 'Reader',
    description: 'Manga and novel reader settings including layout, fonts, themes, gestures, and auto-scroll.',
    icon: 'BookOpen',
    color: 'text-orange-400',
    path: ['Profile', 'Settings'],
    sections: [
      {
        title: 'Manga',
        items: [
          {
            name: 'Control Theme',
            description: 'Choose the theme for the reader controls overlay.',
            type: 'selector',
          },
          {
            name: 'Layout',
            description: 'Choose between continuous (webtoon-style) scrolling or paged reading.',
            type: 'selector',
            options: ['Continuous', 'Paged'],
          },
          {
            name: 'Direction',
            description: 'Set the page reading direction.',
            type: 'selector',
            options: ['Bottom-Up', 'Top-Down', 'RTL', 'LTR'],
            default: 'Top-Down',
          },
          {
            name: 'Dual Page Mode',
            description: 'Configure two-page spread viewing.',
            type: 'selector',
            options: ['Standard', 'Auto', 'Force'],
          },
          {
            name: 'Image Filter Quality',
            description: 'Select the image scaling/interpolation filter for manga pages.',
            type: 'selector',
            options: ['None', 'Low', 'Medium', 'High', 'Lanczos'],
            default: 'Medium',
          },
          {
            name: 'Chapter Tile Style',
            description: 'Choose how chapter list items are displayed.',
            type: 'selector',
            options: ['Compact', 'Detailed'],
          },
          {
            name: 'Spaced Pages',
            description: 'Add spacing between pages in paged mode.',
            type: 'toggle',
          },
          {
            name: 'Overscroll',
            description: 'Allow overscrolling past the first/last page with a bounce effect.',
            type: 'toggle',
            default: 'true',
          },
          {
            name: 'Persistent Page Indicator',
            description: 'Always show the current page number on screen.',
            type: 'toggle',
          },
          {
            name: 'Crop Borders',
            description: 'Automatically detect and crop black borders from manga pages.',
            type: 'toggle',
          },
          {
            name: 'Fit to Screen Width',
            description: 'Scale pages to fill the screen width, potentially cropping vertically.',
            type: 'toggle',
          },
          {
            name: 'Auto Scroll',
            description: 'Automatically scroll through pages at a set speed.',
            type: 'toggle',
          },
          {
            name: 'Auto Scroll Speed',
            description: 'Speed of auto-scrolling through pages.',
            type: 'slider',
            range: '1 – 10',
            conditional: 'Only available when Auto Scroll is enabled.',
          },
          {
            name: 'Volume Keys Navigation',
            description: 'Use volume up/down keys to navigate between pages.',
            type: 'toggle',
            platform: 'Android only',
          },
          {
            name: 'Invert Volume Keys',
            description: 'Swap the volume key page navigation direction.',
            type: 'toggle',
            platform: 'Android only',
          },
          {
            name: 'Keep Screen On',
            description: 'Prevent the screen from turning off while reading.',
            type: 'toggle',
            default: 'true',
          },
          {
            name: 'Auto Webtoon Mode',
            description: 'Automatically switch to webtoon/continuous mode for long-strip manga.',
            type: 'toggle',
          },
          {
            name: 'Always Show Chapter Transition',
            description: 'Show a transition indicator between chapters.',
            type: 'toggle',
          },
          {
            name: 'Long Press Page Actions',
            description: 'Long-press on a page to open action options (save, share, etc.).',
            type: 'toggle',
            default: 'true',
          },
        ],
      },
      {
        title: 'Novel',
        items: [
          {
            name: 'Theme',
            description: 'Choose the novel reader color theme.',
            type: 'selector',
            options: ['Light', 'Dark', 'Sepia', 'System'],
            default: 'System',
          },
          {
            name: 'Font Family',
            description: 'Set the font for novel text content.',
            type: 'selector',
            options: ['System', 'Serif', 'Roboto', 'Open Sans', 'Lato', 'Merriweather', 'Crimson Text', 'Libre Baskerville'],
          },
          {
            name: 'Font Size',
            description: 'Adjust the novel text font size.',
            type: 'slider',
            range: '12 – 24',
            default: '16',
          },
          {
            name: 'Line Height',
            description: 'Adjust the line spacing for novel text.',
            type: 'slider',
            range: '1.0 – 3.0',
            default: '1.6',
          },
          {
            name: 'Background Opacity',
            description: 'Adjust the background opacity behind the novel text.',
            type: 'slider',
            range: '0.3 – 1.0',
            default: '1.0',
          },
          {
            name: 'Letter Spacing',
            description: 'Adjust the spacing between individual characters.',
            type: 'slider',
            range: '-1.0 – 2.0',
          },
          {
            name: 'Word Spacing',
            description: 'Adjust the spacing between words.',
            type: 'slider',
            range: '0 – 5',
          },
          {
            name: 'Paragraph Spacing',
            description: 'Adjust the spacing between paragraphs.',
            type: 'slider',
            range: '8 – 32',
            default: '16',
          },
          {
            name: 'Page Reader Mode',
            description: 'Switch to a paginated reader mode instead of continuous scroll.',
            type: 'toggle',
          },
          {
            name: 'Auto Scroll',
            description: 'Automatically scroll through novel text at a set speed.',
            type: 'toggle',
          },
          {
            name: 'Auto Scroll Speed',
            description: 'Speed of auto-scrolling through novel text.',
            type: 'slider',
            range: '1 – 10',
          },
          {
            name: 'TTS Auto Advance',
            description: 'Automatically advance to the next page when text-to-speech finishes.',
            type: 'toggle',
            default: 'true',
            conditional: 'Only available when TTS (Text-to-Speech) is enabled.',
          },
          {
            name: 'Reset Settings',
            description: 'Reset all novel reader settings to their defaults.',
            type: 'button',
          },
        ],
      },
    ],
  },

  // ============ 9. downloads ============
  {
    slug: 'downloads',
    name: 'Download Settings',
    description: 'Configure download storage paths and concurrency limits.',
    icon: 'Download',
    color: 'text-lime-400',
    path: ['Profile', 'Settings'],
    sections: [
      {
        title: 'Storage & Path',
        items: [
          {
            name: 'Download Path',
            description: 'Open a folder picker to choose where downloads are stored on your device.',
            type: 'button',
          },
          {
            name: 'Reset Download Path',
            description: 'Reset the download folder to the app\'s default location.',
            type: 'button',
          },
        ],
      },
      {
        title: 'Concurrency',
        items: [
          {
            name: 'Global Concurrency Limit',
            description: 'Maximum number of simultaneous downloads across all tasks.',
            type: 'slider',
            range: '1 – 10',
          },
          {
            name: 'HLS Parallel Segments',
            description: 'Number of HLS stream segments to download in parallel.',
            type: 'slider',
            range: '1 – 10',
          },
          {
            name: 'Download Chunks',
            description: 'Number of chunks to split each download into for parallel downloading.',
            type: 'slider',
            range: '1 – 8',
          },
        ],
      },
    ],
  },

  // ============ 10. extensions ============
  {
    slug: 'extensions',
    name: 'Extensions',
    description: 'Manage installed extensions, repositories, and extension source types.',
    icon: 'Puzzle',
    color: 'text-purple-400',
    path: ['Profile', 'Settings'],
    sections: [
      {
        title: 'Management',
        items: [
          {
            name: 'Type Tabs',
            description: 'Switch between Anime, Manga, and Novel extension tabs.',
            type: 'selector',
            options: ['Anime', 'Manga', 'Novel'],
          },
          {
            name: 'Manager Bar',
            description: 'The top bar lets you switch between installed, available, and updated extensions.',
            type: 'info',
          },
          {
            name: 'Add Repository',
            description: 'Add a custom extension repository URL. Also accessible via the FAB (+) button.',
            type: 'button',
          },
          {
            name: 'Extension List',
            description: 'View all installed extensions. Each entry shows name, version, and options to update or delete.',
            type: 'info',
          },
        ],
      },
    ],
  },

  // ============ 11. logs ============
  {
    slug: 'logs',
    name: 'Logs',
    description: 'Configure log capture and access log files for debugging.',
    icon: 'FileText',
    color: 'text-stone-400',
    path: ['Profile', 'Settings'],
    sections: [
      {
        title: 'Log Capture',
        items: [
          {
            name: 'Write Log to File',
            description: 'Persist app logs to a file on device for later analysis.',
            type: 'toggle',
          },
          {
            name: 'Share Logs',
            description: 'Share the current log file via system share sheet for bug reports.',
            type: 'button',
          },
          {
            name: 'Log Directory',
            description: 'Open the folder where log files are stored.',
            type: 'button',
            default: 'App Documents',
          },
        ],
      },
    ],
  },

  // ============ 12. about ============
  {
    slug: 'about',
    name: 'About',
    description: 'Social links, development resources, policies, and update settings.',
    icon: 'Info',
    color: 'text-gray-400',
    path: ['Profile', 'Settings'],
    sections: [
      {
        title: 'Social',
        items: [
          {
            name: 'Telegram',
            description: 'Join the AnymeX Telegram community for news and discussion.',
            type: 'button',
          },
          {
            name: 'Discord',
            description: 'Join the AnymeX Discord server for support and community.',
            type: 'button',
          },
          {
            name: 'Reddit',
            description: 'Visit the AnymeX subreddit.',
            type: 'button',
          },
        ],
      },
      {
        title: 'Development',
        items: [
          {
            name: 'GitHub',
            description: 'View the AnymeX source code on GitHub.',
            type: 'button',
          },
          {
            name: 'Contributors',
            description: 'See everyone who has contributed to the AnymeX project.',
            type: 'button',
          },
          {
            name: 'Ko-fi',
            description: 'Support the developers through Ko-fi.',
            type: 'button',
          },
          {
            name: 'Features / Issues',
            description: 'View and submit feature requests or bug reports.',
            type: 'button',
          },
          {
            name: 'Forks',
            description: 'View forks and community builds of AnymeX.',
            type: 'button',
          },
        ],
      },
      {
        title: 'Others',
        items: [
          {
            name: 'TOS / Privacy Policy',
            description: 'Read the Terms of Service and Privacy Policy.',
            type: 'button',
          },
          {
            name: 'Comment Policy',
            description: 'Read the community comment and review policy.',
            type: 'button',
          },
          {
            name: 'Watch Together Policy',
            description: 'Read the Watch Together feature policy and guidelines.',
            type: 'button',
          },
          {
            name: 'Check for Updates',
            description: 'Manually check if a new version of AnymeX is available.',
            type: 'button',
          },
          {
            name: 'Enable Beta Updates',
            description: 'Opt in to receive beta/pre-release updates.',
            type: 'toggle',
          },
        ],
      },
    ],
  },

  // ============ 13. anilist ============
  {
    slug: 'anilist',
    name: 'AniList API Settings',
    description: 'Configure AniList integration including title language, scoring, lists, and profile settings.',
    icon: 'Key',
    color: 'text-blue-400',
    path: ['Profile', 'Settings', 'AniList Settings'],
    sections: [
      {
        title: 'Anime & Manga',
        items: [
          {
            name: 'Title Language',
            description: 'Preferred language for anime/manga titles displayed throughout the app.',
            type: 'selector',
            options: ['Romaji', 'English', 'Native'],
          },
          {
            name: 'Staff Name Language',
            description: 'Preferred language for staff (voice actor, director, etc.) names.',
            type: 'selector',
            options: ['Romaji (Western order)', 'Romaji', 'Native'],
          },
          {
            name: 'Activity Merge Time',
            description: 'Time window within which consecutive activities are merged into one.',
            type: 'selector',
            options: ['6h', '12h', '1d', '2d', '3d', '1w', '2w', 'Always'],
          },
          {
            name: 'Airing Notifications',
            description: 'Receive notifications when tracked anime episodes air.',
            type: 'toggle',
          },
          {
            name: '18+ Content',
            description: 'Allow 18+ content to appear in your AniList feed and results.',
            type: 'toggle',
          },
        ],
      },
      {
        title: 'List Options',
        items: [
          {
            name: 'Scoring System',
            description: 'Choose how you score anime and manga on your lists.',
            type: 'selector',
            options: ['100 Point', '10 Decimal', '10 Point', '5 Star', '3 Smiley'],
          },
          {
            name: 'Default List Order',
            description: 'Default sorting for your anime/manga lists.',
            type: 'selector',
            options: ['Score', 'Title', 'Last Updated', 'Last Added'],
          },
          {
            name: 'Split Completed Anime',
            description: 'Show completed anime in a separate section of your list.',
            type: 'toggle',
          },
          {
            name: 'Split Completed Manga',
            description: 'Show completed manga in a separate section of your list.',
            type: 'toggle',
          },
          {
            name: 'Custom Lists',
            description: 'Create and manage custom list categories beyond the default ones.',
            type: 'editor',
          },
          {
            name: 'Section Order',
            description: 'Drag and drop to reorder how list sections appear.',
            type: 'reorderable',
          },
        ],
      },
      {
        title: 'Other',
        items: [
          {
            name: 'Restrict Messages',
            description: 'Restrict who can send you messages on AniList.',
            type: 'toggle',
          },
          {
            name: 'Timezone',
            description: 'Set your timezone for accurate airing schedule and activity timestamps.',
            type: 'selector',
          },
          {
            name: 'About / Bio',
            description: 'Edit your AniList profile about section. Supports Markdown formatting.',
            type: 'editor',
          },
          {
            name: 'Save',
            description: 'Save all AniList settings changes to your profile.',
            type: 'button',
          },
        ],
      },
    ],
  },

  // ============ 14. extension-manager ============
  {
    slug: 'extension-manager',
    name: 'Extension Manager (Plugin)',
    description: 'Plugin status, installation, version management, and rollback options.',
    icon: 'Puzzle',
    color: 'text-yellow-400',
    path: ['Profile', 'Settings', 'Extensions', 'Settings'],
    sections: [
      {
        title: 'Plugin Status',
        items: [
          {
            name: 'Status Card',
            description: 'Displays the current plugin version, release title, storage usage, and bridge ready status.',
            type: 'info',
          },
        ],
      },
      {
        title: 'Installation',
        items: [
          {
            name: 'Download / Update Plugin',
            description: 'Download the latest version of the extension plugin or update if already installed.',
            type: 'button',
          },
          {
            name: 'Load from Storage',
            description: 'Load a plugin file from local storage instead of downloading.',
            type: 'button',
            platform: 'Android only',
          },
          {
            name: 'Force Re-download',
            description: 'Force a fresh download of the plugin, bypassing any cache.',
            type: 'button',
            warning: 'Requires app restart after re-downloading.',
          },
          {
            name: 'Rollback Version',
            description: 'Select and install any previous version of the plugin from the release history.',
            type: 'button',
            warning: 'Requires app restart after rolling back.',
          },
        ],
      },
    ],
  },

  // ============ 15. tap-zones ============
  {
    slug: 'tap-zones',
    name: 'Tap Zones',
    description: 'Configure tap zone actions for the manga reader in both paged and webtoon modes.',
    icon: 'Hand',
    color: 'text-teal-400',
    path: ['Profile', 'Settings'],
    sections: [
      {
        title: 'Configuration',
        items: [
          {
            name: 'Reader Mode',
            description: 'Choose which reader mode to configure tap zones for.',
            type: 'selector',
            options: ['Paged', 'Webtoon'],
          },
          {
            name: 'Orientation',
            description: 'Choose the screen orientation to configure tap zones for.',
            type: 'selector',
            options: ['Horizontal', 'Vertical'],
          },
          {
            name: 'Enable Tap Zones',
            description: 'Enable or disable tap zone actions in the reader.',
            type: 'toggle',
          },
          {
            name: 'Zone Editor',
            description: 'Visually assign actions to different screen zones. Available actions: Next Page, Prev Page, Toggle Menu, Scroll Up, Scroll Down, Next Chapter, Prev Chapter, None.',
            type: 'editor',
            options: ['Next Page', 'Prev Page', 'Toggle Menu', 'Scroll Up', 'Scroll Down', 'Next Chapter', 'Prev Chapter', 'None'],
          },
        ],
      },
    ],
  },
]
