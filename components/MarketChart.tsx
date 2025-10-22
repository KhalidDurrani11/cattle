
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from '../types';

interface MarketChartProps {
  data: ChartData[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/80 p-4 rounded-lg border border-gray-600 shadow-xl">
          <p className="label text-white font-bold">{`${label}`}</p>
          <p className="intro text-teal-400">{`Avg. Price : PKR ${payload[0].value.toLocaleString()}`}</p>
          <p className="desc text-blue-400">{`Demand : ${payload[1].value} units`}</p>
        </div>
      );
    }
  
    return null;
};
  

const MarketChart: React.FC<MarketChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 400 }}>
        <h3 className="text-xl font-bold text-white mb-4 text-center">Avg. Cattle Prices vs. Demand</h3>
        <ResponsiveContainer>
            <LineChart
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="name" stroke="#A0AEC0"/>
            <YAxis yAxisId="left" stroke="#38B2AC" />
            <YAxis yAxisId="right" orientation="right" stroke="#4299E1" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="price" stroke="#38B2AC" strokeWidth={2} name="Avg. Price (PKR)" dot={{ r: 4 }} activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="demand" stroke="#4299E1" strokeWidth={2} name="Demand (Units)" />
            </LineChart>
        </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;
