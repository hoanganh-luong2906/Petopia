import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ApplicationState {
	isUpdateRequired: boolean;
}

const initialState: ApplicationState = {
	isUpdateRequired: false,
} as ApplicationState;

const applicationSlice = createSlice({
	name: 'application',
	initialState,
	reducers: {
		// Actions to touch the state from everywhere else in the application
		setIsUpdateRequired: (state, action: PayloadAction<boolean>) => {
			state.isUpdateRequired = action.payload;
		},
	},
});

export const { setIsUpdateRequired } = applicationSlice.actions;

export default applicationSlice.reducer;
