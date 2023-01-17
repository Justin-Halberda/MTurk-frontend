import { createSlice } from '@reduxjs/toolkit'

export const colorSlice = createSlice({
  name: 'color',
  initialState: {
    correct: false,
    selected: "",
    selected_x: "",
    selected_y: "",
    changing_before: "",
    changing_after: "",
    changing_x: "",
    changing_y: "",
    colors_used: [] 
  },
  reducers: {
    setColor: (state, action) => {
      state.correct = action.payload.correct;
      state.selected = action.payload.selected;
      state.selected_x = action.payload.selected_x;
      state.selected_y = action.payload.selected_y;
      state.changing_before = action.payload.changing_before;
      state.changing_after = action.payload.changing_after;
      state.changing_x = action.payload.changing_x;
      state.changing_y = action.payload.changing_y;
      state.colors_used = action.payload.colors_used;
    },
  },
});

export const { setColor } = colorSlice.actions

export default colorSlice.reducer