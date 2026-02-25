import React from 'react';
import './ComponentStyles.css';

export default function SubjectCard({ subject, onClick }) {
  const { code, title, units, semester, program } = subject;
  return (
    <div className="card" onClick={onClick}>
      <strong>{code}</strong>
      <div>{title}</div>
      <div>Units: {units}</div>
      <div>Sem: {semester}</div>
      <div>Program: {program}</div>
    </div>
  );
}