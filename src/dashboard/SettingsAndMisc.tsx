import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Card, Button, Badge } from '../components/ui/UIComponents';
import { 
  Search, 
  CreditCard 
} from 'lucide-react';

// ==========================================
// SETTINGS PANEL
// ==========================================
export const SettingsPanel: React.FC = () => {
  const { addToast } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('profile');
  
  const [integrations, setIntegrations] = useState([
    { id: 'slack', name: 'Slack Integration', desc: 'Sync employee groups and dispatch surveys.', connected: true },
    { id: 'teams', name: 'Microsoft Teams', desc: 'Send direct message pulse links to workers.', connected: false },
    { id: 'bamboo', name: 'BambooHR', desc: 'Auto-sync user database rosters daily.', connected: false }
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations(prev =>
      prev.map(item =>
        item.id === id ? { ...item, connected: !item.connected } : item
      )
    );
    const connectedState = !integrations.find(i => i.id === id)?.connected;
    addToast(connectedState ? `${id.toUpperCase()} Connected successfully!` : `${id.toUpperCase()} Disconnected.`, 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: 'var(--fs-h3)', fontWeight: 800 }}>Workspace Settings</h1>
        <p>Manage integrations, change subscription levels, or configure organizational locations.</p>
      </div>

      <div className="responsive-grid-settings">
        
        {/* Settings Left sub-menu */}
        <div className="responsive-settings-menu">
          {[
            { id: 'profile', label: 'My Profile' },
            { id: 'org', label: 'Organization' },
            { id: 'integrations', label: 'Integrations' },
            { id: 'billing', label: 'Billing & Plans' }
          ].map(sub => (
            <button
              key={sub.id}
              onClick={() => setActiveSubTab(sub.id)}
              style={{
                textAlign: 'left',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                backgroundColor: activeSubTab === sub.id ? 'var(--primary-light)' : 'transparent',
                color: activeSubTab === sub.id ? 'var(--primary)' : 'var(--text-main)',
                fontWeight: activeSubTab === sub.id ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 200ms'
              }}
            >
              {sub.label}
            </button>
          ))}
        </div>

        {/* Settings Right content panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* PROFILE SUB-TAB */}
          {activeSubTab === 'profile' && (
            <Card style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '18px' }}>Profile Information</h3>
              <div className="responsive-grid-2col">
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Full Name</label>
                  <input
                    type="text"
                    defaultValue="Alexander Wright"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Email Address</label>
                  <input
                    type="email"
                    defaultValue="alexander@vibetech.com"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>
              <Button style={{ alignSelf: 'flex-end' }} onClick={() => addToast('Profile changes saved!', 'success')}>Save Changes</Button>
            </Card>
          )}

          {/* ORGANIZATION SUB-TAB */}
          {activeSubTab === 'org' && (
            <Card style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '18px' }}>Organization Profile</h3>
              <div className="responsive-grid-2col">
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Company Name</label>
                  <input
                    type="text"
                    defaultValue="VibeTech Inc."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Company Subdomain</label>
                  <input
                    type="text"
                    defaultValue="vibetech"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>
              <Button style={{ alignSelf: 'flex-end' }} onClick={() => addToast('Organization profile saved!', 'success')}>Save Workspace Info</Button>
            </Card>
          )}

          {/* INTEGRATIONS SUB-TAB */}
          {activeSubTab === 'integrations' && (
            <Card style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '18px' }}>Roster and Chat Integrations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {integrations.map(integ => (
                  <div key={integ.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 700 }}>{integ.name}</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{integ.desc}</p>
                    </div>
                    <Button variant={integ.connected ? 'secondary' : 'primary'} size="sm" onClick={() => toggleIntegration(integ.id)}>
                      {integ.connected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* BILLING SUB-TAB */}
          {activeSubTab === 'billing' && (
            <Card style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '18px' }}>Plan & Billing</h3>
                <Badge type="info">Active Plan</Badge>
              </div>
              
              <div style={{ padding: '20px', backgroundColor: 'var(--primary-light)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)' }}>Growth Tier</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>$8 / employee / month • 350 seats active</p>
                </div>
                <Button size="sm" onClick={() => addToast('Opening plan management portal...', 'info')}>Upgrade Plan</Button>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Payment Method</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px' }}>
                  <CreditCard size={18} style={{ color: 'var(--primary)' }} />
                  <span>•••• •••• •••• 4242 (Expires 12/28)</span>
                </div>
              </div>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
};

// ==========================================
// HELP CENTER
// ==========================================
export const HelpCenter: React.FC = () => {
  const { addToast: _addToast } = useApp();
  void _addToast;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 'var(--fs-h3)', fontWeight: 800 }}>Vibe OS Support center</h1>
        <p>Search guides and browse explanations regarding anonymous metrics calculations.</p>
      </div>

      {/* Guides Accordion */}
      <Card style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '18px' }}>Core Knowledge Base</h3>
        
        {[
          { q: 'How does the AI sentiment scoring filter individual identifiers?', a: 'Our sentiment processor parses responses through an aggregation layer, stripping away pronouns and proper names while retaining the emotional metrics.' },
          { q: 'Can managers inspect individual survey submissions?', a: 'No. Submissions are pooled in aggregates of five or more. Individual ratings or texts are never exposed to managers, securing complete cryptographic anonymity.' },
          { q: 'How is the burnout risk category calculated?', a: 'Burnout risk is tracked across metrics for workload capacity, overtime reports, recognition rates, and self-checked stress ratings.' }
        ].map((guide, idx) => (
          <div key={idx} style={{ padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{guide.q}</h4>
            <p style={{ fontSize: '13px', lineHeight: 1.5 }}>{guide.a}</p>
          </div>
        ))}
      </Card>
    </div>
  );
};

// ==========================================
// COMMAND PALETTE (CTRL+K OVERLAY)
// ==========================================
export const CommandPalette: React.FC = () => {
  const { setCurrentPage, setRole, setAppState, addToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const items = [
    { category: 'Public Pages', label: 'Go to Landing Page', action: () => { setCurrentPage('landing'); addToast('Navigated to Landing page!', 'info'); } },
    { category: 'Public Pages', label: 'Go to Features Page', action: () => { setCurrentPage('features'); } },
    { category: 'Public Pages', label: 'Go to Pricing Page', action: () => { setCurrentPage('pricing'); } },
    { category: 'Public Pages', label: 'Go to About Page', action: () => { setCurrentPage('about'); } },
    { category: 'Public Pages', label: 'Go to Blog Page', action: () => { setCurrentPage('blog'); } },
    { category: 'Public Pages', label: 'Go to Careers Page', action: () => { setCurrentPage('careers'); } },
    
    { category: 'Dashboard Roles', label: 'Switch to Executive View', action: () => { setRole('executive'); addToast('Role changed to Executive', 'success'); } },
    { category: 'Dashboard Roles', label: 'Switch to HR Manager View', action: () => { setRole('hr'); addToast('Role changed to HR Manager', 'success'); } },
    { category: 'Dashboard Roles', label: 'Switch to Department Manager View', action: () => { setRole('manager'); addToast('Role changed to Department Manager', 'success'); } },
    { category: 'Dashboard Roles', label: 'Switch to Employee View', action: () => { setRole('employee'); addToast('Role changed to Employee', 'success'); } },
    
    { category: 'App Simulator States', label: 'Set state to Success (Default)', action: () => { setAppState('success'); } },
    { category: 'App Simulator States', label: 'Set state to Loading (Skeletons)', action: () => { setAppState('loading'); } },
    { category: 'App Simulator States', label: 'Set state to Empty State UI', action: () => { setAppState('empty'); } },
    { category: 'App Simulator States', label: 'Set state to Error Alert Module', action: () => { setAppState('error'); } },
  ];

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(11, 15, 25, 0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 16px'
      }}
      onClick={() => setIsOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Type page name or simulator states to search..."
            autoFocus
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              backgroundColor: 'transparent',
              color: 'var(--text-main)',
              fontSize: '15px'
            }}
          />
          <Badge type="neutral">ESC</Badge>
        </div>

        <div style={{ maxHeight: '320px', overflowY: 'auto', padding: '8px' }}>
          {filteredItems.length === 0 ? (
            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              No commands matched your query.
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'background 150ms'
                }}
                className="hover-lift"
              >
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{item.category}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
