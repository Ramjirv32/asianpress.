import { GraduationCap, User, Microscope, Landmark, Check } from "lucide-react";

export default function Membership() {
  return (
    <div>
      <header className="subpage-header" style={{ padding: "80px 0 40px" }}>
        <div className="container">
          <h1 style={{ fontSize: "2.8rem" }}>Academic Membership Programs</h1>
          <p style={{ marginTop: "0.5rem" }}>Empowering researchers through networking, support services, and global visibility.</p>
        </div>
      </header>

      <section className="section-padding" style={{ padding: "55px 0" }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: "2.5rem" }}>
            <h2>Join Our Global Community</h2>
            <p>ARP offers exclusive membership opportunities for academic professionals at all levels.</p>
          </div>
          
          <div className="membership-plans" style={{ gap: "1.5rem" }}>
            {/* 1. Student */}
            <div className="plan-card" style={{ padding: "2rem 1.5rem" }}>
              <div className="plan-icon"><GraduationCap size={48} /></div>
              <h3 style={{ fontSize: "1.3rem", margin: "1rem 0" }}>Student Member</h3>
              <ul className="plan-features" style={{ marginBottom: "2rem" }}>
                <li><Check size={16} /> Access to digital learning resources and journals.</li>
                <li><Check size={16} /> Student-exclusive workshops on research basics.</li>
                <li><Check size={16} /> Priority registration for national seminars.</li>
                <li><Check size={16} /> Academic community forum and peer networking.</li>
                <li><Check size={16} /> 15% discount on event registration fees.</li>
              </ul>
              <a href="mailto:asianresearchpress25@gmail.com" className="btn btn-outline" style={{ marginTop: "auto" }}>Apply as Student</a>
            </div>

            {/* 2. Faculty */}
            <div className="plan-card featured" style={{ padding: "2rem 1.5rem" }}>
              <div className="plan-badge" style={{ top: "15px", right: "15px" }}>Highly Recommended</div>
              <div className="plan-icon"><User size={48} /></div>
              <h3 style={{ fontSize: "1.3rem", margin: "1rem 0" }}>Faculty Member</h3>
              <ul className="plan-features" style={{ marginBottom: "2rem" }}>
                <li><Check size={16} /> Global academic networking & collaboration.</li>
                <li><Check size={16} /> 30% discount on international conference fees.</li>
                <li><Check size={16} /> Research visibility support & profiling.</li>
                <li><Check size={16} /> Opportunity to serve as a session chair at ARP events.</li>
                <li><Check size={16} /> Access to institutional MoU partnership programs.</li>
                <li><Check size={16} /> Dedicated support for FDP coordination.</li>
              </ul>
              <a href="mailto:asianresearchpress25@gmail.com" className="btn btn-primary" style={{ marginTop: "auto" }}>Join as Faculty</a>
            </div>

            {/* 3. Scholar */}
            <div className="plan-card" style={{ padding: "2rem 1.5rem" }}>
              <div className="plan-icon"><Microscope size={48} /></div>
              <h3 style={{ fontSize: "1.3rem", margin: "1rem 0" }}>Research Scholar</h3>
              <ul className="plan-features" style={{ marginBottom: "2rem" }}>
                <li><Check size={16} /> Advanced research proposal mentoring.</li>
                <li><Check size={16} /> Exclusive peer reviewer training programs.</li>
                <li><Check size={16} /> Eligibility for ARP Research Grant Assistance.</li>
                <li><Check size={16} /> Fast-track screening for journal publications.</li>
                <li><Check size={16} /> Priority consideration for Fellowships.</li>
              </ul>
              <a href="mailto:asianresearchpress25@gmail.com" className="btn btn-outline" style={{ marginTop: "auto" }}>Apply as Scholar</a>
            </div>

            {/* 4. Institutional */}
            <div className="plan-card" style={{ padding: "2rem 1.5rem" }}>
              <div className="plan-icon"><Landmark size={48} /></div>
              <h3 style={{ fontSize: "1.3rem", margin: "1rem 0" }}>Institutional Member</h3>
              <ul className="plan-features" style={{ marginBottom: "2rem" }}>
                <li><Check size={16} /> MoU partnership for joint conferences.</li>
                <li><Check size={16} /> Collaborative research project coordination.</li>
                <li><Check size={16} /> Faculty exchange & institutional networking.</li>
                <li><Check size={16} /> Journal setup and indexing consultancy.</li>
                <li><Check size={16} /> On-campus workshop coordination support.</li>
              </ul>
              <a href="mailto:asianresearchpress25@gmail.com" className="btn btn-outline" style={{ marginTop: "auto" }}>Partner with ARP</a>
            </div>
          </div>

          {/* Application Requirements */}
          <div className="requirements-section" style={{ padding: "3rem 1.5rem" }}>
            <div className="container">
              <div className="req-grid" style={{ gap: "2.5rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.8rem" }}>Application Process</h2>
                  <p style={{ margin: "1rem 0" }}>Joining ARP is a straightforward process designed to verify academic credentials and research commitment.</p>
                  <ul className="req-list">
                    <li><strong>Profile Submission:</strong> Submit your updated academic profile and institutional ID.</li>
                    <li><strong>Evaluation:</strong> Our membership committee reviews applications based on research background.</li>
                    <li><strong>Approval:</strong> Successful candidates receive an official membership ID and welcome kit.</li>
                    <li><strong>Onboarding:</strong> Access your benefits through our member-only academic network.</li>
                  </ul>
                </div>
                <div style={{ background: "var(--white)", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
                  <h3 style={{ marginBottom: "1rem" }}>Member Commitment</h3>
                  <p>All members of Asian Research Press are expected to uphold the highest standards of academic integrity and contribute actively to the scholarly community.</p>
                  <p style={{ marginTop: "1rem" }}><strong>Engagement:</strong> Members are encouraged to serve as reviewers, event coordinators, and mentors for junior researchers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
