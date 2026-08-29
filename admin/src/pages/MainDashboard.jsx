import React from 'react';
import DataTable from '../components/DataTable';
import { Plus, Search } from 'lucide-react';

const MainDashboard = () => {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Title', accessor: 'title' },
    { header: 'Video URL', accessor: 'url', render: (val) => <span className="truncate">{val}</span> },
    { header: 'Status', accessor: 'status', render: (val) => <span className={`badge ${val === 'Active' ? 'active' : 'inactive'}`}>{val}</span> }
  ];

  const data = [
    { id: 1, title: 'Hero Background Video', url: 'https://example.com/hero.mp4', status: 'Active' },
    { id: 2, title: 'About Us Showcase', url: 'https://example.com/about.mp4', status: 'Active' },
  ];

  return (
    <div className="dashboard-card main-theme">
      <div className="card-header">
        <div>
          <h3>Main Homepage Assets</h3>
          <p>Manage videos, hero sections, and global media used on the main homepage.</p>
        </div>
        <div className="theme-indicator"></div>
      </div>
      
      <div className="action-bar">
        <button className="primary-btn"><Plus size={18} /> Add New Asset</button>
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input type="search" placeholder="Search assets..." className="search-input" />
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default MainDashboard;
