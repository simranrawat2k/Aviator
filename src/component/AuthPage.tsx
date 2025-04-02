import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "react-toastify/dist/ReactToastify.css";
import aviatorImg from "../assets/aviator-logo.cafbd29233306bf7.svg";
import wheelImg from "../assets/bg-rotate-old-NCXaJEFI.svg";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../context/UserContext";
import { showToast } from "../utils/toast";

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body, html { overflow: hidden; }
`;

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
  width: 100vw;
  background-color: #101011;
  padding: 1rem;
  background-image: url(${wheelImg});
  background-size: 150%;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 500px) {
    background-size: 200%;
  }
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 1rem;
`;

const AuthBox = styled.div`
  background-color: #1b1c1d;
  padding: 2rem;
  border-radius: 2px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 350px;
  max-width: 90%;
  text-align: center;

  @media (max-width: 480px) {
    padding: 1.5rem;
    width: 100%;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledTextField = styled(TextField)`
  & label {
    color: #747474;
  }
  & label.Mui-focused {
    color: #747474;
  }
  & input {
    color: white;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #747474;
    }
    &:hover fieldset {
      border-color: #747474;
    }
    &.Mui-focused fieldset {
      border-color: #747474;
    }
  }
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  background-color: #e50539 !important;
  color: white;
  &:hover {
    background-color: #c00430;
  }
  width: 100%;
  margin-top: 1.5rem;
`;

const ToggleText = styled(Typography)`
  color: #747474;
  margin-top: 1.5rem;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

interface AuthPageProps {
  setIsAuthenticated: (auth: boolean) => void;
  setLoading: (loading: boolean) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({
  setIsAuthenticated,
  setLoading,
}) => {
  const { setUser } = useUser();
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      showToast("Enter User name or password", "error");
      return;
    }

    setLoading(true); // Show FullLoader

    try {
      const response = await fetch("https://silverexch24.com/login_api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ UserName: username, Password: password }),
      });

      const data = await response.json();
      console.log("Login API Response:", data);

      if (data.status === "success") {
        // Perform single user check
        const checkResponse = await fetch(
          `https://silverexch24.com/single_user_check_api?UserName=${username}&uniqueid=${data.uniqid}`
        );
        const checkData = await checkResponse.json();
        console.log("Single User Check API Response:", checkData);

        if (checkData.flag === 0) {
          showToast("Logged in successfully!", "success");

          const userResponse = await fetch(
            `https://silverexch24.com/users_api?UserName=${username}`
          );
          const userData = await userResponse.json();
          console.log("User Data API Response:", userData);

          if (userData.status === "success") {
            setUser(userData);
            setIsAuthenticated(true); // Show main app

            // Save uniqueId and username in localStorage
            localStorage.setItem(
              "verifyUser",
              JSON.stringify({ username, uniqueid: data.uniqid })
            );

            // Save data in session storage
            const sessionData = {
              user: userData,
              expiry: Date.now() + 1 * 60 * 1000, // Set expiry for 1 minute
            };
            sessionStorage.setItem("userSession", JSON.stringify(sessionData));
          } else {
            showToast("Failed to fetch user data.", "error");
          }
        } else {
          showToast("Can't login", "error");
        }
      } else {
        showToast(data.message || "Login failed!", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false); // Hide FullLoader
    }
  };

  useEffect(() => {
    localStorage.removeItem("verifyUser");
  }, []);

  return (
    <>
      <GlobalStyle />
      <AuthContainer>
        <Logo src={aviatorImg} alt="Aviator Logo" />
        <AuthBox>
          <Typography variant="h5" color="white" gutterBottom marginBottom={2}>
            {isSignUp ? "Sign Up" : "Login"}
          </Typography>
          <InputContainer>
            {/* User Name Input with Icon */}
            <StyledTextField
              label="User Name"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircleIcon style={{ color: "#747474" }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password Input with Visibility Toggle */}
            <StyledTextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ color: "#747474", padding: "0px" }}
                    >
                      {showPassword ? (
                        <VisibilityOff style={{ color: "#747474" }} />
                      ) : (
                        <Visibility style={{ color: "#747474" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password (Only for SignUp) */}
            {isSignUp && (
              <StyledTextField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        style={{ color: "#747474", padding: "0px" }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </InputContainer>
          <ButtonContainer>
            <StyledButton variant="contained" onClick={handleSubmit}>
              {isSignUp ? "Sign Up" : "Login"}
            </StyledButton>
          </ButtonContainer>
          <ToggleText
            onClick={() => {
              const phoneNumber = "911234567890"; // Replace with your default number
              const message = encodeURIComponent("Hello, I want to sign up!");
              window.open(
                `https://wa.me/${phoneNumber}?text=${message}`,
                "_blank"
              );
            }}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}

            {/* {isSignUp ? (
              "Already have an account? Login"
            ) : (
              <StyledButton variant="contained">Sign Up</StyledButton>
            )} */}
          </ToggleText>
        </AuthBox>
        {/* <ToastContainer /> */}
      </AuthContainer>
    </>
  );
};

export default AuthPage;
