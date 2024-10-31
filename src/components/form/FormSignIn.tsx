import { Button, Checkbox, Form, Input, notification } from "antd";
import { useState, createContext, useContext, useEffect } from "react";
import { login as loginService, getCurrentLogin, fetchUserRole } from "../../services/authService";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { User } from "../../models/Types";
import { useNavigate } from "react-router-dom";

// Tạo AuthContext
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  // Kiểm tra token khi app khởi chạy
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData)); // Phục hồi thông tin user từ localStorage
    }
  }, []);

  // Hàm đăng nhập
  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


const FormSignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [isRemembered, setIsRemembered] = useState(false);
  const { login } = useAuth(); // Lấy hàm login từ AuthContext

  const handleCheckboxChange = (e: any) => {
    setIsRemembered(e.target.checked);
  };

  

  const handleLogin = async (values: { email: string; password: string, role: string }) => {
    try {
      setLoading(true);
      const token = await loginService(values.email, values.password, values.role); // Call the login API
      if (token) {
        const user: User = await getCurrentLogin(token); // Fetch user info with the token
        if (user?.data) {
          login(token, user); 
          notification.success({
            message: "Login Successful",
          });
        }
        }
            if (values.email === "ADMIN1@gmail.com") {
              navigate("/admin-page");
            } else if (values.email === "shop@gmail.com") {
              navigate("/shop-page");
            } else {
              navigate("/user-page");
            }
        
      
        
    } catch (error: any) {
      notification.error({
        message: "Login Failed",
        description: error.message || "Invalid email or password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="relative">
      <Form onFinish={handleLogin}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Email is required!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input
            className="text-sm"
            size="large"
            placeholder="Email address"
            prefix={<i className="fa-solid fa-envelope"></i>}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password is required!" }]}
        >
          <Input.Password
            className="text-sm"
            size="large"
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            prefix={<i className="fa-solid fa-key"></i>}
          />
        </Form.Item>
        <div className="flex items-center justify-between">
          <Checkbox checked={isRemembered} onChange={handleCheckboxChange}>
            Remember me
          </Checkbox>
          <a
            href="/forgot-password"
            className="text-primary hover:text-primary-600 focus:text-primary-600 active:text-primary-700 transition duration-150 ease-in-out"
          >
            Forgot password?
          </a>
        </div>
        <br />
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            className="mb-4 w-full bg-red-500 text-white hover:bg-black hover:text-white"
            loading={loading}
          >
            Sign In
          </Button>

          <p className="mb-0 text-sm font-semibold">
            Don't have an account?{" "}
            <a href="sign-up" className="text-red-500">
              Sign Up
            </a>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

// Bọc FormSignIn bằng AuthProvider
const WrappedFormSignIn = () => (
  <AuthProvider>
    <FormSignIn />
  </AuthProvider>
);

export default WrappedFormSignIn;
