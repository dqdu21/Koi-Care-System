import React, { useEffect, useState } from 'react';
import { Pie } from '@ant-design/charts';
import { axiosInstance } from '../services/axiosInstance';

const InstructorPie: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [datax, setData] = useState({
    numberPond: 0,
    numberFish: 0,
    numberUser: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API để lấy tổng số hồ
        const pondsResponse = await axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/ponds/get-all-ponds');
        const totalPonds = pondsResponse.data.length; // Số lượng hồ

        // Gọi API để lấy tổng số cá
        const fishResponse = await axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/koifish/get-all-fish');
        const totalFish = fishResponse.data.length; // Số lượng cá

        // Gọi API để lấy tổng số người dùng
        const userResponse = await axiosInstance.get('https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/account/dash-board');
        const totalUser = userResponse.data.numberUser; // Số lượng người dùng

        // Cập nhật dữ liệu
        setData({
          numberPond: totalPonds,
          numberFish: totalFish,
          numberUser: totalUser,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const data = [
    {
      type: 'Ponds',
      value: datax.numberPond,
    },
    {
      type: 'Fishs',
      value: datax.numberFish,
    },
    {
      type: 'Users',
      value: datax.numberUser,
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

  if (loading) {
  }
  return (
    <div className="w-full h-96 md:h-400 lg:h-500">
      <Pie {...config} />
    </div>
  );
};

export default InstructorPie;
