import { useState, useEffect, useCallback } from "react";
import { getCurrentUser } from "../api/user";
import { useAuth } from "../contexts/AuthContext";

export default function useCurrentUser() {
    const { token } = useAuth();
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCurrentUser = useCallback(async () => {
        if (!token) {
            setCurrentUser(null);
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const me = await getCurrentUser(token);
            setCurrentUser(me);
        } catch (error) {
            setCurrentUser(null);
        } finally {
            setLoading(false);
        }
    }, [token]);
    useEffect(() => {
        fetchCurrentUser();
    }, [fetchCurrentUser]);

    return { currentUser, loading, refetch: fetchCurrentUser };
}