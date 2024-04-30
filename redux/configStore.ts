import { configureStore } from '@reduxjs/toolkit';
import ApplicationSlice from './ApplicationSlice';

export const ConfigStore = configureStore({
	reducer: {
		application: ApplicationSlice,
		// comments: commentsReducer,
		// users: usersReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof ConfigStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof ConfigStore.dispatch;
