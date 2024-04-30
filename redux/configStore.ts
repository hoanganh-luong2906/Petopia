import { configureStore } from '@reduxjs/toolkit';
import ApplicationSlice from './ApplicationSlice';
import UserSlice from './UserSlice';

export const ConfigStore = configureStore({
	reducer: {
		application: ApplicationSlice,
		user: UserSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof ConfigStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type RootDispatch = typeof ConfigStore.dispatch;
