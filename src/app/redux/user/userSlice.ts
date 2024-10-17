import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../models/Types";
import { changeRoleAPI, registerUser } from "../../../services/usersService";

interface UserState {
  users: User[];
  admin: User | null;
  roleFilter: string;
  statusFilter: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  admin: null,
  roleFilter: "",
  statusFilter: "",
  loading: false,
  error: null,
};

export const createAccount = createAsyncThunk(
  "user/registerUser",
  async (userData: Partial<User["data"]>, { rejectWithValue }) => {
    try {
      const data = await registerUser(userData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const changeUserRole = createAsyncThunk(
  "users/changeRole",
  async ({ userId, role }: { userId: string; role: string }, thunkAPI) => {
    try {
      const response = await changeRoleAPI(userId, role);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    filterRole(state, action: PayloadAction<string>) {
      state.roleFilter = action.payload;
    },
    filterStatus(state, action: PayloadAction<string>) {
      state.statusFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      createAccount.fulfilled,
      (state: UserState, action: PayloadAction<User | undefined>) => {
        if (action.payload) {
          state.users.push(action.payload);
        }
      },
    );
  },
});

export const { filterRole, filterStatus } = userSlice.actions;

export default userSlice.reducer;
