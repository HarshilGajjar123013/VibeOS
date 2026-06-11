import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button, Card, Badge, Avatar } from '../components/ui/UIComponents';
import Showcase from '../components/ui/Showcase';
import Hero from '../components/ui/Hero';
import { MOCK_JOBS, MOCK_ARTICLES } from '../data/mockData';
import { 
  Check, 
  Mail, 
  Briefcase, 
  MapPin,
  Shield,
  Users,
  Heart,
  Sprout,
  Star,
  UserCheck,
  Sparkles,
  Zap
} from 'lucide-react';

// ==========================================
// CULTURE HEALTH DASHBOARD CARD (Mockup)
// ==========================================
const CultureHealthDashboard: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [chartScale, setChartScale] = useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setChartScale(1), 300);
    return () => clearTimeout(timer);
  }, []);

  const metrics = [
    { name: 'TRUST', score: 80, icon: Shield, color: '#6366f1', bg: 'rgba(99, 102, 241, 0.08)' },
    { name: 'ALIGNMENT', score: 72, icon: UserCheck, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.08)' },
    { name: 'WELLBEING', score: 62, icon: Heart, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)' },
    { name: 'GROWTH', score: 78, icon: Sprout, color: '#10b981', bg: 'rgba(16, 185, 129, 0.08)' },
    { name: 'RECOGNITION', score: 74, icon: Star, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)' },
    { name: 'BELONGING', score: 70, icon: Users, color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.08)' }
  ];

  const insights = [
    "Trust index is solid. Leadership transparency has improved alignment across departments.",
    "Alignment is stable. Cross-functional checkpoints are functioning well, but product and sales could sync closer.",
    "Wellbeing scores are lower compared to other areas. Workload and recovery time may be impacting your team's energy.",
    "Growth support is highly rated. Team members feel there are strong career development tracks and mentorship.",
    "Recognition scores are healthy. Celebrating small wins frequently has sustained motivation.",
    "Belonging shows moderate scores. Diverse team bonding channels are active, though remote squads require extra focus."
  ];

  const getRadarCoord = (index: number, value: number) => {
    const angle = (index * Math.PI) / 3;
    const radius = (value / 100) * 105; // Spanned slightly wider for fit
    const x = 150 + radius * Math.sin(angle);
    const y = 150 - radius * Math.cos(angle);
    return { x, y };
  };

  const getHexagonPoints = (lvl: number) => {
    return Array.from({ length: 6 }).map((_, i) => {
      const { x, y } = getRadarCoord(i, lvl);
      return `${x},${y}`;
    }).join(' ');
  };

  const polygonPoints = metrics.map((m, i) => {
    const { x, y } = getRadarCoord(i, m.score * chartScale);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      border: '1px solid var(--border-color)',
      padding: '32px',
      boxShadow: 'var(--shadow-xl)',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      width: '100%',
      maxWidth: '480px',
      margin: '0 auto',
      position: 'relative',
      fontFamily: 'var(--font-heading)'
    }}>
      {/* Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '0.05em', margin: 0 }}>CULTURE HEALTH</h4>
        <div style={{
          backgroundColor: '#f5f3ff',
          padding: '6px 12px',
          borderRadius: '12px',
          textAlign: 'right',
        }}>
          <div style={{ fontSize: '10px', color: '#7e53ff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Overall Score</div>
          <div style={{ fontSize: '18px', color: '#7e53ff', fontWeight: 800 }}>76/100</div>
        </div>
      </div>

      {/* Radar Map Container */}
      <div style={{
        height: '340px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: '10px'
      }}>
        {/* Radar Graphic SVG */}
        <svg viewBox="0 0 300 300" style={{ width: '220px', height: '220px', zIndex: 2 }}>
          {/* Hexagon Grids */}
          {[25, 50, 75, 100].map(lvl => (
            <polygon
              key={lvl}
              points={getHexagonPoints(lvl)}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="1.5"
            />
          ))}

          {/* Grid lines */}
          {Array.from({ length: 6 }).map((_, i) => {
            const { x, y } = getRadarCoord(i, 100);
            return (
              <line
                key={i}
                x1={150}
                y1={150}
                x2={x}
                y2={y}
                stroke="#f1f5f9"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
            );
          })}

          {/* Active Filled Area */}
          <polygon
            points={polygonPoints}
            fill="rgba(126, 83, 255, 0.15)"
            stroke="#7e53ff"
            strokeWidth="2.5"
            style={{ transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)' }}
          />

          {/* Radar Nodes */}
          {metrics.map((m, i) => {
            const { x, y } = getRadarCoord(i, m.score * chartScale);
            const isHovered = hoveredIndex === i;
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 4}
                  fill={isHovered ? m.color : '#7e53ff'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  style={{ transition: 'all 0.3s ease' }}
                />
              </g>
            );
          })}
        </svg>

        {/* Labels Absolute Placement */}
        {metrics.map((m, i) => {
          const isHovered = hoveredIndex === i;
          
          const positions = [
            { top: '-10px', left: '50%', transform: 'translateX(-50%)' }, // TRUST (top)
            { top: '65px', right: '-12px' }, // ALIGNMENT (top right)
            { bottom: '65px', right: '-12px' }, // WELLBEING (bottom right)
            { bottom: '-10px', left: '50%', transform: 'translateX(-50%)' }, // GROWTH (bottom)
            { bottom: '65px', left: '-12px' }, // RECOGNITION (bottom left)
            { top: '65px', left: '-12px' } // BELONGING (top left)
          ];

          const Icon = m.icon;

          return (
            <div
              key={m.name}
              style={{
                position: 'absolute',
                ...positions[i],
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 10px',
                borderRadius: '10px',
                backgroundColor: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.92)',
                border: isHovered ? `1.5px solid ${m.color}` : '1.5px solid rgba(226, 232, 240, 0.6)',
                boxShadow: isHovered ? `0 6px 14px ${m.bg}` : '0 2px 6px rgba(0,0,0,0.015)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                zIndex: 5,
                transform: `${positions[i].transform || ''} scale(${isHovered ? 1.05 : 1})`
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                backgroundColor: m.bg,
                color: m.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon size={12} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.02em' }}>{m.name}</span>
                <span style={{ fontSize: '10px', fontWeight: 700, color: m.color }}>{m.score}/100</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Insight Section */}
      <div style={{
        backgroundColor: '#fbfaff',
        borderRadius: '16px',
        padding: '16px 20px',
        display: 'flex',
        gap: '14px',
        border: '1px solid rgba(126, 83, 255, 0.08)',
        transition: 'all 0.3s ease',
        boxShadow: hoveredIndex !== null ? `inset 0 0 10px ${metrics[hoveredIndex].bg}` : 'none'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: hoveredIndex !== null ? metrics[hoveredIndex].bg : '#f5f3ff',
          color: hoveredIndex !== null ? metrics[hoveredIndex].color : '#7e53ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.3s ease'
        }}>
          {hoveredIndex !== null ? React.createElement(metrics[hoveredIndex].icon, { size: 16 }) : <Sparkles size={16} />}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 800,
            color: hoveredIndex !== null ? metrics[hoveredIndex].color : '#7e53ff',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease'
          }}>
            {hoveredIndex !== null ? `${metrics[hoveredIndex].name} INSIGHT` : 'AI INSIGHT'}
          </div>
          <p style={{
            fontSize: '13px',
            color: 'var(--text-main)',
            lineHeight: '1.45',
            margin: 0,
            transition: 'all 0.3s ease'
          }}>
            {hoveredIndex !== null ? insights[hoveredIndex] : insights[2]}
          </p>
          
          <button style={{
            alignSelf: 'flex-start',
            backgroundColor: 'transparent',
            border: '1px solid rgba(126, 83, 255, 0.25)',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '11px',
            fontWeight: 700,
            color: '#7e53ff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '4px',
            transition: 'all 0.2s ease'
          }} className="hover-lift">
            <Zap size={10} fill="#7e53ff" />
            View Recommended Actions
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// LANDING PAGE
// ==========================================
export const LandingPage: React.FC = () => {
  return (
    <div className="landing-page-wrapper" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Hero />

      <Showcase />

      {/* How it Works */}
      <section className="landing-how-it-works" style={{
        backgroundColor: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Badge type="info">METHODOLOGY</Badge>
            <h2 style={{ marginTop: '16px' }}>How Vibe OS works</h2>
          </div>
          <div className="landing-steps-grid">
            {[
              { 
                num: '1', 
                title: 'Capture Signals', 
                desc: 'Gather feedback, recognition, sentiment, and workplace experiences from across your organization.',
                sub: 'VibeOS continuously collects the human signals that reveal how people feel, collaborate, and perform.'
              },
              { 
                num: '2', 
                title: 'Generate Intelligence', 
                desc: 'Transform scattered feedback into clear organizational insights.',
                sub: 'Our AI identifies patterns, uncovers hidden risks, and surfaces opportunities leaders would otherwise miss.'
              },
              { 
                num: '3', 
                title: 'Drive Change', 
                desc: 'Turn intelligence into measurable cultural outcomes.',
                sub: 'Receive recommendations, track progress, and build stronger teams through informed action.'
              }
            ].map((step, i) => (
              <Card 
                key={i} 
                variant="outlined" 
                hoverEffect={true} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '16px', 
                  padding: '32px 28px',
                  borderRadius: '24px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {/* Number Circle Badge */}
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 800,
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  fontFamily: 'var(--font-heading)',
                  transition: 'all 0.3s ease',
                  boxShadow: 'inset 0 0 10px rgba(79, 70, 229, 0.05)'
                }} className="step-number-badge">
                  {step.num}
                </div>
                
                {/* Text Group */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>{step.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
                
                {/* Divider Line */}
                <hr style={{ border: 'none', borderTop: '1px dashed var(--border-color)', margin: '4px 0 0 0' }} />
                
                {/* Supporting Text */}
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', opacity: 0.85, lineHeight: '1.5', margin: 0, fontStyle: 'italic' }}>
                  {step.sub}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits split */}
      <section className="landing-benefits-section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Badge type="success">BENEFITS</Badge>
          <h2 style={{ fontSize: 'var(--fs-h2)', lineHeight: '1.2', fontWeight: 800 }}>The health of your organization shouldn't be a guessing game.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
              Founders can track revenue, runway, hiring, and product metrics in real time.
            </p>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
              Yet the factor that influences all of them—culture—often remains invisible.
            </p>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
              VibeOS makes organizational health measurable, giving leaders the clarity to build stronger teams, better managers, and companies that endure.
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '8px' }}>
            {[
              'Reveal what traditional metrics miss',
              'Spot risks before they affect growth',
              'Strengthen alignment at every level',
              'Build a culture that compounds over time'
            ].map(txt => (
              <div key={txt} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--success-light)',
                  color: 'var(--success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check size={14} strokeWidth={3} />
                </div>
                <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-main)' }}>{txt}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Culture Health Dashboard Mockup Card */}
        <div style={{
          backgroundColor: 'var(--primary-light)',
          padding: '40px',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 'inset 0 0 40px rgba(79, 70, 229, 0.03)'
        }} className="mobile-padding-sm">
          <CultureHealthDashboard />
        </div>
      </section>
    </div>
  );
};

// ==========================================
// FEATURES PAGE
// ==========================================
export const FeaturesPage: React.FC = () => {
  
  return (
    <div className="mobile-padding-y-lg mobile-padding-sm" style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px 80px 24px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
      <div style={{ textAlign: 'center' }}>
        <Badge type="info">DEEP DIVE</Badge>
        <h1 style={{ marginTop: '16px', fontSize: 'var(--fs-h2)' }}>Supercharge your team operations</h1>
        <p style={{ maxWidth: '600px', margin: '12px auto 0 auto' }}>
          Explore the tools and analysis metrics that make Vibe OS the leading culture operating system.
        </p>
      </div>

      {[
        { title: 'Research-backed Surveys', desc: 'Stop building questions blind. Utilize our suite of template forms calibrated across 6 cultural metrics including leadership alignment, workload pressure, and growth support.', features: ['Scheduled survey dispatches', 'Slack & MS Teams sync', 'Configurable anonymity locks'], rightSide: true },
        { title: 'Interactive Sentiment Map', desc: 'Read between the lines. Our AI processes open-form inputs and segments comments by department so managers know exactly where to apply resources.', features: ['Department correlation matrices', 'Word-association clustering', 'Neutral, positive, and negative sorting'], rightSide: false },
        { title: 'Action Recommendations Engine', desc: 'Feedback is useless without action. Vibe OS serves up contextual scripts and 1-on-1 discussion templates automatically when scores slide.', features: ['Weekly action checklists for leaders', 'Meeting cadences auditor', 'Auto-generated follow-up pulses'], rightSide: true }
      ].map((block, idx) => (
        <div key={idx} className="responsive-grid-2col" style={{
          alignItems: 'center'
        }}>
          {block.rightSide ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h2>{block.title}</h2>
                <p>{block.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {block.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-small)', fontWeight: 600 }}>
                      <Check size={16} style={{ color: 'var(--accent)' }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Card style={{ backgroundColor: 'var(--bg-main)', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Interactive Screen Preview</span>
              </Card>
            </>
          ) : (
            <>
              <Card style={{ backgroundColor: 'var(--bg-main)', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Interactive Screen Preview</span>
              </Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h2>{block.title}</h2>
                <p>{block.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {block.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-small)', fontWeight: 600 }}>
                      <Check size={16} style={{ color: 'var(--accent)' }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

// ==========================================
// PRICING PAGE
// ==========================================
export const PricingPage: React.FC = () => {
  const { setCurrentPage } = useApp();
  
  return (
    <div className="mobile-padding-y-lg mobile-padding-sm" style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px 80px 24px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
      <div style={{ textAlign: 'center' }}>
        <Badge type="info">TRANSPARENT PLANS</Badge>
        <h1 style={{ marginTop: '16px', fontSize: 'var(--fs-h2)' }}>Simple, scale-friendly pricing</h1>
        <p>Start free. Upgrade as you add people.</p>
      </div>

      <div className="responsive-grid-fit-300">
        {[
          { name: 'Starter', price: '$4', desc: 'Perfect for small teams launching feedback structures.', features: ['Up to 50 users', 'Weekly wellbeing pulses', 'Standard template library', 'Slack integration'], popular: false },
          { name: 'Growth', price: '$8', desc: 'Ideal for mid-sized squads scaling culture.', features: ['Up to 500 users', 'AI Insights Engine', 'Anonymous feedback feed', 'Custom survey builder', 'Priority support'], popular: true },
          { name: 'Enterprise', price: 'Custom', desc: 'Built for corporate-level customization.', features: ['Unlimited users', 'Custom SSO/SAML', 'Dedicated HR coach', 'API integration access', 'Custom SLAs'], popular: false }
        ].map((plan, i) => (
          <Card key={i} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            border: plan.popular ? '2px solid var(--primary)' : '1px solid var(--border-color)',
            transform: (plan.popular && typeof window !== 'undefined' && window.innerWidth > 768) ? 'scale(1.03)' : 'none'
          }}>
            {plan.popular && <Badge type="info">MOST POPULAR</Badge>}
            <div>
              <h3 style={{ fontSize: '24px' }}>{plan.name}</h3>
              <p style={{ fontSize: '13px' }}>{plan.desc}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '40px', fontWeight: 800 }}>{plan.price}</span>
              {plan.price !== 'Custom' && <span style={{ color: 'var(--text-muted)' }}>/ user / month</span>}
            </div>
            <Button variant={plan.popular ? 'primary' : 'secondary'} onClick={() => setCurrentPage('signup')}>
              {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
            </Button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
              {plan.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                  <Check size={16} style={{ color: 'var(--success)' }} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Compare Features</h2>
        <div className="table-scroll-container">
          <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ textAlign: 'left', padding: '12px' }}>Feature</th>
                <th>Starter</th>
                <th>Growth</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                { f: 'Anonymity Guarantees', s: 'Standard', g: 'Standard', e: 'Configurable' },
                { f: 'AI Insights Reports', s: 'No', g: 'Yes', e: 'Custom Models' },
                { f: 'Integrations', s: 'Slack only', g: 'All Standard', e: 'Custom API' },
                { f: 'SSO/SAML Login', s: 'No', g: 'No', e: 'Yes' }
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <td style={{ textAlign: 'left', padding: '12px', fontWeight: 500 }}>{row.f}</td>
                  <td>{row.s}</td>
                  <td>{row.g}</td>
                  <td>{row.e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// ABOUT PAGE
// ==========================================
export const AboutPage: React.FC = () => {
  return (
    <div className="mobile-padding-y-lg mobile-padding-sm" style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 24px 80px 24px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
      <div style={{ textAlign: 'center' }}>
        <Badge type="info">OUR STORY</Badge>
        <h1 style={{ marginTop: '16px', fontSize: 'var(--fs-h2)' }}>Building workplaces people love</h1>
        <p style={{ maxWidth: '650px', margin: '12px auto 0 auto' }}>
          We believe high-trust, psychologically safe environments are the blueprint for human innovation.
        </p>
      </div>

      <section className="responsive-grid-2col">
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ color: 'var(--primary)' }}>Mission</h3>
          <p>Transform employee feedback into meaningful workplace improvements.</p>
        </Card>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ color: 'var(--secondary)' }}>Vision</h3>
          <p>A world where every employee wakes up energized and feels appreciated.</p>
        </Card>
      </section>

      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>Our Values</h2>
        <div className="responsive-grid-fit-280">
          {['Transparency', 'Continuous Growth', 'Radical Inclusion', 'Empathetic Well-being'].map((v, i) => (
            <Card key={i} style={{ textAlign: 'center' }}>
              <h4 style={{ color: 'var(--accent)' }}>{v}</h4>
              <p style={{ fontSize: '13px', marginTop: '8px' }}>Guided in everything we draft, write, and build.</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>Leadership</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          {[
            { name: 'Alexander Wright', role: 'CEO & Co-founder', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
            { name: 'Marcus Sterling', role: 'Chief People Officer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
            { name: 'Helena Vance', role: 'Director of Engineering', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
          ].map((leader, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <Avatar src={leader.img} name={leader.name} size="xl" style={{ margin: '0 auto 16px auto' }} />
              <h3>{leader.name}</h3>
              <p style={{ fontSize: '14px' }}>{leader.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ==========================================
// BLOG PAGE
// ==========================================
export const BlogPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Workplace Culture', 'Well-being', 'Employer Brand', 'Company Growth'];

  const filteredArticles = activeFilter === 'All'
    ? MOCK_ARTICLES
    : MOCK_ARTICLES.filter(a => a.category === activeFilter);

  return (
    <div className="mobile-padding-y-lg mobile-padding-sm" style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 24px 80px 24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div style={{ textAlign: 'center' }}>
        <Badge type="info">RESOURCES</Badge>
        <h1 style={{ marginTop: '16px', fontSize: 'var(--fs-h2)' }}>The Culture Blueprint Blog</h1>
        <p>Insights and research regarding employee experiences.</p>
      </div>

      {/* Categories */}
      <div className="mobile-scroll-row" style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {filters.map(f => (
          <Button
            key={f}
            variant={activeFilter === f ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveFilter(f)}
            style={{ flexShrink: 0 }}
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div className="responsive-grid-fit-300">
        {filteredArticles.map(art => (
          <Card key={art.id} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Badge type="info">{art.category}</Badge>
            <div>
              <h3 style={{ fontSize: '20px' }}>{art.title}</h3>
              <p style={{ fontSize: '13px', margin: '8px 0 0 0' }}>{art.excerpt}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
              <div>
                <h4 style={{ fontSize: '14px' }}>{art.author}</h4>
                <p style={{ fontSize: '11px', margin: 0 }}>{art.authorRole} • {art.date}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Newsletter */}
      <Card variant="premium" style={{ textAlign: 'center', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }} className="mobile-padding-sm">
        <h3>Subscribe to our newsletter</h3>
        <p style={{ maxWidth: '500px' }}>Get weekly strategies and guides to improve your culture and team retention.</p>
        <div className="responsive-flex-row mobile-stack" style={{ width: '100%', maxWidth: '400px' }}>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-main)',
              color: 'var(--text-main)'
            }}
          />
          <Button>Subscribe</Button>
        </div>
      </Card>
    </div>
  );
};

// ==========================================
// CONTACT PAGE
// ==========================================
export const ContactPage: React.FC = () => {
  const { addToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Message sent! Our team will contact you shortly.', 'success');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="mobile-padding-y-lg mobile-padding-sm responsive-grid-2col" style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 24px 80px 24px', gap: '60px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <Badge type="info">TALK TO US</Badge>
          <h1 style={{ marginTop: '16px', fontSize: 'var(--fs-h2)' }}>Let's build a better workplace</h1>
        </div>
        <p>Contact our support team, get custom contract pricing, or arrange a personal presentation of the software dashboard.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Mail size={18} style={{ color: 'var(--primary)' }} />
            <span>sales@vibeos.com</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <MapPin size={18} style={{ color: 'var(--primary)' }} />
            <span>100 Pine St, San Francisco, CA</span>
          </div>
        </div>
      </div>

      <Card>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Message</label>
            <textarea
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={4}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', resize: 'vertical' }}
            />
          </div>
          <Button type="submit">Send Message</Button>
        </form>
      </Card>
    </div>
  );
};

// ==========================================
// CAREERS PAGE
// ==========================================
export const CareersPage: React.FC = () => {
  const { addToast } = useApp();

  return (
    <div className="mobile-padding-y-lg mobile-padding-sm" style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 24px 80px 24px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
      <div style={{ textAlign: 'center' }}>
        <Badge type="info">CAREERS</Badge>
        <h1 style={{ marginTop: '16px', fontSize: 'var(--fs-h2)' }}>Join the cultural revolution</h1>
        <p>Help us write the tools that make teams feel appreciated globally.</p>
      </div>

      <section className="responsive-grid-fit-280">
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3>Remote First</h3>
          <p style={{ fontSize: '13px' }}>Work from anywhere. We provide full home-office upgrades and coworking stipends.</p>
        </Card>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3>Unlimited Rest</h3>
          <p style={{ fontSize: '13px' }}>4 weeks minimum mandatory annual leave to rest, recharge, and enjoy life.</p>
        </Card>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3>Equity Ownership</h3>
          <p style={{ fontSize: '13px' }}>Every single hire receives stock options. We build, grow, and profit together.</p>
        </Card>
      </section>

      <section>
        <h2 style={{ marginBottom: '24px' }}>Open Positions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {MOCK_JOBS.map(job => (
            <Card key={job.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }} className="mobile-stack">
              <div>
                <h3 style={{ fontSize: '18px' }}>{job.title}</h3>
                <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Briefcase size={12} /> {job.department}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {job.location}</span>
                </div>
              </div>
              <Button size="sm" onClick={() => addToast(`Application modal opened for ${job.title}!`, 'info')}>Apply Now</Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

// ==========================================
// LOGIN PAGE
// ==========================================
export const LoginPage: React.FC = () => {
  const { setIsLoggedIn, setCurrentPage, addToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
    addToast('Welcome back, Alexander!', 'success');
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)' }} className="responsive-grid-2col">
      {/* Left panel - branding/quotes */}
      <div style={{
        backgroundColor: 'var(--primary-light)',
        padding: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '24px',
        borderRight: '1px solid var(--border-color)'
      }} className="hide-on-mobile">
        <h2 style={{ fontSize: '36px', fontWeight: 800 }}>"The best workspace is one built with trust."</h2>
        <p>Vibe OS helps organizations understand employee priorities to execute smart solutions in real time.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar name="Alexander Wright" size="sm" />
          <div>
            <h4 style={{ fontSize: '14px' }}>Alexander Wright</h4>
            <p style={{ fontSize: '12px', margin: 0 }}>CEO & Co-founder</p>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }} className="mobile-padding-sm">
        <div style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Welcome Back</h2>
            <p style={{ fontSize: '14px', marginTop: '4px' }}>Sign in to access your dashboard.</p>
          </div>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="alexander@company.com"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)', color: 'var(--text-main)' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)', color: 'var(--text-main)' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" /> Remember me
              </label>
              <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 500 }} onClick={() => addToast('Password reset link sent!', 'info')}>Forgot password?</span>
            </div>
            <Button type="submit">Sign In</Button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
            <hr style={{ flex: 1, borderColor: 'var(--border-color)' }} />
            <span style={{ fontSize: '12px' }}>OR</span>
            <hr style={{ flex: 1, borderColor: 'var(--border-color)' }} />
          </div>

          <Button variant="secondary" onClick={submit}>Sign in with Google</Button>

          <p style={{ textAlign: 'center', fontSize: '14px' }}>
            New to Vibe OS? <span style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setCurrentPage('signup')}>Start Free Trial</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SIGN UP PAGE
// ==========================================
export const SignUpPage: React.FC = () => {
  const { setCurrentPage, addToast } = useApp();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage('onboarding');
    addToast('Account created! Welcome to Vibe OS.', 'success');
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)' }} className="responsive-grid-2col">
      {/* Left panel */}
      <div style={{
        backgroundColor: 'var(--secondary-light)',
        padding: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '24px',
        borderRight: '1px solid var(--border-color)'
      }} className="hide-on-mobile">
        <h2 style={{ fontSize: '36px', fontWeight: 800 }}>"Retention starts with understanding."</h2>
        <p>Start your 14-day free trial today. Join over 5,000 corporate structures using Vibe OS dashboard analysis.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['Instant Slack integrations', '45+ pre-built survey templates', 'AI-driven sentiment summaries', '100% cryptographic anonymity'].map(x => (
            <div key={x} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600 }}>
              <Check size={16} style={{ color: 'var(--primary)' }} />
              <span>{x}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }} className="mobile-padding-sm">
        <div style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Create Your Account</h2>
            <p style={{ fontSize: '14px', marginTop: '4px' }}>No credit card required. Cancel anytime.</p>
          </div>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Alexander Wright"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)', color: 'var(--text-main)' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="alexander@company.com"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)', color: 'var(--text-main)' }}
              />
            </div>
            <Button type="submit">Create Account</Button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '14px' }}>
            Already have an account? <span style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setCurrentPage('login')}>Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
};
