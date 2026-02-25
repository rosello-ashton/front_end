import React from 'react';

export default function SubjectDetails({ subject, onClose }) {
  if (!subject) return null;
  const { code, title, units, semester, prerequisites, corequisites, description, program } = subject;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} style={{ float:'right' }}>Close</button>
        <h2>{code} - {title}</h2>
        <div>Units: {units}</div>
        <div>Semester/term: {semester}</div>
        <div>Program: {program}</div>
        <div>Prerequisites: {prerequisites && prerequisites.length ? prerequisites.join(', ') : 'none'}</div>
        <div>Corequisites: {corequisites && corequisites.length ? corequisites.join(', ') : 'none'}</div>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}