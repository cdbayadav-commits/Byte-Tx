// Custom SVG Icons for Byte-Tx
// Premium hand-crafted vectors for professional look

export const CubeIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <defs>
      <linearGradient id="cubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--accent-cyan, #00d4ff)" />
        <stop offset="100%" stopColor="var(--accent-purple, #8b5cf6)" />
      </linearGradient>
    </defs>
    <path 
      d="M12 2L2 7L12 12L22 7L12 2Z" 
      stroke="url(#cubeGrad)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    <path 
      d="M2 17L12 22L22 17" 
      stroke="url(#cubeGrad)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M2 12L12 17L22 12" 
      stroke="url(#cubeGrad)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M2 7V17" 
      stroke="url(#cubeGrad)" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path 
      d="M12 12V22" 
      stroke="url(#cubeGrad)" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path 
      d="M22 7V17" 
      stroke="url(#cubeGrad)" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
);

export const ServerIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <rect x="2" y="3" width="20" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="2" y="15" width="20" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="6" cy="6" r="1" fill="currentColor"/>
    <circle cx="6" cy="18" r="1" fill="currentColor"/>
    <path d="M10 6H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 18H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 9V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
  </svg>
);

export const GamepadIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M6 11V8C6 6.89543 6.89543 6 8 6H16C17.1046 6 18 6.89543 18 8V11" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M4 11H20C21.1046 11 22 11.8954 22 13V15C22 16.6569 20.6569 18 19 18H17L15 20H9L7 18H5C3.34315 18 2 16.6569 2 15V13C2 11.8954 2.89543 11 4 11Z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <circle cx="8" cy="14" r="1.5" fill="currentColor"/>
    <circle cx="16" cy="14" r="1.5" fill="currentColor"/>
    <rect x="11" y="13" width="2" height="2" rx="0.5" fill="currentColor"/>
  </svg>
);

export const ShieldIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 2L3 6V12C3 17.5 7.5 21.5 12 22C16.5 21.5 21 17.5 21 12V6L12 2Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 12L11 14L15 10" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const RocketIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M4.5 16.5C3 18 3 21 3 21C3 21 6 21 7.5 19.5C8.5 18.5 8.5 17 7.5 16C6.5 15 5.5 15.5 4.5 16.5Z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M14.5 11.5L12.5 9.5M14.5 11.5C16.5 11.5 20 8 21 4C21 4 16.5 3 13.5 5.5M14.5 11.5L11.5 14.5M12.5 9.5C12.5 7.5 16 4 20 3C20 3 21 7.5 18.5 10.5M12.5 9.5L9.5 12.5" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path 
      d="M9.5 12.5L5 14L10 19L11.5 14.5" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const SupportIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M21 11.5C21 16.75 16.5 21 12 21C11.48 21 11 20.95 10.5 20.88L6 22L7.12 17.5C5.25 15.9 4 13.8 4 11.5C4 6.25 7.58 2 12 2C16.5 2 21 6.25 21 11.5Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 12V11.5C12 10.5 12.5 10 13 9.5C13.5 9 14 8.5 14 7.5C14 6.11929 12.8807 5 11.5 5C10.1193 5 9 6.11929 9 7.5" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <circle cx="12" cy="15" r="1" fill="currentColor"/>
  </svg>
);

export const BoltIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M13 2L4 14H11L10 22L20 10H13L14 2H13Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const GlobeIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
    <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 2C14.5 4.5 15.5 8 15.5 12C15.5 16 14.5 19.5 12 22" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 2C9.5 4.5 8.5 8 8.5 12C8.5 16 9.5 19.5 12 22" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const ChipIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="8" y="8" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 19V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15 19V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 9H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 15H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M19 9H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M19 15H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const MemoryIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 18V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 18V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 18V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18 18V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const StorageIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 5V19C3 20.6569 7.02944 22 12 22C16.9706 22 21 20.6569 21 19V5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 12C3 13.6569 7.02944 15 12 15C16.9706 15 21 13.6569 21 12" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const HeadphonesIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M4 17V12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12V17" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <rect x="2" y="14" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="18" y="14" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const ClockIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const MailIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 7L10.8 12.6C11.5111 13.0741 12.4889 13.0741 13.2 12.6L22 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const ArrowRightIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CheckIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const DiscordIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

export const TwitterIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const GithubIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

// Animated Logo Cube
export const LogoCube = ({ className = '' }) => (
  <div className={`logo-cube-wrapper ${className}`}>
    <div className="logo-cube">
      <div className="cube-face front" />
      <div className="cube-face back" />
      <div className="cube-face right" />
      <div className="cube-face left" />
      <div className="cube-face top" />
      <div className="cube-face bottom" />
    </div>
  </div>
);

// Minecraft Block Component
export const MinecraftBlock = ({ type = 'grass', size = 60, className = '' }) => {
  const textures = {
    grass: {
      top: 'linear-gradient(135deg, #7cbd5b 0%, #5d9e3c 100%)',
      side: 'linear-gradient(180deg, #5d9e3c 30%, #8b5d3b 30%)',
      bottom: '#8b5d3b'
    },
    diamond: {
      top: 'linear-gradient(135deg, #4aedd9 0%, #1a8a7d 100%)',
      side: 'linear-gradient(135deg, #1a8a7d 0%, #4aedd9 50%, #1a8a7d 100%)',
      bottom: 'linear-gradient(135deg, #1a8a7d 0%, #4aedd9 100%)'
    },
    obsidian: {
      top: 'linear-gradient(135deg, #2a1050 0%, #1e1033 100%)',
      side: '#1e1033',
      bottom: '#0f0520'
    },
    gold: {
      top: 'linear-gradient(135deg, #ffd700 0%, #daa520 100%)',
      side: 'linear-gradient(135deg, #daa520 0%, #ffd700 50%, #b8860b 100%)',
      bottom: '#b8860b'
    },
    redstone: {
      top: 'linear-gradient(135deg, #ff3333 0%, #cc0000 100%)',
      side: '#cc0000',
      bottom: '#990000'
    }
  };

  const t = textures[type] || textures.grass;
  const halfSize = size / 2;

  return (
    <div 
      className={`mc-block ${className}`}
      style={{
        width: size,
        height: size,
        '--block-size': `${size}px`,
        '--half-size': `${halfSize}px`
      }}
    >
      <div className="block-face front" style={{ background: t.side }} />
      <div className="block-face back" style={{ background: t.side }} />
      <div className="block-face right" style={{ background: t.side }} />
      <div className="block-face left" style={{ background: t.side }} />
      <div className="block-face top" style={{ background: t.top }} />
      <div className="block-face bottom" style={{ background: t.bottom }} />
    </div>
  );
};

// Animated Pulse Dot
export const PulseDot = ({ color = 'var(--accent-green)', size = 8 }) => (
  <span 
    className="pulse-dot" 
    style={{ 
      '--dot-color': color,
      '--dot-size': `${size}px`
    }}
  />
);
