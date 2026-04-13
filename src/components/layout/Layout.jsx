import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Sidebar } from './Sidebar';

export function Layout({ children }) {
  const [desktopSidebarState, setDesktopSidebarState] = useState('open');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint is 768px
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
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Background glow effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Desktop Sidebar - Only visible on md and above */}
      {!isMobile && (
        <motion.div
          initial={false}
          animate={{
            width: desktopSidebarState === 'open' ? '16rem' : desktopSidebarState === 'collapsed' ? '4rem' : '0rem',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="hidden md:flex flex-col h-screen transition-all duration-300 relative z-20"
        >
          <Sidebar
            isOpen={true}
            onClose={() => {}}
            isCollapsed={desktopSidebarState === 'collapsed'}
            onToggleCollapse={toggleDesktopSidebar}
            isMobile={false}
          />
        </motion.div>
      )}

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && mobileSidebarOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isMobile && mobileSidebarOpen && (
          <motion.div
            key="mobile-sidebar"
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 w-64 h-screen md:hidden z-40 flex flex-col"
          >
            <Sidebar
              isOpen={mobileSidebarOpen}
              onClose={() => setMobileSidebarOpen(false)}
              isCollapsed={false}
              onToggleCollapse={() => {}}
              isMobile={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={false}
        animate={
          !isMobile
            ? {
                marginLeft: desktopSidebarState === 'open' ? '16rem' : desktopSidebarState === 'collapsed' ? '4rem' : '0rem',
              }
            : { marginLeft: 0 }
        }
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex-1 flex flex-col overflow-hidden h-screen relative z-10"
      >
        {/* Mobile Header with Toggle */}
        {isMobile && (
          <div className="border-b border-slate-800 px-4 py-3 flex items-center justify-between md:hidden">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              MathMind
            </h1>
            <div className="w-10" />
          </div>
        )}

        {/* Desktop Header with Toggle */}
        {!isMobile && (
          <div className="hidden md:flex border-b border-slate-800 px-4 py-3 items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDesktopSidebar}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200"
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
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
