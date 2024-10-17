import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  pageNum: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

const initialState: PaginationState = {
  pageNum: 1,
  pageSize: 10,
  totalItems: 0,
  totalPages: 0,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPageNum: (state, action: PayloadAction<number>) => {
      state.pageNum = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setTotalItems(state, action: PayloadAction<number>) {
      state.totalItems = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },    nextPage: (state) => {
      state.pageNum += 1;
    },
    prevPage: (state) => {
      if (state.pageNum > 1) {
        state.pageNum -= 1;
      }
    },
    resetPagination: () => initialState,
  },
});

export const { setPageNum, setPageSize, nextPage, setTotalItems, setTotalPages, prevPage, resetPagination } = paginationSlice.actions;

export default paginationSlice.reducer;