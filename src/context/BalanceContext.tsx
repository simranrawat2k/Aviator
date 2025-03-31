import React, { createContext, useState, useEffect, useContext } from "react";
import { useUI } from "./uiContext";
import { useUser } from "./UserContext";

// Define context type
interface BalanceContextType {
  amount: number;
  updateAmount: (newAmount: number) => void;
}

// Create Context
const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

// Provider Component
export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();  // Get user data from userContext
  const [amount, setAmount] = useState<number>(0);

  // Calculate initial amount when userData is available
  useEffect(() => {
    if (user) {
      const initialAmount =
        user.Exposure < 0
          ? (user.Balance || 0) - Math.abs(user.Exposure || 0)
          : user.Balance || 0;
      setAmount(initialAmount);
    }
  }, [user]);

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
