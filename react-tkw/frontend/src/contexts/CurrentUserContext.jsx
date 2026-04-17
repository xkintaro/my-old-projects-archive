import { createContext, useContext } from "react";
import useCurrentUser from "../hooks/useCurrentUser";

const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
    const { currentUser, loading, refetch } = useCurrentUser();

    return (
        <CurrentUserContext.Provider value={{ currentUser, loading, refetch }}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export function useCurrentUserContext() {
    return useContext(CurrentUserContext);
}