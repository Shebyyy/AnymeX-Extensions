# AnymeX-Extensions

Browse, search, and install extensions for AnymeX — all platforms, all repos, one place. Supports Sora, Mihon, Aniyomi, Mangayomi, CloudStream, and LNReader with one-click install and deep links.

## Why This Exists

AnymeX supports extensions from multiple platforms — each with their own repos, formats, and install methods. Finding the right extension meant digging through scattered GitHub repositories, README files, and index JSONs across different platforms.

This project brings everything together in one place. No more hopping between repos. No more guessing which platform supports what. Just search, browse, and install.

## What It Does

- **Live data** — Fetches extension lists directly from source repositories, always up to date
- **Search & filter** — Find extensions by name, language, type (anime/manga/novels), or platform
- **One-click install** — Deep links that open AnymeX and add the extension or repo instantly
- **Copy URL** — Grab the manual repo URL for any extension
- **All platforms** — Sora, Mihon, Aniyomi, Mangayomi, CloudStream, and LNReader in one view
- **NSFW toggle** — Hidden by default, opt-in to see everything

## Supported Platforms

| Platform | Type | Install Protocol |
|---|---|---|
| Sora | Anime, Manga, Novels, Movies, Shows | `sora://module?url=` |
| Mihon | Manga | `tachiyomi://add-repo?url=` |
| Aniyomi | Anime | `aniyomi://add-repo?url=` |
| Mangayomi | Anime, Manga, Novels | `mangayomi://add-repo?` |
| CloudStream | Movies, Shows, Anime | `cloudstreamrepo://` |
| LNReader | Novels | `mangayomi://add-repo?novel_url=` |

## Built With

- Next.js
- TypeScript
- Tailwind CSS
