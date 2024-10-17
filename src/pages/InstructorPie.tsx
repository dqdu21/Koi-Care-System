import React from 'react';
import { Pie } from '@ant-design/charts';

const InstructorPie: React.FC = () => {
  const data = [
    {
      type: 'Sales',
      value: 27,
    },
    {
      type: 'Courses',
      value: 25,
    },
    {
      type: 'Purchased',
      value: 18,
    },
    {
      type: 'Followers',
      value: 15,
    },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{ type: 'element-active' }],
    responsive: true,
  };

  return (
    <div className="w-full h-96 md:h-400 lg:h-500">
      <Pie {...config} />
    </div>
  );
};

export default InstructorPie;
