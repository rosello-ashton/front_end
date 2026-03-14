import { useState, useEffect } from 'react';
import Navbar from '../common/Navbar';
import EnrollmentChart from './EnrollmentChart';
import CourseDistributionChart from './CourseDistributionChart';
import AttendanceChart from './AttendanceChart';
import WeatherWidget from '../weather/WeatherWidget';
import { SkeletonCard } from '../common/LoadingSpinner';
import api from '../../services/api';

function StatCard({ icon, label, value, color, subtitle }) {
  return (
    <div className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${color} hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{value?.toLocaleString() ?? '—'}</p>
          {subtitle && <p className="text-slate-400 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  );
}

function StudentsTab() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const [sRes, statRes] = await Promise.all([
          api.get('/students', { params: { search, page } }),
          api.get('/students/stats'),
        ]);
        setStudents(sRes.data.data);
        setMeta(sRes.data);
        setStats(statRes.data);
      } finally {
        setLoading(false);
      }
    };
    const timeout = setTimeout(fetch, 400);
    return () => clearTimeout(timeout);
  }, [search, page]);

  const statusBadge = (s) => {
    const map = { Active: 'bg-green-100 text-green-700', Inactive: 'bg-yellow-100 text-yellow-700', Graduated: 'bg-blue-100 text-blue-700', Dropped: 'bg-red-100 text-red-700' };
    return <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${map[s] || ''}`}>{s}</span>;
  };

  return (
    <div className="space-y-6">
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard icon="👩‍🎓" label="Total Students" value={stats.total} color="border-blue-500" />
          <StatCard icon="✅" label="Active" value={stats.active} color="border-green-500" />
          <StatCard icon="🎓" label="Graduated" value={stats.graduated} color="border-purple-500" />
          <StatCard icon="❌" label="Dropped" value={stats.dropped} color="border-red-500" />
        </div>
      )}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <h2 className="font-bold text-slate-800">Student Records</h2>
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="🔍 Search by name, ID, email..."
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-72"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {['Student ID','Name','Course','Year','Gender','Status','Enrolled'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={7} className="py-8 text-center text-slate-400">Loading...</td></tr>
              ) : students.length === 0 ? (
                <tr><td colSpan={7} className="py-8 text-center text-slate-400">No students found</td></tr>
              ) : students.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-slate-500">{s.student_id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xs font-bold">
                        {s.first_name?.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-800">{s.first_name} {s.last_name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{s.course}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 text-center">{s.year_level}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{s.gender}</td>
                  <td className="px-4 py-3">{statusBadge(s.status)}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{new Date(s.enrollment_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {meta && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
            <span>Showing {meta.from}–{meta.to} of {meta.total} students</span>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">← Prev</button>
              <span className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-medium">{page}</span>
              <button onClick={() => setPage(p => p + 1)} disabled={page >= meta.last_page} className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Next →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CoursesTab() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courses').then(r => { setCourses(r.data); setLoading(false); });
  }, []);

  if (loading) return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map(c => {
        const pct = Math.round((c.enrolled_students / c.max_students) * 100);
        const bgMap = { CIT: 'from-blue-500 to-indigo-500', COE: 'from-orange-400 to-rose-500', COEd: 'from-green-400 to-teal-500', CBA: 'from-yellow-400 to-orange-500', CN: 'from-pink-400 to-red-500', CAS: 'from-purple-400 to-violet-500', CC: 'from-slate-400 to-slate-600' };
        const bg = bgMap[c.department] || 'from-slate-400 to-slate-600';
        return (
          <div key={c.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className={`bg-gradient-to-r ${bg} p-5 text-white`}>
              <p className="text-2xl font-black">{c.code}</p>
              <p className="text-white/80 text-sm mt-1 leading-snug">{c.name}</p>
            </div>
            <div className="p-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>{c.department} Department</span>
                <span>{c.enrolled_students}/{c.max_students}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className={`h-2 rounded-full bg-gradient-to-r ${bg}`} style={{ width: `${pct}%` }}></div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-slate-400">{c.units} units</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{c.status}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/summary')
      .then(r => { setSummary(r.data); setSummaryLoading(false); })
      .catch(() => setSummaryLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
              <p className="text-slate-500 text-sm mt-1">Welcome back! Here's what's happening at Skye Academic.</p>
            </div>
            {summaryLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <StatCard icon="👥" label="Total Students" value={summary?.total_students} color="border-blue-500" />
                <StatCard icon="✅" label="Active" value={summary?.active_students} color="border-green-500" />
                <StatCard icon="📚" label="Courses" value={summary?.total_courses} color="border-purple-500" />
                <StatCard icon="✔️" label="Active Courses" value={summary?.active_courses} color="border-indigo-500" />
                <StatCard icon="📅" label="School Days" value={summary?.school_days} color="border-orange-500" />
                <StatCard icon="📈" label="Avg Attendance" value={summary?.avg_attendance} color="border-teal-500" subtitle="%" />
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-slate-800 text-lg mb-1">📊 Enrollment Trends</h2>
                <EnrollmentChart />
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-slate-800 text-lg mb-1">🍩 Course Distribution</h2>
                <CourseDistributionChart />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-slate-800 text-lg mb-1">📈 Attendance Trends</h2>
              <AttendanceChart />
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Student Records</h2>
              <p className="text-slate-500 text-sm mt-1">Manage and view all enrolled students.</p>
            </div>
            <StudentsTab />
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Courses Offered</h2>
              <p className="text-slate-500 text-sm mt-1">All courses across departments.</p>
            </div>
            <CoursesTab />
          </div>
        )}

        {activeTab === 'weather' && (
          <div className="space-y-4 max-w-2xl">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">🌤 Weather Forecast</h2>
              <p className="text-slate-500 text-sm mt-1">Real-time weather powered by OpenWeatherMap.</p>
            </div>
            <WeatherWidget />
          </div>
        )}

      </main>
    </div>
  );
}