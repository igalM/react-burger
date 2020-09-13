import React, { useState } from 'react';

export const DrawerContext = React.createContext({
    showDrawer: false,
    isMobile: false,
    toggleDrawer: () => { }
});


export const DrawerProvider: React.FC = ({ children }) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const toggleDrawer = () => {
        setShowDrawer(!showDrawer);
        setIsMobile(!isMobile);
    }

    return <DrawerContext.Provider value={{ showDrawer, isMobile, toggleDrawer }}>
        {children}
    </DrawerContext.Provider>
}