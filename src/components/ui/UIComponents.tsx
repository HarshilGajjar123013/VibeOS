import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Check, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// ==========================================
// BUTTON COMPONENT
// ==========================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  const buttonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: "var(--font-heading)",
    fontWeight: 600,
    borderRadius: 'var(--radius-md)',
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all var(--transition-speed) var(--transition-ease)',
    opacity: disabled ? 0.6 : 1,
    position: 'relative',
    overflow: 'hidden',
  };

  const [ripples, setRipples] = useState<Array<{id:number;x:number;y:number;size:number}>>([]);
  const rippleCleanup = useRef<number | null>(null);

  useEffect(() => {
    return () => { if (rippleCleanup.current) window.clearTimeout(rippleCleanup.current); };
  }, []);

  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = Date.now();
    setRipples(prev => [...prev, { id, x, y, size }]);
    const t = window.setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
    rippleCleanup.current = t;
  };

  // Size styles
  const sizeStyles = {
    sm: { padding: '6px 12px', fontSize: 'var(--fs-small)' },
    md: { padding: '10px 18px', fontSize: 'var(--fs-body)' },
    lg: { padding: '14px 26px', fontSize: '18px' },
  }[size];

  // Variant styles (simulated in JS styles for reliability across systems)
  let variantStyles = {};
  if (variant === 'primary') {
    variantStyles = {
      backgroundColor: 'var(--primary)',
      color: 'var(--text-inverse)',
      boxShadow: 'var(--shadow-sm)',
    };
  } else if (variant === 'secondary') {
    variantStyles = {
      backgroundColor: 'var(--bg-main)',
      color: 'var(--text-main)',
      border: '1px solid var(--border-color)',
    };
  } else if (variant === 'accent') {
    variantStyles = {
      backgroundColor: 'var(--accent)',
      color: 'var(--text-inverse)',
      boxShadow: 'var(--shadow-sm)',
    };
  } else if (variant === 'danger') {
    variantStyles = {
      backgroundColor: 'var(--danger)',
      color: 'var(--text-inverse)',
    };
  } else if (variant === 'ghost') {
    variantStyles = {
      backgroundColor: 'transparent',
      color: 'var(--text-main)',
    };
  } else if (variant === 'link') {
    variantStyles = {
      backgroundColor: 'transparent',
      color: 'var(--primary)',
      padding: 0,
      textDecoration: 'underline',
    };
  }

  // Hover animations/styles handled inline or by class
  return (
    <button
      style={{ ...buttonStyle, ...sizeStyles, ...variantStyles }}
      className={`btn btn-${variant} btn-${size} hover-lift ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      onMouseDown={addRipple}
      {...props}
    >
      {loading && (
        <span className="btn-spinner" />
      )}
      {!loading && icon && iconPosition === 'left' && icon}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && icon}

      {ripples.map(r => (
        <span
          key={r.id}
          className="ripple-effect"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        />
      ))}
    </button>
  );
};

// ==========================================
// CARD COMPONENT
// ==========================================
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  variant?: 'default' | 'premium' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = true,
  variant = 'default',
  className = '',
  style,
  ...props
}) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--bg-card)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-6)',
    border: variant === 'outlined' ? '1px solid var(--border-color)' : '1px solid rgba(0,0,0,0.02)',
    boxShadow: variant === 'premium' ? 'var(--shadow-premium)' : 'var(--shadow-md)',
    transition: 'all var(--transition-speed) var(--transition-ease)',
    position: 'relative',
    ...style,
  };

  return (
    <div
      style={cardStyle}
      className={`${hoverEffect ? 'hover-lift' : ''} card-animated ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// ==========================================
// BADGE COMPONENT
// ==========================================
interface BadgeProps {
  children: React.ReactNode;
  type?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({ children, type = 'neutral' }) => {
  const badgeColors = {
    success: { bg: 'var(--success-light)', color: 'var(--success)' },
    warning: { bg: 'var(--warning-light)', color: 'var(--warning)' },
    danger: { bg: 'var(--danger-light)', color: 'var(--danger)' },
    info: { bg: 'var(--secondary-light)', color: 'var(--secondary)' },
    neutral: { bg: 'var(--border-color)', color: 'var(--text-muted)' },
  }[type];

  return (
    <span
      style={{
        padding: '3px 8px',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--fs-xs)',
        fontWeight: 600,
        backgroundColor: badgeColors.bg,
        color: badgeColors.color,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        width: 'fit-content'
      }}
    >
      {children}
    </span>
  );
};

// ==========================================
// AVATAR COMPONENT
// ==========================================
interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', style }) => {
  const [error, setError] = useState(false);
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const dimensions = {
    xs: '24px',
    sm: '32px',
    md: '40px',
    lg: '56px',
    xl: '80px',
  }[size];

  return (
    <div
      style={{
        width: dimensions,
        height: dimensions,
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
        backgroundColor: 'var(--primary-light)',
        color: 'var(--primary)',
        fontFamily: 'var(--font-heading)',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size === 'xs' ? '10px' : size === 'sm' ? '12px' : size === 'md' ? '14px' : '20px',
        border: '2px solid var(--bg-card)',
        boxShadow: 'var(--shadow-sm)',
        flexShrink: 0,
        ...style
      }}
    >
      {src && !error ? (
        <img
          src={src}
          alt={name}
          onError={() => setError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

// ==========================================
// PROGRESS BAR COMPONENT
// ==========================================
interface ProgressBarProps {
  percent: number;
  height?: number;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  height = 8,
  color = 'var(--primary)'
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: `${height}px`,
        backgroundColor: 'var(--border-color)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div
        style={{
          width: `${Math.min(100, Math.max(0, percent))}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: 'var(--radius-full)',
          transition: 'width 800ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
    </div>
  );
};

// ==========================================
// SKELETON LOADER
// ==========================================
export const Skeleton: React.FC<{
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  style?: React.CSSProperties;
}> = ({ width = '100%', height = '16px', circle = false, style }) => {
  return (
    <div
      className="skeleton"
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: circle ? '50%' : 'var(--radius-sm)',
        ...style
      }}
    />
  );
};

// ==========================================
// TABS COMPONENT
// ==========================================
interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '8px',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        scrollbarWidth: 'none'
      }}
    >
      {tabs.map(tab => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
              color: isActive ? 'var(--primary)' : 'var(--text-muted)',
              fontFamily: 'var(--font-heading)',
              fontWeight: isActive ? 600 : 500,
              cursor: 'pointer',
              transition: 'all var(--transition-speed) var(--transition-ease)',
            }}
            className="hover-lift"
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// ==========================================
// ACCORDION COMPONENT (FAQ)
// ==========================================
interface AccordionItem {
  title: string;
  content: string;
}

export const Accordion: React.FC<{ items: AccordionItem[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            style={{
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-card)',
              overflow: 'hidden',
              transition: 'all var(--transition-speed) var(--transition-ease)'
            }}
          >
            <button
              onClick={() => toggle(idx)}
              style={{
                width: '100%',
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--text-main)',
                fontWeight: 600,
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '18px', fontFamily: 'var(--font-heading)' }}>{item.title}</span>
              <ChevronDown
                size={20}
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform var(--transition-speed) var(--transition-ease)',
                  color: 'var(--text-muted)'
                }}
              />
            </button>
            <div
              style={{
                height: isOpen ? 'auto' : 0,
                opacity: isOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'all var(--transition-speed) var(--transition-ease)',
                padding: isOpen ? '0 20px 20px 20px' : '0 20px'
              }}
            >
              <p style={{ fontSize: '15px', lineHeight: 1.6 }}>{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ==========================================
// MODAL COMPONENT
// ==========================================
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(11, 15, 25, 0.4)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn var(--transition-speed) var(--transition-ease)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '540px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeIn 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              padding: '4px',
              borderRadius: 'var(--radius-sm)'
            }}
            className="hover-lift"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', overflowY: 'auto', maxHeight: '60vh' }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              padding: '16px 24px',
              borderTop: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-main)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// TOAST NOTIFICATIONS MANAGER
// ==========================================
export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none'
      }}
    >
      {toasts.map(toast => {
        const icons = {
          success: <Check size={18} style={{ color: 'var(--success)' }} />,
          error: <AlertCircle size={18} style={{ color: 'var(--danger)' }} />,
          info: <Info size={18} style={{ color: 'var(--secondary)' }} />,
          warning: <AlertTriangle size={18} style={{ color: 'var(--warning)' }} />,
        }[toast.type];

        return (
          <div
            key={toast.id}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 20px',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-main)',
              borderRadius: 'var(--radius-md)',
              border: `1px solid var(--border-color)`,
              borderLeft: `4px solid ${toast.type === 'success' ? 'var(--success)' : toast.type === 'error' ? 'var(--danger)' : toast.type === 'warning' ? 'var(--warning)' : 'var(--secondary)'}`,
              boxShadow: 'var(--shadow-lg)',
              minWidth: '280px',
              maxWidth: '380px',
              animation: 'slideInRight 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>{icons}</div>
            <div style={{ flex: 1, fontSize: 'var(--fs-small)', fontWeight: 500 }}>{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex'
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
