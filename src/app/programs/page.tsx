import { 
  Globe, 
  Landmark, 
  Users, 
  Video, 
  PenTool, 
  BookOpen, 
  ClipboardList, 
  UserCheck, 
  Layers 
} from "lucide-react";

export default function Programs() {
  return (
    <div>
      <header className="subpage-header" style={{ padding: "80px 0 40px" }}>
        <div className="container">
          <h1 style={{ fontSize: "2.8rem" }}>Academic Programs & Events</h1>
          <p style={{ marginTop: "0.5rem" }}>Our activities are designed to support researchers, institutions, and academic professionals in advancing knowledge across disciplines.</p>
        </div>
      </header>

      <section className="section-padding" style={{ padding: "50px 0" }}>
        <div className="container">
          <div className="program-timeline">
            
            {/* 1. International Conferences */}
            <div className="program-item">
              <div className="program-icon-box">
                <Globe size={24} />
              </div>
              <div className="program-content-box">
                <h3>
                  International Conferences & Symposiums 
                  <span className="tag">Global</span>
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-main)", marginTop: "0.5rem" }}>
                  ARP organizes prestigious international conferences that serve as a global platform for researchers to present and discuss innovative ideas.
                </p>
                <div className="program-details">
                  <strong>Key Highlights:</strong>
                  <ul>
                    <li>Multi-track sessions covering various multidisciplinary research areas.</li>
                    <li>Keynote addresses by globally recognized academic leaders.</li>
                    <li>Opportunities for Best Paper Awards and publication in indexed journals.</li>
                    <li>Networking sessions with international collaborators.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. National Seminars */}
            <div className="program-item">
              <div className="program-icon-box" style={{ background: "var(--accent)" }}>
                <Landmark size={24} />
              </div>
              <div className="program-content-box">
                <h3>
                  National Seminars & Colloquiums 
                  <span className="tag">Regional</span>
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-main)", marginTop: "0.5rem" }}>
                  Dedicated to regional research excellence, our national seminars focus on local academic growth and institutional collaboration.
                </p>
                <div className="program-details">
                  <strong>Key Highlights:</strong>
                  <ul>
                    <li>Focus on localized research challenges and solutions.</li>
                    <li>Platform for early-career researchers to gain presentation experience.</li>
                    <li>Interactive panel discussions with industry experts.</li>
                    <li>Regional networking and MoU partnership opportunities.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Faculty Development Programs */}
            <div className="program-item">
              <div className="program-icon-box">
                <Users size={24} />
              </div>
              <div className="program-content-box">
                <h3>
                  Faculty Development Programs (FDP) 
                  <span className="tag">Training</span>
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-main)", marginTop: "0.5rem" }}>
                  Structured programs designed to enhance the pedagogical skills and research capabilities of academic professionals.
                </p>
                <div className="program-details">
                  <strong>Core Focus Areas:</strong>
                  <ul>
                    <li>Innovative Teaching Methodologies & Digital Pedagogy.</li>
                    <li>Effective Research Grant Proposal Writing.</li>
                    <li>Curriculum Design & Academic Leadership Development.</li>
                    <li>Stress Management and Professional Wellbeing for Educators.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4. Workshops & Webinars */}
            <div className="program-item">
              <div className="program-icon-box" style={{ background: "var(--accent)" }}>
                <Video size={24} />
              </div>
              <div className="program-content-box">
                <h3>
                  Workshops & Webinars 
                  <span className="tag">Interactive</span>
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-main)", marginTop: "0.5rem" }}>
                  Short-term, high-impact interactive sessions on emerging technologies and academic tools.
                </p>
                <div className="program-details">
                  <strong>Topics Include:</strong>
                  <ul>
                    <li>Academic Writing & Publishing in High-Impact Journals.</li>
                    <li>Data Analysis using SPSS, R, and Python.</li>
                    <li>AI in Research: Tools and Ethics.</li>
                    <li>Effective Use of Reference Management Systems (Zotero, Mendeley).</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 5. Research Methodology Training */}
            <div className="program-item">
              <div className="program-icon-box">
                <PenTool size={24} />
              </div>
              <div className="program-content-box">
                <h3>
                  Research Methodology Training 
                  <span className="tag">Core</span>
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-main)", marginTop: "0.5rem" }}>
                  In-depth training programs providing a solid foundation in qualitative and quantitative research techniques.
                </p>
                <div className="program-details">
                  <strong>Learning Outcomes:</strong>
                  <ul>
                    <li>Understanding research designs and sampling strategies.</li>
                    <li>Mastering data collection methods and ethical considerations.</li>
                    <li>Advanced statistical analysis and interpretation of results.</li>
                    <li>Structuring a high-quality doctoral thesis or research paper.</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="section-padding commitment" style={{ padding: "50px 0" }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: "2.5rem" }}>
            <h2>Academic Consultancy & Support</h2>
            <p>Beyond events, ARP provides dedicated support for institutional growth.</p>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            <div className="card" style={{ textAlign: "center", padding: "1.5rem" }}>
              <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: "50px", height: "50px", borderRadius: "50%", background: "var(--bg-soft)", color: "var(--accent)", marginBottom: "1rem" }}>
                <BookOpen size={24} />
              </div>
              <h4>Journal Setup</h4>
              <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>End-to-end guidance for universities to launch and manage peer-reviewed journals.</p>
            </div>
            <div className="card" style={{ textAlign: "center", padding: "1.5rem" }}>
              <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: "50px", height: "50px", borderRadius: "50%", background: "var(--bg-soft)", color: "var(--accent)", marginBottom: "1rem" }}>
                <ClipboardList size={24} />
              </div>
              <h4>Event Support</h4>
              <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>Consultancy for conference planning, indexing, and logistics management.</p>
            </div>
            <div className="card" style={{ textAlign: "center", padding: "1.5rem" }}>
              <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: "50px", height: "50px", borderRadius: "50%", background: "var(--bg-soft)", color: "var(--accent)", marginBottom: "1rem" }}>
                <UserCheck size={24} />
              </div>
              <h4>Proposal Mentoring</h4>
              <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>Expert guidance for researchers to refine their research proposals and grant applications.</p>
            </div>
            <div className="card" style={{ textAlign: "center", padding: "1.5rem" }}>
              <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: "50px", height: "50px", borderRadius: "50%", background: "var(--bg-soft)", color: "var(--accent)", marginBottom: "1rem" }}>
                <Layers size={24} />
              </div>
              <h4>Indexing Guidance</h4>
              <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>Strategies to improve the visibility and indexing of academic publications in global databases.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
