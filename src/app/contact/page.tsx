"use client";

import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import Swal from "sweetalert2";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<"puducherry" | "jakarta">("puducherry");

  const mapUrls = {
    puducherry: "https://maps.google.com/maps?q=No.%2047,%20First%20Floor,%20Kodisamy%20Nagar,%20100%20Feet%20Road,%20Mudaliarpet,%20Puducherry%20-%20605004,%20India&t=&z=14&ie=UTF8&iwloc=&output=embed",
    jakarta: "https://maps.google.com/maps?q=Arva%20Building,%20Gondangdia%20lt.3,%20JL.%20RP%20Soeroso%20no.40%20BC,%20Menteng%20Central%20Jakarta,%20Indonesia&t=&z=14&ie=UTF8&iwloc=&output=embed",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        Swal.fire({
          title: "Success!",
          text: "Thank you for your message! We will get back to you soon.",
          icon: "success",
          confirmButtonColor: "#0f172a",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: data.error || "Failed to send message. Please try again later.",
          icon: "error",
          confirmButtonColor: "#0f172a",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to send message. Please try again later.",
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
          <h1 style={{ fontSize: "2.8rem" }}>Get in Touch</h1>
          <p style={{ marginTop: "0.5rem" }}>Have questions or want to learn more about Asian Research Press? We'd love to hear from you.</p>
        </div>
      </header>

      <section className="section-padding" style={{ padding: "50px 0" }}>
        <div className="container">
          <div className="contact-container">
            <div className="contact-info">
              <div className="contact-card" style={{ padding: "1.5rem" }}>
                <Mail size={32} style={{ color: "var(--accent)", flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontSize: "1.1rem" }}>Email Us</h3>
                  <p style={{ marginTop: "0.25rem" }}>
                    <a href="mailto:asianresearchpress25@gmail.com" style={{ color: "var(--accent)", textDecoration: "underline" }}>
                      asianresearchpress25@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="contact-card" style={{ padding: "1.5rem" }}>
                <MapPin size={32} style={{ color: "var(--accent)", flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontSize: "1.1rem" }}>Office Locations</h3>
                  <p style={{ marginTop: "0.25rem", fontSize: "0.9rem" }}>
                    <strong>India:</strong> Puducherry | <strong>Indonesia:</strong> Jakarta
                  </p>
                </div>
              </div>

              {/* Interactive Google Map */}
              <div className="contact-card" style={{ padding: "1.5rem", flexDirection: "column", alignItems: "stretch", gap: "1rem" }}>
                <h3 style={{ fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <MapPin size={24} style={{ color: "var(--accent)" }} /> Office Maps
                </h3>
                
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setSelectedLocation("puducherry")}
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      fontSize: "0.8rem",
                      background: selectedLocation === "puducherry" ? "var(--primary)" : "var(--bg-soft)",
                      color: selectedLocation === "puducherry" ? "var(--white)" : "var(--primary)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "all 0.3s ease"
                    }}
                  >
                    Puducherry
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLocation("jakarta")}
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      fontSize: "0.8rem",
                      background: selectedLocation === "jakarta" ? "var(--primary)" : "var(--bg-soft)",
                      color: selectedLocation === "jakarta" ? "var(--white)" : "var(--primary)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "all 0.3s ease"
                    }}
                  >
                    Indonesia
                  </button>
                </div>
                
                <div style={{ width: "100%", height: "200px", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--border)" }}>
                  <iframe
                    src={mapUrls[selectedLocation]}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    title="Office Map"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="contact-form" style={{ padding: "2rem" }}>
              <h2 style={{ marginBottom: "1rem", color: "var(--primary)", fontSize: "1.8rem" }}>Contact Us</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: "1rem" }}>
                  <label htmlFor="name" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                
                <div className="form-group" style={{ marginBottom: "1rem" }}>
                  <label htmlFor="email" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                
                <div className="form-group" style={{ marginBottom: "1rem" }}>
                  <label htmlFor="subject" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    required 
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
                
                <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                  <label htmlFor="message" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Message</label>
                  <textarea 
                    id="message" 
                    required 
                    placeholder="Your message..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{ display: "flex", gap: "0.5rem", alignItems: "center", justifyContent: "center", width: "100%" }}
                  >
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
                        Sending... Please wait...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
