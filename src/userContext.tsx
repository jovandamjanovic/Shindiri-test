import React, { useState } from "react";

type User = {
  username: string;
  firstName: string;
  lastName: string;
};

type UserContextType = {
  user: User;
  setUser: React.Dispatch<
    React.SetStateAction<User>
  >;
};

const userContext = React.createContext<UserContextType | undefined>(
  undefined!
);

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
  });
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export { UserProvider };

export type { User };

export default userContext;
