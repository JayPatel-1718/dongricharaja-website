import React from 'react';
import { Link } from 'react-router-dom';
import './SocialActivitiesHighlights.css';

const SocialActivitiesHighlights = () => {
  const activities = [
    {
      icon: "fas fa-tint",
      title: "Blood Donation",
      count: "5,000+",
      unit: "Units Collected",
      color: "#E53935",
      bg: "rgba(229, 57, 53, 0.1)",
      border: "rgba(229, 57, 53, 0.2)",
      desc: "Annual blood donation drives helping save lives across Mumbai"
    },
    {
      icon: "fas fa-stethoscope",
      title: "Health Camps",
      count: "50+",
      unit: "Camps Organized",
      color: "#43A047",
      bg: "rgba(67, 160, 71, 0.1)",
      border: "rgba(67, 160, 71, 0.2)",
      desc: "Free health checkups and medical consultations for underprivileged communities"
    },
    {
      icon: "fas fa-graduation-cap",
      title: "Education Support",
      count: "2,500+",
      unit: "Students Helped",
      color: "#1E88E5",
      bg: "rgba(30, 136, 229, 0.1)",
      border: "rgba(30, 136, 229, 0.2)",
      desc: "Scholarships, books and educational materials distributed to deserving students"
    },
    {
      icon: "fas fa-tree",
      title: "Tree Plantation",
      count: "10,000+",
      unit: "Trees Planted",
      color: "#2E7D32",
      bg: "rgba(46, 125, 50, 0.1)",
      border: "rgba(46, 125, 50, 0.2)",
      desc: "Eco-friendly Ganeshotsav with widespread plantation drives across the city"
    },
    {
      icon: "fas fa-utensils",
      title: "Annadanam",
      count: "1,00,000+",
      unit: "Meals Served",
      color: "#F57C00",
      bg: "rgba(245, 124, 0, 0.1)",
      border: "rgba(245, 124, 0, 0.2)",
      desc: "Free meals for devotees and the underprivileged during festival and all year"
    },
    {
      icon: "fas fa-home",
      title: "Disaster Relief",
      count: "₹50L+",
      unit: "Funds Disbursed",
      color: "#7B1FA2",
      bg: "rgba(123, 31, 162, 0.1)",
      border: "rgba(123, 31, 162, 0.2)",
      desc: "Rapid relief operations during floods, cyclones and other natural calamities"
    }
  ];

  return (
    <section className="social-highlights-section" id="social-impact">
      <div className="social-bg-pattern" />
      <div className="container">
        <div className="social-section-header">
          <div className="section-eyebrow-dark">
            <i className="fas fa-heart"></i> Our Impact
          </div>
          <h2 className="section-title-dark">Social Activities</h2>
          <p className="social-section-subtitle">
            Beyond the festival, we serve humanity year-round through impactful community initiatives.
          </p>
        </div>

        <div className="social-activities-grid">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="social-activity-card"
              style={{
                '--act-color': activity.color,
                '--act-bg': activity.bg,
                '--act-border': activity.border
              }}
            >
              <div className="act-icon-wrap">
                <i className={activity.icon}></i>
              </div>
              <div className="act-count">{activity.count}</div>
              <div className="act-unit">{activity.unit}</div>
              <h3 className="act-title">{activity.title}</h3>
              <p className="act-desc">{activity.desc}</p>
            </div>
          ))}
        </div>

        <div className="social-cta">
          <Link to="/social-activities" className="btn-social-more">
            <i className="fas fa-heart"></i>
            View All Social Initiatives
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SocialActivitiesHighlights;