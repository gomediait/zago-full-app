import React, { useState } from 'react';
import { useUpdateStore } from '@/store/updateStore';
import ipc from '@/lib/ipc';

interface VersionEntry {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch' | 'hotfix';
  highlights?: string[];
  changes: {
    category: 'new' | 'improved' | 'fixed' | 'removed' | 'security';
    items: string[];
  }[];
}

// ─── Changelog data — thêm entry mới vào ĐẦU mảng khi có bản cập nhật ────────
const CHANGELOG: VersionEntry[] = [
  {
    version: '1.0.3',
    date: '05/2026',
    type: 'patch',
    highlights: [
      '✨ Tối ưu cơ chế tự động cập nhật',
    ],
    changes: [
      {
        category: 'new',
        items: [
          'Thêm nút kiểm tra phiên bản mới để chủ động cập nhật thay vì đợi hệ thống tự chạy',
          'Hiển thị thông báo trạng thái "Đã ở bản mới nhất" khi không có bản cập nhật mới',
        ],
      },
    ],
  },
  {
    version: '1.0.2',
    date: '05/2026',
    type: 'hotfix',
    highlights: [
      '🐛 Cập nhật danh sách model AI chuẩn xác cho API của Google',
    ],
    changes: [
      {
        category: 'fixed',
        items: [
          'Sửa lỗi "model is not found" khi dùng Gemini API.',
          'Cập nhật danh sách model thành gemini-1.5-pro, gemini-1.5-flash.',
        ],
      },
    ],
  },
  {
    version: '1.0.1',
    date: '05/2026',
    type: 'patch',
    highlights: [
      '✨ Tối ưu hóa giao diện nhận diện thương hiệu Zago Care',
    ],
    changes: [
      {
        category: 'new',
        items: [
          'Thay thế toàn bộ liên kết GitHub thành website chính thức của công ty (gonetwork.vn).',
          'Đồng bộ logo, favicon và tên ứng dụng trên mọi giao diện.',
        ],
      },
    ],
  },
  {
    version: '1.0.0',
    date: '04/2026',
    type: 'major',
    highlights: [
      '🚀 Ra mắt Zago Care — nền tảng desktop vận hành bán hàng và chăm sóc khách hàng trên Zalo trong một ứng dụng duy nhất',
      '👤 Quản lý đa tài khoản Zalo, gộp nhiều tài khoản vào một hộp thư tập trung để xử lý hội thoại nhanh hơn',
      '👥 Tích hợp CRM, Campaign, Workflow, AI, Báo cáo và Tích hợp ngoài để vận hành khép kín ngay trên desktop',
    ],
    changes: [
      {
        category: 'new',
        items: [
          'Ra mắt Dashboard quản lý tài khoản.',
          'Ra mắt tính năng AI tích hợp Gemini, OpenAI, Deepseek.',
        ],
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const TYPE_STYLES: Record<VersionEntry['type'], { label: string; cls: string }> = {
  major:  { label: 'Major',  cls: 'bg-purple-600/30 text-purple-500 border border-purple-500/30' },
  minor:  { label: 'Minor',  cls: 'bg-blue-600/30 text-blue-500 border border-blue-500/30' },
  patch:  { label: 'Patch',  cls: 'bg-gray-600/40 text-gray-500 border border-gray-500/30' },
  hotfix: { label: 'Hotfix', cls: 'bg-red-600/30 text-red-500 border border-red-500/30' },
};

const CATEGORY_STYLES: Record<string, { icon: string; label: string; cls: string }> = {
  new:      { icon: '✨', label: 'Tính năng mới',   cls: 'text-green-400' },
  improved: { icon: '⚡', label: 'Cải thiện',        cls: 'text-blue-400' },
  fixed:    { icon: '🐛', label: 'Sửa lỗi',          cls: 'text-amber-400' },
  removed:  { icon: '🗑️', label: 'Đã xóa',           cls: 'text-red-400' },
  security: { icon: '🔒', label: 'Bảo mật',          cls: 'text-purple-400' },
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function ChangelogSettings() {
  const { status, updateInfo } = useUpdateStore();
  const [expandedVersions, setExpandedVersions] = useState<Set<string>>(
    new Set([CHANGELOG[0]?.version]) // expand latest by default
  );

  const handleCheckUpdate = () => {
    ipc.update?.check();
  };

  const toggle = (version: string) => {
    setExpandedVersions(prev => {
      const next = new Set(prev);
      if (next.has(version)) next.delete(version);
      else next.add(version);
      return next;
    });
  };

  const expandAll = () => setExpandedVersions(new Set(CHANGELOG.map(v => v.version)));
  const collapseAll = () => setExpandedVersions(new Set());

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-white">📋 Log phiên bản</h2>
        <div className="flex gap-2">
          <button onClick={handleCheckUpdate}
            className="text-xs text-blue-400 font-semibold hover:text-blue-300 transition-colors px-3 py-1.5 rounded-lg border border-blue-500/30 hover:bg-blue-900/30">
            {status === 'available' || status === 'downloading' ? 'Đang tải bản mới...' : status === 'not-available' ? '✅ Đã ở bản mới nhất' : '🔄 Kiểm tra phiên bản mới'}
          </button>
          <button onClick={expandAll}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1 rounded-lg hover:bg-gray-700">
            Mở rộng tất cả
          </button>
          <button onClick={collapseAll}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1 rounded-lg hover:bg-gray-700">
            Thu gọn
          </button>
        </div>
      </div>

      {/* Latest badge */}
      <div className="bg-green-900/20 border border-green-700/40 rounded-xl px-4 py-2.5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
        <span className="text-green-300 text-xs font-medium">
          Phiên bản hiện tại: <strong>v{CHANGELOG[0]?.version}</strong> — {CHANGELOG[0]?.date}
        </span>
      </div>

      {/* Entries */}
      <div className="space-y-3">
        {CHANGELOG.map((entry, idx) => {
          const isExpanded = expandedVersions.has(entry.version);
          const typeStyle = TYPE_STYLES[entry.type];
          const isLatest = idx === 0;

          return (
            <div key={entry.version}
              className={`border rounded-xl overflow-hidden transition-colors ${
                isLatest ? 'border-blue-700/50 bg-blue-900/10' : 'border-gray-700 bg-gray-800/40'
              }`}>
              {/* Header */}
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors"
                onClick={() => toggle(entry.version)}
              >
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeStyle.cls}`}>
                  {typeStyle.label}
                </span>
                <span className="text-white font-bold text-sm flex-1">
                  v{entry.version}
                  {isLatest && (
                    <span className="ml-2 text-[11px] bg-green-600/30 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded-full font-normal align-middle">
                      Mới nhất
                    </span>
                  )}
                </span>
                <span className="text-gray-500 text-xs mr-2">{entry.date}</span>
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className={`text-gray-500 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Body */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 border-t border-gray-700/50 pt-3">
                  {/* Highlights */}
                  {entry.highlights && entry.highlights.length > 0 && (
                    <div className="bg-gray-700/30 rounded-lg px-3 py-2.5 space-y-1">
                      {entry.highlights.map((h, i) => (
                        <p key={i} className="text-gray-200 text-xs font-medium">{h}</p>
                      ))}
                    </div>
                  )}

                  {/* Change categories */}
                  {entry.changes.map((group, gi) => {
                    const style = CATEGORY_STYLES[group.category];
                    return (
                      <div key={gi} className="space-y-1.5">
                        <p className={`text-xs font-semibold flex items-center gap-1.5 ${style.cls}`}>
                          <span>{style.icon}</span>
                          {style.label}
                        </p>
                        <ul className="space-y-1 pl-1">
                          {group.items.map((item, ii) => (
                            <li key={ii} className="flex items-start gap-2 text-gray-400 text-xs">
                              <span className="text-gray-600 mt-0.5 flex-shrink-0">—</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
