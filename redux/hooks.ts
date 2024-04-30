import { useDispatch, useSelector, useStore } from 'react-redux';
import type { RootDispatch, ConfigStore, RootState } from './configStore';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useRootDispatch = useDispatch.withTypes<RootDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<typeof ConfigStore>();
