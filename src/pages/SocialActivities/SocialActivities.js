import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  Legend
} from 'recharts';
import './SocialActivities.css';

const SocialActivities = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Yearly data for blood donation collections
  const bloodDonationData = [
    { year: '2021', units: 650 },
    { year: '2022', units: 820 },
    { year: '2023', units: 1100 },
    { year: '2024', units: 1450 },
    { year: '2025', units: 1980 },
  ];

  // Beneficiaries data per service category
  const impactDistribution = [
    { name: 'Medical Seva & Camps', value: 4500, color: '#D32F2F' },
    { name: 'Scholarships & Books', value: 2500, color: '#FF9F00' },
    { name: 'Environment & Trees', value: 1800, color: '#2E7D32' },
    { name: 'Emergency Relief Kits', value: 1200, color: '#1976D2' },
  ];

  const highlights = [
    { icon: "fa-droplet", count: "5,000+", label: "Blood Units Collected", desc: "Collected in partnership with top municipal blood banks to save lives.", color: "#E53935" },
    { icon: "fa-stethoscope", count: "50+", label: "Free Health Camps", desc: "Diagnostic checkups, dental cleanups, and free medicines provided yearly.", color: "#43A047" },
    { icon: "fa-graduation-cap", count: "2,500+", label: "Students Empowered", desc: "School kits, notebooks, and merit-based financial aid distributed.", color: "#1E88E5" },
    { icon: "fa-tree", count: "10,000+", label: "Trees Planted", desc: "Greening drives conducted across urban forest patches of Mumbai.", color: "#2E7D32" }
  ];

  return (
    <>
      <Helmet>
        <title>Social Activities & Impact | Dongri Cha Raja</title>
        <meta name="description" content="Explore the year-round charitable works of Dongri Cha Raja. View impact statistics, blood donation logs, and health drive reports." />
      </Helmet>

      <main className="social-page fade-in">
        {/* Banner — Committee style */}
        <section className="social-banner" aria-label="Social Activities Banner">
          <div className="committee-banner__mandala" aria-hidden="true">
            <span className="mandala-ring mandala-ring--outer" />
            <span className="mandala-ring mandala-ring--mid" />
            <span className="mandala-ring mandala-ring--inner" />
          </div>
          <div className="committee-banner__ornament top-left" aria-hidden="true">❋</div>
          <div className="committee-banner__ornament top-right" aria-hidden="true">❋</div>
          <div className="container">
            <p className="social-banner__eyebrow">सेवा · Seva · Community</p>
            <h1>Social Activities</h1>
            <p className="social-banner__marathi" lang="mr">सामाजिक उपक्रम</p>
            <div className="social-banner__divider" aria-hidden="true">
              <span className="divider-line" />
              <span className="divider-gem">✦</span>
              <span className="divider-line" />
            </div>
            <p className="social-banner__subtitle">
              Giving back to the community, one step at a time
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="section section-intro">
          <div className="container grid grid-cols-2">
            <div className="intro-text">
              <h2 className="section-title">Beyond the Celebration</h2>
              <p className="lead-text">Seva (selfless service) is at the core of all our endeavors.</p>
              <p>While Ganeshotsav is a celebration of faith, the Mandal believes that serving humanity is the highest form of worship. That is why our trust functions year-round, utilizing contributions to run welfare schemes, healthcare services, and education drives.</p>
              <p>We work in collaboration with municipal hospitals, environmental NGOs, and academic trusts to ensure resources reach those who need them most, with absolute transparency.</p>
            </div>
            <div className="intro-stats">
              <div className="stats-box dark-glass-card">
                <h3>Our Core Mission</h3>
                <p>To alleviate distress, support local talent, and champion sustainable eco-practices in everything we touch.</p>
                <div className="mission-badges">
                  <span><i className="fas fa-check-circle text-primary"></i> Transparency</span>
                  <span><i className="fas fa-check-circle text-primary"></i> 80G Certified</span>
                  <span><i className="fas fa-check-circle text-primary"></i> Youth Led</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Cards */}
        <section className="section section-metrics">
          <div className="container">
            <h2 className="section-title text-center">Cumulative Impact Metrics</h2>
            <p className="section-subtitle">Real numbers that show our dedication to welfare</p>

            <div className="grid grid-cols-4 mt-6">
              {highlights.map((item, idx) => (
                <div key={idx} className="card metric-card text-center">
                  <div className="metric-icon" style={{ backgroundColor: item.color + '15', borderColor: item.color }}>
                    <i className={`fas ${item.icon}`} style={{ color: item.color }}></i>
                  </div>
                  <span className="metric-number" style={{ color: item.color }}>{item.count}</span>
                  <h3>{item.label}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="section section-charts">
          <div className="container">
            <h2 className="section-title text-center">Interactive Social Dashboard</h2>
            <p className="section-subtitle">Visualizing our collection growth and support distributions</p>

            <div className="charts-grid mt-8">
              {/* Chart 1: Blood Donation Area Chart */}
              <div className="chart-card card">
                <h3>Blood Donation Collection (Units per Year)</h3>
                <p className="chart-desc">Showing the growth in public contributions at our annual Ganeshotsav blood drive camps.</p>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={bloodDonationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B0000" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B0000" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="year" stroke="#6B655F" />
                      <YAxis stroke="#6B655F" />
                      <Tooltip contentStyle={{ background: '#FAF6F0', borderRadius: '8px', border: '1px solid #E5DDD0' }} />
                      <Area type="monotone" dataKey="units" stroke="#8B0000" strokeWidth={3} fillOpacity={1} fill="url(#colorUnits)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Beneficiary Distribution Pie Chart */}
              <div className="chart-card card">
                <h3>Beneficiary Reach Allocation (Yearly average)</h3>
                <p className="chart-desc">Breakdown of support reach across healthcare, scholarship books, environment, and rescue.</p>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={impactDistribution}
                        cx="50%"
                        cy="45%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {impactDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#FAF6F0', borderRadius: '8px', border: '1px solid #E5DDD0' }} />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SocialActivities;
