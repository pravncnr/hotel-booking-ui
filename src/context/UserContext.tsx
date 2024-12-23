// src/context/UserContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
    userId: string;
    setUserId: (userId: string) => void;
    email: string;
    setEmail: (email: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    return (
        <UserContext.Provider value={{ userId, setUserId, email, setEmail }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
