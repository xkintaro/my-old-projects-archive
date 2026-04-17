import { useState, useEffect } from "react";

function Test() {
    const [userData, setUserData] = useState({
        ip: "",
        device: "",
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
    });

    const fetchIP = async () => {
        try {
            const response = await fetch("https://api.ipify.org?format=json");
            const data = await response.json();
            setUserData((prevData) => ({ ...prevData, ip: data.ip }));
        } catch (error) {
            console.error("IP alınırken bir hata oluştu:", error);
        }
    };

    const getDeviceInfo = () => {
        const userAgent = navigator.userAgent;
        let device = "Bilinmiyor";
        if (/mobile/i.test(userAgent)) {
            device = "Mobil Cihaz";
        } else if (/tablet/i.test(userAgent)) {
            device = "Tablet";
        } else if (/desktop/i.test(userAgent)) {
            device = "Masaüstü";
        }
        return device;
    };

    useEffect(() => {
        fetchIP();
        setUserData((prevData) => ({ ...prevData, device: getDeviceInfo() }));

        const handleResize = () => {
            setUserData((prevData) => ({
                ...prevData,
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight
            }));
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div>
            <h1>Test Sayfası</h1>
            <p>IP Adresi: {userData.ip}</p>
            <p>Cihaz: {userData.device}</p>
            <p>Ekran Boyutu: {userData.screenWidth} x {userData.screenHeight}</p>
        </div>
    );
}

export default Test;
