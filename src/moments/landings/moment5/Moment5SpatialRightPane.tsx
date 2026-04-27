import './daily_schedule_pixel.css';

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="block h-full w-full max-h-[26px] max-w-[26px]">
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Moment5 right pane — Daily Schedule + KPI tiles, responsive (see `public/moment5/Spatial.png`). */
export function Moment5SpatialRightPane() {
  return (
    <div className="m5-daily-pixel-root min-h-full w-full min-w-0" data-name="Moment5SpatialRightPane">
      <main className="screen">
        <section className="schedule-card">
          <header className="schedule-header">
            <div className="header-left">
              <div className="calendar-icon" aria-hidden>
                <CalendarIcon />
              </div>
              <div className="min-w-0">
                <h1>Daily Schedule</h1>
                <p>11 items to attend</p>
              </div>
            </div>
            <button className="more-btn" type="button" aria-label="More options">
              <span />
              <span />
              <span />
            </button>
          </header>

          <div className="schedule-grid">
            <div className="column left-column">
              <article className="appointment active-line">
                <div className="time">8:00</div>
                <div className="details">
                  <div className="topline">
                    <h2>Sarah Chen</h2>
                    <span className="chevron" aria-hidden />
                  </div>
                  <div className="subline">
                    <p>New patient</p>
                    <span className="badge green">Checked In</span>
                  </div>
                </div>
              </article>

              <article className="appointment">
                <div className="time">8:30</div>
                <div className="details">
                  <div className="topline">
                    <h2>Carlos Torres</h2>
                    <span className="chevron" aria-hidden />
                  </div>
                  <div className="subline">
                    <p>Follow-up</p>
                    <span className="badge green">Checked In</span>
                  </div>
                </div>
              </article>

              <article className="appointment">
                <div className="time">9:00</div>
                <div className="details">
                  <div className="topline">
                    <h2>Priya Ramachandran</h2>
                    <span className="chevron" aria-hidden />
                  </div>
                  <div className="subline">
                    <p>Urgent</p>
                    <span className="badge orange">Waiting</span>
                  </div>
                </div>
              </article>

              <article className="appointment last-left">
                <div className="time">9:30</div>
                <div className="details">
                  <div className="topline">
                    <h2>David Park</h2>
                    <span className="chevron" aria-hidden />
                  </div>
                  <div className="subline">
                    <p>Follow-up</p>
                    <span className="badge blue">Incoming</span>
                  </div>
                </div>
              </article>
            </div>

            <div className="column right-column">
              <article className="appointment">
                <div className="time">10:00</div>
                <div className="details">
                  <div className="topline">
                    <h2>Isabel Nguyen</h2>
                    <span className="chevron" aria-hidden />
                  </div>
                  <div className="subline">
                    <p>New Patient</p>
                    <span className="badge blue">Incoming</span>
                  </div>
                </div>
              </article>

              <article className="appointment">
                <div className="time">10:30</div>
                <div className="details">
                  <div className="topline">
                    <h2>Aerin Kyle</h2>
                    <span className="chevron" aria-hidden />
                  </div>
                  <div className="subline">
                    <p>Follow-up</p>
                    <span className="badge blue">Incoming</span>
                  </div>
                </div>
              </article>

              <article className="appointment">
                <div className="time">11:00</div>
                <div className="details">
                  <div className="topline">
                    <h2>Marcus Webb</h2>
                    <span className="chevron" aria-hidden />
                  </div>
                  <div className="subline">
                    <p>New patient</p>
                    <span className="badge blue">Incoming</span>
                  </div>
                </div>
              </article>

              <article className="appointment last-right">
                <div className="time">11:30</div>
                <div className="details">
                  <div className="topline">
                    <h2>Lin Chen</h2>
                    <span className="chevron" aria-hidden />
                  </div>
                  <div className="subline">
                    <p>Follow-up</p>
                    <span className="badge blue">Incoming</span>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <footer className="schedule-footer">
            <button type="button">
              View full schedule <span>→</span>
            </button>
          </footer>
        </section>

        <section className="tile-grid">
          <article className="placeholder-tile">
            <div>
              <h3>Clinic Health</h3>
              <p>XXX Items</p>
            </div>
          </article>
          <article className="placeholder-tile">
            <div>
              <h3>Referral Queue</h3>
              <p>XXX Items</p>
            </div>
          </article>
          <article className="placeholder-tile">
            <div>
              <h3>No-show Risk</h3>
              <p>XXX Items</p>
            </div>
          </article>
          <article className="placeholder-tile">
            <div>
              <h3>Payment Collection</h3>
              <p>XXX Items</p>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
