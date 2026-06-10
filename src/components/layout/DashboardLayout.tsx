import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar, Badge } from '../ui/UIComponents';
import { 
  LayoutDashboard, 
  ClipboardList, 
  MessageSquare, 
  BarChart3, 
  Award, 
  FilePieChart, 
  Settings, 
  HelpCircle, 
  ChevronLeft, 
  Bell, 
  Sun, 
  Moon, 
  Search, 
  ChevronDown, 
  LogOut,
  Menu
} from 'lucide-react';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    role,
    theme,
    toggleTheme,
    dashboardTab,
    setDashboardTab,
    userName,
    setCurrentPage,
    setIsLoggedIn,
    addToast
  } = useApp();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'surveys', label: 'Surveys', icon: <ClipboardList size={20} /> },
    { id: 'feedback', label: 'Feedback Feed', icon: <MessageSquare size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'employer-brand', label: 'Employer Brand', icon: <Award size={20} /> },
    { id: 'reports', label: 'Reports Center', icon: <FilePieChart size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    { id: 'help', label: 'Help Center', icon: <HelpCircle size={20} /> },
  ];

  const notifications = [
    { id: 1, title: 'Pulse Survey Reminder', desc: 'Please complete the Q2 Well-being Pulse.', time: '10m ago', unread: true },
    { id: 2, title: 'New Recognition Alert', desc: 'Alexander Wright recognized Helena Vance on the Wall.', time: '2h ago', unread: true },
    { id: 3, title: 'AI Culture Alert', desc: 'Burnout risk detected for Sales department.', time: '1d ago', unread: false }
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
    addToast('Signed out successfully!', 'info');
  };

  const getBreadcrumbs = () => {
    const activeItem = menuItems.find(item => item.id === dashboardTab);
    return ['Vibe OS Workspace', activeItem?.label || 'Dashboard'];
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Mobile Drawer Backdrop */}
      {isMobile && mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 999
          }}
        />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside
        style={{
          width: isMobile ? '260px' : sidebarCollapsed ? '72px' : '260px',
          backgroundColor: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--border-color)',
          display: isMobile && !mobileSidebarOpen ? 'none' : 'flex',
          flexDirection: 'column',
          transition: 'all var(--transition-speed) var(--transition-ease)',
          position: isMobile ? 'fixed' : 'sticky',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 1000,
          boxShadow: isMobile ? 'var(--shadow-xl)' : 'none'
        }}
      >
        {/* Sidebar Header */}
        <div
          style={{
            padding: '24px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: (sidebarCollapsed && !isMobile) ? 'center' : 'space-between',
            borderBottom: '1px solid var(--border-color)',
            height: '80px'
          }}
        >
          {(!sidebarCollapsed || isMobile) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>V</div>
              <span style={{ fontWeight: 800, fontSize: '20px', fontFamily: 'var(--font-heading)' }}>Vibe OS</span>
            </div>
          )}
          {(sidebarCollapsed && !isMobile) && (
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>V</div>
          )}
          {!isMobile && (
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                padding: '6px',
                borderRadius: 'var(--radius-sm)'
              }}
              className="hover-lift"
            >
              <ChevronLeft style={{ transform: sidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms' }} size={16} />
            </button>
          )}
        </div>

        {/* Sidebar Menu Items */}
        <nav style={{ flex: 1, padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map(item => {
            const isActive = dashboardTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setDashboardTab(item.id);
                  if (isMobile) setMobileSidebarOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-main)',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 200ms',
                  width: '100%',
                  justifyContent: (sidebarCollapsed && !isMobile) ? 'center' : 'flex-start'
                }}
                className="hover-lift"
              >
                <div style={{ display: 'flex', color: isActive ? 'var(--primary)' : 'var(--text-muted)' }}>{item.icon}</div>
                {(!sidebarCollapsed || isMobile) && <span style={{ fontSize: 'var(--fs-small)' }}>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Role Swapper (Mini-Indicator) */}
        {(!sidebarCollapsed || isMobile) && (
          <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
              Active Workspace Role
            </span>
            <Badge type={role === 'executive' ? 'success' : role === 'hr' ? 'info' : role === 'manager' ? 'warning' : 'neutral'}>
              {role.toUpperCase()}
            </Badge>
          </div>
        )}
      </aside>

      {/* MAIN VIEWPORT AND TOP BAR */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* TOP BAR */}
        <header
          style={{
            height: '80px',
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isMobile ? '0 12px' : '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 99
          }}
        >
          {/* Left: Breadcrumbs & Mobile Menu toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '16px' }}>
            {isMobile && (
              <button
                onClick={() => setMobileSidebarOpen(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <Menu size={20} />
              </button>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>
              {getBreadcrumbs().map((b, i) => {
                if (isMobile && i < getBreadcrumbs().length - 1) return null;
                return (
                  <React.Fragment key={i}>
                    {i > 0 && !isMobile && <span style={{ opacity: 0.5 }}>/</span>}
                    <span style={{ color: i === getBreadcrumbs().length - 1 ? 'var(--text-main)' : 'inherit', fontWeight: i === getBreadcrumbs().length - 1 ? 600 : 'inherit' }}>
                      {b}
                    </span>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Right: Actions (Search, Notify, Theme, Profile) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '16px' }}>
            
            {/* Search Input (Ctrl+K trigger representation) */}
            <div
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
                window.dispatchEvent(event);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isMobile ? '0' : '8px',
                padding: isMobile ? '8px' : '8px 12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                fontSize: '13px',
                width: isMobile ? '36px' : '180px',
                height: isMobile ? '36px' : 'auto'
              }}
              className="hover-lift"
            >
              <Search size={14} />
              {!isMobile && <span>Search...</span>}
              {!isMobile && (
                <kbd style={{
                  marginLeft: 'auto',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  padding: '1px 5px',
                  fontSize: '10px'
                }}>⌘K</kbd>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                padding: '8px',
                borderRadius: 'var(--radius-md)',
              }}
              className="hover-lift"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Notifications Dropdown Toggle */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileOpen(false);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  padding: '8px',
                  borderRadius: 'var(--radius-md)',
                  position: 'relative'
                }}
                className="hover-lift"
              >
                <Bell size={20} />
                <span style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--danger)'
                }} />
              </button>

              {notificationsOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    width: '320px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-xl)',
                    padding: '8px',
                    zIndex: 1000,
                    animation: 'fadeIn var(--transition-speed)'
                  }}
                >
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '15px' }}>Notifications</span>
                    <span style={{ fontSize: '11px', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>Mark all read</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '280px', overflowY: 'auto' }}>
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid var(--border-color)',
                          cursor: 'pointer',
                          backgroundColor: n.unread ? 'var(--primary-light)' : 'transparent',
                          transition: 'background 200ms'
                        }}
                      >
                        <h4 style={{ fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {n.title}
                          {n.unread && <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />}
                        </h4>
                        <p style={{ fontSize: '12px', marginTop: '2px', color: 'var(--text-muted)' }}>{n.desc}</p>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown Toggle */}
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotificationsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-md)',
                  transition: 'background 200ms'
                }}
                className="hover-lift"
              >
                <Avatar name={userName} size="sm" />
                {!sidebarCollapsed && <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />}
              </div>

              {profileOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    width: '200px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '8px',
                    zIndex: 1000,
                    animation: 'fadeIn var(--transition-speed)'
                  }}
                >
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700 }}>{userName}</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{role.toUpperCase()}</span>
                  </div>
                  <button
                    onClick={() => {
                      setDashboardTab('settings');
                      setProfileOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      color: 'var(--text-main)',
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '4px'
                    }}
                  >
                    <Settings size={14} /> Profile Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      color: 'var(--danger)',
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <LogOut size={14} /> Log Out
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* CONTAINER VIEWPORT FOR CHILDREN COMPONENTS */}
        <main style={{ flex: 1, padding: isMobile ? '16px' : '24px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
};
