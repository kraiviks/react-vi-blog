import { configureStore } from '@reduxjs/toolkit';
import initialReducer from './reducers/initialSlice';

export const store = configureStore({
	reducer: {
		initial: initialReducer
	}
})