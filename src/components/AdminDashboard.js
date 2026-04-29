import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({
    name: "",
    mobile: "",
    email: "",
    time: "",
    program: "",
    registeredDate: "",
  });

  const token = localStorage.getItem("token");

  // 🔐 auth check
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // 🎯 fetch data
  const fetchUsers = async (pageNo = 0) => {
    const params = new URLSearchParams({
      page: pageNo,
      size: 50,
      ...filters,
    });

    const res = await fetch(
      `https://boxing-app-management.onrender.com/api/find/joinedusers?${params}`,
      {
        headers: { Authorization: token },
      }
    );

    if (res.status === 401) {
      navigate("/login");
      return;
    }

    const data = await res.json();

    setUsers(data.content || []);
    setPage(data.number || 0);
    setTotalPages(data.totalPages || 0);
  };

  useEffect(() => {
    if (token) fetchUsers(0);
  }, []);

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleSearch = () => {
    fetchUsers(0);
  };

  const handleReset = () => {
    const clearedFilters = {
      name: "",
      mobile: "",
      email: "",
      time: "",
      program: "",
      registeredDate: "",
    };

    setFilters(clearedFilters);

    setTimeout(() => {
      fetchUsers(0);
    }, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const formatDate = (d) => {
    if (!d) return "-";
    const date = new Date(d);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2>🏋️ Admin Dashboard</h2>

        <div style={styles.headerRight}>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div style={styles.card}>
        <div style={styles.filterGrid}>

          <input name="name" placeholder="Name" value={filters.name} onChange={handleChange} style={styles.input} />
          <input name="mobile" placeholder="Mobile" value={filters.mobile} onChange={handleChange} style={styles.input} />
          <input name="email" placeholder="Email" value={filters.email} onChange={handleChange} style={styles.input} />
          <input name="time" placeholder="Time" value={filters.time} onChange={handleChange} style={styles.input} />
          <input name="program" placeholder="Program" value={filters.program} onChange={handleChange} style={styles.input} />
          <input type="date" name="registeredDate" value={filters.registeredDate} onChange={handleChange} style={styles.input} />

        </div>

        {/* SEARCH + RESET */}
        <div style={styles.buttonRow}>
          <button onClick={handleSearch} style={styles.searchBtn}>
            Search
          </button>

          <button onClick={handleReset} style={styles.resetBtn}>
            Reset
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Mobile</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Program</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.noData}>
                  No Data Found
                </td>
              </tr>
            ) : (
              users.map((u, i) => (
                <tr key={i}>
                  <td style={styles.td}>{u.name}</td>
                  <td style={styles.td}>{u.mobile}</td>
                  <td style={styles.td}>{u.email}</td>
                  <td style={styles.td}>{u.time}</td>
                  <td style={styles.td}>{u.program}</td>
                  <td style={styles.td}>{formatDate(u.registeredDate)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div style={styles.pagination}>
          <button disabled={page === 0} onClick={() => fetchUsers(page - 1)}>
            Prev
          </button>

          <span>
            Page {page + 1} / {totalPages}
          </span>

          <button
            disabled={page + 1 >= totalPages}
            onClick={() => fetchUsers(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

/* 🎨 STYLES */
const styles = {
  page: {
    padding: "20px",
    minHeight: "100vh",
    fontFamily: "Arial",
    background: "linear-gradient(135deg, #eef2f7, #dbeafe)",
    color: "#111827",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    alignItems: "center",
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
  },

  logoutBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  },

  filterGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
    marginBottom: "10px",
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  searchBtn: {
    background: "#111827",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },

  resetBtn: {
    background: "#111827",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
  },

  th: {
    background: "#111827",
    color: "#fff",
    padding: "12px",
    textAlign: "left",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    color: "#111827",
  },

  noData: {
    textAlign: "center",
    padding: "20px",
    color: "#6b7280",
  },

  pagination: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    alignItems: "center",
  },
};

export default AdminDashboard;