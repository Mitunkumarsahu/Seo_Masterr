import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Modal,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { COLORS } from "../styles/Styles";
import.meta.env.VITE_BACKEND_URL


const AuthModal = ({
  open,
  handleClose,
  onSuccess,
  redirectTo = "/",
  mode = "default", // "default" or "private"
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const { apiCall } = useApi();
  const navigate = useNavigate();

  const closeModal = () => {
    if (mode !== "private" && handleClose) handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (open && mode === "private") {
      document.body.classList.add("body-blur");
    } else {
      document.body.classList.remove("body-blur");
    }
  }, [open, mode]);

  const handleSubmit = async () => {
    setError("");
    try {
      if (tab === 0) {
        const loginData = new URLSearchParams();
        loginData.append("grant_type", "password");
        loginData.append("username", form.email);
        loginData.append("password", form.password);
        loginData.append("client_id", "string");
        loginData.append("client_secret", "********");

        const result = await login(loginData);

        if (result.success) {
          closeModal();
          document.body.classList.remove("body-blur");

          onSuccess?.();
          setTimeout(() => navigate(redirectTo), 300);
        } else {
          setError(result.error || "Login failed");
        }
      } else {
        await apiCall(import.meta.env.VITE_BACKEND_URL+"/auth/signup", "POST", {
          username: form.username,
          email: form.email,
          password: form.password,
          permissions: [],
          is_editor: false,
        });
        closeModal();
        onSuccess?.();
        setTimeout(() => navigate(redirectTo), 300);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const payload = JSON.parse(atob(credentialResponse.credential.split(".")[1]));
    const email = payload.email;
    const username = payload.name.replace(/\s/g, "");

    try {
      await apiCall(import.meta.env.VITE_BACKEND_URL+"/auth/signup", "POST", {
        username,
        email,
        password: "",
        permissions: [],
        is_editor: false,
      });
      closeModal();
      onSuccess?.();
      setTimeout(() => navigate(redirectTo), 300);
    } catch (err) {
      setError("Google Auth failed");
    }
  };
  return (
    <Modal
      open={open}
      onClose={closeModal}
      disableEscapeKeyDown={mode === "private"}
      sx={{ pointerEvents: mode === "private" ? "none" : "auto" }}
      BackdropProps={{
        onClick: (e) => {
          if (mode !== "private") closeModal();
          e.stopPropagation();
        },
      }}
    >
      <Box
        sx={{
          pointerEvents: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "90%" : 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: isMobile ? 3 : 4,
          borderRadius: 3,
          borderTop: "6px solid #0a2b4c",
        }}
      >
        {/* Private Mode Warning */}
        {mode === "private" && (
          <Box mb={2}>
            <Typography variant="body1" sx={{ color: "#b91c1c", fontWeight: "bold", mb: 1 }}>
              ⚠ You must be logged in to continue
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              onClick={function () {
                document.body.classList.remove("body-blur");
                navigate("/");
              }}
              sx={{
                mb: 2,
                color: COLORS.primary,
                borderColor: "#0a2b4c",
                "&:hover": { backgroundColor: COLORS.primary, color: COLORS.secondary },
              }}
            >
              Go to Home
            </Button>
          </Box>
        )}

        {/* Close Button (not in private mode) */}
        {mode !== "private" && (
          <IconButton
            onClick={closeModal}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "#0a2b4c",
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
        )}

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_, val) => setTab(val)}
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{
            "& .MuiTabs-indicator": { backgroundColor: "#0a2b4c" },
            mb: 2,
          }}
        >
          <Tab label="Login" sx={{ color: COLORS.secondary, fontWeight: 600 }} />
          <Tab label="Sign Up" sx={{ color: COLORS.secondary, fontWeight: 600 }} />
        </Tabs>

        {/* Form */}
        <Box>
          {tab === 1 && (
            <TextField
              fullWidth
              name="username"
              label="Username"
              margin="dense"
              onChange={handleChange}
              value={form.username}
            />
          )}

          <TextField
            fullWidth
            name="email"
            label="Email"
            type="email"
            margin="dense"
            onChange={handleChange}
            value={form.email}
          />

          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            margin="dense"
            onChange={handleChange}
            value={form.password}
          />

          {error && (
            <Typography color="error" variant="body2" mt={1}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: COLORS.primary,
              "&:hover": {
                backgroundColor: COLORS.secondary,
              },
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : tab === 0 ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </Button>

          <Divider sx={{ my: 3 }}>OR</Divider>

          <Box display="flex" justifyContent="center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google Auth failed")}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
