import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Sidebar } from './Sidebar';

export function Layout({ children }) {
  const [desktopSidebarState, setDesktopSidebarState] = useState('open');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleDesktopSidebar = () => {
    setDesktopSidebarState((prev) => {
      if (prev === 'open') return 'collapsed';
      if (prev === 'collapsed') return 'open';
      return 'open';
    });
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background glow effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Desktop Sidebar - Clean SaaS-style with inline width control */}
      <div
        className="hidden md:block h-screen z-50 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800"
        style={{
          width: desktopSidebarState === 'open' ? '240px' : '56px',
          overflow: 'hidden',
          transition: 'width 0.25s ease',
        }}
      >
        <Sidebar
          isOpen={true}
          onClose={() => {}}
          isCollapsed={desktopSidebarState === 'collapsed'}
          onToggleCollapse={toggleDesktopSidebar}
          isMobile={false}
        />
      </div>

      {/* Mobile Overlay - Instant toggle */}
      <div
        className={`fixed inset-0 z-30 md:hidden ${
          mobileSidebarOpen ? 'block bg-black/50 backdrop-blur-sm' : 'hidden'
        }`}
        onClick={() => setMobileSidebarOpen(false)}
      />

      {/* Mobile Sidebar - Instant toggle, no animation */}
      <div className={`md:hidden fixed top-0 left-0 h-screen z-40 ${mobileSidebarOpen ? 'block' : 'hidden'}`}>
        <Sidebar
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          isCollapsed={false}
          onToggleCollapse={() => {}}
          isMobile={true}
        />
      </div>

      {/* Main Content Area - No animation */}
      <div className="flex-1 flex flex-col overflow-hidden h-screen relative z-10">
        {/* Mobile Header */}
        <div className="md:hidden border-b border-slate-800 px-4 py-3 flex items-center justify-between shrink-0">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            MathMind
          </h1>
          <div className="w-10" />
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex border-b border-slate-800 px-4 py-3 items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDesktopSidebar}
              className="p-2 hover:bg-slate-800 rounded-lg"
              title={desktopSidebarState === 'open' ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <Menu className="w-5 h-5" />
            </button>
            {desktopSidebarState === 'open' && (
              <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                MathMind
              </h1>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
