import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Dashboard.css';

// Simple Icons Components (Inline)
const GridIcon = () => <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const ChartIcon = () => <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const SettingsIcon = () => <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const WalletIcon = () => <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
const UserIcon = () => <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // 1. Try get user from URL param (redirected from server)
    const userParam = searchParams.get('user');
    if (userParam) {
      try {
        const userData = JSON.parse(atob(userParam));
        setUser(userData);
        // Persist to LocalStorage for Main Page detection
        localStorage.setItem('byte_tx_user', JSON.stringify(userData));
        
        // Clean URL
        window.history.replaceState({}, document.title, '/dashboard');
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    } else {
        // 2. Try loading from LocalStorage if no param
        const stored = localStorage.getItem('byte_tx_user');
        if(stored) setUser(JSON.parse(stored));
    }
  }, [searchParams]);

  const handleCopy = () => {
    if(!isRevealed) {
        setIsRevealed(true);
    } else {
        navigator.clipboard.writeText(user.coupon_code);
        alert("Coupon copied to clipboard!");
    }
  };

  if (!user) {
    return (
       // Simple Redirect State
       <div className="dashboard-container" style={{justifyContent:'center', alignItems:'center'}}>
          <h2>Logging you in...</h2>
       </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* --- Sidebar --- */}
      <aside className="sidebar">
        <div className="brand-logo">
          <img src="/logo.png" alt="Byte Tx" style={{width:'30px', height:'30px', objectFit:'contain'}} />
          BYTE TX
        </div>

        <nav className="nav-group">
          <div className="nav-item active">
            <GridIcon />
            <span>Overview</span>
          </div>
          <div className="nav-item">
            <ChartIcon />
            <span>Analytics</span>
          </div>
          <div className="nav-item">
            <WalletIcon />
            <span>Wallet</span>
          </div>
           <div className="nav-item">
            <UserIcon />
            <span>Team</span>
          </div>
          <div style={{height: '1px', background:'rgba(255,255,255,0.1)', margin:'20px 0'}}></div>
          <div className="nav-item">
            <SettingsIcon />
            <span>Settings</span>
          </div>
        </nav>
      </aside>

      {/* --- Main Content --- */}
      <main className="main-content">
        
        {/* Header */}
        <header className="top-header">
           <div className="header-title">
              <div className="status-indicator"></div>
              <span>System: Online</span>
              <span style={{opacity:0.3}}>//</span>
              <span>v.1.0.4-beta</span>
           </div>

           <div className="user-profile-mini">
              <div className="user-info">
                 <div className="user-name-mini">{user.username}</div>
                 <div className="user-role">Early Adopter</div>
              </div>
              {user.avatar ? (
                <img 
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} 
                    alt="Avatar" 
                    className="user-avatar-mini"
                />
              ) : (
                <div className="user-avatar-mini" style={{background:'#333'}}></div>
              )}
           </div>
        </header>

        {/* Showcase Area */}
        <div className="showcase-area">
            <div className="showcase-card">
               <div className="showcase-glow"></div>
               
               <h1 style={{fontSize:'3rem', fontWeight:'800', lineHeight:'1.1', marginBottom:'20px'}}>
                  Welcome to <br/>
                  <span style={{background:'linear-gradient(90deg, #fff, #888)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
                    The Next Generation
                  </span>
               </h1>
               
               <p style={{color:'#888', fontSize:'1.1rem', maxWidth:'600px', lineHeight:'1.6'}}>
                  You are viewing the <b>Byte Tx</b> dashboard preview. 
                  Full system access is currently restricted to authorized personnel.
                  Your pre-registration secures your position in line.
               </p>

               <div className="coupon-section">
                  <span style={{textTransform:'uppercase', letterSpacing:'2px', fontSize:'0.8rem', color:'#666'}}>
                    {user.coupon_code ? 'Your Exclusive Access Code (Do Not Share)' : 'Action Required'}
                  </span>
                  
                  {user.coupon_code ? (
                      <div 
                        className="coupon-code" 
                        onClick={handleCopy}
                        style={{
                            cursor: 'pointer',
                            filter: isRevealed ? 'none' : 'blur(10px)',
                            userSelect: 'none',
                            transition: 'all 0.3s ease',
                            background: isRevealed ? 'rgba(0, 255, 136, 0.05)' : 'rgba(255,255,255,0.1)',
                            border: isRevealed ? '1px solid rgba(0, 255, 136, 0.2)' : '1px solid transparent',
                            padding: '10px 30px',
                            borderRadius: '8px',
                            color: '#fff',
                            textShadow: isRevealed ? '0 0 10px rgba(0, 255, 136, 0.5)' : 'none',
                            marginTop: '15px'
                        }}
                      >
                        {isRevealed ? user.coupon_code : 'HIDDEN-CODE-CLICK'}
                      </div>
                  ) : (
                      <button 
                        onClick={() => {
                            localStorage.removeItem('byte_tx_user');
                            window.location.href = '/auth/discord';
                        }}
                        style={{
                            marginTop: '15px',
                            padding: '10px 20px',
                            background: 'rgba(255, 50, 50, 0.1)',
                            border: '1px solid rgba(255, 50, 50, 0.3)',
                            color: '#ff5555',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                      >
                        ⚠ Re-Login to Generate Code
                      </button>
                  )}

                  <div className="access-msg">
                    {user.coupon_code ? (
                        isRevealed ? 
                            <span style={{color:'#00ff88'}}>✓ Revealed (Click to Copy)</span> : 
                            <span><span role="img" aria-label="lock">🔒</span> Click above to reveal one-time code</span>
                    ) : (
                        <span style={{color:'#888'}}>Update required for legacy sessions.</span>
                    )}
                  </div>
               </div>
            </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
