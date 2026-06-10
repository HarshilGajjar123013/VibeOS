import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles } from 'lucide-react';
import './Solutions.scss';

export const Solutions: React.FC = () => {
  const { setCurrentPage } = useApp();

  // Column image sets (2 unique images per column)
  const col1 = ['/images/solutions/solutions_1.png', '/images/solutions/solutions_2.png'];
  const col2 = ['/images/solutions/solutions_3.png', '/images/solutions/solutions_4.png'];
  const col3 = ['/images/solutions/solutions_5.png', '/images/solutions/solutions_6.png'];
  const col4 = ['/images/solutions/solutions_7.png', '/images/solutions/solutions_8.png'];

  // Triple each set for a seamless infinite loop animation
  const track1 = [...col1, ...col1, ...col1];
  const track2 = [...col2, ...col2, ...col2];
  const track3 = [...col3, ...col3, ...col3];
  const track4 = [...col4, ...col4, ...col4];

  const handleCtaClick = () => {
    setCurrentPage('signup');
  };

  return (
    <section className="solutions">
      <div className="solutions__container">
        
        {/* Left Columns */}
        <div className="solutions__side solutions__side--left">
          {/* Column 1: Up & Slow */}
          <div className="solutions__column solutions__column--up solutions__column--slow">
            <div className="solutions__column-track">
              {track1.map((imgSrc, index) => (
                <div className="solutions__card" key={`col1-${index}`}>
                  <div className="solutions__card-inner">
                    <img 
                      src={imgSrc} 
                      alt={`Vibe OS workplace dynamic solution ${index + 1}`} 
                      className="solutions__card-image"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Down & Normal */}
          <div className="solutions__column solutions__column--down solutions__column--normal">
            <div className="solutions__column-track">
              {track2.map((imgSrc, index) => (
                <div className="solutions__card" key={`col2-${index}`}>
                  <div className="solutions__card-inner">
                    <img 
                      src={imgSrc} 
                      alt={`Vibe OS culture building solution ${index + 1}`} 
                      className="solutions__card-image"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Marketing Content */}
        <div className="solutions__center">
          <div className="solutions__icon-ring">
            <div className="solutions__icon-card">
              <Sparkles size={32} strokeWidth={1.75} />
            </div>
          </div>
          <h2 className="solutions__title">
            Smart solutions <span className="solutions__title-break">for modern teams.</span>
          </h2>
          <p className="solutions__description">
            Vibe OS equips leaders with real-time feedback insights and automated action templates to reduce turnover, resolve friction, and build premium workplace cultures.
          </p>
          <button 
            className="solutions__button"
            onClick={handleCtaClick}
            aria-label="Get started with Vibe OS solutions"
          >
            Explore Solutions
          </button>
        </div>

        {/* Right Columns */}
        <div className="solutions__side solutions__side--right">
          {/* Column 3: Up & Normal */}
          <div className="solutions__column solutions__column--up solutions__column--normal">
            <div className="solutions__column-track">
              {track3.map((imgSrc, index) => (
                <div className="solutions__card" key={`col3-${index}`}>
                  <div className="solutions__card-inner">
                    <img 
                      src={imgSrc} 
                      alt={`Vibe OS team alignment solution ${index + 1}`} 
                      className="solutions__card-image"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Down & Slow */}
          <div className="solutions__column solutions__column--down solutions__column--slow">
            <div className="solutions__column-track">
              {track4.map((imgSrc, index) => (
                <div className="solutions__card" key={`col4-${index}`}>
                  <div className="solutions__card-inner">
                    <img 
                      src={imgSrc} 
                      alt={`Vibe OS analytics solution ${index + 1}`} 
                      className="solutions__card-image"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
