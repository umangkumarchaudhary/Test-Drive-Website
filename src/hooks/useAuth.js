import { useState, useEffect, useContext, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const validUsers = [
        'sidharth', 'Umang', 'Harsh', 'Shefali jain', 'Aditya',
        'Ajinkya', 'amogh', 'nidhi', 'imaad', 'Anmol',
        'Vaibhav', 'Sanket', 'Durgesh'
    ];

    const login = (username) => {
        if (validUsers.includes(username)) {
            setUser(username);
            localStorage.setItem('user', username);
            return true; // Return true if login is successful
        } else {
            return false; // Return false if login fails
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
