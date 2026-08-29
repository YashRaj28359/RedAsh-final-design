import React from 'react';
import DataTable from '../components/DataTable';
import { Plus, Search } from 'lucide-react';

const AgencyDashboard = () => {
  const columns = [
    { header: 'Client', accessor: 'client' },
    { header: 'Campaign Name', accessor: 'title' },
    { header: 'Video URL', accessor: 'url', render: (val) => <span className="truncate">{val}</span> },
    { header: 'Status', accessor: 'status', render: (val) => <span className={`badge ${val === 'Live' ? 'active' : 'inactive'}`}>{val}</span> }
  ];

  const data = [
    { id: 1, client: 'Nike', title: 'Just Do It - Summer', url: 'https://example.com/nike.mp4', status: 'Live' },
    { id: 2, client: 'Apple', title: 'Think Different - Web', url: 'https://example.com/apple.mp4', status: 'Live' },
  ];

  return (
    <div className="dashboard-card agency-theme">
      <div className="card-header">
        <div>
          <h3>Ad Agency Campaigns</h3>
          <p>Manage enterprise videos, ad campaigns, and agency case studies.</p>
        </div>
        <div className="theme-indicator"></div>
      </div>
      
      <div className="action-bar">
        <button className="primary-btn"><Plus size={18} /> Add Campaign</button>
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input type="search" placeholder="Search campaigns..." className="search-input" />
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AgencyDashboard;
