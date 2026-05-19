"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { LogOut, Trash2, Plus, Filter, Users, School, Calendar } from "lucide-react";

interface College {
  _id: string;
  country: string;
  collegeName: string;
}

interface Submission {
  _id: string;
  fullName: string;
  country: string;
  collegeName: string;
  message?: string;
  fileName: string;
  submittedAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"colleges" | "submissions">("colleges");
  
  // Colleges State
  const [colleges, setColleges] = useState<College[]>([]);
  const [newCountry, setNewCountry] = useState("");
  const [newCollegeName, setNewCollegeName] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  
  // Submissions State
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [subFilterCountry, setSubFilterCountry] = useState("");
  const [subFilterCollege, setSubFilterCollege] = useState("");
  const [subFilterTime, setSubFilterTime] = useState("");
  const [subPage, setSubPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  const asianCountries = [
    "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "Brunei", "Cambodia", "China", "Cyprus", "Georgia", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka", "Syria", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste", "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen", "Other"
  ];

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchColleges = async () => {
    try {
      const res = await fetch("/api/colleges");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (data.success) {
        setColleges(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      let url = `/api/submissions?page=${subPage}&limit=20&`;
      if (subFilterCountry) url += `country=${encodeURIComponent(subFilterCountry)}&`;
      if (subFilterCollege) url += `college=${encodeURIComponent(subFilterCollege)}&`;
      if (subFilterTime) url += `time=${encodeURIComponent(subFilterTime)}&`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.data);
        setTotalPages(data.pagination.totalPages || 1);
        setTotalSubmissions(data.pagination.total || 0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch colleges once on mount
  useEffect(() => {
    fetchColleges().then(() => setIsLoading(false));
  }, []);

  // Fetch submissions on filter/page change
  useEffect(() => {
    fetchSubmissions();
  }, [subPage, subFilterCountry, subFilterCollege, subFilterTime]);

  const handleAddCollege = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCountry || !newCollegeName) return;

    try {
      const res = await fetch("/api/colleges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: newCountry, collegeName: newCollegeName }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNewCountry("");
        setNewCollegeName("");
        fetchColleges();
        Swal.fire({ title: "Added", text: "College added successfully", icon: "success", timer: 1500, showConfirmButton: false });
      } else {
        Swal.fire({ title: "Error", text: data.error, icon: "error" });
      }
    } catch (err) {
      Swal.fire({ title: "Error", text: "Failed to add college", icon: "error" });
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`/api/colleges?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          fetchColleges();
          Swal.fire("Deleted!", "The college has been deleted.", "success");
        }
      } catch (err) {
        Swal.fire("Error!", "Failed to delete college.", "error");
      }
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const filteredColleges = filterCountry 
    ? colleges.filter(c => c.country.toLowerCase().includes(filterCountry.toLowerCase()))
    : colleges;

  if (isLoading) return <div style={{ padding: "5rem", textAlign: "center" }}>Loading Dashboard...</div>;

  return (
    <div style={{ background: "var(--bg-soft)", minHeight: "100vh", paddingTop: "80px" }}>
      <header style={{ background: "var(--primary)", padding: "1.5rem 0", color: "white" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, color: "white" }}>Admin Dashboard</h2>
          <button onClick={handleLogout} className="btn" style={{ background: "transparent", color: "white", border: "1px solid white", padding: "0.5rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div className="container" style={{ marginTop: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
          <button 
            onClick={() => setActiveTab("colleges")} 
            className={`btn ${activeTab === "colleges" ? "btn-primary" : "btn-outline"}`}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <School size={18} /> Approved Colleges
          </button>
          <button 
            onClick={() => setActiveTab("submissions")} 
            className={`btn ${activeTab === "submissions" ? "btn-primary" : "btn-outline"}`}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Users size={18} /> Fellowship Submissions
          </button>
        </div>

        {activeTab === "colleges" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem" }}>
            {/* Add College Form */}
            <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", height: "fit-content" }}>
              <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><Plus size={20} color="var(--accent)" /> Add Approved College</h3>
              <form onSubmit={handleAddCollege}>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: 600 }}>Country</label>
                  <select 
                    required 
                    value={newCountry} 
                    onChange={(e) => setNewCountry(e.target.value)} 
                    style={{ width: "100%", padding: "0.8rem", border: "1px solid var(--border)", borderRadius: "4px", background: "white" }}
                  >
                    <option value="" disabled>Select a country</option>
                    {asianCountries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: 600 }}>College Name</label>
                  <input 
                    type="text" 
                    required 
                    value={newCollegeName} 
                    onChange={(e) => setNewCollegeName(e.target.value)} 
                    placeholder="e.g. Indian Institute of Technology"
                    style={{ width: "100%", padding: "0.8rem", border: "1px solid var(--border)", borderRadius: "4px" }}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Add to Approved List</button>
              </form>
            </div>

            {/* List of Colleges */}
            <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>Approved Colleges ({filteredColleges.length})</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--bg-soft)", padding: "0.5rem", borderRadius: "4px" }}>
                  <Filter size={16} color="var(--text-light)" />
                  <input 
                    type="text" 
                    placeholder="Filter by country..." 
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                    style={{ border: "none", background: "transparent", outline: "none", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <div style={{ maxHeight: "600px", overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "var(--bg-soft)", textAlign: "left" }}>
                      <th style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>Country</th>
                      <th style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>College Name</th>
                      <th style={{ padding: "1rem", borderBottom: "1px solid var(--border)", textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredColleges.length > 0 ? (
                      filteredColleges.map((college) => (
                        <tr key={college._id} style={{ borderBottom: "1px solid var(--border)" }}>
                          <td style={{ padding: "1rem", fontWeight: 600 }}>{college.country}</td>
                          <td style={{ padding: "1rem" }}>{college.collegeName}</td>
                          <td style={{ padding: "1rem", textAlign: "right" }}>
                            <button onClick={() => handleDelete(college._id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#ef4444" }}>
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} style={{ padding: "2rem", textAlign: "center", color: "var(--text-light)" }}>No colleges found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "submissions" && (
          <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>Fellowship Submissions ({totalSubmissions})</h3>
              
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--bg-soft)", padding: "0.5rem", borderRadius: "4px" }}>
                  <Filter size={16} color="var(--text-light)" />
                  <input 
                    type="text" 
                    placeholder="Filter country..." 
                    value={subFilterCountry}
                    onChange={(e) => { setSubFilterCountry(e.target.value); setSubPage(1); }}
                    style={{ border: "none", background: "transparent", outline: "none", fontSize: "0.9rem", width: "120px" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--bg-soft)", padding: "0.5rem", borderRadius: "4px" }}>
                  <Filter size={16} color="var(--text-light)" />
                  <input 
                    type="text" 
                    placeholder="Filter college..." 
                    value={subFilterCollege}
                    onChange={(e) => { setSubFilterCollege(e.target.value); setSubPage(1); }}
                    style={{ border: "none", background: "transparent", outline: "none", fontSize: "0.9rem", width: "150px" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--bg-soft)", padding: "0.5rem", borderRadius: "4px" }}>
                  <Calendar size={16} color="var(--text-light)" />
                  <select 
                    value={subFilterTime}
                    onChange={(e) => { setSubFilterTime(e.target.value); setSubPage(1); }}
                    style={{ border: "none", background: "transparent", outline: "none", fontSize: "0.9rem", cursor: "pointer" }}
                  >
                    <option value="">All Time</option>
                    <option value="last_week">Last 7 Days</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
                <thead>
                  <tr style={{ background: "var(--bg-soft)", textAlign: "left" }}>
                    <th style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>Date & Time</th>
                    <th style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>Applicant Name</th>
                    <th style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>Country</th>
                    <th style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>College</th>
                    <th style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>CV/Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.length > 0 ? (
                    submissions.map((sub) => (
                      <tr key={sub._id} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td style={{ padding: "1rem", color: "var(--text-light)", fontSize: "0.9rem" }}>
                          {new Date(sub.submittedAt).toLocaleString()}
                        </td>
                        <td style={{ padding: "1rem", fontWeight: 600 }}>{sub.fullName}</td>
                        <td style={{ padding: "1rem" }}>{sub.country}</td>
                        <td style={{ padding: "1rem" }}>{sub.collegeName}</td>
                        <td style={{ padding: "1rem" }}>
                          <span style={{ background: "var(--bg-soft)", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.85rem", color: "var(--primary)" }}>
                            {sub.fileName}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "var(--text-light)" }}>No submissions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem", alignItems: "center" }}>
                <button 
                  onClick={() => setSubPage(prev => Math.max(prev - 1, 1))} 
                  disabled={subPage === 1}
                  className="btn btn-outline" 
                  style={{ padding: "0.5rem 1rem", fontSize: "0.9rem", opacity: subPage === 1 ? 0.5 : 1, cursor: subPage === 1 ? "not-allowed" : "pointer" }}
                >
                  Previous
                </button>
                <span style={{ fontSize: "0.95rem", color: "var(--text-light)", fontWeight: 500 }}>
                  Page {subPage} of {totalPages}
                </span>
                <button 
                  onClick={() => setSubPage(prev => Math.min(prev + 1, totalPages))} 
                  disabled={subPage === totalPages}
                  className="btn btn-outline" 
                  style={{ padding: "0.5rem 1rem", fontSize: "0.9rem", opacity: subPage === totalPages ? 0.5 : 1, cursor: subPage === totalPages ? "not-allowed" : "pointer" }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
