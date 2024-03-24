import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { Course } from '../types/Course';

const data = [
  { x: 4, y: 2.6, z: "Doody" },
  { x: 5, y: 4, z: "Doody" },
  { x: 3.5, y: 3.5, z: "Doody" },
  { x: 2, y: 2, z: "Doody" },
  { x: 2, y: 1.5, z: "Doody" },
  { x: 3, y: 1.755, z: "Doody" },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

type ChartProps = {
  isVisible: boolean;
  course: Course | undefined;
};

export const Chart: React.FC<ChartProps> = ({ isVisible, course }) => {
  return (
    <ScatterChart
      width={400}
      height={400}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid />
      <XAxis type="number" dataKey="x" name="ISQ Rating" unit="" />
      <YAxis type="number" dataKey="y" name="Average GPA" unit="" />
      <ZAxis type="string" dataKey="z" name="Instructor" unit="" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter name="A school" data={data} fill="#8884d8">
        {data.map((entry, index) => (
          <Cell key={`cell-${entry}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Scatter>
    </ScatterChart>
  );
};
