// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { Category } from "../../../models/Category/index";
// import {
//   createCategoryAPI,
//   getCategoriesAPI,
//   deleteCategoryAPI,
//   updateCategoryAPI,
// } from "../../../services/categoryService";

// interface CategoryState {
//   categories: Category["pageData"];
//   loading: boolean;
//   error: string | null;
//   total: number,
// }

// const initialState: CategoryState = {
//   categories: [],
//   loading: false,
//   error: null,
//   total: 1,
// };

// export const createCategory = createAsyncThunk(
//   "category/createCategory",
//   async (
//     categoryData: Partial<Category["pageData"][number]>,
//     { rejectWithValue },
//   ) => {
//     try {
//       const res = await createCategoryAPI(categoryData);
//       return res;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

// export const getCategories = createAsyncThunk(
//   "category/getCategories",
//   async (searchKeyword: string, { rejectWithValue }) => {
//     try {
//       const res: Category = await getCategoriesAPI(searchKeyword);
//       return res.pageData;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

// export const deleteCategory = createAsyncThunk(
//   "category/deleteCategory",
//   async (categoryId: string, { rejectWithValue }) => {
//     try {
//       await deleteCategoryAPI(categoryId);
//       return categoryId;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

// export const updateCategory = createAsyncThunk(
//   "category/updateCategory",
//   async (
//     {
//       categoryId,
//       categoryData,
//     }: {
//       categoryId: string;
//       categoryData: Partial<Category["pageData"][number]>;
//     },
//     { rejectWithValue },
//   ) => {
//     try {
//       const res = await updateCategoryAPI(categoryId, categoryData);
//       return res;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

// const categorySlice = createSlice({
//   name: "category",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(
//         getCategories.fulfilled,
//         (state, action: PayloadAction<Category["pageData"]>) => {
//           state.categories = action.payload;
//         },
//       )
//       .addCase(
//         createCategory.fulfilled,
//         (state, action: PayloadAction<Category["pageData"][number]>) => {
//           state.categories.push(action.payload);
//         },
//       )
//       .addCase(
//         deleteCategory.fulfilled,
//         (state, action: PayloadAction<string>) => {
//           state.categories = state.categories.filter(
//             (category) => category._id !== action.payload,
//           );
//         },
//       )
//       .addCase(
//         updateCategory.fulfilled,
//         (state, action: PayloadAction<Category["pageData"][number]>) => {
//           const index = state.categories.findIndex(
//             (category) => category._id === action.payload._id,
//           );
//           if (index !== -1) {
//             state.categories[index] = action.payload;
//           }
//         },
//       );
//   },
// });

// export default categorySlice.reducer;