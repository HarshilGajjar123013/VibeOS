export interface Survey {
  id: string;
  title: string;
  status: 'active' | 'scheduled' | 'closed';
  responses: number;
  totalTarget: number;
  participationRate: number;
  engagementScore: number;
  closesOn: string;
  category: string;
}

export interface FeedbackItem {
  id: string;
  category: string;
  content: string;
  mood: 'positive' | 'neutral' | 'negative';
  date: string;
  upvotes: number;
  status: 'resolved' | 'in_progress' | 'in_review' | 'investigating';
  replies: number;
}

export interface RecognitionItem {
  id: string;
  sender: string;
  senderAvatar: string;
  receiver: string;
  receiverAvatar: string;
  message: string;
  date: string;
  likes: number;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salaryRange: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  readTime: string;
  date: string;
  excerpt: string;
  featured: boolean;
}

export const MOCK_SURVEYS: Survey[] = [
  {
    id: 's-1',
    title: 'Q2 Global Culture & Engagement Pulse',
    status: 'active',
    responses: 245,
    totalTarget: 350,
    participationRate: 70,
    engagementScore: 78,
    closesOn: 'June 20, 2026',
    category: 'Engagement'
  },
  {
    id: 's-2',
    title: 'Hybrid Workspace & Well-being Survey',
    status: 'active',
    responses: 112,
    totalTarget: 350,
    participationRate: 32,
    engagementScore: 82,
    closesOn: 'June 25, 2026',
    category: 'Well-being'
  },
  {
    id: 's-3',
    title: 'Annual Diversity, Equity & Inclusion Assessment',
    status: 'scheduled',
    responses: 0,
    totalTarget: 350,
    participationRate: 0,
    engagementScore: 0,
    closesOn: 'July 10, 2026',
    category: 'Inclusion'
  },
  {
    id: 's-4',
    title: 'Q1 Manager Effectiveness Evaluation',
    status: 'closed',
    responses: 312,
    totalTarget: 330,
    participationRate: 94,
    engagementScore: 85,
    closesOn: 'April 15, 2026',
    category: 'Leadership'
  },
  {
    id: 's-5',
    title: 'Professional Growth & Learning Opportunities',
    status: 'closed',
    responses: 289,
    totalTarget: 320,
    participationRate: 90,
    engagementScore: 72,
    closesOn: 'March 1, 2026',
    category: 'Growth'
  }
];

export const MOCK_FEEDBACK: FeedbackItem[] = [
  {
    id: 'f-1',
    category: 'Workplace Flexibility',
    content: 'The new flexible Friday focus-hours policy has been an absolute game changer for our engineering team. We get major coding blocks done without meeting disruptions. Please make it permanent!',
    mood: 'positive',
    date: '2 hours ago',
    upvotes: 42,
    status: 'resolved',
    replies: 5
  },
  {
    id: 'f-2',
    category: 'Career Growth',
    content: 'The path from Senior Engineer to Staff Engineer feels extremely opaque. We need clear performance benchmarks and examples of successful transitions to build confidence in the promotion tracks.',
    mood: 'neutral',
    date: '1 day ago',
    upvotes: 28,
    status: 'in_review',
    replies: 3
  },
  {
    id: 'f-3',
    category: 'Company Alignment',
    content: 'Recent leadership updates regarding the corporate restructuring have felt very vague. It causes a lot of unnecessary anxiety across middle management. More transparent timelines would go a long way.',
    mood: 'negative',
    date: '2 days ago',
    upvotes: 68,
    status: 'investigating',
    replies: 12
  },
  {
    id: 'f-4',
    category: 'Workplace Environment',
    content: 'The catered meals on Tuesdays and Thursdays are great, but the vegan and gluten-free options run out within the first 10 minutes. Can we audit the dietary preference percentages and order accordingly?',
    mood: 'positive',
    date: '3 days ago',
    upvotes: 15,
    status: 'in_progress',
    replies: 2
  },
  {
    id: 'f-5',
    category: 'Compensation & Benefits',
    content: 'Our mental health budget has not changed since 2024. With rising costs of therapy, increasing the annual stipend from $500 to $1,000 would align with our brand value of focusing on well-being.',
    mood: 'neutral',
    date: '5 days ago',
    upvotes: 53,
    status: 'in_review',
    replies: 7
  }
];

export const MOCK_RECOGNITION: RecognitionItem[] = [
  {
    id: 'r-1',
    sender: 'Alexander Wright',
    senderAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    receiver: 'Helena Vance',
    receiverAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    message: 'Helena did a spectacular job steering the Q2 release. Under a tight deadline, her calm leadership and technical clarity kept the engineering division completely aligned. Thank you!',
    date: 'Today',
    likes: 24
  },
  {
    id: 'r-2',
    sender: 'Kaelen Brooks',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    receiver: 'Marcus Sterling',
    receiverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    message: 'Shoutout to Marcus for redesigning our onboarding portal! The flow feels incredibly slick, simple, and captures the warmth of Vibe OS. Incredible craftsmanship.',
    date: 'Yesterday',
    likes: 18
  },
  {
    id: 'r-3',
    sender: 'Helena Vance',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    receiver: 'Kaelen Brooks',
    receiverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    message: 'Kaelen went above and beyond helping me debug a complex styling issue on the landing page charts late on Tuesday. Pure teammate quality!',
    date: '3 days ago',
    likes: 12
  }
];

export const MOCK_JOBS: JobOpening[] = [
  {
    id: 'j-1',
    title: 'Staff Frontend Engineer (React / CSS Modules)',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    salaryRange: '$180,000 - $220,000 + Equity'
  },
  {
    id: 'j-2',
    title: 'Lead Product Designer (Design Systems)',
    department: 'Design',
    location: 'New York, NY / Hybrid',
    type: 'Full-time',
    salaryRange: '$160,000 - $195,000 + Equity'
  },
  {
    id: 'j-3',
    title: 'Senior HR Operations Manager',
    department: 'People & Culture',
    location: 'Remote (US/Canada)',
    type: 'Full-time',
    salaryRange: '$130,000 - $160,000'
  },
  {
    id: 'j-4',
    title: 'Head of Customer Success',
    department: 'Growth',
    location: 'San Francisco, CA / Hybrid',
    type: 'Full-time',
    salaryRange: '$150,000 - $185,000'
  }
];

export const MOCK_ARTICLES: BlogArticle[] = [
  {
    id: 'a-1',
    title: 'The Future of Hybrid Work: Cultivating Trust in Distributed Teams',
    category: 'Workplace Culture',
    author: 'Marcus Sterling',
    authorRole: 'Chief People Officer',
    readTime: '6 min read',
    date: 'June 5, 2026',
    excerpt: 'Building trust across physical distances requires shifting from visual presence to output and intentional feedback loops. Learn how top organizations design workspaces that thrive.',
    featured: true
  },
  {
    id: 'a-2',
    title: 'How Transparency Drives Employee Engagement and Business Growth',
    category: 'Company Growth',
    author: 'Alexander Wright',
    authorRole: 'CEO & Co-founder',
    readTime: '4 min read',
    date: 'May 28, 2026',
    excerpt: 'When employees understand the "why" behind executive decisions, alignment increases and performance rises. Here is our blueprint for transparency.',
    featured: false
  },
  {
    id: 'a-3',
    title: 'Understanding Employee Burnout: Early Indicators and Preventative Actions',
    category: 'Well-being',
    author: 'Helena Vance',
    authorRole: 'Engineering Director',
    readTime: '8 min read',
    date: 'May 14, 2026',
    excerpt: 'Burnout is rarely caused by a single deadline. Discover the cumulative factors (meeting overload, isolation, poor recognition) and how managers can intercept them early.',
    featured: false
  },
  {
    id: 'a-4',
    title: 'Crafting an Authentic Employer Brand from the Inside Out',
    category: 'Employer Brand',
    author: 'Kaelen Brooks',
    authorRole: 'Brand Designer',
    readTime: '5 min read',
    date: 'May 3, 2026',
    excerpt: 'Your best recruitment asset is the real stories of your current employees. How to package and broadcast authentic culture highlights without corporate filters.',
    featured: false
  }
];

export const FAQS = [
  {
    q: 'How does Vibe OS guarantee employee anonymity?',
    a: 'Vibe OS uses cryptographic aggregation. For anonymous surveys and feedback feeds, responses are pooled in groups of five or more before reports are compiled. Individual responses cannot be traced back to single accounts, guaranteeing total safety and transparency.'
  },
  {
    q: 'Can we customize survey question sets or use preset templates?',
    a: 'Yes! Vibe OS comes with over 45 research-backed template surveys developed by organizational psychologists. You can also build entirely custom surveys from scratch using our Survey Builder, supporting emoji reactions, open text, NPS, rating scales, and multiple choice.'
  },
  {
    q: 'How does the AI Insights engine analyze open-text feedback?',
    a: 'Our natural language processing model aggregates open-text comments, filters out identifying pronouns/terms, summarizes recurring core themes, and analyzes overall sentiment (positive, neutral, negative) so leadership can read consolidated trends instead of sifting through hundreds of raw entries.'
  },
  {
    q: 'What integrations do you support?',
    a: 'We support Slack, Microsoft Teams, Zoom, Google Workspace, Workday, BambooHR, and Linear. You can trigger feedback prompts directly in Slack and sync employee rosters automatically.'
  },
  {
    q: 'How are engagement and culture scores calculated?',
    a: 'Our Culture Health Index aggregates metrics across six key drivers: Trust, Alignment, Recognition, Connection, Well-being, and Growth. These are calculated from employee surveys and feedback trends, calibrated against industry-specific benchmarks.'
  },
  {
    q: 'What is the difference between the HR Dashboard and Manager Dashboard?',
    a: 'The HR Dashboard provides company-wide heatmaps, cross-department comparison matrices, and survey scheduling tools. The Manager Dashboard focuses exclusively on the manager\'s immediate direct-report team, providing aggregated sentiment and recommended action items (like 1-on-1 topics).'
  },
  {
    q: 'Does Vibe OS offer a trial period?',
    a: 'Absolutely. We offer a 14-day free trial on our Starter and Growth plans, with no credit card required. You get full access to survey templates and automated AI Insights reports.'
  },
  {
    q: 'Can we export reports for board meetings?',
    a: 'Yes, our Reports Center allows you to compile Executive Summaries, Department Heatmaps, or Sentiment Trends. You can export these reports instantly into vector PDF, Excel spreadsheets, or editable PowerPoint slides.'
  },
  {
    q: 'How often are surveys sent out?',
    a: 'You can configure your cadence. Most companies set up a weekly or bi-weekly brief Wellbeing Pulse (1-2 questions) and a monthly or quarterly comprehensive Culture Assessment (10-15 questions).'
  },
  {
    q: 'Is Vibe OS SOC 2 compliant?',
    a: 'Yes, Vibe OS is SOC 2 Type II certified. All data in transit and at rest is fully encrypted using enterprise-grade standards, and we conduct third-party penetration testing twice a year.'
  }
];

export const MOCK_COMPANY_STATS = {
  employeeCount: 350,
  departments: ['Engineering', 'Product', 'Design', 'Sales', 'Support', 'Marketing'],
  locations: ['San Francisco, CA', 'New York, NY', 'Toronto, ON', 'London, UK', 'Remote'],
  engagementScore: 82, // percentage
  engagementTrend: +4.2, // relative change
  participationRate: 92, // percentage
  participationTrend: +1.5,
  burnoutRisk: {
    high: 4,
    moderate: 22,
    low: 74
  },
  cultureHealthIndex: 84, // out of 100
  cultureDrivers: [
    { name: 'Trust & Leadership', score: 86 },
    { name: 'Alignment & Vision', score: 80 },
    { name: 'Recognition & Rewards', score: 78 },
    { name: 'Social Connection', score: 82 },
    { name: 'Mental Well-being', score: 88 },
    { name: 'Professional Growth', score: 85 }
  ],
  insights: [
    {
      id: 'i-1',
      type: 'warning',
      category: 'Recognition & Rewards',
      message: 'Design department reports a 12% drop in feeling recognized for their work. AI recommends setting up a spotlight segment in next week\'s team meeting.',
      target: 'Design'
    },
    {
      id: 'i-2',
      type: 'danger',
      category: 'Mental Well-being',
      message: 'Sales department burnout risk has risen to Moderate. Recommendation: Institute "No Meeting Wednesday" to recover focus time.',
      target: 'Sales'
    },
    {
      id: 'i-3',
      type: 'success',
      category: 'Workplace Flexibility',
      message: 'Engineering engagement rose by 8% following the permanent adoption of Focus Fridays. Recommend sharing this success model with Support.',
      target: 'Engineering'
    }
  ]
};
