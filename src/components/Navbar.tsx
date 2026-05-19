"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/about", label: "About" },
    { href: "/fellowships", label: "Post Doc Fellowship", className: "nav-postdoc" },
    { href: "/programs", label: "Programs" },
    { href: "/publications", label: "Publications" },
    { href: "/membership", label: "Membership" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav>
      <div className="container nav-content">
        <Link href="/" className="logo">
          <img src="/assets/logo.png" alt="ARP Logo" className="logo-img" /> ARP<span>.</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="nav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${pathname === link.href ? "active" : ""} ${link.className || ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="mobile-menu-btn"
          aria-label="Toggle Menu"
          style={{
            background: "none",
            border: "none",
            color: "var(--primary)",
            cursor: "pointer",
            padding: "0.5rem"
          }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="mobile-dropdown" style={{
          position: "absolute",
          top: "80px",
          left: 0,
          width: "100%",
          background: "var(--white)",
          borderBottom: "1px solid var(--border)",
          padding: "1.5rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
        }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`${pathname === link.href ? "active" : ""} ${link.className || ""}`}
              style={{
                color: pathname === link.href ? "var(--accent)" : "var(--secondary)",
                fontWeight: 600,
                fontSize: "1rem"
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
