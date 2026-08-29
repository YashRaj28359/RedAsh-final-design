import React from 'react';
import DataTable from '../components/DataTable';
import { Plus, Search } from 'lucide-react';

const EntertainmentDashboard = () => {
  const columns = [
    { header: 'Type', accessor: 'type', render: (val) => <span className="badge type-badge">{val}</span> },
    { header: 'Title', accessor: 'title' },
    { header: 'Thumbnail', accessor: 'thumbnail', render: (val) => <img src={val} alt="thumb" className="table-thumb" /> },
    { header: 'Status', accessor: 'status', render: (val) => <span className={`badge ${val === 'Published' ? 'active' : 'inactive'}`}>{val}</span> }
  ];

  const data = [
    { id: 1, type: 'Microdrama', title: 'The Silent Echo', thumbnail: 'https://via.placeholder.com/50', status: 'Published' },
    { id: 2, type: 'Movie', title: 'Journey to the West', thumbnail: 'https://via.placeholder.com/50', status: 'Draft' },
  ];

  return (
    <div className="dashboard-card ent-theme">
      <div className="card-header">
        <div>
          <h3>Entertainment Content</h3>
          <p>Manage movies, microdramas, and entertainment blog posts.</p>
        </div>
        <div className="theme-indicator"></div>
      </div>
      
      <div className="action-bar">
        <button className="primary-btn"><Plus size={18} /> Add Content</button>
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input type="search" placeholder="Search movies & shows..." className="search-input" />
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default EntertainmentDashboard;
