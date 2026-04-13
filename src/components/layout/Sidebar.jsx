import { memo } from 'react';
import { X, MessageSquare, HelpCircle, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { GradeSelectorPills } from '../ui/GradeSelectorPills';

const MENU_ITEMS = [
  { id: 'solver', icon: MessageSquare, label: 'Math Solver', active: true },
  { id: 'how-it-works', icon: HelpCircle, label: 'How It Works' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

function SidebarContent({ isOpen, onClose, isCollapsed = false, onToggleCollapse, isMobile = false }) {
  const isExpanded = !isCollapsed;

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div
          className="h-full flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
          style={{
            overflow: 'hidden',
            width: '100%',
          }}
        >
          {/* EXPANDED LAYOUT */}
          {isExpanded && (
            <>
              {/* Header */}
              <div
                className="border-b border-slate-800 flex-shrink-0"
                style={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0"
                    style={{
                      width: '40px',
                      height: '40px',
                    }}
                  >
                    <span className="text-lg font-bold text-white">M</span>
                  </div>

                  <div style={{ whiteSpace: 'nowrap', minWidth: 0 }}>
                    <p className="text-sm font-bold text-white truncate">MathMind</p>
                    <p className="text-xs text-slate-400 truncate">AI Tutor</p>
                  </div>
                </div>

                {/* Toggle Button */}
                <button
                  onClick={onToggleCollapse}
                  className="p-1 hover:bg-slate-800 rounded-lg flex-shrink-0"
                  title="Collapse"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Menu */}
              <nav className="p-2 space-y-1 flex-shrink-0">
                {MENU_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      className={`w-full rounded-xl flex-shrink-0 ${
                        item.active
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30'
                          : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                      }`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: '10px 14px',
                        gap: '8px',
                      }}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium truncate flex-shrink-0">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Grade Selector Section */}
              <div
                style={{
                  borderTop: '1px solid rgb(30, 41, 59)',
                  flexShrink: 0,
                  padding: '12px',
                }}
              >
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Current Grade
                </p>
                <GradeSelectorPills isCompact={false} />
              </div>

              {/* History Section */}
              <div
                style={{
                  borderTop: '1px solid rgb(30, 41, 59)',
                  flex: 1,
                  padding: '12px',
                  overflow: 'hidden',
                }}
              >
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Recent Problems
                </h3>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-xs text-slate-500">No history yet</p>
                  <p className="text-xs text-slate-600 mt-1">Start solving</p>
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  borderTop: '1px solid rgb(30, 41, 59)',
                  flexShrink: 0,
                  textAlign: 'center',
                  padding: '12px',
                }}
              >
                <p className="text-xs text-slate-500 italic">
                  Hints first.<br />Answers later.
                </p>
              </div>
            </>
          )}

          {/* COLLAPSED LAYOUT - MINIMAL ICON RAIL */}
          {isCollapsed && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                paddingTop: '12px',
                height: '100%',
                paddingBottom: '12px',
              }}
            >
              {/* Header Avatar */}
              <div
                className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0"
                style={{
                  width: '40px',
                  height: '40px',
                }}
              >
                <span className="text-lg font-bold text-white">M</span>
              </div>

              {/* Nav Icons */}
              <nav
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  alignItems: 'center',
                }}
              >
                {MENU_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      className={`rounded-lg flex items-center justify-center flex-shrink-0 ${
                        item.active
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30'
                          : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                      }`}
                      style={{
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title={item.label}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  );
                })}
              </nav>

              {/* Toggle Button - Bottom */}
              <button
                onClick={onToggleCollapse}
                className="p-1 hover:bg-slate-800 rounded-lg flex-shrink-0 mt-auto"
                title="Expand"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <div className="w-64 h-full flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-lg font-bold text-white">M</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">MathMind</p>
                <p className="text-xs text-slate-400">AI Tutor</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg">
              <X className="w-5 h-5 text-slate-300" />
            </button>
          </div>

          {/* Menu */}
          <nav className="p-4 space-y-2">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                    item.active
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Grade Selector */}
          <div className="px-4 py-6 border-t border-slate-800 shrink-0">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Current Grade
            </p>
            <GradeSelectorPills />
          </div>

          {/* History */}
          <div className="flex-1 px-4 py-6 border-t border-slate-800 overflow-y-auto">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Recent Problems
            </h3>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-xs text-slate-500">No history yet</p>
              <p className="text-xs text-slate-600 mt-1">Start solving</p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 text-center shrink-0">
            <p className="text-xs text-slate-500 italic">
              Hints first.<br />Answers later.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export const Sidebar = memo(SidebarContent);
