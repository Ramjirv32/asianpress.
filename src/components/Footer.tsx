import Link from "next/link";
import { Mail, Globe, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>ARP<span>.</span></h3>
            <p>Asian Research Press (ARP) is actively engaged in promoting academic excellence, research innovation, and global scholarly collaboration.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/programs">Programs</Link></li>
              <li><Link href="/fellowships">Fellowships</Link></li>
              <li><Link href="/membership">Membership</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Contact Info</h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8" }}>
                <Mail size={16} style={{ color: "var(--accent)" }} />
                <span>asianresearchpress25@gmail.com</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8" }}>
                <Globe size={16} style={{ color: "var(--accent)" }} />
                <span>asianpress.org</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "#94a3b8" }}>
                <MapPin size={16} style={{ color: "var(--accent)", marginTop: "4px" }} />
                <span>Puducherry, India | Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Asian Research Press. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
