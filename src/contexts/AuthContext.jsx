import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Create the context
const AuthContext = createContext();

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth().
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const recoveredUser = Cookies.get('user');
        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
        }
    }, []);

    const login = (user) => {
        setUser(user);
        Cookies.set('user', JSON.stringify(user), { expires: 7 }); // Set cookie for 7 days
    };

    const logout = () => {
        setUser(null);
        Cookies.remove('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook that wraps useContext and provides direct access to the auth context
export function useAuth() {
    return useContext(AuthContext);
}
