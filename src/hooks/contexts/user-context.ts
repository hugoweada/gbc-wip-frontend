import {createContext, useContext} from 'react';

export interface UserContextProps {
  userId?: string;
  username?: string;
  userRole?: string;
  profileImageUri?: string;
  setUserContext: (data: Partial<UserContextProps>) => void;
}

export const UserContext = createContext<UserContextProps | null>(null);

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }

  return context;
};
