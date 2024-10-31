import { axiosInstance } from "./axiosInstance";
import { User } from "../models/Types";

// Helper function for handling errors
const handleAuthError = (error: any) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  return error.message;
};

export const login = async (email: string, password: string, role: string): Promise<string> => {
  try {
    const response = await axiosInstance.post("/account/login", { email, password, role });
    const token = response.data.token || response.data.accessToken || response.data.data?.token;
    if (token) {
      sessionStorage.setItem("token", token);
      return token;
    }
    throw new Error("Token not found in response!");
  } catch (error) {
    throw new Error(handleAuthError(error));
  }
};

export const getCurrentLogin = async (token: string): Promise<User> => {
  try {
    const res = await axiosInstance.get("/account/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = res.data;
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      return user;
    }
    throw new Error("Cannot get user data!");
  } catch (error) {
    throw new Error(handleAuthError(error));
  }
};

export const fetchUserRole = async (token: string) => {
  try {
    const response = await axiosInstance.get(
      "https://carekoisystem-chb5b3gdaqfwanfr.canadacentral-01.azurewebsites.net/account/get-profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data?.data?.role; // Trả về role từ response
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw new Error("Unable to fetch user role.");
  }
};

export const logout = async (): Promise<void> => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Token not found!");

    await axiosInstance.get("/account/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userRole");
  } catch (error) {
    throw new Error(handleAuthError(error));
  }
};
