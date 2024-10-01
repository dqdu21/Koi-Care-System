import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSider } from '../../app/context/SiderProvider';
import { useAuth } from '../../routes/AuthContext'; // Adjust the import path as needed
import { Menu, Search, ShoppingCart, User } from 'lucide-react';

const AppHeader: React.FC = () => {
  const { toggleSider } = useSider();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="flex justify-between items-center w-full bg-white shadow-md">
      <div className="flex items-center w-1/2">
        <button
          onClick={toggleSider}
          className="p-2 rounded-r bg-red-800 text-white hover:bg-red-700 transition-colors"
        >
          <Menu size={48} />
        </button>
        <div className="w-24 ml-4">
          <img
            src="https://cdn.discordapp.com/attachments/739929914609762425/1282608405969768500/FKoi_1.png?ex=66fba929&is=66fa57a9&hm=4b68d0d81f82c123f8641877f5e4be9255f7a4314a9ccc4f3a067c82744922a7&"
            alt="FKoi Shop"
            className="w-full h-auto"
          />
        </div>
        <div className="flex-grow max-w-xs ml-4 relative">
          <input
            type="text"
            placeholder="Tìm kiếm cá Koi, đồ ăn..."
            className="w-full py-1 px-3 pr-8 text-sm rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-800 focus:border-transparent"
          />
          <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
      </div>
      
      <div className="flex items-center space-x-4 pr-4">
        <button className="p-2 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
          <ShoppingCart size={24} />
        </button>
        {isLoggedIn ? (
          <>
            <button className="p-2 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
              <User size={24} />
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="px-4 py-2 rounded bg-red-800 text-white text-base font-medium hover:bg-red-700 transition-colors"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/sign-in')}
              className="px-4 py-2 rounded bg-red-800 text-white text-base font-medium hover:bg-red-700 transition-colors"
            >
              Đăng nhập
            </button>
            <button
              onClick={() => navigate('/sign-up')}
              className="px-4 py-2 rounded border-2 border-red-800 text-red-800 text-base font-medium hover:bg-red-800 hover:text-white transition-colors"
            >
              Đăng ký
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AppHeader;