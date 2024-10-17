import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubscriptionState {
  subscribedCourses: string[];
}

const initialState: SubscriptionState = {
  subscribedCourses: [],
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    toggleSubscription(state, action: PayloadAction<string>) {
      const courseId = action.payload;
      
      if (state.subscribedCourses.includes(courseId)) {
        state.subscribedCourses = state.subscribedCourses.filter(id => id !== courseId);
      } else {
        state.subscribedCourses.push(courseId);
      }

    },
  },
});

export const { toggleSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
