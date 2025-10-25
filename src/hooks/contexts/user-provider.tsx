import React, {type ReactNode, useCallback, useMemo, useState} from 'react';
import {UserContext, type UserContextProps} from './user-context';

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [contextValue, setContextValue] = useState<Partial<UserContextProps>>({
    userId: localStorage.getItem('userId') || '',
    username: localStorage.getItem('username') || '',
    userRole: localStorage.getItem('userRole') || '',
    profileImageUri: '',
  });

  const setUserContext = useCallback((data: Partial<UserContextProps>) => {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          localStorage.setItem(key, value as string);
        }
      });
      setContextValue((prev) => ({...prev, ...data}));
    }
  }, []);

  const value = useMemo(
    () => ({...contextValue, setUserContext}),
    [contextValue, setUserContext]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
