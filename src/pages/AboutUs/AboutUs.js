import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './AboutUs.css';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const timelineEvents = [
    {
      year: "1939",
      title: "Foundation of Dongri Cha Raja",
      desc: "Chinch Bunder Dongri Sarvajanik Ganeshotsav Mandal was established in the historic Chinch Bunder–Dongri area of South Mumbai — a locality steeped in community spirit and closely tied to India's freedom movement.",
      icon: "fa-flag"
    },
    {
      year: "1950s",
      title: "Growing Community Participation",
      desc: "The festival blossomed into an important cultural gathering for local residents and families, weaving together the neighbourhood in shared devotion and joyful celebration year after year.",
      icon: "fa-users"
    },
    {
      year: "1960s–1970s",
      title: "Expansion of Religious Activities",
      desc: "Traditional aartis, devotional programs, and community events became central pillars of the celebration, deepening the festival's spiritual character and drawing ever-larger gatherings of devotees.",
      icon: "fa-om"
    },
    {
      year: "1980s",
      title: "Cultural Development",
      desc: "The mandal expanded its cultural and social outreach programs, strengthening its bonds with the broader South Mumbai community and establishing itself as a proud guardian of Maharashtrian heritage.",
      icon: "fa-star"
    },
    {
      year: "1990s",
      title: "Recognition Across Mumbai",
      desc: "Dongri Cha Raja began attracting devotees from across Mumbai and neighbouring areas, growing into one of South Mumbai's most respected and beloved Ganeshotsav institutions.",
      icon: "fa-award"
    },
    {
      year: "2000s",
      title: "A New Era of Celebration",
      desc: "Improved festival management, greater volunteer participation, and broader public engagement brought the mandal into a new era — blending cherished tradition with organised, impactful celebration.",
      icon: "fa-chart-line"
    },
    {
      year: "2013",
      title: "Grand Ganeshotsav Celebration",
      desc: "The 2013 celebration became one of the most memorable years in the mandal's history — widely documented through photographs and heartfelt public participation, cementing Dongri Cha Raja's place among South Mumbai's most cherished traditions.",
      icon: "fa-camera"
    },
    {
      year: "2020–2021",
      title: "Service During Challenging Times",
      desc: "The mandal stepped forward with compassion and purpose during the pandemic, organising food distribution drives and relief initiatives to support affected families across the Dongri community.",
      icon: "fa-heart"
    },
    {
      year: "Present Day",
      title: "Continuing the Legacy",
      desc: "With over 85 years of unbroken devotion, the mandal continues its journey of faith, culture, and seva — welcoming thousands of devotees each year while inspiring new generations to carry forward the spirit of Dongri Cha Raja.",
      icon: "fa-infinity"
    }
  ];

  const missionPillars = [
    {
      icon: "fa-praying-hands",
      title: "Devotion",
      desc: "Create a spiritually uplifting environment for devotees to seek the blessings of Lord Ganesha."
    },
    {
      icon: "fa-users",
      title: "Community",
      desc: "Strengthen bonds among residents, families, and devotees through collective celebration."
    },
    {
      icon: "fa-hand-holding-heart",
      title: "Service",
      desc: "Support social welfare initiatives and community development across South Mumbai."
    },
    {
      icon: "fa-dharmachakra",
      title: "Heritage",
      desc: "Preserve the traditions and values of Maharashtra's Ganeshotsav culture for future generations."
    }
  ];

  const coreValues = [
    { icon: "fa-om", title: "Faith", desc: "Celebrating Lord Ganesha with devotion and reverence at every step of our journey." },
    { icon: "fa-handshake", title: "Unity", desc: "Bringing together people from all backgrounds under one common celebration of faith." },
    { icon: "fa-masks-theater", title: "Culture", desc: "Promoting Maharashtrian traditions, heritage, and cultural pride for every generation." },
    { icon: "fa-hands-holding", title: "Seva", desc: "Giving back to society through charitable initiatives, relief drives, and community care." }
  ];

  const socialContributions = [
    { icon: "fa-people-group", label: "Community Welfare" },
    { icon: "fa-bowl-food", label: "Food Distribution Drives" },
    { icon: "fa-landmark", label: "Cultural Preservation" },
    { icon: "fa-person-circle-check", label: "Volunteer Programs" },
    { icon: "fa-graduation-cap", label: "Educational Support" },
    { icon: "fa-stethoscope", label: "Health & Awareness" },
    { icon: "fa-leaf", label: "Environmental Awareness" },
    { icon: "fa-hand-holding-dollar", label: "Relief Efforts" }
  ];

  const impactStats = [
    { num: "85+", label: "Years of Legacy" },
    { num: "10", label: "Day Festival" },
    { num: "4+", label: "Generations Served" },
    { num: "1000s", label: "Annual Devotees" }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Dongri Cha Raja — 85+ Years of Legacy Since 1939</title>
        <meta name="description" content="Learn about Chinch Bunder Dongri Sarvajanik Ganeshotsav Mandal — established in 1939, serving South Mumbai with faith, culture, and community service for over eight decades." />
        <link rel="canonical" href="https://dongricharaja-website.vercel.app/about-us" />
        <meta property="og:title" content="About Us | Dongri Cha Raja — 85+ Years of Legacy Since 1939" />
        <meta property="og:description" content="Learn about Chinch Bunder Dongri Sarvajanik Ganeshotsav Mandal — established in 1939, serving South Mumbai with faith, culture, and community service for over eight decades." />
        <meta property="og:url" content="https://dongricharaja-website.vercel.app/about-us" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Dongri Cha Raja — 85+ Years of Legacy Since 1939" />
        <meta name="twitter:description" content="Dongri Cha Raja — 85+ years of devotion, culture, and community service in South Mumbai since 1939." />
      </Helmet>

      <main id="main-content" className="about-page fade-in">

        {/* ── Hero Banner ── */}
        <section className="committee-banner" aria-label="About Us — Our Legacy and History">
          <div className="committee-banner__mandala" aria-hidden="true">
            <span className="mandala-ring mandala-ring--outer" />
            <span className="mandala-ring mandala-ring--mid" />
            <span className="mandala-ring mandala-ring--inner" />
          </div>
          <div className="committee-banner__ornament top-left" aria-hidden="true">❋</div>
          <div className="committee-banner__ornament top-right" aria-hidden="true">❋</div>
          <div className="container">
            <p className="committee-banner__marathi-year" lang="mr">स्थापना १९३९</p>
            <h1 className="committee-banner__title">Our Legacy &amp; History</h1>
            <p className="committee-banner__marathi-title" lang="mr">आमचा इतिहास आणि वारसा</p>
            <div className="committee-banner__divider" aria-hidden="true">
              <span className="divider-line" />
              <span className="divider-gem">✦</span>
              <span className="divider-line" />
            </div>
            <p className="committee-banner__subtitle">
              For over eight decades, Dongri Cha Raja has been a living tradition in the heart of South Mumbai — uniting generations through devotion, Maharashtrian heritage, and selfless service to society.
            </p>

          </div>
        </section>

        {/* ── Basic Info Table ── */}
        <section className="section section-info-table" aria-label="Mandal Information">
          <div className="container">
            <div className="info-table-wrap">
              <div className="info-table-header">
                <span className="info-badge">ESTD 1939</span>
                <h2 className="section-title">Dongri Cha Raja</h2>
                <p className="section-subtitle">Chinch Bunder Dongri Sarvajanik Ganeshotsav Mandal</p>
              </div>
              <div className="info-table-grid">
                {[
                  { label: "Official Name", value: "Chinch Bunder Dongri Sarvajanik Ganeshotsav Mandal", icon: "fa-building-columns" },
                  { label: "Popular Name", value: "Dongri Cha Raja", icon: "fa-crown" },
                  { label: "Established", value: "1939", icon: "fa-calendar-days" },
                  { label: "Location", value: "Dongri – Chinch Bunder, South Mumbai", icon: "fa-location-dot" },
                  { label: "Type", value: "Sarvajanik Ganeshotsav Mandal", icon: "fa-gopuram" },
                  { label: "Legacy", value: "85+ Years of Service and Devotion", icon: "fa-award" },
                  { label: "Primary Focus", value: "Devotion, Heritage, Community Service & Social Welfare", icon: "fa-heart" }
                ].map((row, i) => (
                  <div key={i} className="info-table-row">
                    <div className="info-table-label">
                      <i className={`fas ${row.icon}`} aria-hidden="true"></i>
                      <span>{row.label}</span>
                    </div>
                    <div className="info-table-value">{row.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Impact Stats ── */}
        <section className="section-impact-strip" aria-label="Key Statistics">
          <div className="container">
            <div className="impact-strip-grid">
              {impactStats.map((s, i) => (
                <div key={i} className="impact-strip-item">
                  <span className="impact-strip-num">{s.num}</span>
                  <span className="impact-strip-lbl">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── About Narrative ── */}
        <section className="section section-narrative" aria-label="About the Mandal">
          <div className="container grid grid-cols-2">
            <div className="narrative-text">
              <h2 className="section-title">About The Mandal</h2>
              <p className="lead-text">
                For more than eight decades, <strong>Dongri Cha Raja</strong> has stood as a symbol of devotion, unity, and community service in the heart of South Mumbai.
              </p>
              <p>
                The Chinch Bunder–Dongri neighbourhood of South Mumbai has long been a vibrant, culturally rich locality — home to diverse communities, bustling trade, and a deep-rooted spirit of togetherness. It was in this historically significant area that the mandal was founded in 1939, drawing its soul from the values of faith and collective celebration that define the neighbourhood.
              </p>
              <p>
                Over generations, what began as a local community gathering gradually evolved into one of South Mumbai's most respected Ganeshotsav institutions, drawing thousands of devotees from across the city every year.
              </p>
              <p>
                Today, the mandal is not merely a festival organiser — it is a guardian of tradition, a pillar of the community, and a source of spiritual inspiration for generations of devoted families.
              </p>
            </div>
            <div className="narrative-visual">
              <div className="about-image-card" role="img" aria-label="Dongri Cha Raja — 85+ years of devotion since 1939">
                <i className="fas fa-gopuram temple-icon" aria-hidden="true"></i>
                <div className="stats-box">
                  <span className="stat-num">85+</span>
                  <span className="stat-lbl">Years of Devotion</span>
                </div>
                <div className="about-card-badge">ESTD 1939</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Founder Story ── */}
        <section className="section section-founder" aria-label="Our Roots and Origins">
          <div className="container">
            <div className="founder-card">
              <div className="founder-icon-wrap">
                <i className="fas fa-seedling" aria-hidden="true"></i>
              </div>
              <div className="founder-content">
                <span className="founder-eyebrow">Our Roots</span>
                <h2 className="founder-title">From a Community Vision to a Timeless Legacy</h2>
                <p>
                  Founded in 1939 in the historic neighbourhoods of Chinch Bunder and Dongri, the mandal was born from a shared vision — to bring people together in devotion to Lord Ganesha and to celebrate the rich cultural heritage of Maharashtra. Inspired by Lokmanya Bal Gangadhar Tilak's vision of Sarvajanik Ganeshotsav as a means of uniting communities, the mandal carried that spirit forward with pride.
                </p>
                <p>
                  Over the decades, under the stewardship of dedicated committee members and countless volunteers, it has grown from a neighbourhood gathering into a cherished institution — one that balances deep spiritual tradition with meaningful social responsibility.
                </p>
                <div className="founder-ctas">
                  <a href="/ganeshotsav" className="btn btn-primary">
                    <i className="fas fa-om" aria-hidden="true"></i> Explore Our Journey
                  </a>
                  <a href="/devotee-services" className="btn btn-outline">
                    <i className="fas fa-hands-praying" aria-hidden="true"></i> Join Our Seva
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Vision & Mission ── */}
        <section className="section section-vision" aria-label="Our Vision and Mission">
          <div className="container">
            <h2 className="section-title vm-section-title text-center">Our Vision &amp; Mission</h2>
            <div className="vision-mission-grid">
              <div className="vision-block">
                <div className="vm-icon-wrap">
                  <i className="fas fa-eye" aria-hidden="true"></i>
                </div>
                <h3 className="vm-title">Our Vision</h3>
                <p className="vm-text">
                  To preserve and promote the spiritual, cultural, and social values of Maharashtra's Ganeshotsav tradition — creating a festival experience that uplifts the community, honours our heritage, and inspires lasting devotion across generations.
                </p>
              </div>

              <div className="vm-divider" aria-hidden="true">
                <span>✦</span>
              </div>

              <div className="mission-block">
                <div className="vm-icon-wrap">
                  <i className="fas fa-bullseye" aria-hidden="true"></i>
                </div>
                <h3 className="vm-title">Our Mission</h3>
                <div className="mission-pillars">
                  {missionPillars.map((p, i) => (
                    <div key={i} className="mission-pillar">
                      <i className={`fas ${p.icon}`} aria-hidden="true"></i>
                      <div>
                        <strong>{p.title}</strong>
                        <p>{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Core Values ── */}
        <section className="section section-values" aria-label="Our Core Values">
          <div className="container">
            <h2 className="section-title text-center">Core Values</h2>
            <p className="section-subtitle">The principles that guide every action of our mandal</p>
            <div className="grid grid-cols-4 mt-6">
              {coreValues.map((val, idx) => (
                <div key={idx} className="card value-card">
                  <div className="value-icon">
                    <i className={`fas ${val.icon}`} aria-hidden="true"></i>
                  </div>
                  <h3>{val.title}</h3>
                  <p>{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Historical Timeline ── */}
        <section className="section section-timeline" aria-label="Historical Timeline">
          <div className="container">
            <h2 className="section-title text-center">Historical Timeline</h2>
            <p className="section-subtitle">A journey of faith, unity, and progress since 1939</p>
            <div className="timeline-container mt-8">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="timeline-dot">
                    <i className={`fas ${evt.icon}`} aria-hidden="true"></i>
                  </div>
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

        {/* ── Social Contributions ── */}
        <section className="section section-social" aria-label="Social Contributions">
          <div className="container">
            <div className="social-layout">
              <div className="social-text">
                <h2 className="section-title">Social Contributions</h2>
                <p className="social-subtitle">Beyond the festival, in service of the community</p>
                <p className="lead-text">
                  Dongri Cha Raja is recognised not only for its magnificent Ganeshotsav celebrations but also for its deep commitment to social causes and community welfare across South Mumbai.
                </p>
                <p>
                  The mandal has consistently given back to the Dongri community through food distribution drives, educational support, health awareness programs, and environmental initiatives. During the challenging pandemic years of 2020–2021, the mandal organised food relief efforts and welfare activities to support families in need — a true reflection of its values of seva and compassion.
                </p>
                <a href="/social-activities" className="btn btn-primary social-cta">
                  <i className="fas fa-hands-holding-heart" aria-hidden="true"></i> View Our Social Work
                </a>
              </div>
              <div className="social-contributions-grid">
                {socialContributions.map((item, i) => (
                  <div key={i} className="social-contrib-item">
                    <i className={`fas ${item.icon}`} aria-hidden="true"></i>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Festival Highlights ── */}
        <section className="section section-festival-highlights" aria-label="Festival Highlights">
          <div className="container">
            <h2 className="section-title text-center">Festival Highlights</h2>
            <p className="section-subtitle">Every year, the Ganeshotsav celebrations include:</p>
            <div className="highlights-grid mt-6">
              {[
                { icon: "fa-gopuram", label: "Ganesh Murti Sthapana" },
                { icon: "fa-fire-flame-curved", label: "Daily Aarti & Pooja" },
                { icon: "fa-music", label: "Bhajan & Devotional Programs" },
                { icon: "fa-masks-theater", label: "Cultural Activities" },
                { icon: "fa-people-group", label: "Community Gatherings" },
                { icon: "fa-bullhorn", label: "Social Awareness Campaigns" },
                { icon: "fa-water", label: "Grand Visarjan Procession" }
              ].map((h, i) => (
                <div key={i} className="highlight-item">
                  <div className="highlight-icon">
                    <i className={`fas ${h.icon}`} aria-hidden="true"></i>
                  </div>
                  <span>{h.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default AboutUs;
