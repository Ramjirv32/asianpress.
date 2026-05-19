"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  GraduationCap, 
  Users, 
  BookCopy, 
  UserCheck, 
  ShieldCheck, 
  Lightbulb, 
  Globe, 
  TrendingUp, 
  Book, 
  CheckCircle,
  MapPin,
  Mail,
  Zap,
  ArrowRight
} from "lucide-react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ["/assets/bg1.png", "/assets/bg2.png", "/assets/bg3.png"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div>
      {/* Hero Section */}
      <header className="hero" style={{ height: "80vh" }}>
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url('${slide}')` }}
            />
          ))}
        </div>
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <h1 style={{ fontSize: "3.5rem" }}>
              Promoting <span>Academic Excellence</span> & Research Innovation
            </h1>
            <p style={{ margin: "1.5rem 0", fontSize: "1.1rem" }}>
              Supporting researchers, institutions, and academic professionals in advancing knowledge across disciplines through global scholarly collaboration.
            </p>
            <div className="hero-btns">
              <a href="#activities" className="btn btn-primary">
                Our Activities <ChevronDown size={18} />
              </a>
              <Link href="/fellowships" className="btn btn-outline">
                Postdoctoral Program
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Detailed Activities Section */}
      <section id="activities" className="section-padding" style={{ padding: "60px 0" }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: "3rem" }}>
            <h2>Our Core Initiatives</h2>
            <p>Asian Research Press is actively engaged in a wide spectrum of academic and research-driven activities.</p>
          </div>

          {/* 1. Postdoctoral & Research Fellowship */}
          <div className="activity-section" style={{ padding: "40px 0" }}>
            <div className="activity-grid">
              <div className="activity-content">
                <h2>1. Postdoctoral & Research Fellowships</h2>
                <p>ARP supports early-career and senior researchers to strengthen research output and academic leadership through dedicated funding and mentorship.</p>
                <ul className="activity-list">
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> Postdoctoral Fellowship Programs</li>
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> Research Grant Assistance</li>
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> Laboratory Support (special cases)</li>
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> International Research Collaboration</li>
                </ul>
              </div>
              <div className="activity-image">
                <GraduationCap size={128} />
                <h3>Strengthening Leadership</h3>
                <p>Empowering the next generation of scholars with global resources.</p>
              </div>
            </div>
          </div>

          {/* 2. Conferences & Academic Events */}
          <div className="activity-section" style={{ padding: "40px 0" }}>
            <div className="activity-grid">
              <div className="activity-image" style={{ background: "#fffdf5" }}>
                <Users size={128} />
                <h3>Global Platforms</h3>
                <p>Providing a stage for innovative ideas and scholarly exchange.</p>
              </div>
              <div className="activity-content">
                <h2>2. Conferences & Academic Events</h2>
                <p>ARP organizes and collaborates on prestigious events that foster interdisciplinary dialogue and networking.</p>
                <ul className="activity-list">
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> International Conferences</li>
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> National Seminars</li>
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> Faculty Development Programs (FDP)</li>
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> Workshops & Webinars</li>
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> Research Methodology Training</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Research Publications */}
          <div className="activity-section" style={{ padding: "40px 0" }}>
            <div className="activity-grid">
              <div className="activity-content">
                <h2>3. Research Publications</h2>
                <p>We publish high-quality peer-reviewed journals ensuring strict adherence to publication ethics and rigorous standards.</p>
                <ul className="activity-list">
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> International Peer-Reviewed Journals</li>
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> Special Issues & Thematic Editions</li>
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> Conference Proceedings Publications</li>
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> Book Chapters & Edited Volumes</li>
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> Open Access Publication Support</li>
                </ul>
              </div>
              <div className="activity-image">
                <BookCopy size={128} />
                <h3>Ethical Publishing</h3>
                <p>Strict plagiarism screening and rigorous peer-review standards.</p>
              </div>
            </div>
          </div>

          {/* 4. Editorial & Reviewer Development */}
          <div className="activity-section" style={{ padding: "40px 0", borderBottom: "none" }}>
            <div className="activity-grid">
              <div className="activity-image" style={{ background: "#f0f9ff" }}>
                <UserCheck size={128} />
                <h3>Maintaining Quality</h3>
                <p>Training the gatekeepers of academic excellence.</p>
              </div>
              <div className="activity-content">
                <h2>4. Editorial & Reviewer Development</h2>
                <p>To maintain publication quality, ARP focuses on the continuous professional growth of our editorial and review teams.</p>
                <ul className="activity-list">
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> Appointing Qualified Editorial Members</li>
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> Comprehensive Peer Reviewer Training</li>
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> Publication Ethics Workshops</li>
                  <li><CheckCircle size={18} style={{ color: "var(--accent)" }} /> Encouraging Young Researchers as Reviewers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 5, 6, 7, 8 in a dense grid */}
          <div className="grid" style={{ marginTop: "2rem", gap: "1.5rem" }}>
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>5. Academic Membership</h3>
              <p>Opportunities for Faculty, Scholars, Students, and Institutions to gain access to networking and research support.</p>
            </div>
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>6. Consultancy & Support</h3>
              <p>Guidance on journal setup, conference organization, and research proposal mentoring for institutions.</p>
            </div>
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>7. MoU Partnerships</h3>
              <p>Collaborations with Universities and Industry Partners to promote joint research and academic exchange.</p>
            </div>
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>8. Awards & Recognition</h3>
              <p>Celebrating excellence through Best Researcher, Young Scientist, and Lifetime Achievement Awards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="commitment section-padding" style={{ padding: "60px 0" }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: "3rem" }}>
            <h2>Our Commitment</h2>
            <p>Asian Research Press is built on a foundation of trust and academic integrity.</p>
          </div>
          <div className="commitment-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
            <div className="commitment-item">
              <ShieldCheck size={20} style={{ color: "var(--accent)" }} /> 
              <span>Academic Integrity</span>
            </div>
            <div className="commitment-item">
              <Lightbulb size={20} style={{ color: "var(--accent)" }} /> 
              <span>Research Innovation</span>
            </div>
            <div className="commitment-item">
              <Globe size={20} style={{ color: "var(--accent)" }} /> 
              <span>Global Collaboration</span>
            </div>
            <div className="commitment-item">
              <TrendingUp size={20} style={{ color: "var(--accent)" }} /> 
              <span>Prof. Development</span>
            </div>
            <div className="commitment-item">
              <Book size={20} style={{ color: "var(--accent)" }} /> 
              <span>Knowledge Advancement</span>
            </div>
          </div>
        </div>
      </section>

      {/* International Presence */}
      <section className="section-padding" style={{ padding: "60px 0" }}>
        <div className="container">
          <div className="grid">
            <div style={{ background: "var(--primary)", color: "#fff", padding: "2.5rem", borderRadius: "12px" }}>
              <h2 style={{ color: "#fff", marginBottom: "1rem", fontSize: "1.8rem" }}>India Headquarters</h2>
              <p style={{ color: "#cbd5e1" }}>
                No. 47, First Floor, Kodisamy Nagar<br />
                100 Feet Road, Mudaliarpet<br />
                Puducherry - 605004, India
              </p>
              <p style={{ marginTop: "1rem", fontWeight: 700, color: "var(--accent)" }}>+91-9445690101</p>
            </div>
            <div style={{ background: "var(--bg-soft)", padding: "2.5rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <h2 style={{ marginBottom: "1rem", fontSize: "1.8rem" }}>Indonesia Office</h2>
              <p>
                Arva Building, Gondangdia lt.3<br />
                JL. RP Soeroso no.40 BC<br />
                Menteng Central Jakarta, Indonesia
              </p>
              <p style={{ marginTop: "1rem", fontWeight: 700, color: "var(--primary)" }}>Global Coordination Hub</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
