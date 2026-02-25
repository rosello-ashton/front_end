import React from 'react';
import './ComponentStyles.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// simple card style
const cardStyle = {
  border: '1px solid #ccc',
  padding: '12px',
  borderRadius: '6px',
  flex: 1,
  margin: '4px',
  background: '#fff'
};

export default function Dashboard({ programs, subjects }) {
  // load shared styles (import is at file level)
  const totalPrograms = programs.length;
  const totalSubjects = subjects.length;
  const activePrograms = programs.filter(p => p.status === 'active').length;
  const inactivePrograms = totalPrograms - activePrograms;
  const subjectsPerSem = subjects.reduce((acc, s) => {
    acc[s.semester] = (acc[s.semester] || 0) + 1;
    return acc;
  }, {});
  const subjectsPerSemData = Object.entries(subjectsPerSem).map(([sem, count]) => ({ sem, count }));
  const subjectsWithPrereq = subjects.filter(s => s.prerequisites && s.prerequisites.length > 0).length;
  const recentPrograms = [...programs]
    .sort((a, b) => new Date(b.added) - new Date(a.added))
    .slice(0, 3);
  const recentSubjects = [...subjects]
    .sort((a, b) => 0) // assuming no added date
    .slice(0, 3);

  return (
    <div style={{ padding: '16px' }}>
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={cardStyle}>Total programs: {totalPrograms}</div>
        <div style={cardStyle}>Total subjects: {totalSubjects}</div>
        <div style={cardStyle}>Active programs: {activePrograms}</div>
        <div style={cardStyle}>Inactive programs: {inactivePrograms}</div>
        <div style={cardStyle}>Subjects w/ prereq: {subjectsWithPrereq}</div>
        <div style={{ ...cardStyle, width: '100%', height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectsPerSemData}>
              <XAxis dataKey="sem" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{ marginTop: '16px' }}>
        <h3>Recently added programs</h3>
        <ul>
          {recentPrograms.map(p => (
            <li key={p.code}>{p.code} - {p.name}</li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: '16px' }}>
        <h3>Recently added subjects</h3>
        <ul>
          {recentSubjects.map(s => (
            <li key={s.code}>{s.code} - {s.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
