"use client";

import { useState } from "react";
import { 
  Send, 
  Check, 
  Target, 
  Gift, 
  DollarSign, 
  FileText, 
  UserCheck, 
  Network, 
  Award, 
  Layers, 
  CheckCircle,
  Clock
} from "lucide-react";
import Swal from "sweetalert2";

export default function Fellowships() {
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    collegeName: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToForm = () => {
    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fileInput = document.getElementById("resume") as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file) {
      Swal.fire({
        title: "Error!",
        text: "Please upload your CV/Resume.",
        icon: "warning",
        confirmButtonColor: "#0f172a",
      });
      setIsSubmitting(false);
      return;
    }

    const submitData = new FormData();
    submitData.append("fullName", formData.fullName);
    submitData.append("country", formData.country);
    submitData.append("collegeName", formData.collegeName);
    submitData.append("message", formData.message);
    submitData.append("resume", file);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();
      if (response.ok && data.success) {
        Swal.fire({
          title: "Success!",
          text: "Thank you for your application! We will review your submission and contact you soon.",
          icon: "success",
          confirmButtonColor: "#0f172a",
        });
        setFormData({
          fullName: "",
          country: "",
          collegeName: "",
          message: "",
        });
        if (fileInput) fileInput.value = "";
      } else {
        Swal.fire({
          title: "Error!",
          text: data.error || "Failed to submit application. Please try again later.",
          icon: "error",
          confirmButtonColor: "#0f172a",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to submit application. Please try again later.",
        icon: "error",
        confirmButtonColor: "#0f172a",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <header className="subpage-header" style={{ padding: "80px 0 40px" }}>
        <div className="container">
          <h1 style={{ fontSize: "2.8rem" }}>Research Fellowship Programs</h1>
          <p style={{ marginTop: "0.5rem" }}>Supporting outstanding researchers who demonstrate excellence in innovation and academic leadership.</p>
        </div>
      </header>

      {/* Apply Now Button Section */}
      <div className="apply-button-section" style={{ padding: "1.5rem 0" }}>
        <div className="container">
          <button onClick={scrollToForm} className="btn btn-apply" style={{ borderRadius: "6px" }}>
            <Send size={16} /> Apply for Postdoctoral Fellowship Program
          </button>
        </div>
      </div>

      {/* Main Info Cards */}
      <section className="section-padding" style={{ padding: "40px 0" }}>
        <div className="container">
          <div className="grid" style={{ gap: "1.5rem" }}>
            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
                <Target size={36} style={{ color: "var(--accent)" }} />
                <h3 style={{ fontSize: "1.4rem" }}>Objective</h3>
              </div>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>The ARP Postdoctoral and Research Fellowship Program aims to support promising early-career PhD holders and senior researchers. Fellows conduct research on innovative topics with high academic and societal relevance.</p>
            </div>
            
            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
                <Gift size={36} style={{ color: "var(--accent)" }} />
                <h3 style={{ fontSize: "1.4rem" }}>Fellowship Benefits</h3>
              </div>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>Fellows receive competitive monthly stipends, research allowances, and institutional support. The program provides opportunities for publishing in top-tier journals and attending international conferences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Program details & Eligibility */}
      <section className="section-padding" style={{ padding: "40px 0", background: "var(--bg-soft)" }}>
        <div className="container">
          <div className="grid" style={{ gap: "3rem" }}>
            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>Eligibility Criteria</h2>
              <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none" }}>
                <li style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <CheckCircle size={20} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong>Ph.D. Degree:</strong> Must hold a PhD or equivalent degree from a recognized university.
                  </div>
                </li>
                <li style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <CheckCircle size={20} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong>Research Proposal:</strong> Submit a detailed research proposal aligning with ARP's priority areas.
                  </div>
                </li>
                <li style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <CheckCircle size={20} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong>Publications:</strong> Minimum of 3 peer-reviewed research publications in reputed journals.
                  </div>
                </li>
                <li style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <CheckCircle size={20} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong>Host Institution:</strong> Secure an acceptance/mentorship letter from an approved host institution.
                  </div>
                </li>
              </ul>
              <div style={{ marginTop: "1.5rem", padding: "1.2rem", background: "var(--white)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                <h4 style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                  <Clock size={18} style={{ color: "var(--accent)" }} /> Duration
                </h4>
                <p style={{ fontSize: "0.9rem" }}><strong>1 - 15 years</strong></p>
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>Research Areas</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
                <span className="award-pill" style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}>Engineering & Technology</span>
                <span className="award-pill" style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}>Computer Science & AI</span>
                <span className="award-pill" style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}>Life Sciences & Biotechnology</span>
                <span className="award-pill" style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}>Management & Social Sciences</span>
                <span className="award-pill" style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}>Physical Sciences</span>
                <span className="award-pill" style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}>Interdisciplinary Research</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application & Selection Process */}
      <section id="process" className="section-padding" style={{ padding: "50px 0" }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: "2.5rem" }}>
            <h2>Application & Selection</h2>
            <p>Follow these steps to apply for the ARP Research Fellowship Program.</p>
          </div>
          
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Document Submission</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>Submit your Updated CV, Research Proposal (5–10 pages), Publication List, Recommendation Letter, and Acceptance letter from Host Institution via email.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Initial Screening</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>The Academic Committee performs an initial screening of all submitted documents.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Proposal Review</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>A rigorous review of the research proposal is conducted by subject matter experts.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Interview</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>Selected candidates may be invited for an online or offline interview.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h4>Final Approval</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>Final approval is granted by the ARP Fellowship Board.</p>
              </div>
            </div>
          </div>

          <div className="dates-grid" style={{ maxWidth: "800px", margin: "2rem auto 0" }}>
            <div className="date-box">
              <span>Application Opens</span>
              <strong>June 2026</strong>
            </div>
            <div className="date-box">
              <span>Application Opens</span>
              <strong>December 2026</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply-form" className="section-padding" style={{ padding: "60px 0", background: "var(--bg-soft)", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ maxWidth: "600px", margin: "0 auto", background: "var(--white)", padding: "2.5rem", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.025)", border: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "var(--primary)" }}>Fellowship Application Form</h2>
            <p style={{ color: "var(--text-light)", fontSize: "0.95rem", marginBottom: "2rem" }}>Fill out the form below to apply for our Research Fellowship Program</p>
            
            <form onSubmit={handleSubmit} className="application-form">
              <div className="form-group" style={{ marginBottom: "1.2rem" }}>
                <label htmlFor="fullName" style={{ fontWeight: 600, fontSize: "0.9rem", display: "block", marginBottom: "0.5rem" }}>Full Name <span className="required" style={{ color: "red" }}>*</span></label>
                <input 
                  type="text" 
                  id="fullName" 
                  required 
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "1.2rem" }}>
                <label htmlFor="country" style={{ fontWeight: 600, fontSize: "0.9rem", display: "block", marginBottom: "0.5rem" }}>Country <span className="required" style={{ color: "red" }}>*</span></label>
                <input 
                  type="text" 
                  id="country" 
                  required 
                  placeholder="Enter your country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "1.2rem" }}>
                <label htmlFor="collegeName" style={{ fontWeight: 600, fontSize: "0.9rem", display: "block", marginBottom: "0.5rem" }}>College/University Name <span className="required" style={{ color: "red" }}>*</span></label>
                <input 
                  type="text" 
                  id="collegeName" 
                  required 
                  placeholder="Enter your institution name"
                  value={formData.collegeName}
                  onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "1.2rem" }}>
                <label htmlFor="resume" style={{ fontWeight: 600, fontSize: "0.9rem", display: "block", marginBottom: "0.5rem" }}>Resume/CV <span className="required" style={{ color: "red" }}>*</span></label>
                <input type="file" id="resume" accept=".pdf,.doc,.docx" required />
                <p className="file-help" style={{ fontSize: "0.8rem", color: "var(--text-light)", marginTop: "0.25rem" }}>Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
              </div>

              <div className="form-group" style={{ marginBottom: "2rem" }}>
                <label htmlFor="message" style={{ fontWeight: 600, fontSize: "0.9rem", display: "block", marginBottom: "0.5rem" }}>Cover Letter / Additional Message <span className="optional" style={{ color: "var(--text-light)", fontWeight: 400 }}>(Optional)</span></label>
                <textarea 
                  id="message" 
                  rows={4} 
                  placeholder="Tell us about your research interests and why you want to apply for the fellowship..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-submit" disabled={isSubmitting} style={{ width: "100%", display: "flex", gap: "0.5rem", alignItems: "center", justifyContent: "center" }}>
                {isSubmitting ? (
                  <>
                    <span className="spinner" style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid var(--white)",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite"
                    }}></span>
                    Submitting... Please wait...
                  </>
                ) : (
                  <>
                    <Check size={16} /> Submit Application
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
