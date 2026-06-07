import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './Committee.css';

const Committee = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const coreCommittee = [
    { name: "Shri. Rajesh Patil", role: "Chairman", desc: "Leading the Mandal with vision and administrative excellence for 12+ years.", icon: "fa-user-tie" },
    { name: "Shri. Suresh Mehta", role: "Secretary", desc: "Overseeing daily coordination, event permissions, and public affairs.", icon: "fa-user-shield" },
    { name: "Shri. Amit Shah", role: "Treasurer", desc: "Managing financial logs, audits, and ensuring complete donation transparency.", icon: "fa-calculator" }
  ];

  const executiveMembers = [
    { name: "Shri. Ramesh Sawant", role: "Event Coordinator", icon: "fa-calendar-check" },
    { name: "Smt. Sunita Rao", role: "Women's Wing Lead", icon: "fa-user-check" },
    { name: "Shri. Vijay Kadam", role: "Social Seva Head", icon: "fa-hand-holding-heart" },
    { name: "Shri. Manoj Tambe", role: "Pandal & Security Chief", icon: "fa-shield-halved" },
    { name: "Shri. Sanjay Parab", role: "Public Relations", icon: "fa-bullhorn" },
    { name: "Shri. Deepak More", role: "Volunteer Captain", icon: "fa-people-group" }
  ];

  return (
    <>
      <Helmet>
        <title>Our Committee | Dongri Cha Raja</title>
        <meta name="description" content="Meet the executive committee members and office bearers of Dongri Cha Raja Mandal." />
      </Helmet>
      
      <main className="committee-page fade-in">
        {/* Banner */}
        <section className="committee-banner">
          <div className="banner-overlay"></div>
          <div className="container">
            <h1>Our Committee</h1>
            <p>The dedicated team working tirelessly behind the scenes</p>
          </div>
        </section>

        {/* Office Bearers */}
        <section className="section section-leaders">
          <div className="container">
            <h2 className="section-title text-center">Executive Office Bearers</h2>
            <p className="section-subtitle">Leading our spiritual and social programs with integrity</p>
            
            <div className="grid grid-cols-3 mt-6">
              {coreCommittee.map((member, idx) => (
                <div key={idx} className="card leader-card text-center">
                  <div className="leader-portrait">
                    <div className="portrait-frame">
                      {/* Generates a nice layout, we can hook it up with image asset in future */}
                      <i className={`fas ${member.icon} default-avatar`}></i>
                    </div>
                  </div>
                  <div className="leader-info">
                    <h3>{member.name}</h3>
                    <span className="role-tag">{member.role}</span>
                    <p className="mt-3">{member.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Executive Committee */}
        <section className="section section-executives">
          <div className="container">
            <h2 className="section-title text-center">Executive Committee</h2>
            <p className="section-subtitle">Department heads and coordinators managing crucial operations</p>
            
            <div className="grid grid-cols-3 mt-6">
              {executiveMembers.map((member, idx) => (
                <div key={idx} className="card exec-card">
                  <div className="exec-avatar-side">
                    <i className={`fas ${member.icon} exec-avatar-icon`}></i>
                  </div>
                  <div className="exec-info-side">
                    <h4>{member.name}</h4>
                    <span className="exec-role">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Volunteer */}
        <section className="section section-join-mandal">
          <div className="container">
            <div className="join-cta-card dark-glass-card text-center">
              <h2>Be a Part of the Legacy</h2>
              <p>We are always looking for passionate volunteers to join our ranks for Ganeshotsav 2026. Bring your skills and devotion to help us manage darshan queue, medical camps, or media coverage.</p>
              <div className="buttons-row mt-6">
                <a href="/devotee-services/volunteer" className="btn btn-primary btn-lg">
                  <i className="fas fa-hands-helping"></i> Register as Volunteer
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Committee;
