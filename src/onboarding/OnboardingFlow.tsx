import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Button, Card, ProgressBar } from '../components/ui/UIComponents';
import { Sparkles, Building2, Target, Users2, Sliders, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

export const OnboardingFlow: React.FC = () => {
  const {
    onboardingStep,
    setOnboardingStep,
    companyName,
    setCompanyName,
    companySubdomain,
    setCompanySubdomain,
    selectedGoals,
    toggleGoal,
    teamSize,
    setTeamSize,
    featurePreferences,
    togglePreference,
    setIsLoggedIn,
    setCurrentPage,
    addToast
  } = useApp();

  const [loadingWorkspace, setLoadingWorkspace] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const stepsCount = 6;
  const progressPercent = ((onboardingStep - 1) / (stepsCount - 1)) * 100;

  // Custom Confetti pieces state
  const [confetti, setConfetti] = useState<{ id: number; left: number; color: string; delay: number; size: number }[]>([]);

  useEffect(() => {
    if (onboardingStep === 6) {
      // Generate confetti pieces
      const colors = ['#4F46E5', '#3B82F6', '#10B981', '#F59E0B', '#F43F5E', '#8B5CF6'];
      const pieces = Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100, // percentage
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2, // seconds
        size: Math.random() * 10 + 6 // px
      }));
      setConfetti(pieces);

      // Simulate workspace setup progress
      setLoadingWorkspace(true);
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoadingWorkspace(false);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    } else {
      setLoadingProgress(0);
      setLoadingWorkspace(false);
    }
  }, [onboardingStep]);

  const handleNext = () => {
    if (onboardingStep < stepsCount) {
      setOnboardingStep(onboardingStep + 1);
    }
  };

  const handleBack = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(onboardingStep - 1);
    }
  };

  const handleFinish = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
    addToast('Welcome to your Vibe OS workspace!', 'success');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--bg-main)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Confetti canvas overlay */}
      {onboardingStep === 6 && confetti.map(c => (
        <div
          key={c.id}
          style={{
            position: 'absolute',
            top: '-20px',
            left: `${c.left}%`,
            width: `${c.size}px`,
            height: `${c.size}px`,
            backgroundColor: c.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            opacity: 0.8,
            animation: 'confetti 3.5s linear infinite',
            animationDelay: `${c.delay}s`,
            zIndex: 100
          }}
        />
      ))}

      {/* Navigation Header */}
      <header style={{
        padding: '20px 40px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>V</div>
          <span style={{ fontWeight: 800, fontSize: '20px', fontFamily: 'var(--font-heading)' }}>Vibe OS</span>
        </div>
        
        {onboardingStep < 6 && (
          <span style={{ fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-muted)' }}>
            Step {onboardingStep} of {stepsCount - 1}
          </span>
        )}
      </header>

      {/* Progress Bar */}
      {onboardingStep < 6 && (
        <ProgressBar percent={progressPercent} height={4} color="var(--primary)" />
      )}

      {/* Main Flow Container */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        zIndex: 10
      }}>
        <div style={{ width: '100%', maxWidth: '620px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* STEP 1: WELCOME */}
          {onboardingStep === 1 && (
            <Card variant="premium" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'center', alignItems: 'center' }}>
              <div style={{
                color: 'var(--primary)',
                backgroundColor: 'var(--primary-light)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={32} />
              </div>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>Welcome to Vibe OS</h1>
                <p style={{ marginTop: '8px' }}>Let's build a workplace people love. We'll help you configure a workspace customized to your organization's unique requirements.</p>
              </div>
              <Button size="lg" style={{ width: '100%' }} onClick={handleNext}>
                Get Started <ChevronRight size={18} />
              </Button>
            </Card>
          )}

          {/* STEP 2: COMPANY INFORMATION */}
          {onboardingStep === 2 && (
            <Card style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Building2 size={24} style={{ color: 'var(--primary)' }} />
                <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Tell us about your company</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '15px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Workspace URL</label>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                    <input
                      type="text"
                      value={companySubdomain}
                      onChange={e => setCompanySubdomain(e.target.value)}
                      style={{ flex: 1, padding: '12px 16px', border: 'none', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '15px' }}
                    />
                    <span style={{ padding: '12px 16px', backgroundColor: 'var(--border-color)', color: 'var(--text-muted)', fontSize: '14px', fontWeight: 600 }}>.vibeos.com</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '12px' }}>
                <Button variant="secondary" onClick={handleBack} icon={<ChevronLeft size={16} />}>Back</Button>
                <Button onClick={handleNext} disabled={!companyName || !companySubdomain}>Continue</Button>
              </div>
            </Card>
          )}

          {/* STEP 3: GOALS SELECTION */}
          {onboardingStep === 3 && (
            <Card style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Target size={24} style={{ color: 'var(--primary)' }} />
                <h2 style={{ fontSize: '24px', fontWeight: 800 }}>What are your culture goals?</h2>
              </div>
              <p style={{ fontSize: '14px' }}>Select all that apply to fine-tune our AI suggestions engine.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                {[
                  { id: 'burnout', title: 'Reduce Employee Burnout', desc: 'Identify and address team work pressures and bottlenecks early.' },
                  { id: 'retention', title: 'Improve Talent Retention', desc: 'Pinpoint why people leave and build reasons for them to stay.' },
                  { id: 'feedback', title: 'Increase Feedback Transparency', desc: 'Encourage safe, cryptographic anonymous updates and dialogue.' },
                  { id: 'employer-brand', title: 'Boost Employer Branding', desc: 'Share organic team highlights to simplify external recruiting.' }
                ].map(goal => {
                  const isSelected = selectedGoals.includes(goal.id);
                  return (
                    <div
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      style={{
                        padding: '16px',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-main)',
                        cursor: 'pointer',
                        transition: 'all 200ms ease'
                      }}
                      className="hover-lift"
                    >
                      <h4 style={{ fontSize: '16px', fontWeight: 700, color: isSelected ? 'var(--primary)' : 'var(--text-main)' }}>{goal.title}</h4>
                      <p style={{ fontSize: '13px', marginTop: '4px', color: 'var(--text-muted)' }}>{goal.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '12px' }}>
                <Button variant="secondary" onClick={handleBack} icon={<ChevronLeft size={16} />}>Back</Button>
                <Button onClick={handleNext}>Continue</Button>
              </div>
            </Card>
          )}

          {/* STEP 4: TEAM SIZE */}
          {onboardingStep === 4 && (
            <Card style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Users2 size={24} style={{ color: 'var(--primary)' }} />
                <h2 style={{ fontSize: '24px', fontWeight: 800 }}>How large is your organization?</h2>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {['1-50', '51-200', '201-1000', '1000+'].map(size => {
                  const isSelected = teamSize === size;
                  return (
                    <div
                      key={size}
                      onClick={() => setTeamSize(size)}
                      style={{
                        padding: '24px 16px',
                        textAlign: 'center',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-card)',
                        cursor: 'pointer',
                        fontSize: '18px',
                        fontWeight: 700,
                        transition: 'all 200ms ease'
                      }}
                      className="hover-lift"
                    >
                      {size}
                      <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)', marginTop: '4px' }}>employees</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '12px' }}>
                <Button variant="secondary" onClick={handleBack} icon={<ChevronLeft size={16} />}>Back</Button>
                <Button onClick={handleNext}>Continue</Button>
              </div>
            </Card>
          )}

          {/* STEP 5: FEATURE PREFERENCES */}
          {onboardingStep === 5 && (
            <Card style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Sliders size={24} style={{ color: 'var(--primary)' }} />
                <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Configure active components</h2>
              </div>
              <p style={{ fontSize: '14px' }}>Choose which modules to enable by default. You can change this in Settings at any time.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { id: 'surveys', title: 'Survey Manager', desc: 'Deploy pulses, wellbeing updates, and manager evaluations.' },
                  { id: 'ai-insights', title: 'AI Insights Engine', desc: 'Automatically distill open text and compile sentiment scores.' },
                  { id: 'feedback', title: 'Anonymous Feedback Feed', desc: 'A secure board for comments, reports, and questions.' },
                  { id: 'branding', title: 'Employer Brand highlights', desc: 'Highlight employee-led culture logs to external recruiting.' }
                ].map(pref => {
                  const isChecked = featurePreferences.includes(pref.id);
                  return (
                    <label
                      key={pref.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-card)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ marginRight: '16px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{pref.title}</h4>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{pref.desc}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => togglePreference(pref.id)}
                        style={{
                          width: '20px',
                          height: '20px',
                          accentColor: 'var(--primary)',
                          cursor: 'pointer'
                        }}
                      />
                    </label>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '12px' }}>
                <Button variant="secondary" onClick={handleBack} icon={<ChevronLeft size={16} />}>Back</Button>
                <Button onClick={handleNext}>Finish Setup</Button>
              </div>
            </Card>
          )}

          {/* STEP 6: CELEBRATION */}
          {onboardingStep === 6 && (
            <Card variant="premium" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ color: 'var(--success)' }}>
                <CheckCircle2 size={64} style={{ animation: 'float 4s ease-in-out infinite' }} />
              </div>
              <div>
                <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Workspace configured successfully!</h1>
                <p style={{ marginTop: '8px' }}>We've established <strong>{companyName}</strong>'s custom Culture Matrix dashboard.</p>
              </div>

              {loadingWorkspace ? (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <ProgressBar percent={loadingProgress} height={6} color="var(--success)" />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {loadingProgress < 40 && 'Syncing database hooks...'}
                    {loadingProgress >= 40 && loadingProgress < 80 && 'Generating survey pulse cycles...'}
                    {loadingProgress >= 80 && 'Deploying premium charts...'}
                  </span>
                </div>
              ) : (
                <Button size="lg" style={{ width: '100%', backgroundColor: 'var(--success)' }} onClick={handleFinish}>
                  Enter Vibe OS Dashboard
                </Button>
              )}
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};
