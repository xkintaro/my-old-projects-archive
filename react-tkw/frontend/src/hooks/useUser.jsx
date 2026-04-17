import { useState, useEffect, useCallback } from "react";
import { getCurrentUser, getUserById } from "../api/user";

export default function useUser(id, token) {
    const [currentUser, setCurrentUser] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        setUser(null)

        if (token) {
            try {
                const me = await getCurrentUser(token);
                setCurrentUser(me);
            } catch (err) {
                setCurrentUser(null);
            }
        } else {
            setCurrentUser(null);
        }

        try {
            if (!id) {
                if (token) {
                    const me = await getCurrentUser(token);
                    setUser(me);
                }
            } else {
                const otherUser = await getUserById(id);
                setUser(otherUser);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Kullanıcı bulunamadı.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [id, token]);


    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { currentUser, user, loading, error, refetch: fetchData };
}