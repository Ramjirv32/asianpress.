import { Shield, Cpu, Globe, UserCheck, CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div>
      <header className="subpage-header" style={{ padding: "80px 0 40px" }}>
        <div className="container">
          <h1 style={{ fontSize: "2.8rem" }}>About Asian Research Press</h1>
          <p style={{ marginTop: "0.5rem" }}>Dedicated to fostering academic integrity, research innovation, and global collaboration.</p>
        </div>
      </header>

      <section className="section-padding" style={{ padding: "60px 0" }}>
        <div className="container">
          <div className="commitment-grid">
            <div>
              <h2>Our Mission</h2>
              <p style={{ fontSize: "1.1rem", color: "var(--text-main)", marginBottom: "1.5rem", marginTop: "1rem" }}>
                Asian Research Press (ARP) is actively engaged in promoting academic excellence and global scholarly collaboration. Our mission is to support researchers, institutions, and academic professionals in advancing knowledge across disciplines.
              </p>
              
              <h3 style={{ marginTop: "2rem" }}>Our Commitment</h3>
              <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: "1rem", gap: "1rem" }}>
                <div className="card" style={{ padding: "1.5rem" }}>
                  <Shield style={{ color: "var(--accent)", marginBottom: "0.75rem" }} size={24} />
                  <h4 style={{ marginBottom: "0.25rem" }}>Academic Integrity</h4>
                  <p style={{ fontSize: "0.85rem" }}>Upholding the highest standards of research ethics and honesty.</p>
                </div>
                <div className="card" style={{ padding: "1.5rem" }}>
                  <Cpu style={{ color: "var(--accent)", marginBottom: "0.75rem" }} size={24} />
                  <h4 style={{ marginBottom: "0.25rem" }}>Research Innovation</h4>
                  <p style={{ fontSize: "0.85rem" }}>Encouraging breakthrough ideas and interdisciplinary approaches.</p>
                </div>
                <div className="card" style={{ padding: "1.5rem" }}>
                  <Globe style={{ color: "var(--accent)", marginBottom: "0.75rem" }} size={24} />
                  <h4 style={{ marginBottom: "0.25rem" }}>Global Collaboration</h4>
                  <p style={{ fontSize: "0.85rem" }}>Connecting scholars across borders for shared progress.</p>
                </div>
                <div className="card" style={{ padding: "1.5rem" }}>
                  <UserCheck style={{ color: "var(--accent)", marginBottom: "0.75rem" }} size={24} />
                  <h4 style={{ marginBottom: "0.25rem" }}>Professional Dev.</h4>
                  <p style={{ fontSize: "0.85rem" }}>Supporting the growth of researchers at every career stage.</p>
                </div>
              </div>
            </div>
            
            <div style={{ background: "var(--bg-soft)", padding: "2.5rem", borderRadius: "8px", border: "1px solid var(--border)" }}>
              <h3 style={{ marginBottom: "1rem" }}>Our History</h3>
              <p style={{ marginBottom: "1.2rem", fontSize: "0.95rem" }}>
                Founded with a vision to bridge the gap between regional research and global visibility, ARP has grown into a trusted partner for universities and research institutions worldwide.
              </p>
              <p style={{ marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                Headquartered in Puducherry, India, with regional presence in Indonesia, we continue to expand our reach to serve the global academic community.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <div className="award-pill" style={{ padding: "0.8rem 1.5rem", fontSize: "0.9rem" }}>
                  <CheckCircle size={18} style={{ color: "var(--accent)" }} /> 
                  <span>ISO Certified Standards</span>
                </div>
                <div className="award-pill" style={{ padding: "0.8rem 1.5rem", fontSize: "0.9rem" }}>
                  <CheckCircle size={18} style={{ color: "var(--accent)" }} /> 
                  <span>COPE Ethical Guidelines</span>
                </div>
                <div className="award-pill" style={{ padding: "0.8rem 1.5rem", fontSize: "0.9rem" }}>
                  <CheckCircle size={18} style={{ color: "var(--accent)" }} /> 
                  <span>Global DOI Registration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
