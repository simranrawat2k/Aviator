import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface BalanceContextType {
  balance: number;
  addToBalance: (amount: number) => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(() => {
    const savedBalance = localStorage.getItem("balance");
    return savedBalance ? 500 : 1000;
  });

  useEffect(() => {
    localStorage.setItem("balance", balance.toFixed(2)); // Store as string with 2 decimal places
  }, [balance]);

  const addToBalance = (amount: number) => {
    setBalance((prev) => parseFloat((prev + amount).toFixed(2))); // Ensure 2 decimal places
  };

  return (
    <BalanceContext.Provider value={{ balance, addToBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = (): BalanceContextType => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
};
