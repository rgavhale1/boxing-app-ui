import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.module.css';

const PROGRAMS = [
  {
    id: "hybrid",
    label: "Hybrid Program (One-on-One)",
    price: "₹15000",
    perMonth: "₹15,000 / month",
    originalPrice: null,
    discount: null,
    subtitle: "STRENGTH + CONDITIONING + SKILL",
    tag: "POPULAR",
  },
  {
    id: "elite",
    label: "Elite Program",
    price: "₹20000",
    perMonth: "₹20,000 / month",
    originalPrice: "₹25000",
    discount: "20%",
    subtitle: "BREATHWORK + STRENGTH + COMBAT + MOBILITY",
    tag: "PREMIUM",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    name: '',
    mobile: '',
    email: '',
    time: '',
    programType: '',
    service: '',
    registeredDate: '',
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

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
      navigate('/login');
      return;
    }

    const data = await res.json();
    setUsers(data.content || []);
    setPage(data.number || 0);
    setTotalPages(data.totalPages || 0);
  };

  useEffect(() => {
    if (token) fetchUsers(0);
  }, [token]);

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const handleSearch = () => fetchUsers(0);

  const handleReset = () => {
    const clearedFilters = {
      name: '',
      mobile: '',
      email: '',
      time: '',
      programType: '',
      service: '',
      registeredDate: '',
    };
    setFilters(clearedFilters);
    setTimeout(() => fetchUsers(0), 0);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const formatDate = (d) => {
    if (!d) return '-';
    const date = new Date(d);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getProgramDetails = (programName) => {
    if (!programName) return null;
    
    // If it's from the database with newlines, parse it
    if (programName.includes('\n')) {
      const lines = programName.split('\n').filter(line => line.trim());
      return {
        label: lines[0] || '',
        price: lines[1]?.replace('/ MONTH', '').trim() || '',
        subtitle: lines[2] || '',
        originalPrice: lines[3] || null,
        discount: lines[4]?.replace('SAVE ', '')?.replace('%', '') ? `${lines[4].replace('SAVE ', '')}` : null,
      };
    }
    
    // Otherwise look up from PROGRAMS array
    return PROGRAMS.find(p => p.label === programName || p.label.includes(programName));
  };

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.headerBar}>
        <div>
          <h1>Admin Dashboard</h1>
          <p>Monitor bookings and keep your classes running smoothly.</p>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.filterGrid}>
          <input name="name" placeholder="Name" value={filters.name} onChange={handleChange} className={styles.input} />
          <input name="mobile" placeholder="Mobile" value={filters.mobile} onChange={handleChange} className={styles.input} />
          <input name="email" placeholder="Email" value={filters.email} onChange={handleChange} className={styles.input} />
          <input name="time" placeholder="Time" value={filters.time} onChange={handleChange} className={styles.input} />
          <input name="programType" placeholder="Program Type" value={filters.programType} onChange={handleChange} className={styles.input} />
          <input name="service" placeholder="Service" value={filters.service} onChange={handleChange} className={styles.input} />
          <input type="date" name="registeredDate" value={filters.registeredDate} onChange={handleChange} className={styles.input} />
        </div>

        <div className={styles.filterActions}>
          <button className={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
          <button className={styles.resetBtn} onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Time</th>
                <th>Program Type</th>
                <th>Service</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.noData}>
                    No results found.
                  </td>
                </tr>
              ) : (
                users.map((u, i) => {
                  const programDetails = getProgramDetails(u.programType);
                  return (
                    <tr key={i}>
                      <td>{u.name}</td>
                      <td>{u.mobile}</td>
                      <td>{u.email}</td>
                      <td>{u.time}</td>
                      <td className={styles.programCell}>
                        {programDetails ? (
                          <div className={styles.programInfo}>
                            <div className={styles.programName}>{programDetails.label}</div>
                            <div className={styles.priceRow}>
                              {programDetails.originalPrice && (
                                <span className={styles.originalPrice}>{programDetails.originalPrice}</span>
                              )}
                              <span className={styles.programPrice}>
                                {programDetails.price}
                                <span className={styles.monthText}>/ MONTH</span>
                              </span>
                              {programDetails.discount && (
                                <span className={styles.discountBadge}>{programDetails.discount}% OFF</span>
                              )}
                            </div>
                            <div className={styles.programSubtitle}>{programDetails.subtitle}</div>
                          </div>
                        ) : (
                          u.programType || '-'
                        )}
                      </td>
                      <td>{u.service || '-'}</td>
                      <td>{formatDate(u.registeredDate)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button disabled={page === 0} onClick={() => fetchUsers(page - 1)}>
            Prev
          </button>
          <span>
            Page {page + 1} / {totalPages}
          </span>
          <button disabled={page + 1 >= totalPages} onClick={() => fetchUsers(page + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;