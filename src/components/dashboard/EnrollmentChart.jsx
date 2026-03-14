import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../services/api';
import { InlineSpinner } from '../common/LoadingSpinner';

export default function EnrollmentChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/dashboard/enrollment-trends')
      .then(r => { setData(r.data); setLoading(false); })
      .catch(() => { setError('Failed to load enrollment data'); setLoading(false); });
  }, []);

  if (loading) return <InlineSpinner />;
  if (error) return <p className="text-red-500 text-sm text-center py-4">{error}</p>;

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-500 mb-4">Monthly enrollment data</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} angle={-45} textAnchor="end" interval={0} />
          <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            formatter={(value) => [`${value} students`, 'Enrolled']}
          />
          <Bar dataKey="count" name="Students Enrolled" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}