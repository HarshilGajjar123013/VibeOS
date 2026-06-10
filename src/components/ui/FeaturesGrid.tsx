import React from 'react';
import { Globe, ShieldCheck, Users } from 'lucide-react';
import './FeaturesGrid.scss';

export const FeaturesGrid: React.FC = () => {
  return (
    <section className="features-grid">
      <div className="features-grid__header">
        <h2>Built for everyone</h2>
        <p>Thousands of businesses, from startups to enterprises, use Vibe OS to align their teams, protect feedback integrity, and manage workplace compliance.</p>
      </div>

      <div className="features-grid__wrapper">
        
        {/* Row 1: 3 Columns */}
        <div className="features-grid__row-three">
          
          {/* Card 1: HR Professionals */}
          <div className="features-grid__card">
            <div className="features-grid__graphic-frame">
              <div className="attendance-bg-card-left"></div>
              <div className="attendance-card">
                <div className="attendance-header">
                  <span>Attendance Report</span>
                  <div className="dropdown">Monthly</div>
                </div>
                <div className="attendance-bars">
                  <div className="bar bar--purple"></div>
                  <div className="bar bar--blue"></div>
                  <div className="bar bar--orange"></div>
                  <div className="bar bar--purple"></div>
                  <div className="bar bar--blue"></div>
                  <div className="bar bar--orange"></div>
                </div>
              </div>
              <div className="attendance-bg-card-right"></div>
            </div>
            <div className="features-grid__content">
              <h3>For HR professionals</h3>
              <p>Use a single cloud system for your employees, candidates and HR processes info.</p>
            </div>
          </div>

          {/* Card 2: Managers & Leaders */}
          <div className="features-grid__card">
            <div className="features-grid__graphic-frame">
              <div className="insights-concentric">
                <div className="circle-ring circle-ring--outer"></div>
                <div className="circle-ring circle-ring--inner"></div>
                <div className="insights-btn">
                  <Globe size={14} />
                  <span>Access Real-Time Insights</span>
                </div>
              </div>
            </div>
            <div className="features-grid__content">
              <h3>For managers & leaders</h3>
              <p>Get always up-to-date data and monitor performance of the company.</p>
            </div>
          </div>

          {/* Card 3: Legal Teams */}
          <div className="features-grid__card">
            <div className="features-grid__graphic-frame">
              <div className="legal-stack">
                <div className="legal-doc legal-doc--1">
                  <div className="line line--short"></div>
                  <div className="line line--medium"></div>
                  <div className="line line--long"></div>
                  <div className="line line--medium"></div>
                </div>
                <div className="legal-doc legal-doc--2">
                  <div className="line line--medium"></div>
                  <div className="line line--short"></div>
                  <div className="line line--long"></div>
                  <div className="line line--long"></div>
                </div>
                <div className="legal-badge">
                  <ShieldCheck size={20} />
                </div>
              </div>
            </div>
            <div className="features-grid__content">
              <h3>For legal teams</h3>
              <p>Vibe OS helps legal teams by streamlining compliance, managing contracts and policies.</p>
            </div>
          </div>

        </div>

        {/* Row 2: 2 Columns */}
        <div className="features-grid__row-two">
          
          {/* Card 4: All Employee Data */}
          <div className="features-grid__card">
            <div className="features-grid__graphic-frame">
              <div className="employee-data-layout">
                {/* Left Mini-Card: Stat */}
                <div className="sub-card sub-card--left">
                  <span className="stat-header">Training Participation</span>
                  <div className="stat-progress-container">
                    <span className="stat-badge">46%</span>
                  </div>
                  <div className="progress-bg">
                    <div className="progress-fill"></div>
                  </div>
                  <div className="box-placeholder"></div>
                </div>
                {/* Right Mini-Card: Employees List */}
                <div className="sub-card sub-card--right">
                  <span className="employees-header">Employees</span>
                  
                  <div className="employee-row">
                    <div className="employee-avatar" style={{ backgroundColor: 'rgba(126, 83, 255, 0.15)', color: '#7e53ff' }}>WG</div>
                    <div className="employee-info">
                      <span className="name">Willem Gray</span>
                      <span className="role">Visual Director</span>
                    </div>
                  </div>

                  <div className="employee-row">
                    <div className="employee-avatar" style={{ backgroundColor: 'rgba(73, 196, 255, 0.15)', color: '#49c4ff' }}>DR</div>
                    <div className="employee-info">
                      <span className="name">Dimitri Ryabov</span>
                      <span className="role">PM / BA</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="features-grid__content">
              <h3>All employee data at once</h3>
              <p>Contact and personal information, paid and unpaid leave balances, career history, projects and more.</p>
            </div>
          </div>

          {/* Card 5: Teams & Employees */}
          <div className="features-grid__card">
            <div className="features-grid__graphic-frame">
              <div className="network-orbit">
                <div className="orbit-line">
                  <div className="orbit-node">👦</div>
                  <div className="orbit-node">👩</div>
                  <div className="orbit-node">🧔</div>
                  <div className="orbit-node">👧</div>
                  <div className="orbit-node">👨</div>
                  <div className="orbit-node">👵</div>
                </div>
                <div className="orbit-center">
                  <Users size={22} />
                </div>
              </div>
            </div>
            <div className="features-grid__content">
              <h3>For teams & employees</h3>
              <p>Get to know who is going to be out of office and be aware of upcoming events.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
