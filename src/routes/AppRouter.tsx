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
import ShopTicket from '../pages/shop/ShopTicket';
import Profile from '../pages/Profile';
import AdminAccount from '../pages/admin/AdminAccount';
import AdminTicket from '../pages/admin/AdminTicket';


// interface ProtectedRouteProps {
//   element: JSX.Element;
//   allowedRoles?: string[];
// }


// const ProtectedRoute = ({ element, allowedRoles }: ProtectedRouteProps) => {
//   const storedUser: any = sessionStorage.getItem("user");
//   if (!storedUser) {
//     return <Navigate to="/sign-in" replace />;
//   }
//   const user = JSON.parse(storedUser);

//   if (!user) {
//     return <Navigate to="/sign-in" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.data.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return element;
// };

  // const ProtectedRoute = ({ element, allowedRoles }: ProtectedRouteProps) => {
  //   const storedUser: any = sessionStorage.getItem("user");

  //   // Redirect to sign-in if there's no stored user data
  //   if (!storedUser) {
  //     return <Navigate to="/sign-in" replace />;
  //   }

  //   let user;
  //   try {
  //     user = JSON.parse(storedUser);
  //   } catch (error) {
  //     console.error("Failed to parse user data:", error);
  //     return <Navigate to="/sign-in" replace />;
  //   }

  //   // Redirect if user data is incomplete or role is missing
  //   if (!user || !user.data || !user.data.role) {
  //     return <Navigate to="/sign-in" replace />;
  //   }

  //   // Check if the user role is in the allowedRoles list
  //   if (allowedRoles && !allowedRoles.includes(user.data.role)) {
  //     return <Navigate to="/" replace />;
  //   }

  //   return element;
  // };



const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="sign-in" element={<SigninPage />} />
        <Route path="sign-up" element={<SignupPage />} />
        <Route path="profile" element={<Profile />} />

        {/* user */}

        <Route path="user-page" element={<UserPage />} />
        <Route path="pond" element={<UserPonds />} />
        <Route path="ticket" element={<UserTicket />} />
        <Route path="fish" element={<FishManagement />} />



        {/* <Route path="admin-page" element={<ProtectedRoute
                  element={<AdminPage />}
                  allowedRoles={["ADMIN"]}
                />} /> */}
        <Route path="admin-page" element={<AdminPage />}/>
        <Route path="admin-pond" element={<AdminPonds />} />
        <Route path="admin-fish" element={<AdminFish />} />
        <Route path="admin-account" element={<AdminAccount />} />
        <Route path="admin-ticket" element={<AdminTicket />} />

          {/* shop */}

        <Route path="shop-page" element={<ShopPage />} />
        <Route path="shop-item" element={<ShopItems />} />
        <Route path="shopping" element={<Shopping />} />
        <Route path="shop-ticket" element={<ShopTicket />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
