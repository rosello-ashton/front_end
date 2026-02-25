import React from 'react';

export default function FilterBar({ filters, setFilters, type, subjects }) {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ marginBottom: '12px' }}>
      <input
        className="filter-input"
        type="text"
        placeholder="Search..."
        value={filters.search || ''}
        onChange={e => handleChange('search', e.target.value)}
      />
      {type === 'program' && (
        <select className="filter-select" value={filters.status || 'all'} onChange={e => handleChange('status', e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="phased out">Phased out</option>
          <option value="under review">Under review</option>
        </select>
      )}
      {type === 'subject' && (
        <>
          <select value={filters.semester || 'all'} onChange={e => handleChange('semester', e.target.value)} style={{ marginRight: '8px' }}>
            <option value="all">All semesters</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="both">Both</option>
          </select>
          <select className="filter-select" value={filters.withPrereq || 'all'} onChange={e => handleChange('withPrereq', e.target.value)}>
            <option value="all">Prerequisite</option>
            <option value="yes">With</option>
            <option value="no">Without</option>
          </select>
          <select className="filter-select" value={filters.program || 'all'} onChange={e => handleChange('program', e.target.value)}>
            <option value="all">All programs</option>
            {subjects && Array.from(new Set(subjects.map(s => s.program))).map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}