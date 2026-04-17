import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import useProfileUser from "../hooks/useProfileUser";

const UserContext = createContext();

export function UserProvider({ children }) {
  const { id } = useParams();

  const profileUserData = useProfileUser(id);

  return (
    <UserContext.Provider value={profileUserData}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}