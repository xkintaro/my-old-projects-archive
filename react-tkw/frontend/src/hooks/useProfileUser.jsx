import { useState, useEffect, useCallback } from "react";
import { getUserById } from "../api/user";

export default function useProfileUser(id) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        if (!id) {
            setLoading(false);
            setError("Kullanıcı ID'si bulunamadı.");
            return;
        }
        try {
            setLoading(true);
            setError(null);
            setUser(null);
            const profileUser = await getUserById(id);
            setUser(profileUser);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Kullanıcı bulunamadı.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { user, loading, error, refetch: fetchData };
}