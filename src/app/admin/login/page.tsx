"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Lock, Mail, KeyRound, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [view, setView] = useState<"login" | "verify-login" | "forgot" | "reset">("login");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginOtp, setLoginOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.requiresOtp) {
        Swal.fire({ title: "Verification Required", text: "A code has been sent to your email.", icon: "info" });
        setView("verify-login");
      } else {
        Swal.fire({ title: "Warning", text: data.error || "Login failed", icon: "warning" });
      }
    } catch (err) {
      Swal.fire({ title: "Error", text: "Something went wrong", icon: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginOtp) return Swal.fire("Error", "Please enter the verification code", "error");
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/verify-login-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: loginOtp }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        Swal.fire({ title: "Warning", text: data.error || "Verification failed", icon: "warning" });
      }
    } catch (err) {
      Swal.fire({ title: "Error", text: "Something went wrong", icon: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return Swal.fire("Error", "Please enter your email", "error");
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire("Success", "OTP sent to your email", "success");
        setView("reset");
      } else {
        Swal.fire("Error", data.error, "error");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to send OTP", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire("Success", "Password updated! You can now login.", "success");
        setView("login");
        setPassword("");
      } else {
        Swal.fire("Error", data.error, "error");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to reset password", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-soft)", padding: "2rem", paddingTop: "100px" }}>
      <div style={{ background: "var(--white)", padding: "3rem", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", width: "100%", maxWidth: "450px" }}>
        
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <img src="/assets/logo.png" alt="ARP Logo" style={{ width: "80px", height: "auto", marginBottom: "0.5rem" }} />
          <h2 style={{ color: "var(--primary)", fontSize: "1.8rem" }}>Login</h2>
        </div>

        {view === "login" && (
          <>
            <form onSubmit={handleLogin}>
              <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Email Address</label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: "6px", padding: "0 1rem" }}>
                  <Mail size={18} color="var(--text-light)" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ border: "none", padding: "0.8rem", width: "100%", outline: "none" }} />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Password</label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: "6px", padding: "0 1rem" }}>
                  <Lock size={18} color="var(--text-light)" />
                  <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ border: "none", padding: "0.8rem", width: "100%", outline: "none" }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0", display: "flex", alignItems: "center" }}>
                    {showPassword ? <EyeOff size={18} color="var(--text-light)" /> : <Eye size={18} color="var(--text-light)" />}
                  </button>
                </div>
              </div>
              <div style={{ textAlign: "right", marginBottom: "1.5rem" }}>
                <button type="button" onClick={() => setView("forgot")} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: "0.9rem" }}>Forgot Password?</button>
              </div>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "1rem" }}>
                {isSubmitting ? "Authenticating..." : "Continue"}
              </button>
            </form>
          </>
        )}

        {view === "verify-login" && (
          <>
            <p style={{ textAlign: "center", color: "var(--text-light)", marginBottom: "2rem", fontSize: "0.95rem" }}>
              For your security, we sent a verification code to <strong>{email}</strong>
            </p>
            <form onSubmit={handleVerifyLogin}>
              <div className="form-group" style={{ marginBottom: "2rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Verification Code</label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: "6px", padding: "0 1rem" }}>
                  <KeyRound size={18} color="var(--text-light)" />
                  <input type="text" required value={loginOtp} onChange={(e) => setLoginOtp(e.target.value)} placeholder="Enter 6-digit code" style={{ border: "none", padding: "0.8rem", width: "100%", outline: "none", letterSpacing: "2px" }} />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "1rem", marginBottom: "1rem" }}>
                {isSubmitting ? "Verifying..." : "Secure Login"}
              </button>
              <button type="button" onClick={() => setView("login")} className="btn btn-outline" style={{ width: "100%", justifyContent: "center", padding: "1rem" }}>
                Back
              </button>
            </form>
          </>
        )}

        {view === "forgot" && (
          <>
            <h2 style={{ textAlign: "center", color: "var(--primary)", marginBottom: "1rem", fontSize: "1.8rem" }}>Reset Password</h2>
            <p style={{ textAlign: "center", color: "var(--text-light)", marginBottom: "2rem", fontSize: "0.9rem" }}>Enter your email address to receive an OTP.</p>
            <form onSubmit={handleForgotPassword}>
              <div className="form-group" style={{ marginBottom: "2rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Email Address</label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: "6px", padding: "0 1rem" }}>
                  <Mail size={18} color="var(--text-light)" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ border: "none", padding: "0.8rem", width: "100%", outline: "none" }} />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "1rem", marginBottom: "1rem" }}>
                {isSubmitting ? "Sending..." : "Send OTP"}
              </button>
              <button type="button" onClick={() => setView("login")} className="btn btn-outline" style={{ width: "100%", justifyContent: "center", padding: "1rem" }}>
                Back to Login
              </button>
            </form>
          </>
        )}

        {view === "reset" && (
          <>
            <h2 style={{ textAlign: "center", color: "var(--primary)", marginBottom: "1rem", fontSize: "1.8rem" }}>Enter OTP</h2>
            <p style={{ textAlign: "center", color: "var(--text-light)", marginBottom: "2rem", fontSize: "0.9rem" }}>We sent a 6-digit code to your email.</p>
            <form onSubmit={handleResetPassword}>
              <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>OTP Code</label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: "6px", padding: "0 1rem" }}>
                  <KeyRound size={18} color="var(--text-light)" />
                  <input type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" style={{ border: "none", padding: "0.8rem", width: "100%", outline: "none", letterSpacing: "2px" }} />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: "2rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>New Password</label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: "6px", padding: "0 1rem" }}>
                  <Lock size={18} color="var(--text-light)" />
                  <input type={showNewPassword ? "text" : "password"} required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" style={{ border: "none", padding: "0.8rem", width: "100%", outline: "none" }} />
                  <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0", display: "flex", alignItems: "center" }}>
                    {showNewPassword ? <EyeOff size={18} color="var(--text-light)" /> : <Eye size={18} color="var(--text-light)" />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "1rem" }}>
                {isSubmitting ? "Updating..." : "Update Password"}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
