import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import api from '../../services/api';
import { InlineSpinner } from '../common/LoadingSpinner';

export default function AttendanceChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/dashboard/attendance-trends')
      .then(r => { setData(r.data); setLoading(false); })
      .catch(() => { setError('Failed to load attendance data'); setLoading(false); });
  }, []);

  if (loading) return <InlineSpinner />;
  if (error) return <p className="text-red-500 text-sm text-center py-4">{error}</p>;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-lg">
          <p className="font-semibold text-slate-700 mb-1">{label}</p>
          <p className="text-green-600 text-sm">Attendance: <b>{payload[0]?.value}%</b></p>
          <p className="text-slate-500 text-xs">School days: {payload[0]?.payload?.school_days}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-500 mb-4">Monthly average attendance rate</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={90} stroke="#10b981" strokeDasharray="5 5" label={{ value: '90%', fill: '#10b981', fontSize: 11 }} />
          <Line type="monotone" dataKey="avg_rate" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} activeDot={{ r: 7 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
