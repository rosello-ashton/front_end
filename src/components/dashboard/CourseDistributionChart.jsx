import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import api from '../../services/api';
import { InlineSpinner } from '../common/LoadingSpinner';

const COLORS = ['#3b82f6','#8b5cf6','#10b981','#f59e0b','#ef4444','#06b6d4','#ec4899','#84cc16','#f97316','#6366f1','#14b8a6','#a855f7','#22c55e','#eab308','#e11d48','#0ea5e9','#d946ef','#15803d','#b45309','#7c3aed'];
const RADIAN = Math.PI / 180;

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.03) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function CourseDistributionChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/dashboard/course-distribution')
      .then(r => { setData(r.data.map(item => ({ name: item.course, value: item.count }))); setLoading(false); })
      .catch(() => { setError('Failed to load course data'); setLoading(false); });
  }, []);

  if (loading) return <InlineSpinner />;
  if (error) return <p className="text-red-500 text-sm text-center py-4">{error}</p>;

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-500 mb-4">Students per course</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} label={renderLabel} outerRadius={110} dataKey="value">
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            formatter={(value, name) => [`${value} students`, name]}
          />
          <Legend formatter={(value) => <span className="text-xs text-slate-600">{value}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}