import React, { createContext, useState, useEffect, useContext } from "react";
import { useUI } from "./uiContext";

// Define context type
interface BalanceContextType {
  amount: number;
  updateAmount: (newAmount: number) => void;
}

// Create Context
const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

// Provider Component
export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userData } = useUI(); // Get user data from UIContext
  const [amount, setAmount] = useState<number>(0);

  // Calculate initial amount when userData is available
  useEffect(() => {
    if (userData) {
      const initialAmount =
        userData.Exposure < 0
          ? (userData.Balance || 0) - Math.abs(userData.Exposure || 0)
          : userData.Balance || 0;
      setAmount(initialAmount);
    }
  }, [userData]);

  // Function to update amount
  const updateAmount = (value: number) => {
    setAmount((prevAmount) => prevAmount + value);
  };

  return (
    <BalanceContext.Provider value={{ amount, updateAmount }}>
      {children}
    </BalanceContext.Provider>
  );
};

// Custom hook to use BalanceContext
export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
};
