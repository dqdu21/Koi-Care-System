import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSider } from '../../app/context/SiderProvider';
import { Menu, Search, ShoppingCart, User } from 'lucide-react';

const AppHeader: React.FC = () => {
  const { toggleSider } = useSider();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Kiểm tra trạng thái đăng nhập dựa trên token từ localStorage
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token); // Cập nhật trạng thái đăng nhập dựa trên việc có token hay không
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token'); // Xoá token khỏi localStorage
    setIsLoggedIn(false); // Cập nhật trạng thái đăng xuất
    navigate('/'); // Điều hướng về trang chủ
  };

  return (
    <div className="flex justify-between items-center w-full bg-white shadow-md ">
      {/* Logo và Menu */}
      <div className="flex items-center">
        <button
          onClick={toggleSider}
          className="p-2 rounded-r bg-red-800 text-white hover:bg-red-700 transition-colors"
        >
          <Menu size={48} />
        </button>
        <div className="w-24 ml-4">
          <img
            src="https://media.discordapp.net/attachments/739929914609762425/1282608405969768500/FKoi_1.png?ex=67101869&is=670ec6e9&hm=89684d0acd916f5a4ce568e942418110bb139e1258e75aa9973feda875b80a9b&=&format=webp&quality=lossless&width=1203&height=441"
            alt="FKoi Shop"
            className="w-full h-auto"
          />
        </div>
        {/* Thanh tìm kiếm */}
        <div className="flex-grow max-w-xs ml-4 relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-1 px-3 pr-8 text-sm rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-800 focus:border-transparent"
          />
          <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
      </div>

      {/* Khu vực người dùng và giỏ hàng */}
      <div className="flex items-center space-x-4 pr-4">
        <button className="p-2 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
        onClick={() => navigate('/shopping')}>
          <ShoppingCart size={24} />
        </button>
        {isLoggedIn ? (
          <>
            {/* Nút Profile */}
            <button
              className="p-2 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              onClick={() => navigate('/profile')} // Điều hướng đến trang profile
            >
              <User size={24} />
            </button>
            {/* Nút Đăng xuất */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded bg-red-800 text-white text-base font-medium hover:bg-red-700 transition-colors"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            {/* Nút Đăng nhập */}
            <button
              onClick={() => navigate('/sign-in')}
              className="px-4 py-2 rounded bg-red-800 text-white text-base font-medium hover:bg-red-700 transition-colors"
            >
              Sign in
            </button>
            {/* Nút Đăng ký */}
            <button
              onClick={() => navigate('/sign-up')}
              className="px-4 py-2 rounded border-2 border-red-800 text-red-800 text-base font-medium hover:bg-red-800 hover:text-white transition-colors"
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AppHeader;
