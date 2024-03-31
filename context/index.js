import { useContext, createContext } from 'react';

export const AppProvider = createContext(null);

export function AppContext() {
	return useContext(AppProvider);
}