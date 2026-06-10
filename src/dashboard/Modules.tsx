import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, Button, Badge, ProgressBar } from '../components/ui/UIComponents';
import { LineChart, BarChart } from '../components/charts/CustomCharts';
import { MOCK_SURVEYS, MOCK_FEEDBACK } from '../data/mockData';
import { 
  Filter, 
  Download, 
  FileText, 
  Trash2, 
  Plus, 
  Eye, 
  Megaphone,
  Share2, 
  Layers,
  FileSpreadsheet
} from 'lucide-react';

// ==========================================
// ANALYTICS MODULE
// ==========================================
export const AnalyticsModule: React.FC = () => {
  const { addToast } = useApp();
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedLoc, setSelectedLoc] = useState('All');

  const chartData = [
    { label: 'Trust', value: selectedDept === 'Engineering' ? 86 : 80 },
    { label: 'Alignment', value: selectedDept === 'Sales' ? 78 : 84 },
    { label: 'Recognition', value: selectedDept === 'Design' ? 90 : 76 },
    { label: 'Well-being', value: selectedDept === 'Product' ? 80 : 88 },
    { label: 'Growth', value: 85 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: 'var(--fs-h3)', fontWeight: 800 }}>Deep Culture Analytics</h1>
          <p>Filter engagement scores and analyze correlations by department or location.</p>
        </div>
        <Button icon={<Download size={14} />} onClick={() => addToast('Exporting analytics charts...', 'success')}>Export Analytics</Button>
      </div>

      {/* Filter Bar */}
      <Card style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', padding: '16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600 }}>
          <Filter size={16} /> Filters:
        </div>
        
        {/* Dept filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Department</span>
          <select
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Product">Product</option>
            <option value="Design">Design</option>
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
          </select>
        </div>

        {/* Location filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Location</span>
          <select
            value={selectedLoc}
            onChange={e => setSelectedLoc(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}
          >
            <option value="All">All Locations</option>
            <option value="San Francisco">San Francisco, CA</option>
            <option value="New York">New York, NY</option>
            <option value="London">London, UK</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
      </Card>

      {/* Analytics Charts split */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <Card>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Culture Drivers Breakdown ({selectedDept} Dept)</h3>
          <BarChart data={chartData} height={200} color="var(--primary)" />
        </Card>
        
        <Card>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Monthly Historical Trajectory</h3>
          <LineChart data={[
            { label: 'Jan', value: 74 },
            { label: 'Feb', value: 76 },
            { label: 'Mar', value: 80 },
            { label: 'Apr', value: 78 },
            { label: 'May', value: 82 }
          ]} height={200} color="var(--secondary)" />
        </Card>
      </div>

      {/* Driver analysis breakdown */}
      <Card>
        <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Driver Metric Summaries</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {chartData.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>{d.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '220px' }}>
                <ProgressBar percent={d.value} height={6} color={d.value >= 85 ? 'var(--success)' : d.value >= 78 ? 'var(--secondary)' : 'var(--warning)'} />
                <span style={{ fontWeight: 'bold', minWidth: '32px', textAlign: 'right' }}>{d.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ==========================================
// SURVEY MANAGEMENT (SURVEY BUILDER)
// ==========================================
export const SurveyManagement: React.FC = () => {
  const { addToast } = useApp();
  const [showBuilder, setShowBuilder] = useState(false);
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState<{ id: string; text: string; type: string }[]>([]);
  const [newQText, setNewQText] = useState('');
  const [newQType, setNewQType] = useState('rating');

  const addQuestion = () => {
    if (!newQText.trim()) return;
    setQuestions(prev => [...prev, { id: Math.random().toString(), text: newQText, type: newQType }]);
    setNewQText('');
  };

  const removeQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const saveSurvey = () => {
    if (!surveyTitle.trim() || questions.length === 0) {
      addToast('Please enter a survey title and add at least one question.', 'error');
      return;
    }
    addToast(`Survey "${surveyTitle}" created and scheduled!`, 'success');
    setSurveyTitle('');
    setQuestions([]);
    setShowBuilder(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: 'var(--fs-h3)', fontWeight: 800 }}>Surveys & Pulse Auditing</h1>
          <p>Schedule survey dispatches, edit custom builder blocks, or inspect past reports.</p>
        </div>
        {!showBuilder ? (
          <Button icon={<Plus size={16} />} onClick={() => setShowBuilder(true)}>Create Survey</Button>
        ) : (
          <Button variant="secondary" onClick={() => setShowBuilder(false)}>Cancel Builder</Button>
        )}
      </div>

      {/* Builder Module View */}
      {showBuilder ? (
        <Card variant="premium" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Vibe Survey Builder</h2>
            <p>Develop custom feedback forms with rating scales, emoji responses, or text areas.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Survey Title</label>
              <input
                type="text"
                placeholder="e.g. Q3 Focus Work Assessment"
                value={surveyTitle}
                onChange={e => setSurveyTitle(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '15px' }}
              />
            </div>

            {/* Questions list */}
            {questions.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600 }}>Survey Questions</h4>
                {questions.map((q, idx) => (
                  <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '14px' }}>{idx + 1}. <strong>{q.text}</strong> ({q.type.toUpperCase()})</span>
                    <button onClick={() => removeQuestion(q.id)} style={{ border: 'none', background: 'transparent', color: 'var(--danger)', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add question tool */}
            <div style={{ border: '1px dashed var(--border-color)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 600 }}>Add New Question</h4>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Question prompt (e.g. How supported do you feel by leadership?)"
                  value={newQText}
                  onChange={e => setNewQText(e.target.value)}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '14px' }}
                />
                <select
                  value={newQType}
                  onChange={e => setNewQType(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '13px' }}
                >
                  <option value="rating">Rating Scale (1-10)</option>
                  <option value="open">Open Text response</option>
                  <option value="emoji">Emoji Mood Reaction</option>
                  <option value="nps">NPS slider</option>
                </select>
                <Button variant="secondary" onClick={addQuestion}>Add question</Button>
              </div>
            </div>
          </div>

          <Button style={{ alignSelf: 'flex-end' }} onClick={saveSurvey}>Save Survey & Schedule</Button>
        </Card>
      ) : (
        /* Standard surveys view */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {MOCK_SURVEYS.map(sur => (
            <Card key={sur.id} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Badge type={sur.status === 'active' ? 'success' : sur.status === 'closed' ? 'neutral' : 'warning'}>
                  {sur.status.toUpperCase()}
                </Badge>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sur.category}</span>
              </div>
              <div>
                <h3 style={{ fontSize: '18px' }}>{sur.title}</h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Closes: {sur.closesOn}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)' }}>
                <span>Participation Rate</span>
                <strong>{sur.participationRate}%</strong>
              </div>
              <ProgressBar percent={sur.participationRate} height={6} />
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <Button variant="secondary" size="sm" style={{ flex: 1 }} icon={<Eye size={14} />} onClick={() => addToast('Opening survey preview mode...', 'info')}>
                  Preview
                </Button>
                <Button size="sm" style={{ flex: 1 }} onClick={() => addToast(`Viewing full survey results for s-${sur.id}`, 'info')}>
                  View Results
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// ==========================================
// FEEDBACK CENTER (ANONYMOUS MODERATION FEED)
// ==========================================
export const FeedbackCenter: React.FC = () => {
  const { addToast } = useApp();
  const [filterCategory, setFilterCategory] = useState('All');
  const [feedbackList, setFeedbackList] = useState(MOCK_FEEDBACK);
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  const handleUpvote = (id: string) => {
    setFeedbackList(prev =>
      prev.map(f => (f.id === id ? { ...f, upvotes: f.upvotes + 1 } : f))
    );
    addToast('Upvoted feedback issue!', 'success');
  };

  const handleAddReply = (id: string) => {
    const text = replyText[id];
    if (!text || !text.trim()) return;

    setFeedbackList(prev =>
      prev.map(f => (f.id === id ? { ...f, replies: f.replies + 1 } : f))
    );
    addToast('Reply posted to anonymous board!', 'success');
    setReplyText(prev => ({ ...prev, [id]: '' }));
  };

  const filteredFeed = filterCategory === 'All'
    ? feedbackList
    : feedbackList.filter(f => f.category === filterCategory);

  const categories = ['All', 'Workplace Flexibility', 'Career Growth', 'Company Alignment', 'Workplace Environment', 'Compensation & Benefits'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: 'var(--fs-h3)', fontWeight: 800 }}>Anonymous Feedback Feed</h1>
        <p>A completely secure, encrypted workspace board where workers exchange culture ideas.</p>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <Button
            key={cat}
            variant={filterCategory === cat ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilterCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Feed list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredFeed.map(feed => (
          <Card key={feed.id} hoverEffect={false} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Badge type={feed.mood === 'positive' ? 'success' : feed.mood === 'negative' ? 'danger' : 'warning'}>
                  {feed.mood.toUpperCase()}
                </Badge>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>{feed.category}</span>
              </div>
              <Badge type="neutral">{feed.status.replace('_', ' ').toUpperCase()}</Badge>
            </div>
            
            <p style={{ fontSize: '15px', lineHeight: 1.6 }}>"{feed.content}"</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <span style={{ cursor: 'pointer' }} onClick={() => handleUpvote(feed.id)}>👍 {feed.upvotes} Upvotes</span>
                <span>💬 {feed.replies} Replies</span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Posted {feed.date}</span>
            </div>

            {/* Simulating replies input */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <input
                type="text"
                placeholder="Reply anonymously to this card..."
                value={replyText[feed.id] || ''}
                onChange={e => setReplyText({ ...replyText, [feed.id]: e.target.value })}
                style={{ flex: 1, padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '13px' }}
              />
              <Button size="sm" onClick={() => handleAddReply(feed.id)}>Reply</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// EMPLOYER BRAND MODULE
// ==========================================
export const EmployerBrandModule: React.FC = () => {
  const { addToast } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: 'var(--fs-h3)', fontWeight: 800 }}>Employer Brand highlights</h1>
          <p>Package internal culture successes and achievements into shareable recruiting campaign logs.</p>
        </div>
        <Button icon={<Megaphone size={14} />} onClick={() => addToast('New recruitment campaign initialized!', 'success')}>Launch Campaign</Button>
      </div>

      {/* Dashboard split */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Culture stories */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '18px' }}>Active Culture Stories</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { title: 'The Permanency of Focus Fridays', clicks: 245, shares: 62 },
              { title: 'Engineering Teammate Spotlights', clicks: 189, shares: 48 },
              { title: 'Wellbeing stipend audit of 2026', clicks: 92, shares: 14 }
            ].map((story, i) => (
              <div key={i} style={{ padding: '12px', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700 }}>{story.title}</h4>
                <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: 'var(--text-muted)' }}>
                  <span>👁️ {story.clicks} Clicks</span>
                  <span>🔗 {story.shares} Shares</span>
                </div>
                <Button size="sm" variant="secondary" style={{ alignSelf: 'flex-end' }} icon={<Share2 size={12} />} onClick={() => addToast(`Story link copied to clipboard!`, 'success')}>
                  Share Link
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Campaign graphs */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '18px' }}>Campaign Engagement metrics</h3>
          <LineChart data={[
            { label: 'Week 1', value: 34 },
            { label: 'Week 2', value: 45 },
            { label: 'Week 3', value: 68 },
            { label: 'Week 4', value: 92 }
          ]} height={180} color="var(--accent)" />
        </Card>
      </div>
    </div>
  );
};

// ==========================================
// REPORTS CENTER
// ==========================================
export const ReportsCenter: React.FC = () => {
  const { addToast } = useApp();
  const [compiling, setCompiling] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);

  const startCompilation = (format: string) => {
    setCompiling(true);
    setCompileProgress(0);
    const interval = setInterval(() => {
      setCompileProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCompiling(false);
          addToast(`Culture report exported successfully in ${format} format!`, 'success');
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: 'var(--fs-h3)', fontWeight: 800 }}>Reports & Document Exporter</h1>
        <p>Compile weekly, monthly, or quarterly culture health updates for board meetings.</p>
      </div>

      <Card style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ fontSize: '18px' }}>Configure Report Parameters</h3>
        
        {compiling ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span>Compiling tables, heatmaps, and sentiment charts...</span>
            <ProgressBar percent={compileProgress} height={8} color="var(--primary)" />
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <Button size="lg" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '24px' }} variant="secondary" onClick={() => startCompilation('PDF')}>
              <FileText size={32} style={{ color: 'var(--danger)' }} />
              <span>Export PDF Document</span>
            </Button>
            <Button size="lg" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '24px' }} variant="secondary" onClick={() => startCompilation('Excel')}>
              <FileSpreadsheet size={32} style={{ color: 'var(--success)' }} />
              <span>Export Excel Sheets</span>
            </Button>
            <Button size="lg" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '24px' }} variant="secondary" onClick={() => startCompilation('Powerpoint')}>
              <Layers size={32} style={{ color: 'var(--primary)' }} />
              <span>Export PowerPoint Slides</span>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
