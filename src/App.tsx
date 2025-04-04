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
import { showToast } from "./utils/toast";

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
  useEffect(() => {
    const checkUserStatus = async () => {
      const storedUser = localStorage.getItem("verifyUser");

      if (!storedUser) return;

      const { username, uniqueid } = JSON.parse(storedUser);

      try {
        const response = await fetch(
          `https://silverexch24.com/single_user_check_api?UserName=${username}&uniqueid=${uniqueid}`
        );
        const data = await response.json();
        // console.log("User Status Check:", data);

        if (data.flag !== 0) {
          localStorage.removeItem("verifyUser");
          handleLogout();
        }
      } catch (error) {
        console.error("Error checking user status:", error);
      }
    };

    // Run check every 10 seconds
    const intervalId = setInterval(checkUserStatus, 5000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

    // Function to get query parameters from URL
    const getQueryParams = (param: string): string | null => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    };
  
    useEffect(() => {
      const fetchUserData = async () => {
       
        // Extract token from URL
        const token = getQueryParams("token");
        console.log("Token found:", token);
    
        if (!token) {
          console.log("No token found. Redirecting to login...");
          setIsAuthenticated(false);
          return;
        }

        setLoading(true);
    
        const [userName, userId] = token.split("$");
        // console.log("Extracted User Name and ID:", userName, userId);
    
        // Validate extracted values
        if (!userName || !userId) {
          console.error("Invalid token format. Expected format: 'username$id'");
          setIsAuthenticated(false);
          return;
        }
    
        try {
          // Fetch user data from API
          const userResponse = await fetch(
            `https://silverexch24.com/users_api?UserName=${userName}`
          );
          const userData = await userResponse.json();
          console.log("User Data API Response:", userData);
    
          if (userData.status === "success") {
            setUser(userData); // Save user data to context
            setIsAuthenticated(true);
    
            // Save uniqueId and username in localStorage
            localStorage.setItem(
              "verifyUser",
              JSON.stringify({ username: userName, uniqueid: userId })
            );
    
            // Save session data
            const sessionData = {
              user: userData,
              expiry: Date.now() + 1 * 60 * 1000, // 1-minute expiry
            };
            sessionStorage.setItem("userSession", JSON.stringify(sessionData));
    
            console.log("User authenticated successfully.");
          } else {
            console.error("Failed to fetch user data. Invalid response.");
            showToast("Failed to fetch user data.", "error");
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          showToast("Network error while fetching user data.", "error");
          setIsAuthenticated(false);
        }finally {
          setLoading(false); // Hide loader after fetching (success or error)
        }
      };
    
      fetchUserData(); // Call the async function inside useEffect
    }, []); // Run only once when the component mounts
    


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
