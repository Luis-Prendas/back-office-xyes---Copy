import { redirect, useRouter } from 'next/navigation';
import React, { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw 'bachaco';
    return context;
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const local = localStorage.getItem('access_token');

        if (!local) {
            setIsAuthenticated(false);
            router.push('/auth');
            /* redirect('/auth') */
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>;
};
