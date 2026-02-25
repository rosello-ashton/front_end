import React, { useState } from 'react';
import './App.css';
import './components/ComponentStyles.css';

import programsData from './data/programs.json';
import subjectsData from './data/subjects.json';

import Dashboard from './components/Dashboard';
import ProgramList from './components/ProgramList';
import ProgramDetails from './components/ProgramDetails';
import SubjectList from './components/SubjectList';
import SubjectDetails from './components/SubjectDetails';

export default function App() {
  const [view, setView] = useState('dashboard');
  const [programs] = useState(programsData);
  const [subjects] = useState(subjectsData);
  const [filters, setFilters] = useState({});
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const renderContent = () => {
    switch (view) {
      case 'programs':
        return (
          <ProgramList
            programs={programs}
            filters={filters}
            setFilters={setFilters}
            onSelect={p => setSelectedProgram(p)}
          />
        );
      case 'subjects':
        return (
          <SubjectList
            subjects={subjects}
            filters={filters}
            setFilters={setFilters}
            onSelect={s => setSelectedSubject(s)}
          />
        );
      default:
        return <Dashboard programs={programs} subjects={subjects} />;
    }
  };

  return (
    <div>
      <header style={{ padding: '12px', background: '#2196c4', color: '#fff' }}>
        <button className="nav-button" onClick={() => setView('dashboard')}>Dashboard</button>
        <button className="nav-button" onClick={() => setView('programs')}>Programs</button>
        <button className="nav-button" onClick={() => setView('subjects')}>Subjects</button>
      </header>
      <main>{renderContent()}</main>
      {selectedProgram && (
        <ProgramDetails
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}
      {selectedSubject && (
        <SubjectDetails
          subject={selectedSubject}
          onClose={() => setSelectedSubject(null)}
        />
      )}
    </div>
  );
}
