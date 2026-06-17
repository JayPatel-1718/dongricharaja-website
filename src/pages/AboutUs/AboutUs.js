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
      desc: "Chinch Bunder Dongri Sarvajanik Ganeshotsav Mandal was established in the historic Chinch Bunder–Dongri area of South Mumbai — a locality that also played a role in India's freedom movement.",
      icon: "fa-flag"
    },
    {
      year: "1950s",
      title: "Growing Community Participation",
      desc: "The festival became an important cultural gathering for local residents and families, bringing together the community in devotion.",
      icon: "fa-users"
    },
    {
      year: "1960s–1970s",
      title: "Expansion of Religious Activities",
      desc: "Traditional aartis, devotional programs, and community events became central to the celebrations, enriching the festival's spiritual character.",
      icon: "fa-om"
    },
    {
      year: "1980s",
      title: "Cultural Development",
      desc: "The mandal expanded its cultural and social outreach programs, strengthening its role in the broader Mumbai community.",
      icon: "fa-star"
    },
    {
      year: "1990s",
      title: "Recognition Across Mumbai",
      desc: "Dongri Cha Raja began attracting devotees from various parts of Mumbai, growing into one of South Mumbai's respected Ganeshotsav institutions.",
      icon: "fa-award"
    },
    {
      year: "2000s",
      title: "Modernization",
      desc: "Improved festival management, volunteer participation, and public engagement brought the mandal into a new era of organized celebration.",
      icon: "fa-cog"
    },
    {
      year: "2013",
      title: "Grand Ganeshotsav Celebration",
      desc: "The 2013 celebration became one of the most memorable years, widely documented through photographs and public participation, further strengthening the popularity of Dongri Cha Raja among devotees.",
      icon: "fa-camera"
    },
    {
      year: "2020–2021",
      title: "Service During Challenging Times",
      desc: "The mandal stepped up with social causes and community welfare efforts during the pandemic, including food distribution and relief initiatives.",
      icon: "fa-heart"
    },
    {
      year: "Present Day",
      title: "Continuing the Legacy",
      desc: "The mandal continues its journey of devotion, culture, and service while welcoming thousands of devotees every year.",
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
    { icon: "fa-om", title: "Faith", desc: "Celebrating Lord Ganesha with devotion and reverence at every step." },
    { icon: "fa-handshake", title: "Unity", desc: "Bringing together people from all backgrounds under one common celebration." },
    { icon: "fa-masks-theater", title: "Culture", desc: "Promoting Maharashtrian traditions, heritage, and cultural pride." },
    { icon: "fa-hands-helping", title: "Service", desc: "Giving back to society through charitable and community initiatives." }
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
    { num: "1939", label: "Established" },
    { num: "85+", label: "Years of Legacy" },
    { num: "10", label: "Days of Festival" },
    { num: "4+", label: "Generations Served" }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Dongri Cha Raja — 85+ Years of Legacy Since 1939</title>
        <meta name="description" content="Learn about Chinch Bunder Dongri Sarvajanik Ganeshotsav Mandal — established in 1939, serving South Mumbai with faith, culture, and community service for over eight decades." />
      </Helmet>

      <main className="about-page fade-in">

        {/* ── Hero Banner ── */}
        <section className="committee-banner" aria-label="About Us Banner">
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
              For over eight decades, Dongri Cha Raja has united generations of devotees through devotion, tradition, and service to society.
            </p>
          </div>
        </section>

        {/* ── Basic Info Table ── */}
        <section className="section section-info-table">
          <div className="container">
            <div className="info-table-wrap">
              <div className="info-table-header">
                <span className="info-badge">Since 1939</span>
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
                  { label: "Primary Focus", value: "Faith, Culture, Community Service & Social Welfare", icon: "fa-heart" }
                ].map((row, i) => (
                  <div key={i} className="info-table-row">
                    <div className="info-table-label">
                      <i className={`fas ${row.icon}`}></i>
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
        <section className="section-impact-strip">
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
        <section className="section section-narrative">
          <div className="container grid grid-cols-2">
            <div className="narrative-text">
              <h2 className="section-title">About The Mandal</h2>
              <p className="lead-text">
                For more than eight decades, <strong>Dongri Cha Raja</strong> has stood as a symbol of devotion, unity, and community service.
              </p>
              <p>
                Founded in 1939, the mandal has preserved the rich traditions of Maharashtra's Sarvajanik Ganeshotsav while bringing together generations of devotees from across Mumbai.
              </p>
              <p>
                What began as a local community celebration gradually evolved into one of South Mumbai's respected Ganeshotsav institutions, attracting thousands of devotees every year.
              </p>
              <p>
                The mandal was established in the historic Chinch Bunder–Dongri area of South Mumbai — a locality that also played a role in India's freedom movement.
              </p>
            </div>
            <div className="narrative-visual">
              <div className="about-image-card">
                <i className="fas fa-gopuram temple-icon"></i>
                <div className="stats-box">
                  <span className="stat-num">85+</span>
                  <span className="stat-lbl">Years of Devotion</span>
                </div>
                <div className="about-card-badge">Est. 1939</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Founder Story ── */}
        <section className="section section-founder">
          <div className="container">
            <div className="founder-card">
              <div className="founder-icon-wrap">
                <i className="fas fa-seedling"></i>
              </div>
              <div className="founder-content">
                <span className="founder-eyebrow">Our Roots</span>
                <h2 className="founder-title">From a Community Vision to a Timeless Legacy</h2>
                <p>
                  Founded in 1939 in the historic neighbourhoods of Chinch Bunder and Dongri, the mandal was established with the vision of bringing people together through collective devotion to Lord Ganesha. Over the decades, it has evolved into a symbol of faith, unity, and cultural pride while remaining deeply rooted in its traditions.
                </p>
                <div className="founder-ctas">
                  <a href="/ganeshotsav" className="btn btn-primary">
                    <i className="fas fa-om"></i> Explore Our Journey
                  </a>
                  <a href="/devotee-services" className="btn btn-outline">
                    <i className="fas fa-hands-praying"></i> Join Our Seva
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Vision & Mission ── */}
        <section className="section section-vision">
          <div className="container">
            <div className="vision-mission-grid">
              <div className="vision-block">
                <div className="vm-icon-wrap">
                  <i className="fas fa-eye"></i>
                </div>
                <h2 className="vm-title">Our Vision</h2>
                <p className="vm-text">
                  To preserve and promote the spiritual, cultural, and social values of Ganeshotsav while serving society through meaningful community initiatives.
                </p>
              </div>

              <div className="vm-divider" aria-hidden="true">
                <span>✦</span>
              </div>

              <div className="mission-block">
                <div className="vm-icon-wrap">
                  <i className="fas fa-bullseye"></i>
                </div>
                <h2 className="vm-title">Our Mission</h2>
                <div className="mission-pillars">
                  {missionPillars.map((p, i) => (
                    <div key={i} className="mission-pillar">
                      <i className={`fas ${p.icon}`}></i>
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
        <section className="section section-values">
          <div className="container">
            <h2 className="section-title text-center">Core Values</h2>
            <p className="section-subtitle">The principles that guide our mandal in every action</p>
            <div className="grid grid-cols-4 mt-6">
              {coreValues.map((val, idx) => (
                <div key={idx} className="card value-card">
                  <div className="value-icon">
                    <i className={`fas ${val.icon}`}></i>
                  </div>
                  <h3>{val.title}</h3>
                  <p>{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Historical Timeline ── */}
        <section className="section section-timeline">
          <div className="container">
            <h2 className="section-title text-center">Historical Timeline</h2>
            <p className="section-subtitle">A journey of faith, unity, and progress since 1939</p>
            <div className="timeline-container mt-8">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="timeline-dot">
                    <i className={`fas ${evt.icon}`}></i>
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
        <section className="section section-social">
          <div className="container">
            <div className="social-layout">
              <div className="social-text">
                <h2 className="section-title">Social Contributions</h2>
                <p className="lead-text">
                  The mandal is recognised not only for its religious celebrations but also for supporting social causes and community welfare initiatives.
                </p>
                <p>
                  During the pandemic period, funds were reportedly directed towards food distribution and relief efforts — a testament to the mandal's commitment to society beyond just festival celebrations.
                </p>
              </div>
              <div className="social-contributions-grid">
                {socialContributions.map((item, i) => (
                  <div key={i} className="social-contrib-item">
                    <i className={`fas ${item.icon}`}></i>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Festival Highlights ── */}
        <section className="section section-festival-highlights">
          <div className="container">
            <h2 className="section-title text-center">Festival Highlights</h2>
            <p className="section-subtitle">Every year the Ganeshotsav celebrations include</p>
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
                    <i className={`fas ${h.icon}`}></i>
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
