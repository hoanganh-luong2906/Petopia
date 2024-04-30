import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, ConfigStore, RootState } from './configStore';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<typeof ConfigStore>();
