import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import trialReducer from './slices/trialSlice';
import colorReducer from './slices/colorSlice';
import orientationReducer from './slices/orientationSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    trial: trialReducer,
    color: colorReducer,
    orientation: orientationReducer
  },
})