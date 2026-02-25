import React from 'react';
// SubjectCard will display more details but year-level entries may only have code/title
import SubjectCard from './SubjectCard';

export default function ProgramDetails({ program, onClose }) {
  if (!program) return null;
  const { code, name, description, duration, units, yearLevels } = program;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} style={{ float:'right' }}>Close</button>
        <h2>{code} - {name}</h2>
        {description && <p>{description}</p>}
        <div>Duration: {duration}</div>
        <div>Total units: {units}</div>
        <h3>Subjects</h3>
        {Object.entries(yearLevels || {}).map(([year, subjects]) => (
          <div key={year} style={{ marginBottom:'12px' }}>
            <strong>{year} year:</strong>
            <div style={{ display:'flex', flexWrap:'wrap' }}>
              {subjects.map(s => {
                // if entry already has units/semester/program use SubjectCard
                if (s.units || s.semester || s.program) {
                  return <SubjectCard key={s.code} subject={s} />;
                }
                // otherwise render minimal card
                return (
                  <div key={s.code} style={{ border:'1px solid #ccc', padding:'8px', margin:'4px', borderRadius:'4px', background:'#fafafa' }}>
                    <strong>{s.code}</strong>
                    <div>{s.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}