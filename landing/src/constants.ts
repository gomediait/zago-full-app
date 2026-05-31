// ──────────────────────────────────────────────────────────────
//  Landing page — Cấu hình dùng chung — Go Media Vietnam
//
//  ⚠️  Khi nâng cấp phiên bản, CHỈ CẦN SỬA APP_VERSION ở đây.
//  Tất cả nút tải xuống sẽ tự cập nhật URL.
// ──────────────────────────────────────────────────────────────

/** Phiên bản hiện tại — đồng bộ với package.json root */
export const APP_VERSION = '1.0.8';

const GH_RELEASES = 'https://github.com/gomediait/zago-full-app/releases';
const GH_LATEST   = `${GH_RELEASES}/latest/download`;

/** Trang releases GitHub */
export const RELEASES_URL = GH_RELEASES;

/** Trang GitHub repo */
export const GITHUB_URL = 'https://gonetwork.vn';

/** Windows — NSIS installer */
export const DOWNLOAD_FILENAME      = `Zago Care-Setup-${APP_VERSION}.exe`;
export const DOWNLOAD_URL           = RELEASES_URL;

/** macOS — Apple Silicon (M1/M2/M3) */
export const DOWNLOAD_FILENAME_MAC_ARM64 = `Zago Care-${APP_VERSION}-arm64.dmg`;
export const DOWNLOAD_URL_MAC_ARM64      = RELEASES_URL;

/** macOS — Intel (x64) */
export const DOWNLOAD_FILENAME_MAC_X64 = `Zago Care-${APP_VERSION}.dmg`;
export const DOWNLOAD_URL_MAC_X64      = RELEASES_URL;
