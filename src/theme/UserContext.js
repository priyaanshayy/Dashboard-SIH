import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from './firebase'; // Adjust the import paths as necessary
import { doc, getDoc } from 'firebase/firestore';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [chartColor, setChartColor] = useState('#1976d2'); // Default color

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (auth.currentUser) {
                    const userDoc = await getDoc(doc(db, 'admins', auth.currentUser.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setUserData(data);
                        const fetchedColor = data.color || '#1976d2'; // Default color if not set
                        setChartColor(fetchedColor);
                    } else {
                        console.error("No such document!");
                    }
                } else {
                    console.error("No authenticated user found!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ userData, chartColor }}>
            {children}
        </UserContext.Provider>
    );
};
