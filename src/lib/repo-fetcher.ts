/**
 * Repo Fetcher — Fetches extension data directly from original repo JSONs.
 * Each platform has its own JSON format. We parse them all and return
 * a unified list with ALL original fields preserved.
 */

// ============ REPO CONFIG ============

export interface RepoConfig {
  platform: string
  repoName: string
  url: string
  autoInstall?: string
  allInOneAutoInstall?: string
  fileType?: string
}

// ============ MANGAYOMI ITEM TYPE MAP ============
const MANGAYOMI_ITEM_TYPE_MAP: Record<number, string> = {
  0: 'manga',
  1: 'anime',
  2: 'novels',
}

export const REPO_CONFIGS: RepoConfig[] = [
  // === Aniyomi ===
  { platform: 'aniyomi', repoName: 'Yūzōnō', url: 'https://raw.githubusercontent.com/yuzono/anime-repo/repo/index.min.json', autoInstall: 'aniyomi://add-repo?url=https://raw.githubusercontent.com/yuzono/anime-repo/repo/index.min.json' },
  { platform: 'aniyomi', repoName: 'Secozzi', url: 'https://raw.githubusercontent.com/Secozzi/aniyomi-extensions/refs/heads/repo/index.min.json', autoInstall: 'aniyomi://add-repo?url=https://raw.githubusercontent.com/Secozzi/aniyomi-extensions/refs/heads/repo/index.min.json' },
  { platform: 'aniyomi', repoName: 'Claudemirovsky', url: 'https://raw.githubusercontent.com/Claudemirovsky/cursedyomi-extensions/repo/index.min.json', autoInstall: 'aniyomi://add-repo?url=https://raw.githubusercontent.com/Claudemirovsky/cursedyomi-extensions/repo/index.min.json' },
  { platform: 'aniyomi', repoName: 'hollow', url: 'https://codeberg.org/hollow/aniyomi-extensions-fr/media/branch/repo/index.min.json', autoInstall: 'aniyomi://add-repo?url=https://codeberg.org/hollow/aniyomi-extensions-fr/media/branch/repo/index.min.json' },

  // === Mihon ===
  { platform: 'mihon', repoName: 'Keiyoushi', url: 'https://raw.githubusercontent.com/keiyoushi/extensions/repo/index.min.json', autoInstall: 'tachiyomi://add-repo?url=https://raw.githubusercontent.com/keiyoushi/extensions/repo/index.min.json' },
  { platform: 'mihon', repoName: 'Yūzōnō', url: 'https://raw.githubusercontent.com/yuzono/manga-repo/repo/index.min.json', autoInstall: 'tachiyomi://add-repo?url=https://raw.githubusercontent.com/yuzono/manga-repo/repo/index.min.json' },
  { platform: 'mihon', repoName: 'Fucked by FAKKU', url: 'https://raw.githubusercontent.com/mojuru/cursed-manga-repo/repo/index.min.json', autoInstall: 'tachiyomi://add-repo?url=https://raw.githubusercontent.com/mojuru/cursed-manga-repo/repo/index.min.json' },
  { platform: 'mihon', repoName: 'Kavita', url: 'https://raw.githubusercontent.com/Kareadita/tach-extension/repo/index.min.json', autoInstall: 'tachiyomi://add-repo?url=https://raw.githubusercontent.com/Kareadita/tach-extension/repo/index.min.json' },
  { platform: 'mihon', repoName: 'Suwayomi', url: 'https://raw.githubusercontent.com/Suwayomi/tachiyomi-extension/repo/index.min.json', autoInstall: 'tachiyomi://add-repo?url=https://raw.githubusercontent.com/Suwayomi/tachiyomi-extension/repo/index.min.json' },
  { platform: 'mihon', repoName: 'copymanga-copy20', url: 'https://raw.githubusercontent.com/LittleSurvival/copymanga-copy20/repo/index.min.json', autoInstall: 'tachiyomi://add-repo?url=https://raw.githubusercontent.com/LittleSurvival/copymanga-copy20/repo/index.min.json' },

  // === Mangayomi ===
  { platform: 'mangayomi', repoName: 'Kodjo', url: 'https://kodjodevf.github.io/mangayomi-extensions/index.json',
    autoInstall: 'mangayomi://add-repo?manga_url=https://kodjodevf.github.io/mangayomi-extensions/index.json',
    allInOneAutoInstall: 'mangayomi://add-repo?repo_name=mangayomi-extensions&repo_url=https://github.com/kodjodevf/mangayomi-extensions&manga_url=https://kodjodevf.github.io/mangayomi-extensions/index.json&novel_url=https://kodjodevf.github.io/mangayomi-extensions/novel_index.json',
    fileType: 'manga' },
  { platform: 'mangayomi', repoName: 'Kodjo', url: 'https://kodjodevf.github.io/mangayomi-extensions/novel_index.json',
    autoInstall: 'mangayomi://add-repo?novel_url=https://kodjodevf.github.io/mangayomi-extensions/novel_index.json',
    allInOneAutoInstall: 'mangayomi://add-repo?repo_name=mangayomi-extensions&repo_url=https://github.com/kodjodevf/mangayomi-extensions&manga_url=https://kodjodevf.github.io/mangayomi-extensions/index.json&novel_url=https://kodjodevf.github.io/mangayomi-extensions/novel_index.json',
    fileType: 'novels' },

  { platform: 'mangayomi', repoName: 'm2k3a', url: 'https://m2k3a.github.io/mangayomi-extensions/index.json',
    autoInstall: 'mangayomi://add-repo?manga_url=https://m2k3a.github.io/mangayomi-extensions/index.json',
    allInOneAutoInstall: 'mangayomi://add-repo?repo_name=mangayomi-extensions&repo_url=https://github.com/m2k3a/mangayomi-extensions&manga_url=https://m2k3a.github.io/mangayomi-extensions/index.json&anime_url=https://m2k3a.github.io/mangayomi-extensions/anime_index.json&novel_url=https://m2k3a.github.io/mangayomi-extensions/novel_index.json',
    fileType: 'manga' },
  { platform: 'mangayomi', repoName: 'm2k3a', url: 'https://m2k3a.github.io/mangayomi-extensions/anime_index.json',
    autoInstall: 'mangayomi://add-repo?anime_url=https://m2k3a.github.io/mangayomi-extensions/anime_index.json',
    allInOneAutoInstall: 'mangayomi://add-repo?repo_name=mangayomi-extensions&repo_url=https://github.com/m2k3a/mangayomi-extensions&manga_url=https://m2k3a.github.io/mangayomi-extensions/index.json&anime_url=https://m2k3a.github.io/mangayomi-extensions/anime_index.json&novel_url=https://m2k3a.github.io/mangayomi-extensions/novel_index.json',
    fileType: 'anime' },
  { platform: 'mangayomi', repoName: 'm2k3a', url: 'https://m2k3a.github.io/mangayomi-extensions/novel_index.json',
    autoInstall: 'mangayomi://add-repo?novel_url=https://m2k3a.github.io/mangayomi-extensions/novel_index.json',
    allInOneAutoInstall: 'mangayomi://add-repo?repo_name=mangayomi-extensions&repo_url=https://github.com/m2k3a/mangayomi-extensions&manga_url=https://m2k3a.github.io/mangayomi-extensions/index.json&anime_url=https://m2k3a.github.io/mangayomi-extensions/anime_index.json&novel_url=https://m2k3a.github.io/mangayomi-extensions/novel_index.json',
    fileType: 'novels' },

  { platform: 'mangayomi', repoName: 'Swakshan', url: 'https://raw.githubusercontent.com/Swakshan/mangayomi-swak-extensions/refs/heads/main/index.json',
    autoInstall: 'mangayomi://add-repo?manga_url=https://raw.githubusercontent.com/Swakshan/mangayomi-swak-extensions/refs/heads/main/index.json',
    allInOneAutoInstall: 'mangayomi://add-repo?repo_name=Mangayomi%20Swak%20Extensions&repo_url=https://github.com/Swakshan/mangayomi-swak-extensions&manga_url=https://raw.githubusercontent.com/Swakshan/mangayomi-swak-extensions/refs/heads/main/index.json&anime_url=https://raw.githubusercontent.com/Swakshan/mangayomi-swak-extensions/refs/heads/main/anime_index.json&novel_url=https://raw.githubusercontent.com/Swakshan/mangayomi-swak-extensions/refs/heads/main/novel_index.json',
    fileType: 'manga' },
  { platform: 'mangayomi', repoName: 'Swakshan', url: 'https://raw.githubusercontent.com/Swakshan/mangayomi-swak-extensions/refs/heads/main/anime_index.json',
    autoInstall: 'mangayomi://add-repo?anime_url=https://raw.githubusercontent.com/Swakshan/mangayomi-swak-extensions/refs/heads/main/anime_index.json',
    allInOneAutoInstall: 'mangayomi://add-repo?repo_name=Mangayomi%20Swak%20Extensions&repo_url=https://github.com/Swakshan/mangayomi-swak-extensions&manga_url=https://raw.githubusercontent.com/Swakshan/mangayomi-swak-extensions/refs/heads/main/index.json&anime_url=https://raw.githubusercontent.com/Swakshan/mangayomi-swak-extensions/refs/heads/main/anime_index.json&novel_url=https://raw.githubusercontent.com/Swakshan/mangayomi-swak-extensions/refs/heads/main/novel_index.json',
    fileType: 'anime' },
  { platform: 'mangayomi', repoName: 'Swakshan', url: 'https://raw.githubusercontent.com/Swakshan/mangayomi-swak-extensions/refs/heads/main/novel_index.json',
    autoInstall: 'mangayomi://add-repo?novel_url=https://raw.githubusercontent.com/Swakshan/mangayomi-swak-extensions/refs/heads/main/novel_index.json',
    allInOneAutoInstall: 'mangayomi://add-repo?repo_name=Mangayomi%20Swak%20Extensions&repo_url=https://github.com/Swakshan/mangayomi-swak-extensions&manga_url=https://raw.githubusercontent.com/Swakshan/mangayomi-swak-extensions/refs/heads/main/index.json&anime_url=https://raw.githubusercontent.com/Swakshan/mangayomi-swak-extensions/refs/heads/main/anime_index.json&novel_url=https://raw.githubusercontent.com/Swakshan/mangayomi-swak-extensions/refs/heads/main/novel_index.json',
    fileType: 'novels' },

  { platform: 'mangayomi', repoName: 'Schnitzel5', url: 'https://raw.githubusercontent.com/Schnitzel5/sugoi-modules/refs/heads/main/index.json',
    autoInstall: 'mangayomi://add-repo?manga_url=https://raw.githubusercontent.com/Schnitzel5/sugoi-modules/refs/heads/main/index.json',
    allInOneAutoInstall: 'mangayomi://add-repo?anime_url=https://raw.githubusercontent.com/Schnitzel5/sugoi-modules/refs/heads/main/anime_index.json&manga_url=https://raw.githubusercontent.com/Schnitzel5/sugoi-modules/refs/heads/main/index.json&novel_url=https://raw.githubusercontent.com/Schnitzel5/sugoi-modules/refs/heads/main/novel_index.json',
    fileType: 'manga' },
  { platform: 'mangayomi', repoName: 'Schnitzel5', url: 'https://raw.githubusercontent.com/Schnitzel5/sugoi-modules/refs/heads/main/anime_index.json',
    autoInstall: 'mangayomi://add-repo?anime_url=https://raw.githubusercontent.com/Schnitzel5/sugoi-modules/refs/heads/main/anime_index.json',
    allInOneAutoInstall: 'mangayomi://add-repo?anime_url=https://raw.githubusercontent.com/Schnitzel5/sugoi-modules/refs/heads/main/anime_index.json&manga_url=https://raw.githubusercontent.com/Schnitzel5/sugoi-modules/refs/heads/main/index.json&novel_url=https://raw.githubusercontent.com/Schnitzel5/sugoi-modules/refs/heads/main/novel_index.json',
    fileType: 'anime' },
  { platform: 'mangayomi', repoName: 'Schnitzel5', url: 'https://raw.githubusercontent.com/Schnitzel5/sugoi-modules/refs/heads/main/novel_index.json',
    autoInstall: 'mangayomi://add-repo?novel_url=https://raw.githubusercontent.com/Schnitzel5/sugoi-modules/refs/heads/main/novel_index.json',
    allInOneAutoInstall: 'mangayomi://add-repo?anime_url=https://raw.githubusercontent.com/Schnitzel5/sugoi-modules/refs/heads/main/anime_index.json&manga_url=https://raw.githubusercontent.com/Schnitzel5/sugoi-modules/refs/heads/main/index.json&novel_url=https://raw.githubusercontent.com/Schnitzel5/sugoi-modules/refs/heads/main/novel_index.json',
    fileType: 'novels' },

  { platform: 'mangayomi', repoName: 'Gato404', url: 'https://raw.githubusercontent.com/gato404/kegareta-sauces/refs/heads/main/index.json',
    autoInstall: 'mangayomi://add-repo?manga_url=https://raw.githubusercontent.com/gato404/kegareta-sauces/refs/heads/main/index.json',
    allInOneAutoInstall: 'mangayomi://add-repo?repo_name=kegareta-sauces&repo_url=https://github.com/gato404/kegareta-sauces&manga_url=https://raw.githubusercontent.com/gato404/kegareta-sauces/refs/heads/main/index.json&anime_url=https://raw.githubusercontent.com/gato404/kegareta-sauces/refs/heads/main/anime_index.json',
    fileType: 'manga' },
  { platform: 'mangayomi', repoName: 'Gato404', url: 'https://raw.githubusercontent.com/gato404/kegareta-sauces/refs/heads/main/anime_index.json',
    autoInstall: 'mangayomi://add-repo?anime_url=https://raw.githubusercontent.com/gato404/kegareta-sauces/refs/heads/main/anime_index.json',
    allInOneAutoInstall: 'mangayomi://add-repo?repo_name=kegareta-sauces&repo_url=https://github.com/gato404/kegareta-sauces&manga_url=https://raw.githubusercontent.com/gato404/kegareta-sauces/refs/heads/main/index.json&anime_url=https://raw.githubusercontent.com/gato404/kegareta-sauces/refs/heads/main/anime_index.json',
    fileType: 'anime' },

  // === Sora (no deep links — copy URL only) ===
  { platform: 'sora', repoName: '50n50', url: 'https://raw.githubusercontent.com/Shebyyy/sources-dart/main/anymex/50n50/anime.json', fileType: 'anime' },
  { platform: 'sora', repoName: '50n50', url: 'https://raw.githubusercontent.com/Shebyyy/sources-dart/main/anymex/50n50/manga.json', fileType: 'manga' },
  { platform: 'sora', repoName: '50n50', url: 'https://raw.githubusercontent.com/Shebyyy/sources-dart/main/anymex/50n50/novels.json', fileType: 'novels' },
  { platform: 'sora', repoName: '50n50', url: 'https://raw.githubusercontent.com/Shebyyy/sources-dart/main/anymex/50n50/other.json', fileType: 'other' },
  { platform: 'sora', repoName: 'ibro', url: 'https://raw.githubusercontent.com/Shebyyy/sources-dart/main/anymex/ibro/anime.json', fileType: 'anime' },
  { platform: 'sora', repoName: 'ibro', url: 'https://raw.githubusercontent.com/Shebyyy/sources-dart/main/anymex/ibro/novels.json', fileType: 'novels' },
  { platform: 'sora', repoName: 'mxfia19', url: 'https://raw.githubusercontent.com/Shebyyy/sources-dart/main/anymex/mxfia19/anime.json', fileType: 'anime' },
  { platform: 'sora', repoName: 'mxfia19', url: 'https://raw.githubusercontent.com/Shebyyy/sources-dart/main/anymex/mxfia19/other.json', fileType: 'other' },
  { platform: 'sora', repoName: 'cufiy', url: 'https://raw.githubusercontent.com/Shebyyy/sources-dart/main/anymex/cufiy/anime.json', fileType: 'anime' },
  { platform: 'sora', repoName: 'cufiy', url: 'https://raw.githubusercontent.com/Shebyyy/sources-dart/main/anymex/cufiy/other.json', fileType: 'other' },
  { platform: 'sora', repoName: 'emp0ry', url: 'https://raw.githubusercontent.com/Shebyyy/sources-dart/main/anymex/emp0ry/anime.json', fileType: 'anime' },
  { platform: 'sora', repoName: 'cprmichel', url: 'https://raw.githubusercontent.com/Shebyyy/sources-dart/main/anymex/cprmichel/anime.json', fileType: 'anime' },
  { platform: 'sora', repoName: 'mxfia19-twitch', url: 'https://raw.githubusercontent.com/Shebyyy/sources-dart/main/anymex/mxfia19-twitch/other.json', fileType: 'other' },
  { platform: 'sora', repoName: 'xdfkenny', url: 'https://raw.githubusercontent.com/Shebyyy/sources-dart/main/anymex/xdfkenny/anime.json', fileType: 'anime' },
  { platform: 'sora', repoName: 'ylruhc', url: 'https://raw.githubusercontent.com/Shebyyy/sources-dart/main/anymex/ylruhc/anime.json', fileType: 'anime' },
  { platform: 'sora', repoName: 'soony5', url: 'https://raw.githubusercontent.com/Shebyyy/sources-dart/main/anymex/soony5/novels.json', fileType: 'novels' },
  { platform: 'sora', repoName: 'justbbcr', url: 'https://raw.githubusercontent.com/Shebyyy/sources-dart/main/anymex/justbbcr/anime.json', fileType: 'anime' },

  // === CloudStream ===
  { platform: 'cloudstream', repoName: 'CakesTwix', url: 'https://raw.githubusercontent.com/CakesTwix/cloudstream-extensions-uk/master/repo.json', autoInstall: 'cloudstreamrepo://raw.githubusercontent.com/CakesTwix/cloudstream-extensions-uk/master/repo.json' },
  { platform: 'cloudstream', repoName: 'CloudX', url: 'https://raw.githubusercontent.com/Asm0d3usX/CloudX/builds/repo.json', autoInstall: 'cloudstreamrepo://raw.githubusercontent.com/Asm0d3usX/CloudX/builds/repo.json' },
  { platform: 'cloudstream', repoName: 'CSX', url: 'https://raw.githubusercontent.com/SaurabhKaperwan/CSX/builds/CS.json', autoInstall: 'cloudstreamrepo://raw.githubusercontent.com/SaurabhKaperwan/CSX/builds/CS.json' },
  { platform: 'cloudstream', repoName: 'CuxPlug', url: 'https://raw.githubusercontent.com/ycngmn/CuxPlug/refs/heads/main/repo.json', autoInstall: 'cloudstreamrepo://raw.githubusercontent.com/ycngmn/CuxPlug/refs/heads/main/repo.json' },
  { platform: 'cloudstream', repoName: 'doGior', url: 'https://raw.githubusercontent.com/doGior/doGiorsHadEnough/refs/heads/builds/repo.json', autoInstall: 'cloudstreamrepo://raw.githubusercontent.com/doGior/doGiorsHadEnough/refs/heads/builds/repo.json' },
  { platform: 'cloudstream', repoName: 'Gian-Fr', url: 'https://raw.githubusercontent.com/Gian-Fr/ItalianProvider/builds/repo.json', autoInstall: 'cloudstreamrepo://raw.githubusercontent.com/Gian-Fr/ItalianProvider/builds/repo.json' },
  { platform: 'cloudstream', repoName: 'Kraptor', url: 'https://raw.githubusercontent.com/Kraptor123/cs-kraptor/refs/heads/master/repo.json', autoInstall: 'cloudstreamrepo://raw.githubusercontent.com/Kraptor123/cs-kraptor/refs/heads/master/repo.json' },
  { platform: 'cloudstream', repoName: 'NetMirror', url: 'https://raw.githubusercontent.com/Sushan64/NetMirror-Extension/refs/heads/builds/Netflix.json', autoInstall: 'cloudstreamrepo://raw.githubusercontent.com/Sushan64/NetMirror-Extension/refs/heads/builds/Netflix.json' },
  { platform: 'cloudstream', repoName: 'Phisher', url: 'https://raw.githubusercontent.com/phisher98/cloudstream-extensions-phisher/refs/heads/builds/repo.json', autoInstall: 'cloudstreamrepo://raw.githubusercontent.com/phisher98/cloudstream-extensions-phisher/refs/heads/builds/repo.json' },
  { platform: 'cloudstream', repoName: 'Redowan', url: 'https://raw.githubusercontent.com/redowan99/Redowan-CloudStream/master/repo.json', autoInstall: 'cloudstreamrepo://raw.githubusercontent.com/redowan99/Redowan-CloudStream/master/repo.json' },
  { platform: 'cloudstream', repoName: 'Tearrs', url: 'https://gitlab.com/tearrs/cloudstream-vietnamese/-/raw/main/repo.json', autoInstall: 'cloudstreamrepo://gitlab.com/tearrs/cloudstream-vietnamese/-/raw/main/repo.json' },
  { platform: 'cloudstream', repoName: 'zzikozz', url: 'https://codeberg.org/zzikozz/frencharchive/raw/branch/Release/repo.json', autoInstall: 'cloudstreamrepo://codeberg.org/zzikozz/frencharchive/raw/branch/Release/repo.json' },

  // === LNReader ===
  { platform: 'lnreader', repoName: 'Official', url: 'https://raw.githubusercontent.com/LNReader/lnreader-plugins/plugins/v3.0.0/.dist/plugins.min.json', autoInstall: 'mangayomi://add-repo?novel_url=https://raw.githubusercontent.com/LNReader/lnreader-plugins/plugins/v3.0.0/.dist/plugins.min.json' },
]

// ============ UNIFIED EXTENSION TYPE ============

export interface UnifiedExtension {
  _platform: string
  _repo: string
  _repoUrl: string
  _autoInstall: string
  _allInOneAutoInstall: string
  _fileType: string
  _manifestUrl: string
  _anymexType: string
  _allTypes: string[]

  name: string
  icon: string
  language: string
  langBase: string
  languages: string[]
  type: string
  version: string
  author: string

  [key: string]: unknown
}

// ============ LANGUAGE MAPPING ============
const LANG_MAP: Record<string, string> = {
  'ar': 'Arabic', 'bg': 'Bulgarian', 'bn': 'Bengali', 'br': 'Breton', 'ca': 'Catalan',
  'cs': 'Czech', 'da': 'Danish', 'de': 'German', 'el': 'Greek', 'en': 'English',
  'es': 'Spanish', 'fa': 'Persian', 'fi': 'Finnish', 'fr': 'French', 'he': 'Hebrew',
  'hi': 'Hindi', 'hu': 'Hungarian', 'id': 'Indonesian', 'it': 'Italian', 'ja': 'Japanese',
  'ko': 'Korean', 'lt': 'Lithuanian', 'lv': 'Latvian', 'mn': 'Mongolian', 'ms': 'Malay',
  'nl': 'Dutch', 'no': 'Norwegian', 'pl': 'Polish', 'pt': 'Portuguese', 'pt-BR': 'Portuguese',
  'ro': 'Romanian', 'ru': 'Russian', 'sk': 'Slovak', 'sv': 'Swedish', 'th': 'Thai',
  'tr': 'Turkish', 'uk': 'Ukrainian', 'vi': 'Vietnamese', 'zh': 'Chinese',
  'zh-Hans': 'Chinese', 'zh-Hant': 'Chinese', 'zh-CN': 'Chinese', 'zh-TW': 'Chinese',
  'jv': 'Javanese', 'ceb': 'Cebuano', 'eo': 'Esperanto', 'et': 'Estonian',
  'kr': 'Korean', 'cn': 'Chinese', 'all': 'All',
}

function getLangBase(lang: string): string {
  if (!lang) return 'Unknown'
  const firstWord = lang.split(/[\s(]/)[0]
  if (LANG_MAP[firstWord]) return LANG_MAP[firstWord]
  if (LANG_MAP[lang]) return LANG_MAP[lang]
  if (lang.length > 3 && lang[0] === lang[0].toUpperCase()) return firstWord
  return firstWord || lang
}

// ============ PARSERS ============

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, next: { revalidate: 3600 } })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.json()
}

function parseMihonFormat(data: unknown, config: RepoConfig): UnifiedExtension[] {
  if (!Array.isArray(data)) return []
  const results: UnifiedExtension[] = []

  for (const pkg of data) {
    if (typeof pkg !== 'object' || !pkg) continue
    const p = pkg as Record<string, unknown>
    const pkgVersion = String(p.version || '')
    const pkgCode = p.code
    const pkgName = String(p.pkg || '')
    const sources = p.sources

    if (!Array.isArray(sources)) continue

    const baseUrl = config.url.replace(/\/index\.min\.json$/, '')
    const icon = pkgName ? `${baseUrl}/icon/${pkgName}.png` : ''

    const allLangs: string[] = []
    const allLangBases: string[] = []
    const firstSource = sources[0] as Record<string, unknown> | undefined
    const name = String(firstSource?.name || '')
    const lang = String(firstSource?.lang || '')
    const langBase = getLangBase(lang)

    for (const src of sources) {
      if (typeof src !== 'object' || !src) continue
      const s = src as Record<string, unknown>
      const sLang = String(s.lang || '')
      const sLangBase = getLangBase(sLang)
      if (sLang && !allLangs.includes(sLang)) allLangs.push(sLang)
      if (sLangBase && !allLangBases.includes(sLangBase)) allLangBases.push(sLangBase)
    }

    const author = ''

    const rawType = config.platform === 'aniyomi' ? 'anime' : 'manga'

    const ext: UnifiedExtension = {
      _platform: config.platform,
      _repo: config.repoName,
      _repoUrl: config.url,
      _autoInstall: config.autoInstall || '',
      _allInOneAutoInstall: config.allInOneAutoInstall || '',
      _fileType: config.fileType || '',
      _manifestUrl: '',
      _anymexType: rawType,
      _allTypes: [rawType],

      name,
      icon,
      language: lang,
      langBase,
      languages: allLangBases,
      type: rawType,
      version: pkgVersion,
      author,

      ...p,
      _platform: config.platform,
      _repo: config.repoName,
      _repoUrl: config.url,
      _autoInstall: config.autoInstall || '',
      _allInOneAutoInstall: config.allInOneAutoInstall || '',
      _fileType: config.fileType || '',
      _anymexType: rawType,
      _allTypes: [rawType],
      name,
      icon,
      language: lang,
      langBase,
      languages: allLangBases,
      type: rawType,
      version: pkgVersion,
      author,
    }

    if (pkgCode && !ext.code) ext.code = pkgCode

    if (pkgName && p.apk) {
      ext._manifestUrl = `${baseUrl}/apk/${p.apk}`
    }

    results.push(ext)
  }

  return results
}

function parseMangayomiFormat(data: unknown, config: RepoConfig): UnifiedExtension[] {
  if (!Array.isArray(data)) return []
  const results: UnifiedExtension[] = []

  for (const item of data) {
    if (typeof item !== 'object' || !item) continue
    const s = item as Record<string, unknown>

    const lang = String(s.lang || s.language || '')
    const langBase = getLangBase(lang)
    const name = String(s.name || s.sourceName || '')

    let rawType: string
    if (typeof s.itemType === 'number') {
      rawType = MANGAYOMI_ITEM_TYPE_MAP[s.itemType] || 'manga'
    } else {
      rawType = String(s.itemType || config.fileType || 'manga').toLowerCase()
      if (rawType === 'animes') rawType = 'anime'
      if (rawType === 'mangas') rawType = 'manga'
    }
    const anymexType = mapAnymeXType(rawType)

    const author = typeof s.author === 'string' && s.author ? s.author : ''
    const icon = String(s.iconUrl || s.icon || '')

    const ext: UnifiedExtension = {
      _platform: config.platform,
      _repo: config.repoName,
      _repoUrl: config.url,
      _autoInstall: config.autoInstall || '',
      _allInOneAutoInstall: config.allInOneAutoInstall || '',
      _fileType: config.fileType || rawType,
      _manifestUrl: config.url,
      _anymexType: anymexType,
      _allTypes: [rawType],

      name,
      icon,
      language: lang,
      langBase,
      languages: [langBase],
      type: rawType,
      version: String(s.version || ''),
      author,

      ...s,
      _platform: config.platform,
      _repo: config.repoName,
      _repoUrl: config.url,
      _autoInstall: config.autoInstall || '',
      _allInOneAutoInstall: config.allInOneAutoInstall || '',
      _fileType: config.fileType || rawType,
      _manifestUrl: config.url,
      _anymexType: anymexType,
      _allTypes: [rawType],
      name,
      icon,
      language: lang,
      langBase,
      languages: [langBase],
      type: rawType,
      author,
    }

    results.push(ext)
  }

  return results
}

// Split compound types into individual types
// e.g. "anime/shows/movies" → ["anime", "shows", "movies"]
function splitRawTypes(type: string): string[] {
  const t = type.trim().toLowerCase()
  if (!t) return ['other']
  // Split by slash or comma
  const parts = t.split(/[/,]/).map(s => s.trim()).filter(Boolean)
  // Normalize each part
  return parts.map(p => {
    if (p === 'animes') return 'anime'
    if (p === 'mangas') return 'manga'
    if (p === 'novel' || p === 'light novel' || p === 'light novels') return 'novels'
    return p
  })
}

// Map any raw type to AnymeX tab: anime, manga, novels, other
function mapAnymeXType(type: string): string {
  const t = type.toLowerCase()
  if (t.includes('novel')) return 'novels'
  if (t.includes('manga')) return 'manga'
  if (t.includes('other')) return 'other'
  // Sora: vod/livestream, live/tv, movie/series, tv/movies → other
  if (t.includes('livestream') || t.includes('live/tv') || t.includes('live')) return 'other'
  // Everything else with anime, shows, movies, tv, torrent, cartoon, ova, documentary, etc. → anime
  if (t.includes('anime') || t.includes('movie') || t.includes('show') || t.includes('tv') || t.includes('torrent') || t.includes('cartoon') || t.includes('ova') || t.includes('series') || t.includes('drama') || t.includes('documentary') || t.includes('music') || t.includes('all')) return 'anime'
  // Fallback: anime (streaming is most common)
  return 'anime'
}

function parseSoraFormat(data: unknown, config: RepoConfig): UnifiedExtension[] {
  if (!Array.isArray(data)) return []
  const results: UnifiedExtension[] = []

  for (const item of data) {
    if (typeof item !== 'object' || !item) continue
    const s = item as Record<string, unknown>

    const lang = String(s.language || '')
    const langBase = getLangBase(lang)
    const name = String(s.sourceName || s.name || '')
    const allTypes = splitRawTypes(String(s.type || config.fileType || 'anime'))
    const rawType = allTypes[0]
    const anymexType = mapAnymeXType(rawType)

    let author = ''
    if (typeof s.author === 'string') {
      author = s.author
    } else if (typeof s.author === 'object' && s.author) {
      author = String((s.author as Record<string, unknown>).name || '')
    }

    const icon = String(s.iconUrl || s.iconURL || s.icon || '')
    const scriptUrl = String(s.scriptUrl || s.scriptURL || '')

    let individualJsonUrl = ''
    if (scriptUrl) {
      individualJsonUrl = scriptUrl.replace(/\.js([?#]|$)/, '.json$1')
    }

    // Sora: individual extensions get sora://module deep link, repos don't
    const manifestUrl = individualJsonUrl || scriptUrl || config.url
    const individualAutoInstall = individualJsonUrl ? `sora://module?url=${individualJsonUrl}` : ''

    const ext: UnifiedExtension = {
      _platform: config.platform,
      _repo: config.repoName,
      _repoUrl: config.url,
      _autoInstall: individualAutoInstall,
      _allInOneAutoInstall: '',
      _fileType: config.fileType || rawType,
      _manifestUrl: manifestUrl,
      _anymexType: anymexType,
      _allTypes: allTypes,

      name,
      icon,
      language: lang,
      langBase,
      languages: [langBase],
      type: rawType,
      version: String(s.version || ''),
      author,

      ...s,
      _platform: config.platform,
      _repo: config.repoName,
      _repoUrl: config.url,
      _autoInstall: individualAutoInstall,
      _allInOneAutoInstall: '',
      _fileType: config.fileType || rawType,
      _manifestUrl: manifestUrl,
      _anymexType: anymexType,
      _allTypes: allTypes,
      name,
      icon,
      language: lang,
      langBase,
      languages: [langBase],
      type: rawType,
      author,
    }

    results.push(ext)
  }

  return results
}

async function parseCloudStreamFormat(data: unknown, config: RepoConfig): Promise<UnifiedExtension[]> {
  if (typeof data !== 'object' || !data) return []
  const d = data as Record<string, unknown>
  const results: UnifiedExtension[] = []

  let pluginLists = d.pluginLists
  if (typeof pluginLists === 'string') pluginLists = [pluginLists]
  if (!Array.isArray(pluginLists)) return []

  for (const plistUrl of pluginLists) {
    if (typeof plistUrl !== 'string') continue
    try {
      const plugins = await fetchJson(plistUrl)
      if (!Array.isArray(plugins)) continue

      for (const plugin of plugins) {
        if (typeof plugin !== 'object' || !plugin) continue
        const p = plugin as Record<string, unknown>

        const lang = String(p.language || '')
        const langBase = getLangBase(lang)
        const name = String(p.name || p.internalName || '')
        const tvTypes = Array.isArray(p.tvTypes) ? p.tvTypes : []

        let csIcon = String(p.iconUrl || p.icon || '')
        if (csIcon.includes('%size%')) {
          csIcon = csIcon.replace(/%size%/g, '128')
        }

        // Flatten comma-separated tvTypes (e.g. "Movie,Anime,Cartoon") and split each
        const allTypes = (Array.isArray(p.tvTypes) ? p.tvTypes : [])
          .flatMap((t: unknown) => splitRawTypes(String(t)))
          .filter(Boolean)
        const rawType = allTypes.length > 0 ? allTypes[0] : 'anime'
        const anymexType = mapAnymeXType(rawType)

        const ext: UnifiedExtension = {
          _platform: config.platform,
          _repo: config.repoName,
          _repoUrl: config.url,
          _autoInstall: config.autoInstall || '',
          _allInOneAutoInstall: '',
          _fileType: anymexType,
          _manifestUrl: String(p.url || p.repositoryUrl || ''),
          _anymexType: anymexType,
          _allTypes: allTypes.length > 0 ? allTypes : ['anime'],

          name,
          icon: csIcon,
          language: lang,
          langBase,
          languages: [langBase],
          type: rawType,
          version: String(p.version || ''),
          author: Array.isArray(p.authors) ? p.authors.join(', ') : String(p.authors || ''),

          ...p,
          _platform: config.platform,
          _repo: config.repoName,
          _repoUrl: config.url,
          _autoInstall: config.autoInstall || '',
          _allInOneAutoInstall: '',
          _fileType: anymexType,
          _manifestUrl: String(p.url || p.repositoryUrl || ''),
          _anymexType: anymexType,
          _allTypes: allTypes.length > 0 ? allTypes : ['anime'],
          name,
          icon: csIcon,
          language: lang,
          langBase,
          languages: [langBase],
          type: rawType,
          author: Array.isArray(p.authors) ? p.authors.join(', ') : String(p.authors || ''),
        }

        results.push(ext)
      }
    } catch {
      // Skip failed plugin list fetches
    }
  }

  return results
}

function parseLNReaderFormat(data: unknown, config: RepoConfig): UnifiedExtension[] {
  if (!Array.isArray(data)) return []
  const results: UnifiedExtension[] = []

  for (const item of data) {
    if (typeof item !== 'object' || !item) continue
    const s = item as Record<string, unknown>

    const name = String(s.name || s.label || '')
    const lang = String(s.lang || s.language || 'en')
    const langBase = getLangBase(lang)
    const icon = String(s.iconUrl || s.icon || '')
    const author = String(s.author || '')

    const ext: UnifiedExtension = {
      _platform: config.platform,
      _repo: config.repoName,
      _repoUrl: config.url,
      _autoInstall: config.autoInstall || '',
      _allInOneAutoInstall: '',
      _fileType: 'novels',
      _manifestUrl: String(s.url || s.id || ''),
      _anymexType: 'novels',
      _allTypes: ['novels'],

      name,
      icon,
      language: lang,
      langBase,
      languages: [langBase],
      type: 'novels',
      version: String(s.version || ''),
      author,

      ...s,
      _platform: config.platform,
      _repo: config.repoName,
      _repoUrl: config.url,
      _autoInstall: config.autoInstall || '',
      _allInOneAutoInstall: '',
      _fileType: 'novels',
      _manifestUrl: String(s.url || s.id || ''),
      _anymexType: 'novels',
      _allTypes: ['novels'],
      name,
      icon,
      language: lang,
      langBase,
      languages: [langBase],
      type: 'novels',
      author,
    }

    results.push(ext)
  }

  return results
}

// ============ KOTATSU FETCHER ============

let cachedKotatsu: UnifiedExtension[] | null = null
let cachedKotatsuAt = 0
const KOTATSU_CACHE_TTL = 30 * 60 * 1000

export async function fetchKotatsuReleases(forceRefresh = false): Promise<UnifiedExtension[]> {
  if (!forceRefresh && cachedKotatsu && Date.now() - cachedKotatsuAt < KOTATSU_CACHE_TTL) {
    return cachedKotatsu
  }

  const KOTATSU_SOURCES = [
    { repo: 'mochi-plugins/repository', url: 'https://api.github.com/repos/mochi-plugins/repository/releases/latest', repoUrl: 'https://github.com/mochi-plugins/repository' },
    { repo: 'dragonx943/manga-repo', url: 'https://api.github.com/repos/dragonx943/manga-repo/releases/latest', repoUrl: 'https://github.com/dragonx943/manga-repo' },
    { repo: 'InvalidDavid/UMA', url: 'https://api.github.com/repos/InvalidDavid/UMA/releases/latest', repoUrl: 'https://github.com/InvalidDavid/UMA' },
    { repo: 'Shebyyy/kotatsu-multi-parsers', url: 'https://api.github.com/repos/Shebyyy/kotatsu-multi-parsers/releases/latest', repoUrl: 'https://github.com/Shebyyy/kotatsu-multi-parsers' },
  ]

  const allResults: UnifiedExtension[] = []

  const promises = KOTATSU_SOURCES.map(async (source) => {
    try {
      const res = await fetch(source.url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        next: { revalidate: 3600 },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const release = await res.json() as {
        tag_name?: string
        name?: string
        published_at?: string
        assets?: { name: string; browser_download_url: string; size: number }[]
      }

      const assets = release.assets || []
      const jarAssets = assets.filter(a => a.name.endsWith('.jar'))

      return jarAssets.map(asset => {
        const nameWithoutExt = asset.name.replace(/\.jar$/, '')
        const sizeMB = (asset.size / (1024 * 1024)).toFixed(1)

        return {
          _platform: 'kotatsu',
          _repo: source.repo === 'Shebyyy/kotatsu-multi-parsers' ? nameWithoutExt : source.repo,
          _repoUrl: source.repoUrl,
          _autoInstall: '',
          _allInOneAutoInstall: '',
          _fileType: 'manga',
          _manifestUrl: asset.browser_download_url,
          _anymexType: 'manga',
          _allTypes: ['manga'],

          name: nameWithoutExt,
          icon: 'https://raw.githubusercontent.com/KotatsuApp/Kotatsu/devel/metadata/en-US/icon.png',
          language: 'Multi',
          langBase: 'Multi',
          languages: ['Multi'],
          type: 'manga',
          version: release.tag_name || '',
          author: source.repo,

          baseUrl: asset.browser_download_url,
          fileSize: sizeMB,
          jarUrl: asset.browser_download_url,
        } as UnifiedExtension
      })
    } catch (err) {
      console.error(`Failed to fetch Kotatsu releases from ${source.repo}:`, err)
      return []
    }
  })

  const results = await Promise.all(promises)
  for (const exts of results) {
    allResults.push(...exts)
  }

  cachedKotatsu = allResults
  cachedKotatsuAt = Date.now()

  return allResults
}

// ============ MAIN FETCHER ============

let cachedExtensions: UnifiedExtension[] | null = null
let cachedAt = 0
const CACHE_TTL = 30 * 60 * 1000

export async function fetchAllExtensions(forceRefresh = false): Promise<UnifiedExtension[]> {
  if (!forceRefresh && cachedExtensions && Date.now() - cachedAt < CACHE_TTL) {
    return cachedExtensions
  }

  const allExtensions: UnifiedExtension[] = []

  const promises = REPO_CONFIGS.map(async (config) => {
    try {
      const data = await fetchJson(config.url)
      let extensions: UnifiedExtension[] = []

      switch (config.platform) {
        case 'mihon':
        case 'aniyomi':
          extensions = parseMihonFormat(data, config)
          break
        case 'mangayomi':
          extensions = parseMangayomiFormat(data, config)
          break
        case 'sora':
          extensions = parseSoraFormat(data, config)
          break
        case 'cloudstream':
          extensions = await parseCloudStreamFormat(data, config)
          break
        case 'lnreader':
          extensions = parseLNReaderFormat(data, config)
          break
        default:
          break
      }

      return extensions
    } catch (err) {
      console.error(`Failed to fetch ${config.platform}/${config.repoName}:`, err)
      return []
    }
  })

  const results = await Promise.all(promises)
  for (const exts of results) {
    allExtensions.push(...exts)
  }

  // Fetch Kotatsu JAR releases
  const kotatsuExts = await fetchKotatsuReleases(forceRefresh)
  allExtensions.push(...kotatsuExts)

  cachedExtensions = allExtensions
  cachedAt = Date.now()

  return allExtensions
}
