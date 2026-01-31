import React, { useState, useEffect } from 'react';
import './ComingSoonCard.css';

const ComingSoonCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing session
    const stored = localStorage.getItem('byte_tx_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse user session", e);
      }
    }
  }, []);

  return (
    <div className="card-wrapper">
      <div 
        className={`main-card ${isHovered ? 'shifted' : ''}`}
      >
        {/* Tech Details / Decor */}
        <div className="tech-detail top-left">SYS: ONLINE</div>
        <div className="tech-detail top-right">ERR: NONE</div>
        <div className="tech-detail bottom-left">LOC: 34.05, -118.2</div>
        <div className="tech-detail bottom-right">V. 1.0.4</div>

        <div className="badge-container">
          <div className="badge">Coming Soon</div>
        </div>
        
        <div className="content-area">
          <h1 className="title">Something<br/>Extraordinary</h1>
          <p className="description">
            We are crafting an experience that redefines the standard. 
            Stay tuned for the reveal.
          </p>
          
          <div className="notify-action">
            {user ? (
               <button 
                className="discord-btn"
                onClick={() => window.location.href = '/dashboard'}
                style={{
                    background: 'rgba(255,255,255,0.1)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    justifyContent: 'center'
                }}
              >
                <span style={{marginRight:'10px'}}>🚀</span>
                Go to Dashboard
              </button>
            ) : (
                <button 
                    className="discord-btn"
                    onClick={() => window.location.href = 'http://localhost:3000/auth/discord'}
                >
                    <span className="discord-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1892.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.1023.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1569 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
                    </svg>
                    </span>
                    Login with Discord
                </button>
            )}
          </div>
        </div>
      </div>

      <div 
        className={`about-sidebar ${isHovered ? 'active' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="about-trigger-text">A B O U T</div>
        <div className="about-content">
          <h3>The Vision</h3>
          <p>
            Merging aesthetics with function. We believe in tools that simply disappear, leaving only you and your work.
          </p>
          <div className="socials">
             <span>X</span>
             <span>IG</span>
             <span>LN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonCard;
