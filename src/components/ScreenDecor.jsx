import React from 'react';
import './ScreenDecor.css';

const ScreenDecor = () => {
  return (
    <>
      {/* Vertical Sidebars */}
      <div className="screen-decor decor-vertical decor-left">
        <div className="decor-line"></div>
        <div className="decor-text">EST. 2026 // SYSTEM SECURE</div>
        <div className="decor-line"></div>
      </div>
      
      <div className="screen-decor decor-vertical decor-right">
        <div className="decor-line"></div>
        <div className="decor-text">CONNECTING TO SERVER...</div>
        <div className="decor-line"></div>
      </div>

      {/* Horizontal Bars */}
      <div className="screen-decor decor-horizontal decor-top">
        <div className="decor-text-horizontal">
           <span>/// INIT_SEQUENCE</span>
        </div>
        <div className="decor-line-horizontal"></div>
        <div className="decor-text-horizontal">
           <span>TARGET: 100%</span>
        </div>
      </div>

      <div className="screen-decor decor-horizontal decor-bottom">
        <div className="decor-text-horizontal">
           <span>SECURE CONNECTION ESTABLISHED</span>
        </div>
        <div className="decor-line-horizontal"></div>
        <div className="decor-text-horizontal">
           <span>OPERATOR: ADMIN</span>
        </div>
      </div>

      {/* Visual Connectors to Center */}
      <div className="screen-decor connector-line connector-left"></div>
      <div className="screen-decor connector-line connector-right"></div>

      {/* Corner Crosshairs */}
      <div className="screen-decor crosshair ch-tl"></div>
      <div className="screen-decor crosshair ch-tr"></div>
      <div className="screen-decor crosshair ch-bl"></div>
      <div className="screen-decor crosshair ch-br"></div>
    </>
  );
};

export default ScreenDecor;
