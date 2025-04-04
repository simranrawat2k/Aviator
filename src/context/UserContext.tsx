import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import FullLoader from "../component/FullLoader";

// Define the shape of user data
interface User {
  status: string;
  UserName: string;
  Balance: number;
  Exposure: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider Component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true); // Added checkingSession state

  // Load session data on mount
  useEffect(() => {
    const sessionData = sessionStorage.getItem("userSession");

    if (sessionData) {
      const { user, expiry } = JSON.parse(sessionData);
      if (Date.now() > expiry) {
        sessionStorage.removeItem("userSession"); // Expired session
        setUser(null);
      } else {
        setUser(user); // Valid session
      }
    }

    // Function to update session expiry time
    const extendSessionExpiry = () => {
      const sessionData = sessionStorage.getItem("userSession");
      if (sessionData) {
        const { user } = JSON.parse(sessionData);
        const updatedSessionData = {
          user,
          expiry: Date.now() + 1 * 60 * 1000, // Extend expiry by 1 minute
        };
        sessionStorage.setItem("userSession", JSON.stringify(updatedSessionData));
      }
    };

    // Add event listeners to extend session expiry
    const events = ["click", "keyup", "keydown"];
    events.forEach((event) => {
      window.addEventListener(event, extendSessionExpiry);
    });

    // Cleanup event listeners on component unmount
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, extendSessionExpiry);
      });
    };
  }, []);

  // Set checkingSession to false after session check is complete
  useEffect(() => {
    const sessionData = sessionStorage.getItem("userSession");
    if (sessionData) {
      const { user, expiry } = JSON.parse(sessionData);
      if (Date.now() > expiry) {
        sessionStorage.removeItem("userSession"); // Expired session
        setUser(null);
      } else {
        setUser(user); // Valid session
      }
    }
    setCheckingSession(false); // Set to false after checking session
  }, []);

  //fetch user Data in every 10 seconds
  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("verifyUser");
  
      if (!storedUser) return;
  
      const { username } = JSON.parse(storedUser);
  
      try {
        const response = await fetch(
          `https://silverexch24.com/users_api?UserName=${username}`
        );
        const data = await response.json();
        // console.log("User Data API Response:", data);
  
        if (data.status === "success") {
          setUser(data); // Always update the user, even if unchanged
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    // Fetch user data every 10 seconds
    const intervalId = setInterval(fetchUserData, 5000);
  
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);
  
  

  return (
    <>
      {checkingSession ? (
        <FullLoader /> // Show loader while session is being checked
      ) : (
        <UserContext.Provider value={{ user, setUser }}>
          {children}
        </UserContext.Provider>
      )}
    </>
  );
};

// Custom Hook to use the context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
