import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './AboutUs.css';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ── Timeline Data ──────────────────────────────────────────────────────────
  const timelineEvents = [
    {
      year: '1939',
      title: 'Foundation of Dongri Cha Raja',
      desc: 'Chinch Bunder Dongri Sarvajanik Ganeshotsav Mandal was established in the historic Chinch Bunder–Dongri neighbourhood of South Mumbai — a locality that was itself deeply intertwined with India\'s freedom movement. A group of devoted local residents came together under the vision of Lokmanya Tilak\'s Sarvajanik Ganeshotsav, bringing neighbours of all backgrounds into a single community celebration.',
    },
    {
      year: '1950s',
      title: 'Growing Community Participation',
      desc: 'The festival steadily became a cherished cultural pillar for local residents and families of Dongri. Year after year, more households joined the celebrations, strengthening bonds of faith and brotherhood across the neighbourhood.',
    },
    {
      year: '1960s – 1970s',
      title: 'Expansion of Religious Activities',
      desc: 'Traditional aartis, devotional bhajan programs, kirtans, and community gatherings became central to the celebrations. The Mandal formalized its daily Puja schedule, ensuring every ritual was observed with full Vedic sanctity throughout the ten-day Ganeshotsav.',
    },
    {
      year: '1980s',
      title: 'Cultural Development',
      desc: 'The Mandal expanded its cultural and social outreach programs, introducing performances, cultural competitions, and awareness campaigns that amplified the festival\'s reach and enriched the community experience for devotees of all ages.',
    },
    {
      year: '1990s',
      title: 'Recognition Across Mumbai',
      desc: 'Dongri Cha Raja began attracting devotees from various parts of Mumbai and beyond. The Mandal\'s reputation for devotion, warm hospitality, and well-organized celebrations earned it recognition as one of South Mumbai\'s respected Ganeshotsav institutions.',
    },
    {
      year: '2000s',
      title: 'Modernisation & Better Management',
      desc: 'The Mandal embraced improved festival management practices, structured volunteer participation programs, and enhanced public engagement initiatives — ensuring a safer, more inclusive, and professionally organised experience for thousands of devotees.',
    },
    {
      year: '2013',
      title: 'Grand Ganeshotsav Celebration',
      desc: 'The 2013 celebrations became one of the most memorable and widely documented Ganeshotsavs in the Mandal\'s history. Enthusiastic public participation and widespread media coverage further strengthened the devotee community\'s pride in Dongri Cha Raja.',
    },
    {
      year: '2020 – 2021',
      title: 'Service During Challenging Times',
      desc: 'During the global pandemic, the Mandal stood by its community. Funds were directed towards food distribution drives, relief assistance, and welfare support for affected families in Dongri and the surrounding areas — reaffirming that seva is not seasonal but a permanent commitment.',
    },
    {
      year: 'Present Day',
      title: 'Continuing the Legacy',
      desc: 'With over 85 years of unbroken devotion, Dongri Cha Raja continues its journey of faith, culture, and community service. Every year, thousands of devotees gather to seek the blessings of Lord Ganesha and to participate in celebrations that remain rooted in tradition while embracing the present.',
    },
  ];

  // ── Mission Pillars ────────────────────────────────────────────────────────
  const missionPillars = [
    {
      icon: '🪔',
      titleEn: 'Devotion',
      titleMr: 'भक्ती',
      desc: 'Creating a spiritually uplifting environment for devotees to seek the blessings of Lord Ganesha with reverence and authentic Vedic tradition.',
    },
    {
      icon: '🤝',
      titleEn: 'Community',
      titleMr: 'समुदाय',
      desc: 'Strengthening bonds among residents, families, and devotees through collective celebration, shared values, and a culture of togetherness.',
    },
    {
      icon: '🌿',
      titleEn: 'Service',
      titleMr: 'सेवा',
      desc: 'Supporting social welfare initiatives, food distribution drives, health awareness programs, and community development throughout the year.',
    },
    {
      icon: '🎶',
      titleEn: 'Heritage',
      titleMr: 'वारसा',
      desc: 'Preserving the rich traditions, cultural values, and devotional customs of Maharashtra\'s Ganeshotsav for every generation to experience and carry forward.',
    },
  ];

  // ── Core Values ────────────────────────────────────────────────────────────
  const coreValues = [
    {
      icon: 'fa-om',
      titleEn: 'Faith',
      titleMr: 'श्रद्धा',
      desc: 'Celebrating Lord Ganesha — the Vighnaharta, remover of obstacles — with unwavering devotion, daily Aarti, and traditional Vedic Puja rituals observed faithfully since 1939.',
    },
    {
      icon: 'fa-dharmachakra',
      titleEn: 'Unity',
      titleMr: 'एकता',
      desc: 'In the spirit of Lokmanya Tilak\'s Sarvajanik Ganeshotsav, we bring together people of every background, age, and walk of life — our pandal is a home for all devotees of Bappa.',
    },
    {
      icon: 'fa-drum',
      titleEn: 'Culture',
      titleMr: 'संस्कृती',
      desc: 'Promoting the rich traditions of Maharashtrian Ganeshotsav — from devotional bhajans and kirtans to cultural performances — keeping our heritage vibrant and alive.',
    },
    {
      icon: 'fa-hands-helping',
      titleEn: 'Service',
      titleMr: 'सेवा',
      desc: 'Giving back to society through food distribution drives, health awareness camps, volunteer programs, and educational support initiatives throughout the year.',
    },
  ];

  // ── Impact Stats ───────────────────────────────────────────────────────────
  const impactStats = [
    { num: '1939', label: 'Year Established' },
    { num: '85+', label: 'Years of Legacy' },
    { num: '10', label: 'Days of Ganeshotsav' },
    { num: '4+', label: 'Generations Served' },
  ];

  // ── Festival Highlights ────────────────────────────────────────────────────
  const festivalHighlights = [
    { icon: 'fa-gopuram', text: 'Ganesh Murti Sthapana' },
    { icon: 'fa-fire', text: 'Daily Aarti & Pooja' },
    { icon: 'fa-music', text: 'Bhajan & Devotional Programs' },
    { icon: 'fa-theater-masks', text: 'Cultural Activities' },
    { icon: 'fa-users', text: 'Community Gatherings' },
    { icon: 'fa-bullhorn', text: 'Social Awareness Campaigns' },
    { icon: 'fa-water', text: 'Grand Visarjan Procession' },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Dongri Cha Raja — 85+ Years of Faith, Culture &amp; Community</title>
        <meta
          name="description"
          content="Learn about the rich history and legacy of Chinch Bunder Dongri Sarvajanik Ganeshotsav Mandal — proudly serving devotees and the South Mumbai community since 1939 with devotion, culture, and relentless community service."
        />
      </Helmet>

      <main className="about-page fade-in">

        {/* ── Banner ─────────────────────────────────────────────────────── */}
        <section className="about-banner committee-banner" aria-label="About Us Banner">
          <div className="committee-banner__mandala" aria-hidden="true">
            <span className="mandala-ring mandala-ring--outer" />
            <span className="mandala-ring mandala-ring--mid" />
            <span className="mandala-ring mandala-ring--inner" />
          </div>
          <div className="committee-banner__ornament top-left" aria-hidden="true">❋</div>
          <div className="committee-banner__ornament top-right" aria-hidden="true">❋</div>
          <div className="container">
            <p className="committee-banner__marathi-year">स्थापना १९३९ · Since 1939</p>
            <h1 className="committee-banner__title">Our Legacy &amp; History</h1>
            <p className="committee-banner__marathi-title" lang="mr">आमचा वारसा आणि इतिहास</p>
            <div className="committee-banner__divider" aria-hidden="true">
              <span className="divider-line" />
              <span className="divider-gem">✦</span>
              <span className="divider-line" />
            </div>
            <p className="committee-banner__subtitle">
              Chinch Bunder Dongri Sarvajanik Ganeshotsav Mandal
            </p>
          </div>
        </section>

        {/* ── Intro / Who We Are ─────────────────────────────────────────── */}
        <section className="section committee-intro-section" aria-label="About the Mandal">
          <div className="container committee-intro-container">
            <div className="committee-intro-ornament" aria-hidden="true">
              <span className="intro-ornament-line" />
              <span className="intro-ornament-lotus">✿</span>
              <span className="intro-ornament-line" />
            </div>
            <p className="committee-intro-text">
              For more than eight decades, <strong>Dongri Cha Raja</strong> has stood as a symbol
              of devotion, unity, and community service. Founded in <strong>1939</strong> in the
              historic Chinch Bunder–Dongri area of South Mumbai — a locality deeply woven into
              the fabric of India's freedom movement — the Mandal has preserved the rich traditions
              of Maharashtra's Sarvajanik Ganeshotsav while bringing together generations of
              devotees from across Mumbai.
            </p>
          </div>
        </section>

        {/* ── Impact Stats ───────────────────────────────────────────────── */}
        <section className="section about-stats-section" aria-label="Impact Statistics">
          <div className="container">
            <div className="about-stats-grid">
              {impactStats.map((stat, idx) => (
                <div key={idx} className="about-stat-card">
                  <span className="about-stat-num">{stat.num}</span>
                  <span className="about-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Founder Story ──────────────────────────────────────────────── */}
        <section className="section about-founder-section" aria-label="Founder Story">
          <div className="container">
            <div className="about-section-header">
              <div className="committee-intro-ornament" aria-hidden="true">
                <span className="intro-ornament-line" />
                <span className="intro-ornament-lotus">✿</span>
                <span className="intro-ornament-line" />
              </div>
              <h2 className="about-section-title">From a Community Vision to a Timeless Legacy</h2>
              <div className="committee-group__header-rule" aria-hidden="true">
                <span className="rule-line" />
                <span className="rule-gem">◆</span>
                <span className="rule-line" />
              </div>
            </div>
            <div className="about-founder-content">
              <p className="about-founder-lead">
                Founded in 1939 in the historic neighbourhoods of Chinch Bunder and Dongri,
                the Mandal was established with the vision of bringing people together through
                collective devotion to Lord Ganesha. Inspired by Lokmanya Bal Gangadhar Tilak's
                transformative Sarvajanik Ganeshotsav movement — which began in 1893 to unite
                communities and foster a spirit of national pride — our founders carried that
                timeless torch into the lanes of South Mumbai.
              </p>
              <p>
                Over the decades, what began as a local community celebration has evolved into one
                of South Mumbai's respected Ganeshotsav institutions — a symbol of faith, unity,
                and cultural pride, while remaining deeply rooted in its traditions and values.
                Every year, thousands of devotees from across Mumbai and beyond make their way to
                Dongri Cha Raja, drawn not only by the grandeur of the celebrations but by the
                warm, family-like atmosphere that has always defined this Mandal.
              </p>
              <p>
                We believe that to truly honour Lord Ganesha — the <em>Vighnaharta</em>, the
                remover of obstacles — we must work to remove obstacles from the lives of those
                around us. Seva is not a supplement to our devotion; it is its very expression.
                From food distribution drives during the pandemic to health awareness camps,
                volunteer programs, and educational support, the Mandal's commitment to community
                welfare extends far beyond the ten days of Ganeshotsav.
              </p>
            </div>
          </div>
        </section>

        {/* ── Vision & Mission ───────────────────────────────────────────── */}
        <section className="section about-mission-section" aria-label="Vision and Mission">
          <div className="container">
            <div className="about-section-header">
              <div className="committee-intro-ornament" aria-hidden="true">
                <span className="intro-ornament-line" />
                <span className="intro-ornament-lotus">✿</span>
                <span className="intro-ornament-line" />
              </div>
              <h2 className="about-section-title">Our Vision &amp; Mission</h2>
              <div className="committee-group__header-rule" aria-hidden="true">
                <span className="rule-line" />
                <span className="rule-gem">◆</span>
                <span className="rule-line" />
              </div>
              <p className="about-section-subtitle">
                To preserve and promote the spiritual, cultural, and social values of Ganeshotsav
                while serving society through meaningful community initiatives.
              </p>
            </div>
            <div className="about-mission-grid">
              {missionPillars.map((pillar, idx) => (
                <div key={idx} className="about-mission-card">
                  <span className="about-mission-icon" aria-hidden="true">{pillar.icon}</span>
                  <h3 className="about-mission-title-en">{pillar.titleEn}</h3>
                  <p className="about-mission-title-mr" lang="mr">{pillar.titleMr}</p>
                  <p className="about-mission-desc">{pillar.desc}</p>
                  <span className="member-card__accent-bar" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Core Values ────────────────────────────────────────────────── */}
        <section className="section about-values-section" aria-label="Core Values">
          <div className="container">
            <div className="about-section-header">
              <div className="committee-intro-ornament" aria-hidden="true">
                <span className="intro-ornament-line" />
                <span className="intro-ornament-lotus">✿</span>
                <span className="intro-ornament-line" />
              </div>
              <h2 className="about-section-title">Our Core Values</h2>
              <div className="committee-group__header-rule" aria-hidden="true">
                <span className="rule-line" />
                <span className="rule-gem">◆</span>
                <span className="rule-line" />
              </div>
              <p className="about-section-subtitle">
                The timeless principles of Bhakti and Seva that have guided the Mandal for over 85 years
              </p>
            </div>
            <div className="about-values-grid">
              {coreValues.map((val, idx) => (
                <div key={idx} className="about-value-card">
                  <div className="about-value-icon">
                    <i className={`fas ${val.icon}`} aria-hidden="true"></i>
                  </div>
                  <h3 className="about-value-title-en">{val.titleEn}</h3>
                  <p className="about-value-title-mr" lang="mr">{val.titleMr}</p>
                  <p className="about-value-desc">{val.desc}</p>
                  <span className="member-card__accent-bar" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Historical Timeline ────────────────────────────────────────── */}
        <section className="section about-timeline-section" aria-label="Historical Timeline">
          <div className="container">
            <div className="about-section-header">
              <div className="committee-intro-ornament" aria-hidden="true">
                <span className="intro-ornament-line" />
                <span className="intro-ornament-lotus">✿</span>
                <span className="intro-ornament-line" />
              </div>
              <h2 className="about-section-title">Historical Timeline</h2>
              <div className="committee-group__header-rule" aria-hidden="true">
                <span className="rule-line" />
                <span className="rule-gem">◆</span>
                <span className="rule-line" />
              </div>
              <p className="about-section-subtitle">A journey of faith, unity, and unwavering service to community — since 1939</p>
            </div>

            <div className="timeline-container">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content card">
                    <span className="timeline-year">{evt.year}</span>
                    <h3>{evt.title}</h3>
                    <p>{evt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Festival Highlights ────────────────────────────────────────── */}
        <section className="section about-festival-section" aria-label="Festival Highlights">
          <div className="container">
            <div className="about-section-header">
              <div className="committee-intro-ornament" aria-hidden="true">
                <span className="intro-ornament-line" />
                <span className="intro-ornament-lotus">✿</span>
                <span className="intro-ornament-line" />
              </div>
              <h2 className="about-section-title">Festival Highlights</h2>
              <div className="committee-group__header-rule" aria-hidden="true">
                <span className="rule-line" />
                <span className="rule-gem">◆</span>
                <span className="rule-line" />
              </div>
              <p className="about-section-subtitle">
                Every year, the Ganeshotsav celebrations include these cherished traditions
              </p>
            </div>
            <div className="about-festival-grid">
              {festivalHighlights.map((item, idx) => (
                <div key={idx} className="about-festival-item">
                  <div className="about-festival-icon">
                    <i className={`fas ${item.icon}`} aria-hidden="true"></i>
                  </div>
                  <span className="about-festival-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Social Contributions ───────────────────────────────────────── */}
        <section className="section about-social-section" aria-label="Social Contributions">
          <div className="container">
            <div className="about-section-header">
              <div className="committee-intro-ornament" aria-hidden="true">
                <span className="intro-ornament-line" />
                <span className="intro-ornament-lotus">✿</span>
                <span className="intro-ornament-line" />
              </div>
              <h2 className="about-section-title">Social Contributions</h2>
              <div className="committee-group__header-rule" aria-hidden="true">
                <span className="rule-line" />
                <span className="rule-gem">◆</span>
                <span className="rule-line" />
              </div>
              <p className="about-section-subtitle">
                Recognised not only for religious celebrations but for supporting the community through meaningful seva
              </p>
            </div>
            <div className="about-social-intro">
              <p>
                The Mandal is recognised not only for its religious celebrations but also for
                supporting social causes and community welfare initiatives. During the pandemic
                period, funds were directed towards food distribution and relief efforts for
                affected families in Dongri and surrounding areas.
              </p>
            </div>
            <div className="about-social-grid">
              {[
                { icon: 'fa-heart', label: 'Community Welfare' },
                { icon: 'fa-box-open', label: 'Food Distribution Drives' },
                { icon: 'fa-landmark', label: 'Cultural Preservation' },
                { icon: 'fa-hands', label: 'Volunteer Programs' },
                { icon: 'fa-graduation-cap', label: 'Educational Support' },
                { icon: 'fa-stethoscope', label: 'Health & Awareness' },
                { icon: 'fa-leaf', label: 'Environmental Awareness' },
              ].map((item, idx) => (
                <div key={idx} className="about-social-item">
                  <div className="about-social-icon">
                    <i className={`fas ${item.icon}`} aria-hidden="true"></i>
                  </div>
                  <span className="about-social-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <section className="section committee-cta-section" aria-label="Join Our Journey">
          <div className="container">
            <div className="committee-cta-card">
              <div className="committee-cta-card__ornament" aria-hidden="true">
                <span className="cta-line" />
                <span className="cta-lotus">✿</span>
                <span className="cta-line" />
              </div>
              <h2 className="committee-cta-card__title">Be a Part of the Legacy</h2>
              <p className="committee-cta-card__text">
                For over 85 years, Dongri Cha Raja has united generations of devotees through
                devotion, tradition, and service to society. Join us as a volunteer, a devotee,
                or a supporter — and help carry this sacred legacy forward.
              </p>
              <div className="committee-cta-card__actions">
                <a
                  href="/devotee-services/volunteer"
                  className="btn btn-primary btn-lg"
                  id="about-volunteer-btn"
                >
                  Join Our Seva
                </a>
                <a
                  href="/contact-us"
                  className="btn btn-outline btn-lg"
                  id="about-contact-btn"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default AboutUs;
