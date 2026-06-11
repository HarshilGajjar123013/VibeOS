import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { 
  LandingPage, 
  FeaturesPage, 
  PricingPage, 
  AboutPage, 
  BlogPage, 
  ContactPage, 
  CareersPage, 
  LoginPage, 
  SignUpPage 
} from './pages/PublicPages';
import { OnboardingFlow } from './onboarding/OnboardingFlow';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { 
  ExecutiveDashboard, 
  HRDashboard, 
  ManagerDashboard, 
  EmployeeDashboard 
} from './dashboard/Dashboards';
import { 
  AnalyticsModule, 
  SurveyManagement, 
  FeedbackCenter, 
  EmployerBrandModule, 
  ReportsCenter 
} from './dashboard/Modules';
import { SettingsPanel, HelpCenter, CommandPalette } from './dashboard/SettingsAndMisc';
import { ToastContainer, Skeleton, Card, Button } from './components/ui/UIComponents';
import { PrototypeController } from './components/ui/PrototypeController';
import Navbar from './components/layout/Navbar';
import { ShieldAlert, RefreshCw } from 'lucide-react';

// ==========================================
// PUBLIC MARKETING LAYOUT
// ==========================================
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Floating Navbar */}
      <Navbar />

      {/* Main content — padded below the floating navbar */}
      <main style={{ flex: 1, paddingTop: '60px' }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--bg-sidebar)',
        borderTop: '1px solid var(--border-color)',
        padding: '60px 24px 40px 24px',
        marginTop: '60px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px'
        }}>
          {/* Logo column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src="/images/logo.png" alt="Vibe OS logo" style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }} />
              <span style={{ fontWeight: 800, fontSize: '20px', fontFamily: 'var(--font-heading)' }}>Vibe OS</span>
            </div>
            <p style={{ fontSize: '13px' }}>
              "Build workplaces people love."
            </p>
          </div>

          {/* Link columns */}
          {([
            { title: 'Product', links: [{ label: 'Features' }, { label: 'Integrations' }, { label: 'Pricing' }] },
            { title: 'Resources', links: [{ label: 'Guides' }, { label: 'Blog' }, { label: 'Help Center' }] },
            { title: 'Company', links: [{ label: 'About Story' }, { label: 'Careers' }, { label: 'Contact' }] },
            { title: 'Developer', links: [{ label: 'GitHub Repository', url: 'https://github.com/captainharshil32-commits/vibeos.git' }] }
          ] as { title: string; links: { label: string; url?: string }[] }[]).map((col, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700 }}>{col.title}</h4>
              {col.links.map(l => (
                l.url ? (
                  <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none' }} className="hover-lift">{l.label}</a>
                ) : (
                  <span key={l.label} style={{ fontSize: '13px', color: 'var(--text-muted)', cursor: 'pointer' }} className="hover-lift">{l.label}</span>
                )
              ))}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: '1200px', margin: '40px auto 0 auto', borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
          <span>© 2026 Vibe OS Inc. All rights reserved.</span>
          <span>SOC 2 Type II Certified • GDPR Compliant</span>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// ERROR ALERT FALLBACK VIEW
// ==========================================
const ErrorFallback: React.FC = () => {
  const { setAppState } = useApp();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', backgroundColor: 'var(--bg-main)' }}>
      <Card style={{ maxWidth: '420px', textAlign: 'center', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <div style={{ color: 'var(--danger)', padding: '16px', backgroundColor: 'var(--danger-light)', borderRadius: '50%' }}>
          <ShieldAlert size={40} />
        </div>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Workspace Sync Failure</h2>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>
            We encountered a connection latency spike syncing your local dashboard indices. Our servers are online but validation took too long.
          </p>
        </div>
        <Button onClick={() => setAppState('success')} icon={<RefreshCw size={14} />}>
          Retry Connection
        </Button>
      </Card>
    </div>
  );
};

// ==========================================
// SKELETON LOADER SCREEN
// ==========================================
const LoadingFallback: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Sidebar Loading */}
      <div style={{ width: '260px', backgroundColor: 'var(--bg-card)', borderRight: '1px solid var(--border-color)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Skeleton width="120px" height="32px" />
        <hr style={{ borderColor: 'var(--border-color)' }} />
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} height="40px" />
        ))}
      </div>
      {/* Main Content Loading */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '80px', backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Skeleton width="180px" height="24px" />
          <Skeleton width="100px" height="36px" circle />
        </div>
        <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Skeleton height="120px" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} height="180px" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// CENTRAL ROUTING AND APP CONTENT
// ==========================================
const AppContent: React.FC = () => {
  const { currentPage, dashboardTab, role, appState } = useApp();

  // If globally loading, display full screen skeleton loader
  if (appState === 'loading') {
    return <LoadingFallback />;
  }

  // If globally errored, display fallback warning alert
  if (appState === 'error') {
    return <ErrorFallback />;
  }

  // Onboarding has its own custom view (no header/footer)
  if (currentPage === 'onboarding') {
    return <OnboardingFlow />;
  }

  // Private Dashboard view routing
  if (currentPage === 'dashboard') {
    return (
      <DashboardLayout>
        {dashboardTab === 'dashboard' && (
          <>
            {role === 'executive' && <ExecutiveDashboard />}
            {role === 'hr' && <HRDashboard />}
            {role === 'manager' && <ManagerDashboard />}
            {role === 'employee' && <EmployeeDashboard />}
          </>
        )}
        {dashboardTab === 'surveys' && <SurveyManagement />}
        {dashboardTab === 'feedback' && <FeedbackCenter />}
        {dashboardTab === 'analytics' && <AnalyticsModule />}
        {dashboardTab === 'employer-brand' && <EmployerBrandModule />}
        {dashboardTab === 'reports' && <ReportsCenter />}
        {dashboardTab === 'settings' && <SettingsPanel />}
        {dashboardTab === 'help' && <HelpCenter />}
      </DashboardLayout>
    );
  }

  // Public Marketing routing
  return (
    <PublicLayout>
      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'features' && <FeaturesPage />}
      {currentPage === 'pricing' && <PricingPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'blog' && <BlogPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'careers' && <CareersPage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'signup' && <SignUpPage />}
    </PublicLayout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
      {/* Global prototype utilities */}
      <ToastContainer />
      <PrototypeController />
      <CommandPalette />
    </AppProvider>
  );
}
