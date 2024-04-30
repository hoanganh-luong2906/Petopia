import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../utils/Types';

export interface UserState {
	user: IUser;
	isLoggedIn: boolean;
}

const initialState: UserState = {
	user: {
		username: '',
		email: '',
		name: '',
		role: '',
	},
	isLoggedIn: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload;
			state.isLoggedIn = true;
		},
		logout: (state) => {
			state.user = initialState.user;
			state.isLoggedIn = false;
		},
		initData: (state, action: PayloadAction<UserState>) => {
			state.user = action.payload.user;
			state.isLoggedIn = action.payload.isLoggedIn;
		},
	},
});

export const { login, logout, initData } = userSlice.actions;

export default userSlice.reducer;
