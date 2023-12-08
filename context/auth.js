import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/** @typedef {{role: string, name: string}} User */
/** @typedef {{user?: User, signIn(user: unknown): Promise<void>, signOut(): Promise<void>}} AuthState */

/** @type {React.Context<AuthState>} */
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const loadUserFromStorage = async () => {
            try {
                const userJson = await AsyncStorage.getItem('user');
                if (userJson) {
                    const user = JSON.parse(userJson);
                    setUser(user);
                }
            } catch (error) {
                console.error('Error loading user from AsyncStorage', error);
            }
        };

        loadUserFromStorage();
    }, []);

    // Define signIn and signOut functions
    const signIn = async (user) => {
        try {
            // Save user data to AsyncStorage
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        } catch (error) {
            console.error('Error saving user to AsyncStorage', error);
        }
    };

    const signOut = async () => {
        try {
            // Remove user data from AsyncStorage
            await AsyncStorage.removeItem('user');
            setUser(null);
        } catch (error) {
            console.error('Error removing user from AsyncStorage', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};