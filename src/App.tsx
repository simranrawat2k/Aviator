import React, { useEffect, useState } from "react";
import Header from "./component/Header";
import Main from "./component/Main";
import MovingDots from "./component/Demo";
import AudioPlayer from "./component/AudioPlayer";
import { BalanceProvider } from "./context/BalanceContext";
import { GameProvider } from "./context/GameContext";
import AuthPage from "./component/AuthPage";
import FullLoader from "./component/FullLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider, useUser } from "./context/UserContext";

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const checkSession = () => {
    const sessionData = sessionStorage.getItem("userSession");

    if (sessionData) {
      const { user, expiry } = JSON.parse(sessionData);
      if (Date.now() > expiry) {
        sessionStorage.removeItem("userSession"); // Expired, clear session
        return null; // No active session
      }
      return user; // Valid session
    }
    return null;
  };

  //call verify API after 10 seconds
  // useEffect(() => {
  //   const checkUserStatus = async () => {
  //     const storedUser = localStorage.getItem("verifyUser");

  //     if (!storedUser) return;

  //     const { username, uniqueid } = JSON.parse(storedUser);

  //     try {
  //       const response = await fetch(
  //         `https://silverexch24.com/single_user_check_api?UserName=${username}&uniqueid=${uniqueid}`
  //       );
  //       const data = await response.json();
  //       console.log("User Status Check:", data);

  //       if (data.flag !== 0) {
  //         localStorage.removeItem("verifyUser");
  //         handleLogout();
  //       }
  //     } catch (error) {
  //       console.error("Error checking user status:", error);
  //     }
  //   };

  //   // Run check every 10 seconds
  //   const intervalId = setInterval(checkUserStatus, 10000);

  //   return () => clearInterval(intervalId); // Cleanup interval on unmount
  // }, []);

    // Function to get query parameters from URL
    const getQueryParams = (param: string): string | null => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    };
  
    useEffect(() => {
      // Extract token from URL
      const token = getQueryParams("token");
      if (token) {
        const [userName, userId] = token.split("@");
        console.log("userName and userId", userName, userId)
  
        // Check if both values exist
        if (userName && userId) {
          // setUser({ userName, userId }); // Save to UserContext
          console.log("userName", userName, "id", userId)
          setIsAuthenticated(true); // Mark as authenticated
        }
      }else{
        setIsAuthenticated(false);
      }
    }, []);


  useEffect(() => {
    // Check session when app loads
    const user = checkSession();
    if (user) {
      setIsAuthenticated(true);
      setUser(user); // Set user data from session
    }
  }, []);

  const toggleAudio = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleLogout = () => {
    // Remove the session data
    sessionStorage.removeItem("userSession");
    setIsAuthenticated(false); // Show login page
    localStorage.removeItem("verifyUser");
    setUser(null); // Reset user context
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <UserProvider>
        <GameProvider>
          <BalanceProvider>
            {loading ? (
              <FullLoader />
            ) : isAuthenticated ? (
              <>
                <AudioPlayer isPlaying={isPlaying} />
                <Header
                  toggleAudio={toggleAudio}
                  isPlaying={isPlaying}
                  onLogout={handleLogout}
                />
                <Main />
              </>
            ) : (
              <AuthPage
                setIsAuthenticated={setIsAuthenticated}
                setLoading={setLoading}
              />
            )}
          </BalanceProvider>
        </GameProvider>
      </UserProvider>
    </>
  );
}

export default App;
