import React, { createContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig'; // Adjust the import paths as necessary

export const ThemeContext = createContext({
    primary: '#5D87FF', // Default primary color
    secondary: '#49BEFF', // Default secondary color
    // Add other defaults as needed
});

export const ThemeProvider = ({ children }) => {
    const [themeColors, setThemeColors] = useState({
        primary: '#5D87FF',
        secondary: '#49BEFF',
        // Add default colors here
    });

    useEffect(() => {
        const fetchThemeColors = async () => {
            try {
                if (auth.currentUser) {
                    const userDoc = await getDoc(doc(db, 'admins', auth.currentUser.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        const colors = {
                            primary: data.colorPrimary || '#5D87FF',
                            secondary: data.colorSecondary || '#49BEFF',
                            // Add more colors as needed
                        };
                        setThemeColors(colors);
                    } else {
                        console.error("No such document!");
                    }
                } else {
                    console.error("No authenticated user found!");
                }
            } catch (error) {
                console.error("Error fetching theme colors:", error);
            }
        };

        fetchThemeColors();
    }, []);

    return (
        <ThemeContext.Provider value={themeColors}>
            {children}
        </ThemeContext.Provider>
    );
};
