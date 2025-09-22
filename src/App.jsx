import React, { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check system preference on initial load
    useEffect(() => {
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            setDarkMode(false);
        }
        const fetchProfileData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_REACT_BACKEND_URL}/api/socials`
                );
                setProfileData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfileData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${
                darkMode ? "bg-black  text-white" : "bg-gray-50 text-gray-900"
            }`}
        >
            <div className="container mx-auto px-4 py-12 max-w-md">
                {/* Header with theme toggle */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">ConnectGrid</h1>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`p-2 rounded-full cursor-pointer ${
                            darkMode
                                ? "bg-gray-900 text-yellow-300"
                                : "bg-gray-200 text-gray-700"
                        }`}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative mb-4">
                        <div
                            className={`w-32 h-32 rounded-full overflow-hidden border-4 ${
                                darkMode ? "border-gray-700" : "border-white"
                            } shadow-lg`}
                        >
                            <img
                                src={profileData?.imageUrl}
                                alt={profileData.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div
                            className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center ${
                                darkMode ? "bg-gray-800" : "bg-white"
                            } shadow-md`}
                        >
                            <span className="text-xl">👋</span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-1">
                        {profileData.name}
                    </h2>
                    <p
                        className={`mb-4 text-center ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                    >
                        {profileData.title}
                    </p>
                    <p
                        className={`text-center ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                    >
                        {profileData.bio}
                    </p>
                </div>

                {/* Links Section */}
                <div className="space-y-4">
                    {profileData.links.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                                darkMode
                                    ? "bg-gray-800/30 hover:bg-gray-700"
                                    : "bg-white hover:bg-gray-100"
                            } shadow-xl`}
                        >
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">
                                    {link.icon}
                                </span>
                                <span className="font-medium">{link.name}</span>
                            </div>
                            <span
                                className={
                                    darkMode ? "text-gray-400" : "text-gray-500"
                                }
                            >
                                →
                            </span>
                        </a>
                    ))}
                </div>

                {/* Footer */}
                <footer className="mt-12 text-center">
                    <p
                        className={`text-sm ${
                            darkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                    >
                        © {new Date().getFullYear()} {profileData.name}. All
                        rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default App;

