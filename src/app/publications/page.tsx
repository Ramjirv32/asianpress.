import { Zap, Globe, ShieldCheck, Award } from "lucide-react";

export default function Publications() {
  return (
    <div>
      <header className="subpage-header" style={{ padding: "80px 0 40px" }}>
        <div className="container">
          <h1 style={{ fontSize: "2.8rem" }}>Research Publications</h1>
          <p style={{ marginTop: "0.5rem" }}>Advancing multidisciplinary research through rigorous scholarly publishing and global dissemination.</p>
        </div>
      </header>

      <section className="section-padding" style={{ padding: "50px 0" }}>
        <div className="container pub-container">
          
          <div className="pub-list">
            {/* 1. Journals */}
            <div className="pub-item">
              <div className="pub-number">01</div>
              <div className="pub-info">
                <h3>International Peer-Reviewed Journals</h3>
                <p>We publish a range of multidisciplinary open-access journals that cater to global research needs. Our journals are indexed and widely recognized for their academic rigor.</p>
                <strong style={{ fontSize: "0.9rem" }}>Key Disciplines:</strong>
                <div className="pub-disciplines" style={{ marginTop: "0.5rem" }}>
                  <span className="discipline-tag">Engineering & Tech</span>
                  <span className="discipline-tag">Computer Science & AI</span>
                  <span className="discipline-tag">Life Sciences</span>
                  <span className="discipline-tag">Management</span>
                  <span className="discipline-tag">Social Sciences</span>
                  <span className="discipline-tag">Physical Sciences</span>
                </div>
              </div>
            </div>

            {/* 2. Special Issues */}
            <div className="pub-item">
              <div className="pub-number">02</div>
              <div className="pub-info">
                <h3>Special Issues & Thematic Editions</h3>
                <p>Our special issues focus on emerging research themes and cross-disciplinary questions. We invite experts to lead these editions as Guest Editors.</p>
                <p style={{ marginTop: "0.5rem" }}><strong>Call for Papers:</strong> We periodically release calls for papers for upcoming thematic volumes, offering a fast-track review process for relevant high-quality research.</p>
              </div>
            </div>

            {/* 3. Conference Proceedings */}
            <div className="pub-item">
              <div className="pub-number">03</div>
              <div className="pub-info">
                <h3>Conference Proceedings</h3>
                <p>ARP provides official publication services for conference proceedings, ensuring that research presented at events reaches the global community through formal indexing.</p>
                <p style={{ marginTop: "0.5rem" }}>We offer full support for ISBN/ISSN registration and DOI assignment for individual papers.</p>
              </div>
            </div>

            {/* 4. Books & Volumes */}
            <div className="pub-item">
              <div className="pub-number">04</div>
              <div className="pub-info">
                <h3>Book Chapters & Edited Volumes</h3>
                <p>We publish scholarly books and edited volumes that synthesize research on specific domains. These are ideal for comprehensive literature reviews and deep-dive studies.</p>
              </div>
            </div>
            
            {/* 5. Editorial Development */}
            <div className="pub-item" style={{ borderBottom: "none" }}>
              <div className="pub-number">05</div>
              <div className="pub-info">
                <h3>Editorial & Reviewer Development</h3>
                <p>ARP is committed to the professional development of its editorial board. We appoint qualified board members and train peer reviewers in ethical evaluation practices.</p>
                <p style={{ marginTop: "0.5rem" }}><strong>Workshops:</strong> Regular workshops on publication ethics and "How to Review" are conducted for our academic community.</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="sidebar">
            <h2>Publication Ethics</h2>
            <ul>
              <li>
                <h4>Plagiarism Screening</h4>
                <p>Strict plagiarism checks are performed using Crossref and specialized screening tools before the review process begins.</p>
              </li>
              <li>
                <h4>Double-Blind Review</h4>
                <p>A rigorous double-blind peer-review process ensures that all submissions are evaluated solely on their academic merit.</p>
              </li>
              <li>
                <h4>Ethics Training</h4>
                <p>Mandatory ethics training for all newly appointed editorial board members and peer reviewers.</p>
              </li>
            </ul>
            <div style={{ marginTop: "1.5rem", padding: "1.2rem", background: "rgba(255,255,255,0.1)", borderRadius: "8px" }}>
              <h4 style={{ color: "var(--accent)", marginBottom: "0.25rem" }}>Submit Your Paper</h4>
              <p style={{ fontSize: "0.8rem" }}>Send your manuscript to our editorial team for initial screening.</p>
              <a href="mailto:asianresearchpress25@gmail.com" className="btn btn-primary" style={{ marginTop: "1rem", width: "100%", justifyContent: "center" }}>Submit Now</a>
            </div>
          </aside>

        </div>

        {/* Author Benefits Section */}
        <div className="container author-benefits" style={{ marginTop: "3rem", padding: "3rem 2rem" }}>
          <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Why Publish with ARP?</h2>
          <div className="benefit-grid">
            <div className="benefit-item">
              <Zap size={24} style={{ color: "var(--accent)", marginBottom: "0.5rem" }} />
              <h4>Fast-Track Review</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Initial editorial decision within 15 days of submission.</p>
            </div>
            <div className="benefit-item">
              <Globe size={24} style={{ color: "var(--accent)", marginBottom: "0.5rem" }} />
              <h4>Global Visibility</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Open access distribution ensuring maximum citation impact.</p>
            </div>
            <div className="benefit-item">
              <ShieldCheck size={24} style={{ color: "var(--accent)", marginBottom: "0.5rem" }} />
              <h4>Rigorous Ethics</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Adherence to COPE standards ensuring high scholarly integrity.</p>
            </div>
            <div className="benefit-item">
              <Award size={24} style={{ color: "var(--accent)", marginBottom: "0.5rem" }} />
              <h4>Award Recognition</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Opportunity for the annual 'Best Research Paper' award.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
