import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, Button, Badge, Avatar, ProgressBar } from '../components/ui/UIComponents';
import { LineChart, Heatmap, PieChart } from '../components/charts/CustomCharts';
import { MOCK_COMPANY_STATS, MOCK_SURVEYS, MOCK_FEEDBACK, MOCK_RECOGNITION } from '../data/mockData';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Lightbulb, 
  CheckSquare, 
  Smile,
  Compass, 
  Award, 
  BookOpen, 
  Heart,
  Plus,
  Send
} from 'lucide-react';

// ==========================================
// EXECUTIVE DASHBOARD
// ==========================================
export const ExecutiveDashboard: React.FC = () => {
  const { addToast } = useApp();
  
  const engagementTrendData = [
    { label: 'Jan', value: 76 },
    { label: 'Feb', value: 78 },
    { label: 'Mar', value: 77 },
    { label: 'Apr', value: 80 },
    { label: 'May', value: 79 },
    { label: 'Jun', value: 82 }
  ];

  const burnoutRiskData = [
    { label: 'Low', value: 74, color: 'var(--success)' },
    { label: 'Moderate', value: 22, color: 'var(--warning)' },
    { label: 'High', value: 4, color: 'var(--danger)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Welcome */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: 'var(--fs-h3)', fontWeight: 800 }}>Executive Overview</h1>
          <p>Key cultural indicators and insights for the corporate workforce.</p>
        </div>
        <Button onClick={() => addToast('Executive Culture Report Compiled!', 'success')}>Export Summary</Button>
      </div>

      {/* Metrics Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <Card hoverEffect={true} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-md)' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}>Engagement Score</span>
            <h3 style={{ fontSize: '28px', fontWeight: 800 }}>{MOCK_COMPANY_STATS.engagementScore}%</h3>
            <span style={{ fontSize: '11px', color: 'var(--success)' }}>▲ 4.2% this month</span>
          </div>
        </Card>
        <Card hoverEffect={true} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', backgroundColor: 'var(--secondary-light)', color: 'var(--secondary)', borderRadius: 'var(--radius-md)' }}>
            <Users size={24} />
          </div>
          <div>
            <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}>Participation Rate</span>
            <h3 style={{ fontSize: '28px', fontWeight: 800 }}>{MOCK_COMPANY_STATS.participationRate}%</h3>
            <span style={{ fontSize: '11px', color: 'var(--success)' }}>▲ 1.5% this month</span>
          </div>
        </Card>
        <Card hoverEffect={true} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', backgroundColor: 'var(--warning-light)', color: 'var(--warning)', borderRadius: 'var(--radius-md)' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}>Burnout Risk Index</span>
            <h3 style={{ fontSize: '28px', fontWeight: 800 }}>Low</h3>
            <span style={{ fontSize: '11px', color: 'var(--danger)' }}>▲ 4% high risk</span>
          </div>
        </Card>
        <Card hoverEffect={true} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', backgroundColor: 'var(--accent-light)', color: 'var(--accent)', borderRadius: 'var(--radius-md)' }}>
            <Smile size={24} />
          </div>
          <div>
            <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}>Culture Health Index</span>
            <h3 style={{ fontSize: '28px', fontWeight: 800 }}>{MOCK_COMPANY_STATS.cultureHealthIndex} <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/ 100</span></h3>
            <span style={{ fontSize: '11px', color: 'var(--success)' }}>▲ Excellent standing</span>
          </div>
        </Card>
      </div>

      {/* Main Grid: Trends & Burnout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px' }}>Engagement Score Trend</h3>
            <Badge type="info">6 Months</Badge>
          </div>
          <LineChart data={engagementTrendData} height={220} color="var(--primary)" />
        </Card>
        <Card>
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Burnout Distribution</h3>
          <PieChart data={burnoutRiskData} size={150} />
        </Card>
      </div>

      {/* Recommendations & Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lightbulb size={20} style={{ color: 'var(--warning)' }} /> Recent AI Insights
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {MOCK_COMPANY_STATS.insights.map(ins => (
              <div
                key={ins.id}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-main)',
                  borderLeft: `4px solid ${ins.type === 'warning' ? 'var(--warning)' : ins.type === 'danger' ? 'var(--danger)' : 'var(--success)'}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700 }}>{ins.category}</span>
                  <Badge type={ins.type === 'warning' ? 'warning' : ins.type === 'danger' ? 'danger' : 'success'}>
                    {ins.target}
                  </Badge>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.4 }}>{ins.message}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={20} style={{ color: 'var(--primary)' }} /> Upcoming Survey Cycles
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {MOCK_SURVEYS.slice(0, 3).map(sur => (
              <div key={sur.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 600 }}>{sur.title}</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Closes: {sur.closesOn}</span>
                </div>
                <Badge type={sur.status === 'active' ? 'success' : 'warning'}>{sur.status.toUpperCase()}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ==========================================
// HR DASHBOARD
// ==========================================
export const HRDashboard: React.FC = () => {
  const { addToast } = useApp();

  const heatmapDrivers = ['Trust', 'Alignment', 'Recognition', 'Well-being', 'Growth'];
  const heatmapDepts = ['Engineering', 'Product', 'Design', 'Sales', 'Support'];
  
  const heatmapScores: Record<string, Record<string, number>> = {
    'Engineering': { 'Trust': 86, 'Alignment': 80, 'Recognition': 78, 'Well-being': 88, 'Growth': 85 },
    'Product': { 'Trust': 88, 'Alignment': 85, 'Recognition': 82, 'Well-being': 80, 'Growth': 88 },
    'Design': { 'Trust': 90, 'Alignment': 82, 'Recognition': 72, 'Well-being': 86, 'Growth': 84 },
    'Sales': { 'Trust': 76, 'Alignment': 78, 'Recognition': 80, 'Well-being': 65, 'Growth': 78 },
    'Support': { 'Trust': 82, 'Alignment': 74, 'Recognition': 78, 'Well-being': 70, 'Growth': 75 }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: 'var(--fs-h3)', fontWeight: 800 }}>HR Management Suite</h1>
          <p>Oversee company surveys, cross-department alignment, and recognition programs.</p>
        </div>
        <Button icon={<Plus size={16} />} onClick={() => addToast('Launch new survey configuration modal!', 'info')}>
          New Survey Pulse
        </Button>
      </div>

      {/* Heatmap Section */}
      <Card>
        <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Department Culture Breakdown (Drivers vs Teams)</h3>
        <Heatmap scores={heatmapScores} departments={heatmapDepts} drivers={heatmapDrivers} />
      </Card>

      {/* Survey Management & Recognition programs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Survey list */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '18px' }}>Survey Status Tracker</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {MOCK_SURVEYS.map(sur => (
              <div key={sur.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700 }}>{sur.title}</h4>
                  <Badge type={sur.status === 'active' ? 'success' : sur.status === 'closed' ? 'neutral' : 'warning'}>
                    {sur.status}
                  </Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                  <span>{sur.responses} / {sur.totalTarget} replies</span>
                  <span>{sur.participationRate}% participation</span>
                </div>
                {sur.status === 'active' && <ProgressBar percent={sur.participationRate} height={5} />}
              </div>
            ))}
          </div>
        </Card>

        {/* Feedback logs */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '18px' }}>Feedback Moderation (Recent Comments)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {MOCK_FEEDBACK.slice(0, 3).map(feed => (
              <div key={feed.id} style={{ padding: '12px', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <Badge type={feed.mood === 'positive' ? 'success' : feed.mood === 'negative' ? 'danger' : 'warning'}>
                    {feed.mood.toUpperCase()}
                  </Badge>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{feed.date}</span>
                </div>
                <p style={{ fontSize: '12px', lineHeight: 1.4, color: 'var(--text-main)', marginBottom: '8px' }}>
                  "{feed.content.substring(0, 100)}..."
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Category: <strong>{feed.category}</strong></span>
                  <Button size="sm" variant="secondary" onClick={() => addToast(`Feedback f-${feed.id} marked as reviewed`, 'success')}>
                    Moderate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ==========================================
// MANAGER DASHBOARD
// ==========================================
export const ManagerDashboard: React.FC = () => {
  const { addToast } = useApp();
  const [tasks, setTasks] = useState([
    { id: 1, label: 'Schedule Q2 review with Helena Vance', completed: false },
    { id: 2, label: 'Audit engineering team overload index', completed: true },
    { id: 3, label: 'Initiate team spotlight award for Kaelen', completed: false }
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: 'var(--fs-h3)', fontWeight: 800 }}>Engineering Team Dashboard</h1>
          <p>Analyze immediate team sentiment, action plans, and meeting effectiveness parameters.</p>
        </div>
        <Button onClick={() => addToast('Manager checklist updated!', 'success')}>Sync Team Metrics</Button>
      </div>

      {/* Team Mood & Participation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <Card style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', backgroundColor: 'var(--success-light)', color: 'var(--success)', borderRadius: '50%' }}>
            <Smile size={32} />
          </div>
          <div>
            <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}>Team Mood Index</span>
            <h3 style={{ fontSize: '32px', fontWeight: 800 }}>86%</h3>
            <p style={{ fontSize: '12px', color: 'var(--success)' }}>▲ Positive Team Vibe</p>
          </div>
        </Card>
        
        <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-small)' }}>
            <span>Active Survey Participation</span>
            <strong>88%</strong>
          </div>
          <ProgressBar percent={88} height={8} color="var(--primary)" />
          <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>12 of 14 engineering teammates completed</p>
        </Card>
      </div>

      {/* Action tasks and Recommendations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Actions checklist */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckSquare size={20} style={{ color: 'var(--primary)' }} /> Actions Checklist
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tasks.map(t => (
              <label
                key={t.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-main)',
                  cursor: 'pointer',
                  textDecoration: t.completed ? 'line-through' : 'none',
                  opacity: t.completed ? 0.6 : 1,
                  transition: 'all 200ms'
                }}
              >
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTask(t.id)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{t.label}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* 1 on 1 guidelines */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lightbulb size={20} style={{ color: 'var(--warning)' }} /> Recommended 1-on-1 Prompts
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              'How is the flexible Focus Friday structure affecting your developer block timelines?',
              'Do you feel you have adequate recognition paths within our current sprint wrap-ups?',
              'What tools or learning budgets can we request to help you reach your Staff Engineering goals?'
            ].map((p, idx) => (
              <div key={idx} style={{ padding: '12px', borderLeft: '3px solid var(--border-color)', fontSize: '13px', lineHeight: 1.5 }}>
                "{p}"
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ==========================================
// EMPLOYEE DASHBOARD
// ==========================================
export const EmployeeDashboard: React.FC = () => {
  const { addToast, userName } = useApp();
  const [wellbeingScore, setWellbeingScore] = useState(8);
  const [recognitionList, setRecognitionList] = useState(MOCK_RECOGNITION);
  
  const [recReceiver, setRecReceiver] = useState('');
  const [recText, setRecText] = useState('');

  const submitRecognition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recReceiver.trim() || !recText.trim()) return;
    
    const newRec = {
      id: Math.random().toString(),
      sender: userName,
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      receiver: recReceiver,
      receiverAvatar: '',
      message: recText,
      date: 'Just now',
      likes: 0
    };

    setRecognitionList(prev => [newRec, ...prev]);
    addToast(`Public recognition sent to ${recReceiver}!`, 'success');
    setRecReceiver('');
    setRecText('');
  };

  const handleLikeRecognition = (id: string) => {
    setRecognitionList(prev =>
      prev.map(r => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
    addToast('Liked recognition card!', 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <Card variant="premium" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Welcome, {userName}!</h2>
          <p>Your workspace is healthy. Here are your cultural tasks for today.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge type="info">Q2 Pulse Active</Badge>
        </div>
      </Card>

      {/* Main Grid split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Left: Recognition Wall */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Send Recognition */}
          <Card>
            <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} style={{ color: 'var(--primary)' }} /> Recognize a Teammate
            </h3>
            <form onSubmit={submitRecognition} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="text"
                placeholder="Teammate name (e.g. Helena Vance)"
                required
                value={recReceiver}
                onChange={e => setRecReceiver(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}
              />
              <textarea
                placeholder="What did they do? Share details of their work..."
                required
                value={recText}
                onChange={e => setRecText(e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', resize: 'vertical' }}
              />
              <Button type="submit" style={{ alignSelf: 'flex-end' }} icon={<Send size={14} />}>
                Send Shoutout
              </Button>
            </form>
          </Card>

          {/* Wall Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '18px' }}>Recognition Wall</h3>
            {recognitionList.map(rec => (
              <Card key={rec.id} hoverEffect={false}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Avatar src={rec.senderAvatar} name={rec.sender} size="sm" />
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 700 }}>
                        {rec.sender} → <span style={{ color: 'var(--primary)' }}>{rec.receiver}</span>
                      </h4>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{rec.date}</span>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => handleLikeRecognition(rec.id)}>
                    ❤️ {rec.likes}
                  </Button>
                </div>
                <p style={{ fontSize: '14px', lineHeight: 1.5 }}>{rec.message}</p>
              </Card>
            ))}
          </div>

        </div>

        {/* Right Panel: Wellbeing Check-in, Surveys & Growth */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Wellbeing pulse */}
          <Card>
            <h3 style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Heart size={18} style={{ color: 'var(--danger)' }} /> Wellbeing Check-in
            </h3>
            <p style={{ fontSize: '12px', marginBottom: '16px' }}>How would you rate your work stress levels today?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 600 }}>
                <span>Overloaded</span>
                <span style={{ color: 'var(--primary)', fontSize: '18px' }}>{wellbeingScore} / 10</span>
                <span>Thriving</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={wellbeingScore}
                onChange={e => setWellbeingScore(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              <Button size="sm" style={{ alignSelf: 'flex-end' }} onClick={() => addToast('Mood registered. Rest and take blocks!', 'success')}>
                Register Mood
              </Button>
            </div>
          </Card>

          {/* Pending surveys */}
          <Card>
            <h3 style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Compass size={18} style={{ color: 'var(--secondary)' }} /> Pending Surveys
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px', backgroundColor: 'var(--primary-light)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700 }}>Q2 Culture & pulse check</h4>
                <p style={{ fontSize: '11px', margin: '2px 0 8px 0' }}>Est: 2 mins • Closes June 15</p>
                <Button size="sm" style={{ width: '100%' }} onClick={() => addToast('Opening survey module panel...', 'info')}>
                  Start Survey
                </Button>
              </div>
            </div>
          </Card>

          {/* Growth library */}
          <Card>
            <h3 style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <BookOpen size={18} style={{ color: 'var(--accent)' }} /> Growth Resources
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { title: 'Early Burnout Prevention', time: '6 min read' },
                { title: 'Designing distributed trust', time: '4 min read' }
              ].map((res, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', padding: '6px 0', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ fontWeight: 500, color: 'var(--primary)', cursor: 'pointer' }}>{res.title}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{res.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};
