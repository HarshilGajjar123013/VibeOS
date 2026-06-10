import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button, Card, Badge, Avatar } from '../components/ui/UIComponents';
import Showcase from '../components/ui/Showcase';
import Hero from '../components/ui/Hero';
import { FeaturesGrid } from '../components/ui/FeaturesGrid';
import { MOCK_JOBS, MOCK_ARTICLES } from '../data/mockData';
import { 
  Check, 
  Mail, 
  Briefcase, 
  MapPin 
} from 'lucide-react';

// ==========================================
// LANDING PAGE
// ==========================================
export const LandingPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', width: '100%' }}>
      <Hero />

      <Showcase />

      <FeaturesGrid />

      {/* How it Works */}
      <section style={{
        backgroundColor: 'var(--bg-card)',
        padding: '80px 24px',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Badge type="info">METHODOLOGY</Badge>
            <h2 style={{ marginTop: '16px' }}>How Vibe OS works</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', position: 'relative' }}>
            {[
              { num: '1', title: 'Collect Feedback', desc: 'Send automated pulses or wellbeing surveys. Team members reply anonymously in 30 seconds via Slack, Teams, or Web.' },
              { num: '2', title: 'Analyze Trends', desc: 'Our AI model aggregates opinions, calculates sentiment indices, and highlights departments requiring supervisor support.' },
              { num: '3', title: 'Transform Culture', desc: 'Turn findings into plans. Recommend targeted manager actions, share highlights, and track improvement over time.' }
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: 900,
                  color: 'var(--primary-light)',
                  lineHeight: 1,
                  fontFamily: 'var(--font-heading)'
                }}>{step.num}</div>
                <h3 style={{ fontSize: '22px' }}>{step.title}</h3>
                <p style={{ fontSize: '15px' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits split */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Badge type="success">BENEFITS</Badge>
          <h2>Build a workplace people never want to leave</h2>
          <p>
            Vibe OS doesn't just collect survey submissions. It builds communication frameworks, helps managers lead, and helps leadership protect psychological safety.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Reduce burnout risk with early warnings', 'Retain your top engineers, designers, and reps', 'Align multiple offices and distributed squads', 'Measure improvement of company values'].map(txt => (
              <div key={txt} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Check size={18} style={{ color: 'var(--success)', flexShrink: 0 }} />
                <span style={{ fontWeight: 600 }}>{txt}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          backgroundColor: 'var(--primary-light)',
          padding: '40px',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-card)',
            padding: '24px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-xl)',
            width: '100%'
          }}>
            <h4 style={{ marginBottom: '16px' }}>Team Retention Benefit</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: 'var(--fs-small)' }}>
              <span>Turnover Rate</span>
              <span style={{ color: 'var(--success)', fontWeight: 600 }}>-28% YoY</span>
            </div>
            <div style={{ height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '42%', height: '100%', backgroundColor: 'var(--success)' }} />
            </div>
          </div>
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px 80px 24px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
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
        <div key={idx} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '60px',
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px 80px 24px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
      <div style={{ textAlign: 'center' }}>
        <Badge type="info">TRANSPARENT PLANS</Badge>
        <h1 style={{ marginTop: '16px', fontSize: 'var(--fs-h2)' }}>Simple, scale-friendly pricing</h1>
        <p>Start free. Upgrade as you add people.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
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
            transform: plan.popular ? 'scale(1.03)' : 'none'
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
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
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
  );
};

// ==========================================
// ABOUT PAGE
// ==========================================
export const AboutPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 24px 80px 24px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
      <div style={{ textAlign: 'center' }}>
        <Badge type="info">OUR STORY</Badge>
        <h1 style={{ marginTop: '16px', fontSize: 'var(--fs-h2)' }}>Building workplaces people love</h1>
        <p style={{ maxWidth: '650px', margin: '12px auto 0 auto' }}>
          We believe high-trust, psychologically safe environments are the blueprint for human innovation.
        </p>
      </div>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
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
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 24px 80px 24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div style={{ textAlign: 'center' }}>
        <Badge type="info">RESOURCES</Badge>
        <h1 style={{ marginTop: '16px', fontSize: 'var(--fs-h2)' }}>The Culture Blueprint Blog</h1>
        <p>Insights and research regarding employee experiences.</p>
      </div>

      {/* Categories */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {filters.map(f => (
          <Button
            key={f}
            variant={activeFilter === f ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
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
      <Card variant="premium" style={{ textAlign: 'center', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <h3>Subscribe to our newsletter</h3>
        <p style={{ maxWidth: '500px' }}>Get weekly strategies and guides to improve your culture and team retention.</p>
        <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '400px' }}>
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
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 24px 80px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px' }}>
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
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 24px 80px 24px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
      <div style={{ textAlign: 'center' }}>
        <Badge type="info">CAREERS</Badge>
        <h1 style={{ marginTop: '16px', fontSize: 'var(--fs-h2)' }}>Join the cultural revolution</h1>
        <p>Help us write the tools that make teams feel appreciated globally.</p>
      </div>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
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
            <Card key={job.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
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
    <div style={{ minHeight: 'calc(100vh - 80px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
      {/* Left panel - branding/quotes */}
      <div style={{
        backgroundColor: 'var(--primary-light)',
        padding: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '24px',
        borderRight: '1px solid var(--border-color)'
      }}>
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
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
    <div style={{ minHeight: 'calc(100vh - 80px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
      {/* Left panel */}
      <div style={{
        backgroundColor: 'var(--secondary-light)',
        padding: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '24px',
        borderRight: '1px solid var(--border-color)'
      }}>
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
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
