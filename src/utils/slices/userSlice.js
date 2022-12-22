import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    age: 0,
    gender: "",
    race: ""
  },
  reducers: {
    setUser: (state, action) => {
      state.age = action.payload.age;
      state.gender = action.payload.gender;
      state.race = action.payload.race;
    },
  },
});

export const { setUser } = userSlice.actions

export default userSlice.reducer