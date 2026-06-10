import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'executive' | 'hr' | 'manager' | 'employee';
export type AppStateMode = 'success' | 'loading' | 'empty' | 'error';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  appState: AppStateMode;
  setAppState: (state: AppStateMode) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  dashboardTab: string;
  setDashboardTab: (tab: string) => void;
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  companyName: string;
  setCompanyName: (name: string) => void;
  companySubdomain: string;
  setCompanySubdomain: (subdomain: string) => void;
  selectedGoals: string[];
  toggleGoal: (goal: string) => void;
  teamSize: string;
  setTeamSize: (size: string) => void;
  featurePreferences: string[];
  togglePreference: (pref: string) => void;
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  userName: string;
  setUserName: (name: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [role, setRole] = useState<UserRole>('executive');
  const [appState, setAppState] = useState<AppStateMode>('success');
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [dashboardTab, setDashboardTab] = useState<string>('dashboard');
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  
  // Onboarding data
  const [companyName, setCompanyName] = useState<string>('VibeTech Inc.');
  const [companySubdomain, setCompanySubdomain] = useState<string>('vibetech');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState<string>('51-200');
  const [featurePreferences, setFeaturePreferences] = useState<string[]>(['surveys', 'ai-insights', 'feedback']);
  
  // Auth simulation
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('Alexander Wright');
  
  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }
  }, [theme]);

  // Goal helpers
  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  // Preference helpers
  const togglePreference = (pref: string) => {
    setFeaturePreferences(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  // Toast helpers
  const addToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Automatically update user name based on role for realistic dashboards
  useEffect(() => {
    if (role === 'executive') {
      setUserName('Alexander Wright'); // CEO
    } else if (role === 'hr') {
      setUserName('Marcus Sterling'); // HR Director
    } else if (role === 'manager') {
      setUserName('Helena Vance'); // Engineering Manager
    } else {
      setUserName('Kaelen Brooks'); // Senior Designer (Employee)
    }
  }, [role]);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        role,
        setRole,
        appState,
        setAppState,
        currentPage,
        setCurrentPage,
        dashboardTab,
        setDashboardTab,
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
        toasts,
        addToast,
        removeToast,
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
