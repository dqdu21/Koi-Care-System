import { axiosInstance } from "./axiosInstance";
import { User } from "../models/Types";

// Helper function for handling errors
const handleAuthError = (error: any) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  return error.message;
};

export const login = async (email: string, password: string): Promise<string> => {
  try {
    const response = await axiosInstance.post("/account/login", { email, password });
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

// export const loginViaGoogleAPI = async (credential: string): Promise<string> => {
//   try {
//     const res = await axiosInstance.post("/api/auth/google", { google_id: credential });
//     const token = res.data.token || res.data.accessToken || res.data.data?.token;
//     if (token) {
//       sessionStorage.setItem("token", token);
//       return token;
//     }
//     throw new Error("Invalid Google login response!");
//   } catch (error) {
//     throw new Error(handleAuthError(error));
//   }
// };

// export const registerViaGoogleAPI = async (
//   credential: string,
//   role: string,
//   description: string,
//   video: string,
//   phone_number: string
// ) => {
//   try {
//     const res = await axiosInstance.post("/api/users/google", {
//       google_id: credential,
//       role,
//       description,
//       video,
//       phone_number,
//     });
//     const user = res.data;
//     if (user) {
//       sessionStorage.setItem("user", JSON.stringify(user));
//       return user;
//     }
//     throw new Error("Invalid Google registration response!");
//   } catch (error) {
//     throw new Error(handleAuthError(error));
//   }
// };

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

// export const verifyEmailAPI = async (token: string): Promise<boolean> => {
//   try {
//     const res = await axiosInstance.post("/api/auth/verify-token", { token });
//     return res.data.success;
//   } catch (error) {
//     throw new Error(handleAuthError(error));
//   }
// };

// export const resendEmailAPI = async (email: string): Promise<boolean> => {
//   try {
//     const res = await axiosInstance.post("/api/auth/resend-token", { email });
//     return res.data.success;
//   } catch (error) {
//     throw new Error(handleAuthError(error));
//   }
// };

// export const forgotPassAPI = async (email: string): Promise<boolean> => {
//   try {
//     const res = await axiosInstance.put("/api/auth/forgot-password", { email });
//     return res.data.success;
//   } catch (error) {
//     throw new Error(handleAuthError(error));
//   }
// };

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
