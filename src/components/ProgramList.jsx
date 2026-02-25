import React, { useMemo } from 'react';
import './ComponentStyles.css';
import ProgramCard from './ProgramCard';
import FilterBar from './FilterBar';

export default function ProgramList({ programs, filters, setFilters, onSelect }) {
  const filtered = useMemo(() => {
    return programs.filter(p => {
      if (filters.status && filters.status !== 'all' && p.status !== filters.status) return false;
      if (filters.search && !p.code.toLowerCase().includes(filters.search.toLowerCase()) && !p.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }, [programs, filters]);

  return (
    <div style={{ padding: '16px' }}>
      <h2>Program Offerings</h2>
      <FilterBar filters={filters} setFilters={setFilters} type="program" />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filtered.map(p => (
          <ProgramCard key={p.code} program={p} onClick={() => onSelect(p)} />
        ))}
      </div>
    </div>
  );
}