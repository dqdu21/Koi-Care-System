import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SigninPage from '../pages/SigninPage';
import SignupPage from '../pages/SignupPage';
import UserPage from '../pages/user/UserPage'; 
import UserPonds from '../pages/user/UserPonds';
import FishManagement from '../pages/user/UserFish';
import AdminPage from '../pages/admin/AdminPage';
import ShopPage from '../pages/shop/ShopPage';
import AdminPonds from '../pages/admin/AdminPonds';
import AdminFish from '../pages/admin/AdminFish';
import ShopItems from '../pages/shop/ShopItems';
import Shopping from '../pages/shop/Shopping';
import UserTicket from '../pages/user/UserTicket';




const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="sign-in" element={<SigninPage />} />
        <Route path="sign-up" element={<SignupPage />} />
        <Route path="user-page" element={<UserPage />} />
        <Route path="pond" element={<UserPonds />} />
        <Route path="ticket" element={<UserTicket />} />
        <Route path="fish" element={<FishManagement />} />
        <Route path="admin-page" element={<AdminPage />} />
        <Route path="admin-pond" element={<AdminPonds />} />
        <Route path="admin-fish" element={<AdminFish />} />
        <Route path="shop-page" element={<ShopPage />} />
        <Route path="shop-item" element={<ShopItems />} />
        <Route path="shopping" element={<Shopping />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
