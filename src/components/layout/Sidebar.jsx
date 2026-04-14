import { memo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, MessageSquare, HelpCircle, Settings, ChevronLeft, ChevronRight, MoreVertical, Trash2, Edit2, Share2 } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

const MENU_ITEMS = [
  { id: 'solver', icon: MessageSquare, label: 'Math Solver', active: true },
  { id: 'how-it-works', icon: HelpCircle, label: 'How It Works' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

const GRADES = [
  { id: '5-6', label: 'Grade 5–6' },
  { id: '7-8', label: 'Grade 7–8' },
  { id: '9-10', label: 'Grade 9–10' },
  { id: '11-12', label: 'Grade 11–12' },
];

// Mock history data
const MOCK_HISTORY = [
  { id: 1, title: 'Quadratic Equations', timestamp: '2 hours ago' },
  { id: 2, title: 'Trigonometry Basics', timestamp: '1 day ago' },
  { id: 3, title: 'Calculus Integration', timestamp: '3 days ago' },
];

// Dropdown Menu Portal Component - Renders outside scroll container with fixed positioning
function HistoryActionMenu({ item, isOpen, buttonRef, onRename, onShare, onDelete }) {
  const [position, setPosition] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !buttonRef || !buttonRef.current) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      if (!buttonRef.current) return;
      
      // Always recalculate position based on current button location
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const TOP_OFFSET = 8;
      
      setPosition({
        top: buttonRect.bottom + TOP_OFFSET + window.scrollY,
        left: buttonRect.right - 150 + window.scrollX,
      });
    };

    // Initial position
    updatePosition();

    // Update position on scroll
    const scrollListener = () => updatePosition();
    window.addEventListener('scroll', scrollListener, true);

    // Update position on window resize
    const resizeListener = () => updatePosition();
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('scroll', scrollListener, true);
      window.removeEventListener('resize', resizeListener);
    };
  }, [isOpen, buttonRef]);

  if (!isOpen || !position) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 9999,
      }}
      className="bg-slate-800 rounded-lg border border-slate-700 shadow-xl animate-in fade-in slide-in-from-top-1 duration-200 w-48"
    >
      <button
        onClick={() => {
          onRename(item);
        }}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors first:rounded-t-lg whitespace-nowrap"
      >
        <Edit2 className="w-4 h-4 flex-shrink-0" />
        Rename
      </button>
      <button
        onClick={() => {
          onShare(item);
        }}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors whitespace-nowrap"
      >
        <Share2 className="w-4 h-4 flex-shrink-0" />
        Share
      </button>
      <button
        onClick={() => {
          onDelete(item.id);
        }}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors last:rounded-b-lg whitespace-nowrap"
      >
        <Trash2 className="w-4 h-4 flex-shrink-0" />
        Delete
      </button>
    </div>,
    document.body
  );
}

// Delete Confirmation Portal Component - Renders as centered modal
function DeleteConfirmationModal({ item, isOpen, onConfirm, onCancel }) {
  if (!isOpen || !item) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onCancel}
        className="fixed inset-0 bg-black/50 z-[9998]"
        style={{
          animation: 'fadeIn 0.2s ease-out'
        }}
      />
      
      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] bg-slate-800 rounded-lg border border-slate-700 shadow-2xl p-4 w-96 max-w-[90vw] animate-in fade-in slide-in-from-bottom-4 duration-200"
      >
        <h2 className="text-sm font-semibold text-slate-100 mb-2">Delete Chat</h2>
        <p className="text-sm text-slate-400 mb-6">
          Are you sure you want to delete <span className="font-medium text-slate-200">"{item.title}"</span>? This action cannot be undone.
        </p>
        
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium text-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium text-white transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}

function SidebarContent({ isOpen, onClose, isCollapsed = false, onToggleCollapse, isMobile = false }) {
  const isExpanded = !isCollapsed;
  const { grade, setGrade } = useAppStore();
  const [history, setHistory] = useState(MOCK_HISTORY);
  const [renameId, setRenameId] = useState(null);
  const [renamingTitle, setRenamingTitle] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [buttonRef, setButtonRef] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleRename = (item) => {
    setRenameId(item.id);
    setRenamingTitle(item.title);
    setOpenMenuId(null);
  };

  const saveRename = (id) => {
    setHistory(history.map(item => item.id === id ? { ...item, title: renamingTitle } : item));
    setRenameId(null);
  };

  const handleDelete = (id) => {
    setHistory(history.filter(item => item.id !== id));
    setDeleteConfirm(null);
  };

  const handleShare = (item) => {
    const shareText = `Check out this: "${item.title}"`;
    navigator.clipboard.writeText(shareText);
    alert('Chat link copied to clipboard!');
    setOpenMenuId(null);
  };

  const toggleMenu = (e, itemId) => {
    if (openMenuId === itemId) {
      setOpenMenuId(null);
      setButtonRef(null);
    } else {
      // Store reference to the button element for dynamic position updates
      setButtonRef({ current: e.currentTarget });
      setOpenMenuId(itemId);
    }
  };

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      const isDropdown = e.target.closest('div[style*="position: fixed"]');
      const isButton = e.target.closest('[data-menu-trigger]');
      
      if (!isDropdown && !isButton && openMenuId) {
        setOpenMenuId(null);
        setButtonRef(null);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape' && openMenuId) {
        setOpenMenuId(null);
        setButtonRef(null);
      }
    };

    if (openMenuId) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [openMenuId]);

  return (
    <>
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

              {/* Grade Selector Section - Vertical Stack */}
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
                <div className="flex flex-col gap-2">
                  {GRADES.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGrade(g.id)}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        grade === g.id
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* History Section - Dynamic Chat List */}
              <div
                style={{
                  borderTop: '1px solid rgb(30, 41, 59)',
                  flex: 1,
                  padding: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Chat History
                </h3>
                
                {history.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-xs text-slate-500">No chats yet</p>
                    <p className="text-xs text-slate-600 mt-1">Start solving</p>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                    {history.map((item) => (
                      <div key={item.id} className="relative group">
                        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                          <div className="flex-1 min-w-0">
                            {renameId === item.id ? (
                              <input
                                autoFocus
                                value={renamingTitle}
                                onChange={(e) => setRenamingTitle(e.target.value)}
                                onBlur={() => saveRename(item.id)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') saveRename(item.id);
                                  if (e.key === 'Escape') setRenameId(null);
                                }}
                                className="w-full px-2 py-1 bg-slate-700 text-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                              />
                            ) : (
                              <>
                                <p className="text-sm text-slate-300 truncate cursor-pointer hover:text-slate-100">
                                  {item.title}
                                </p>
                                <p className="text-xs text-slate-500">{item.timestamp}</p>
                              </>
                            )}
                          </div>

                          {/* Action Menu Button */}
                          <button
                            data-menu-trigger
                            onClick={(e) => toggleMenu(e, item.id)}
                            className="p-1 hover:bg-slate-700 rounded transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                          >
                            <MoreVertical className="w-4 h-4 text-slate-400" />
                          </button>

                          {/* Portal Dropdown Menu */}
                          <HistoryActionMenu
                            item={item}
                            buttonRef={openMenuId === item.id ? buttonRef : null}
                            isOpen={openMenuId === item.id}
                            onRename={handleRename}
                            onShare={handleShare}
                            onDelete={() => setDeleteConfirm(item.id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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

          {/* Grade Selector - Mobile */}
          <div className="px-4 py-6 border-t border-slate-800 shrink-0">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Current Grade
            </p>
            <div className="flex flex-col gap-2">
              {GRADES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGrade(g.id)}
                  className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    grade === g.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* History - Mobile */}
          <div className="flex-1 px-4 py-6 border-t border-slate-800 overflow-y-auto">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Chat History
            </h3>
            
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-xs text-slate-500">No chats yet</p>
                <p className="text-xs text-slate-600 mt-1">Start solving</p>
              </div>
            ) : (
              <div className="space-y-2">
                {history.map((item) => (
                  <div key={item.id} className="relative group">
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        {renameId === item.id ? (
                          <input
                            autoFocus
                            value={renamingTitle}
                            onChange={(e) => setRenamingTitle(e.target.value)}
                            onBlur={() => saveRename(item.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveRename(item.id);
                              if (e.key === 'Escape') setRenameId(null);
                            }}
                            className="w-full px-2 py-1 bg-slate-700 text-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        ) : (
                          <>
                            <p className="text-sm text-slate-300 truncate cursor-pointer hover:text-slate-100">
                              {item.title}
                            </p>
                            <p className="text-xs text-slate-500">{item.timestamp}</p>
                          </>
                        )}
                      </div>

                      {/* Action Menu Button - Mobile */}
                      <button
                        data-menu-trigger
                        onClick={(e) => toggleMenu(e, item.id)}
                        className="p-1 hover:bg-slate-700 rounded transition-colors flex-shrink-0"
                      >
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                      </button>

                      {/* Dropdown Menu - Mobile */}
                      <HistoryActionMenu
                        item={item}
                        buttonRef={openMenuId === item.id ? buttonRef : null}
                        isOpen={openMenuId === item.id}
                        onRename={handleRename}
                        onShare={handleShare}
                        onDelete={() => setDeleteConfirm(item.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 text-center shrink-0">
            <p className="text-xs text-slate-500 italic">
              Hints first.<br />Answers later.
            </p>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        item={history.find(h => h.id === deleteConfirm)}
        isOpen={!!deleteConfirm}
        onConfirm={() => {
          const item = history.find(h => h.id === deleteConfirm);
          if (item) handleDelete(item.id);
        }}
        onCancel={() => setDeleteConfirm(null)}
      />
    </>
  );
}

export const Sidebar = memo(SidebarContent);
