import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './Committee.css';

/* ─────────────────────────────────────────────────────────────────────────
   MemberAvatar — shows a photo if provided, monogram circle if not.
   Automatically falls back to monogram if the image fails to load.
   ───────────────────────────────────────────────────────────────────────── */
const MemberAvatar = ({ member, tier }) => {
  const [imgError, setImgError] = useState(false);

  const initials = member.name
    .replace(/^(Shri\.|Smt\.|Ku\.|Adv\.) ?(Shri\.)?/i, '')
    .trim()
    .charAt(0)
    .toUpperCase();

  const showPhoto = member.photo && !imgError;

  if (showPhoto) {
    return (
      <div className={`member-card__avatar member-card__avatar--photo member-card__avatar--${tier}`} aria-hidden="true">
        <img
          src={member.photo}
          alt=""
          className="member-card__photo"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`member-card__avatar member-card__avatar--monogram member-card__avatar--${tier}`} aria-hidden="true">
      {initials}
    </div>
  );
};

const Committee = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // HOW TO ADD PHOTOS:
  // 1. Put the image file inside  public/committee/  (e.g. public/committee/amre.jpg)
  // 2. Add  photo: '/committee/amre.jpg'  to the member object below.
  // 3. Members without a photo field will automatically show the monogram fallback.
  // ─────────────────────────────────────────────────────────────────────────
  const committeeGroups = [
    {
      designationEn: 'President',
      designationMr: 'अध्यक्ष',
      icon: '✦',
      tier: 'apex',
      members: [
        { name: 'Shri. Madhusudan Sharda Mahadev Amre', photo: '' },
        // ↑ Example: set photo: '/committee/amre.jpg' once you have the image
      ],
    },
    {
      designationEn: 'Vice President',
      designationMr: 'उपाध्यक्ष',
      icon: '◈',
      tier: 'senior',
      members: [
        { name: 'Shri. Sagar Mandakini Bharat Mhatre' },
        { name: 'Shri. Abhishek Vandana Sunil Parkar' },
        { name: 'Shri. Vijendra Malati Mahadev Patil' },
        { name: 'Shri. Atish Janabai Shamrao Bhavekar' },
        { name: 'Ku. Akash Kavita Dilip Kadam' },
        { name: 'Ku. Omkar Rekha Shivaji Fadale' },
      ],
    },
    {
      designationEn: 'General Secretary',
      designationMr: 'सरचिटणीस',
      icon: '◈',
      tier: 'senior',
      members: [
        { name: 'Shri. Vinod Rukmini Suresh Jundare' },
      ],
    },
    {
      designationEn: 'Joint Secretary',
      designationMr: 'सहचिटणीस',
      icon: '◇',
      tier: 'standard',
      members: [
        { name: 'Shri. Nikhil Surekha Vijay Gawand' },
        { name: 'Shri. Dnyaneshwar Yashoda Ramchandra Patil' },
        { name: 'Ku. Rushikesh Sayali Chandrakant More' },
        { name: 'Ku. Saurav Shraddha Sadashiv Pednekar' },
        { name: 'Shri. Ashwin Usha Dattaram Mhaskar' },
        { name: 'Ku. Vidhesh Jyotsna Rajesh Baikar' },
      ],
    },
    {
      designationEn: 'Treasurer',
      designationMr: 'खजिनदार',
      icon: '◈',
      tier: 'senior',
      members: [
        { name: 'Shri. Amit Madhavi Madhukar Kambli' },
      ],
    },
    {
      designationEn: 'Joint Treasurer',
      designationMr: 'सहखजिनदार',
      icon: '◇',
      tier: 'standard',
      members: [
        { name: 'Shri. Rohidas Saraswati Laxman Dongre' },
        { name: 'Ku. Sushant Asha Sunil Gawhane' },
        { name: 'Ku. Kaushal Krupali Kiran Mhatre' },
        { name: 'Ku. Pratik Yogini Ashok Waykar' },
        { name: 'Shri. Akshay Aparna Ajit Mhatre' },
      ],
    },
    {
      designationEn: 'Internal Auditor',
      designationMr: 'अंतर्गत हिशोब तपासणीस',
      icon: '◇',
      tier: 'standard',
      members: [
        { name: 'Shri. Santosh Laxmi Vijay Tiwarkar' },
        { name: 'Shri. Manoj Jayamala Laxman Mankar' },
        { name: 'Shri. Naresh Jayshri Jaywant Todankar' },
      ],
    },
    {
      designationEn: 'Legal Advisor',
      designationMr: 'कायदेविषयक सल्लागार',
      icon: '◇',
      tier: 'standard',
      members: [
        { name: 'Shri. Ramakant Savitribai Sakharam Sawant' },
        { name: 'Shri. Rupesh Vithabai Ramesh Patil' },
      ],
    },
    {
      designationEn: 'Committee Members',
      designationMr: 'समिती',
      icon: '◇',
      tier: 'standard',
      members: [
        { name: 'Shri. Nitin Sita Ramchandra Redkar' },
        { name: 'Adv. Shri. Janardan Laxmibai Digambar Honabale' },
        { name: 'Shri. Shekhar Ghabubai Eknath Dolas' },
        { name: 'Shri. Kedar Sharmila Sharad Ambre' },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Executive Committee 2025–26 | Dongricha Raja Sarvajanik Ganeshotsav Mandal</title>
        <meta
          name="description"
          content="Meet the Executive Committee 2025–26 (कार्यकारी मंडळ) of Dongricha Raja Sarvajanik Ganeshotsav Mandal — the dedicated leaders upholding the traditions and values of Mumbai's beloved Ganesh festival."
        />
      </Helmet>

      <main className="committee-page fade-in">

        {/* Premium Leadership Hero */}
        <section className="page-hero committee-page-hero" aria-label="Committee Banner">
          <div className="committee-hero-mesh" />
          <div className="committee-hero-accents">
            <div className="committee-accent-line" />
            <div className="committee-accent-line" />
          </div>
          <div className="committee-hero-crown">
            <i className="fas fa-crown" />
          </div>
          <div className="page-hero-content">
            <div className="page-hero-eyebrow">
              <i className="fas fa-users" /> २०२५ – २६
            </div>
            <h1>Executive Committee</h1>
            <p lang="mr" style={{ fontFamily: 'serif', fontSize: '1.1rem' }}>कार्यकारी मंडळ — Dongricha Raja Sarvajanik Ganeshotsav Mandal</p>
            <div className="page-hero-breadcrumb">
              <a href="/">Home</a>
              <i className="fas fa-chevron-right" />
              <span>Committee</span>
            </div>
          </div>
          <div className="page-hero-wave">
            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,40 L360,20 L720,50 L1080,10 L1440,40 L1440,60 L0,60 Z" fill="var(--royal-dark, #0D0520)" />
            </svg>
          </div>
        </section>

        {/* ── Section Intro ── */}
        <section className="section committee-intro-section">
          <div className="container committee-intro-container">
            <div className="committee-intro-ornament" aria-hidden="true">
              <span className="intro-ornament-line" />
              <span className="intro-ornament-lotus">✿</span>
              <span className="intro-ornament-line" />
            </div>
            <p className="committee-intro-text">
              Meet the dedicated individuals whose leadership and service continue to uphold
              the traditions, values, and community initiatives of Dongricha Raja
              Sarvajanik Ganeshotsav Mandal.
            </p>
          </div>
        </section>

        {/* ── Designation Groups ── */}
        <section className="section committee-body-section" aria-label="Committee Members by Designation">
          <div className="container">
            {committeeGroups.map((group, groupIdx) => (
              <article
                key={groupIdx}
                className={`committee-group committee-group--${group.tier}`}
                aria-label={`${group.designationEn} group`}
              >
                {/* Group Header */}
                <header className="committee-group__header">
                  <div className="committee-group__header-inner">
                    <span className="committee-group__icon" aria-hidden="true">{group.icon}</span>
                    <div className="committee-group__titles">
                      <h2 className="committee-group__title-en">{group.designationEn}</h2>
                      <p className="committee-group__title-mr" lang="mr">{group.designationMr}</p>
                    </div>
                    <span className="committee-group__icon" aria-hidden="true">{group.icon}</span>
                  </div>
                  <div className="committee-group__header-rule" aria-hidden="true">
                    <span className="rule-line" />
                    <span className="rule-gem">◆</span>
                    <span className="rule-line" />
                  </div>
                </header>

                {/* Member Cards Grid */}
                <div
                  className={`committee-group__grid committee-group__grid--${
                    group.members.length === 1 ? 'single' :
                    group.members.length === 2 ? 'double' : 'multi'
                  }`}
                >
                  {group.members.map((member, memberIdx) => (
                    <div
                      key={memberIdx}
                      className={`member-card member-card--${group.tier}`}
                      role="listitem"
                    >
                      <div className="member-card__inner">
                        {/* ── Avatar: photo if provided, monogram fallback ── */}
                        <MemberAvatar member={member} tier={group.tier} />

                        <div className="member-card__content">
                          <h3 className="member-card__name">{member.name}</h3>
                          <span className="member-card__designation">
                            {group.designationEn}
                          </span>
                          <span className="member-card__designation-mr" lang="mr">
                            {group.designationMr}
                          </span>
                        </div>
                      </div>
                      <span className="member-card__accent-bar" aria-hidden="true" />
                    </div>
                  ))}
                </div>

                {/* Group Divider */}
                {groupIdx < committeeGroups.length - 1 && (
                  <div className="committee-group__divider" aria-hidden="true">
                    <span className="group-divider-line" />
                    <span className="group-divider-motif">❧ ॐ ❧</span>
                    <span className="group-divider-line" />
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* ── Footer CTA ── */}
        <section className="section committee-cta-section" aria-label="Join as Volunteer">
          <div className="container">
            <div className="committee-cta-card">
              <div className="committee-cta-card__ornament" aria-hidden="true">
                <span className="cta-line" />
                <span className="cta-lotus">✿</span>
                <span className="cta-line" />
              </div>
              <h2 className="committee-cta-card__title">Be a Part of the Legacy</h2>
              <p className="committee-cta-card__text">
                We warmly welcome passionate volunteers to join our ranks for Ganeshotsav 2026.
                Bring your devotion and skills to serve the community alongside our beloved Bappa.
              </p>
              <div className="committee-cta-card__actions">
                <a
                  href="/devotee-services/volunteer"
                  className="btn btn-primary btn-lg"
                  id="committee-volunteer-btn"
                >
                  Register as Volunteer
                </a>
                <a
                  href="/contact-us"
                  className="btn btn-outline btn-lg"
                  id="committee-contact-btn"
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

export default Committee;
