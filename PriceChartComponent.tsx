'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getMarketChart } from '@/lib/api';

interface PriceChartComponentProps {
  cryptoId: string;
  days: string | number;
}

export default function PriceChartComponent({ cryptoId, days }: PriceChartComponentProps) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const data = await getMarketChart(cryptoId, days);
        const formattedData = data.prices.map((price: [number, number]) => ({
          time: new Date(price[0]).toLocaleDateString(),
          price: price[1],
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [cryptoId, days]);

  if (loading) {
    return (
      <div className="card h-96 flex items-center justify-center">
        <p className="text-slate-400">Loading chart...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
          />
          <YAxis 
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
            domain={['auto', 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '0.75rem',
              color: '#fff',
            }}
            formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Price']}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#f7931a"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
