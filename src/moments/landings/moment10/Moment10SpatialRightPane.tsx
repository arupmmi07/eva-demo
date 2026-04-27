import './moment10_right.css';

function MenuButton() {
  return (
    <button className="m10-menu-btn" type="button" aria-label="More options">
      <span />
      <span />
      <span />
    </button>
  );
}

/** Moment10 right pane — from `public/moment10/moment10.html` / `right.png`; responsive + app typography. */
export function Moment10SpatialRightPane() {
  return (
    <div className="m10-right-root min-h-full w-full" data-name="Moment10SpatialRightPane">
      <div className="m10-canvas">
        <section className="m10-top-grid" aria-label="Operations overview">
          <article className="m10-panel">
            <header className="m10-section-header">
              <h2>Today · Cascade PT</h2>
              <div className="m10-header-actions">
                <button className="m10-link-btn" type="button">
                  View all
                </button>
                <MenuButton />
              </div>
            </header>
            <div className="m10-card">
              <div className="m10-stats-grid">
                <div className="m10-stat-box">
                  <p>Visits</p>
                  <strong>216</strong>
                </div>
                <div className="m10-stat-box">
                  <p>Providers</p>
                  <strong>18</strong>
                </div>
                <div className="m10-stat-box">
                  <p>Utilization</p>
                  <strong>82%</strong>
                </div>
                <div className="m10-stat-box">
                  <p>Open slots</p>
                  <strong>12</strong>
                </div>
              </div>
              <div className="m10-metric-row">
                <span>Doc completion</span>
                <strong>74%</strong>
              </div>
              <div className="m10-metric-row">
                <span>Notes on-time</span>
                <strong>68%</strong>
              </div>
            </div>
          </article>

          <article className="m10-panel">
            <header className="m10-section-header">
              <h2>Locations &amp; Providers</h2>
              <MenuButton />
            </header>
            <div className="m10-card m10-location-card">
              <div className="m10-location-item">
                <div className="m10-location-main">
                  <h3>Location 1 · Downtown</h3>
                  <p>108 visits · 9 providers</p>
                  <div className="m10-pill-row">
                    <span>
                      Utilization <b>84%</b>
                    </span>
                    <span className="m10-dot" aria-hidden>
                      ·
                    </span>
                    <span>
                      Doc <b>78%</b>
                    </span>
                    <span className="m10-dot" aria-hidden>
                      ·
                    </span>
                    <span>
                      On-time <b>72%</b>
                    </span>
                  </div>
                </div>
                <button className="m10-arrow-btn" type="button" aria-label="Open location">
                  ›
                </button>
              </div>
              <div className="m10-location-item">
                <div className="m10-location-main">
                  <h3>Location 2 · Westside</h3>
                  <p>108 visits · 9 providers</p>
                  <div className="m10-pill-row">
                    <span>
                      Utilization <b>80%</b>
                    </span>
                    <span className="m10-dot" aria-hidden>
                      ·
                    </span>
                    <span>
                      Doc <b>70%</b>
                    </span>
                    <span className="m10-dot" aria-hidden>
                      ·
                    </span>
                    <span>
                      On-time <b>64%</b>
                    </span>
                  </div>
                  <p className="m10-warning">Doc completion ↓ 3 weeks</p>
                </div>
                <button className="m10-arrow-btn" type="button" aria-label="Open location">
                  ›
                </button>
              </div>
            </div>
          </article>

          <article className="m10-panel">
            <header className="m10-section-header">
              <h2>Payer Performance</h2>
              <div className="m10-header-actions">
                <button className="m10-link-btn" type="button">
                  View all
                </button>
                <MenuButton />
              </div>
            </header>
            <div className="m10-card m10-payer-card">
              <div className="m10-payer-row">
                <div>
                  <h3>Aetna PPO</h3>
                  <p>
                    Clean <b>94%</b> · Pay <b>12d</b> · Denial <b>3%</b>
                  </p>
                </div>
                <span className="m10-badge m10-green">Healthy</span>
              </div>
              <div className="m10-payer-row">
                <div>
                  <h3>BCBS PPO</h3>
                  <p>
                    Clean <b>89%</b> · Pay <b>18d</b> · Denial <b>6%</b>
                  </p>
                </div>
                <span className="m10-badge m10-gray">Normal</span>
              </div>
              <div className="m10-payer-row">
                <div>
                  <h3>Medicare Part B</h3>
                  <p>
                    Clean <b>96%</b> · Pay <b>22d</b> · Denial <b>2%</b>
                  </p>
                </div>
                <span className="m10-badge m10-gray">Normal</span>
              </div>
            </div>
          </article>

          <article className="m10-panel">
            <header className="m10-section-header">
              <h2>Claims Overview</h2>
              <div className="m10-header-actions">
                <button className="m10-link-btn" type="button">
                  View all
                </button>
                <MenuButton />
              </div>
            </header>
            <div className="m10-card">
              <div className="m10-claim-stats">
                <div className="m10-claim-box">
                  <p>Submitted</p>
                  <strong>142</strong>
                </div>
                <div className="m10-claim-box">
                  <p>Adjudication</p>
                  <strong>68</strong>
                </div>
                <div className="m10-claim-box">
                  <p>Pending</p>
                  <strong>31</strong>
                </div>
                <div className="m10-claim-box m10-attention">
                  <p>Attention</p>
                  <strong>6</strong>
                </div>
              </div>
              <div className="m10-claim-row">
                <span>Avg velocity</span>
                <strong>14 days</strong>
              </div>
              <div className="m10-claim-row">
                <span>Denial rate (90d)</span>
                <strong className="m10-down">4.2% ↓</strong>
              </div>
            </div>
          </article>
        </section>

        <section className="m10-anomaly-section" aria-label="Anomaly">
          <header className="m10-section-header m10-anomaly-title">
            <h2>Anomaly Detected</h2>
            <div className="m10-header-actions">
              <button className="m10-link-btn" type="button">
                View all
              </button>
              <MenuButton />
            </div>
          </header>
          <article className="m10-card m10-anomaly-card">
            <div className="m10-anomaly-text">
              <h3>Aetna PPO</h3>
              <p>Pattern present for 3 consecutive weeks.</p>
              <p>Unsigned notes recurring for 2 providers at Location 2.</p>
            </div>
            <div className="m10-anomaly-actions">
              <button className="m10-primary" type="button">
                Open trend
              </button>
              <button className="m10-secondary" type="button">
                Notify clinic director
              </button>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
