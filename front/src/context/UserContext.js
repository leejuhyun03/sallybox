// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// UserContext 생성
const UserContext = createContext();

// UserProvider 컴포넌트 정의
export function UserProvider({ children }) {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userNickName, setUserNickName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserContext.Provider value={{ userId, setUserId, userName, setUserName, userNickName, setUserNickName, isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
}

// useUser 훅 정의 - UserContext를 쉽게 사용하도록 하는 훅
export function useUser() {
  return useContext(UserContext);
}

