import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { UserRole, AppStateMode } from '../../context/AppContext';
import { Button, Badge } from './UIComponents';
import { Sliders, Bell, Sparkles } from 'lucide-react';

export const PrototypeController: React.FC = () => {
  const {
    role,
    setRole,
    appState,
    setAppState,
    addToast,
    currentPage,
    setCurrentPage
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);

  const roles: { id: UserRole; name: string }[] = [
    { id: 'executive', name: 'Executive' },
    { id: 'hr', name: 'HR Manager' },
    { id: 'manager', name: 'Dept Manager' },
    { id: 'employee', name: 'Employee' }
  ];

  const states: { id: AppStateMode; name: string }[] = [
    { id: 'success', name: 'Success' },
    { id: 'loading', name: 'Loading' },
    { id: 'empty', name: 'Empty' },
    { id: 'error', name: 'Error' }
  ];

  const handleTriggerToast = () => {
    const alerts = [
      { msg: 'New anonymous feedback submitted by Support team member!', type: 'info' as const },
      { msg: 'AI analysis: Turnover risk in Sales has escalated to High!', type: 'danger' as const },
      { msg: 'Alexander Wright recognized Helena Vance on the Wall!', type: 'success' as const },
      { msg: 'Workspace settings synchronized with Slack hook!', type: 'warning' as const }
    ];
    const picked = alerts[Math.floor(Math.random() * alerts.length)];
    addToast(picked.msg, picked.type === 'danger' ? 'error' : picked.type);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 99999,
        fontFamily: 'var(--font-body)'
      }}
    >
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 18px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--text-main)',
          color: 'var(--bg-card)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-lg)',
          fontWeight: 700,
          fontSize: '13px',
          transition: 'all var(--transition-speed)'
        }}
        className="hover-lift"
      >
        <Sliders size={16} />
        <span>Prototype Controller</span>
      </button>

      {/* Controller Drawer Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            left: 0,
            width: '280px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-xl)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            animation: 'fadeIn var(--transition-speed)'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
            <span style={{ fontWeight: 800, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} style={{ color: 'var(--primary)' }} /> Simulator Tools
            </span>
            <Badge type="info">Active</Badge>
          </div>

          {/* Quick Page Swap */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Quick View Navigator</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <Button size="sm" variant={currentPage === 'landing' ? 'primary' : 'secondary'} onClick={() => setCurrentPage('landing')}>Landing</Button>
              <Button size="sm" variant={currentPage === 'dashboard' ? 'primary' : 'secondary'} onClick={() => setCurrentPage('dashboard')}>Dashboard</Button>
            </div>
          </div>

          {/* Persona Swapper */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Persona Role Switcher</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {roles.map(r => (
                <Button
                  key={r.id}
                  size="sm"
                  variant={role === r.id ? 'primary' : 'secondary'}
                  onClick={() => {
                    setRole(r.id);
                    if (currentPage !== 'dashboard') setCurrentPage('dashboard');
                  }}
                  style={{ fontSize: '11px', padding: '6px 8px' }}
                >
                  {r.name}
                </Button>
              ))}
            </div>
          </div>

          {/* State Swapper */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>App State Sim</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {states.map(s => (
                <Button
                  key={s.id}
                  size="sm"
                  variant={appState === s.id ? 'primary' : 'secondary'}
                  onClick={() => setAppState(s.id)}
                  style={{ fontSize: '11px', padding: '6px 8px' }}
                >
                  {s.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Toast trigger */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Generate alert notifications</span>
            <Button size="sm" variant="secondary" icon={<Bell size={12} />} onClick={handleTriggerToast}>
              Send Toast
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
