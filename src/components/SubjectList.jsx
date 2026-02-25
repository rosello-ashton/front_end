import React, { useMemo } from 'react';
import './ComponentStyles.css';
import SubjectCard from './SubjectCard';
import FilterBar from './FilterBar';

export default function SubjectList({ subjects, filters, setFilters, onSelect }) {
  const filtered = useMemo(() => {
    return subjects.filter(s => {
      if (filters.search && !s.code.toLowerCase().includes(filters.search.toLowerCase()) && !s.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.semester && filters.semester !== 'all' && s.semester !== filters.semester) return false;
      if (filters.withPrereq === 'yes' && (!s.prerequisites || s.prerequisites.length === 0)) return false;
      if (filters.withPrereq === 'no' && s.prerequisites && s.prerequisites.length > 0) return false;
      if (filters.program && filters.program !== 'all' && s.program !== filters.program) return false;
      return true;
    });
  }, [subjects, filters]);

  return (
    <div style={{ padding: '16px' }}>
      <h2>Subject Offerings</h2>
      <FilterBar filters={filters} setFilters={setFilters} type="subject" subjects={subjects} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filtered.map(s => (
          <SubjectCard key={s.code} subject={s} onClick={() => onSelect(s)} />
        ))}
      </div>
    </div>
  );
}