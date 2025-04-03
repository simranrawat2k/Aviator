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
  const [token, setToken] = useState<string | null>(null);


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

  useEffect(() => {
    const receiveAuthToken = (event: MessageEvent) => {
      // SECURITY CHECK: Ensure message is from the correct origin
      if (event.origin !== "https://fun-exchange.vercel.app") {
        console.warn("Unauthorized message origin:", event.origin);
        return;
      }
  
      const { token } = event.data as { token?: string }; // Explicitly define expected data structure
      if (token) {
        console.log("Token received:", token);
        setToken(token);
      }
    };
  
    // Listen for the message from the first website
    window.addEventListener("message", receiveAuthToken);
  
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("message", receiveAuthToken);
    };
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
                <Header toggleAudio={toggleAudio} isPlaying={isPlaying} onLogout={handleLogout}/>
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
