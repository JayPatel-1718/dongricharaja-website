import React from 'react';

const SectionTitle = ({ title, subtitle, align = 'left' }) => {
  return (
    <div className={`section-title-wrapper ${align}`}>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;