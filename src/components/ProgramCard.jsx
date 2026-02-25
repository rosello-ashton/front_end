import React from 'react';
import './ComponentStyles.css';

export default function ProgramCard({ program, onClick }) {
  const { code, name, type, duration, units, status } = program;
  const statusStyle = { color: status === 'active' ? 'green' : 'red' };

  return (
    <div className="card" onClick={onClick}>
      <strong>{code}</strong>
      <div>{name}</div>
      <div>Type: {type}</div>
      <div>Duration: {duration}</div>
      <div>Units: {units}</div>
      <div style={statusStyle}>{status}</div>
    </div>
  );
}