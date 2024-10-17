import {
  User,
  UserData,
  UserSearchRequest,
  UserSearchResponse,
} from "../models/Types"; // Import types and interfaces from models/Types
import { axiosInstance } from "./axiosInstance";

//--------------------------------- Get Users (Admin) ------------------------------------------
export const getUsers = async (
  requestData: UserSearchRequest
): Promise<UserSearchResponse> => {
  try {
    const response = await axiosInstance.post<UserSearchResponse>(
      '/account/get-all-account',
      requestData
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
//-----------------------------------------------------------------------------------------------

//------------------------------ Get User Detail ------------------------------------------------
export const getUserDetail = async (userId: string): Promise<UserData> => {
  try {
    const response = await axiosInstance.get(`/api/users/${userId}`);
    const userData: UserData = response.data.data;

    if (userData) {
      return userData;
    } else {
      throw new Error("User data not found");
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "An unknown error occurred";
    throw new Error(errorMessage);
  }
};

//-----------------------------------------------------------------------------------------------

//--------------------------------- Delete User (Admin) -----------------------------------------
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/account/delete-account/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
//-----------------------------------------------------------------------------------------------

//----------------------------------Create User (Public)-----------------------------------------
export const createUser = async (userData: {
  name: string;
  password: string;
  email: string;
  role?: string;
}): Promise<UserData> => {
  try {
    const response = await axiosInstance.post(
      '/api/users/create',
      userData,
    );

    const newUser: UserData = response.data.data; // Assuming response structure matches UserData
    console.log("Created user:", newUser);

    return newUser; // Return created user data if successful
  } catch (error: any) {
    if (error.response) {
      console.error("Create user failed", error.response.data); // Handle error if create fails
      console.error("Status", error.response.status);
      console.error("Headers", error.response.headers);
    } else if (error.request) {
      console.error("No response", error.request); // Handle error if no response
    } else {
      console.error("Fail", error.message); // Handle other errors
    }
    throw new Error(error.message);
  }
};
//-----------------------------------------------------------------------------------------------

//---------------------------------Register User (Public)----------------------------------------
export const registerUser = async (userData: Partial<User["data"]>) => {
  try {
    const res = await axiosInstance.post<User>(
      '/account/register',
      userData,
    );
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data)
      throw new Error(error.response.data.message);
  }
};
//--------------------------------------------------------------------------------------------

//-------------------------------- Update User -----------------------------------------------
export const updateUser = async (
  userId: string,
  updatedUserData: Partial<UserData>,
) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/${userId}`,
      updatedUserData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const updatedUser: UserData = response.data.data;
    return updatedUser;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
//---------------------------------------------------------------------------------------------

//-------------------------------- Change Status User (Admin) ---------------------------------------
export const toggleUserStatus = async (
  user_id: string,
  status: boolean,
): Promise<void> => {
  const url = '/api/users/change-status';

  await axiosInstance.put(
    url,
    { user_id, status },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

//---------------------------------------------------------------------------------------------

export const createUserAPI = async (userData: Partial<User["data"]>) => {
  try {
    console.log("Sending user data to create:", userData);

    const res = await axiosInstance.post(
      '/api/users/create',
      userData,
    );

    console.log("User created successfully:", res.data.data);
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const changeRoleAPI = async (userId: string, role: string) => {
  try {
    const res = await axiosInstance.put('/api/users/change-role', {
      user_id: userId,
      role: role,
    });
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};

export const reviewInstructorAPI = async (
  user_id: string,
  status: string,
  comment: string,
) => {
  try {
    const res = await axiosInstance.put(
      '/api/users/review-profile-instructor',
      { user_id, status, comment },
    );

    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};

export const changePasswordAPI = async (
  user_id: string,
  old_password: string,
  new_password: string,
) => {
  try {
    const res = await axiosInstance.put(
      '/api/users/change-password',
      { user_id, old_password, new_password },
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
