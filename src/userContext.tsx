import React, { useState } from 'react';

type UserContextType = { 
    user: { username: string; firstName: string; lastName: string; }; 
    setUser: React.Dispatch<React.SetStateAction<{ username: string; firstName: string; lastName: string; }>>; 
}

const userContext = React.createContext<UserContextType | undefined>(undefined!);

const UserProvider: React.FC = ({children}) => {
    const [user, setUser] = useState({
        username: '',
        firstName: '',
        lastName: '',
    });
    return <userContext.Provider value={{user, setUser}}>{children}</userContext.Provider>
}

export {
    UserProvider
}

export default userContext;