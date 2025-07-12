import React, { useState } from "react";
import {
  Modal,
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Divider,
  CircularProgress,
  IconButton,
  useMediaQuery
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { GoogleLogin } from "@react-oauth/google";
import useApi from "../hooks/useApi";
import {useAuth} from "../hooks/useAuth";
import { Snackbar, Alert } from "@mui/material";


const AuthModal = ({ open, handleClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  // const { apiCall, loading } = useApi();
  const [error, setError] = useState("");
  const { isAuthenticated, user, loading, login, logout } = useAuth();
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
          setTimeout(() => handleClose(), 1200);
        } else {
          setError(result.error || "Login failed");
        }
      } else {
        await apiCall('http://localhost:8000/auth/signup', 'POST', {
          username: form.username,
          email: form.email,
          password: form.password,
          permissions: [],
          is_editor: false,
        })
        console.log('Signup success')
        handleClose()
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    const payload = JSON.parse(atob(credentialResponse.credential.split('.')[1]))
    const email = payload.email
    const username = payload.name.replace(/\s/g, '')

    try {
      await apiCall('http://localhost:8000/auth/signup', 'POST', {
        username,
        email,
        password: '',
        permissions: [],
        is_editor: false,
      })
      console.log('Google signup/login success')
      handleClose()
    } catch (err) {
      setError('Google Auth failed')
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '90%' : 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: isMobile ? 3 : 4,
          borderRadius: 3,
          borderTop: '6px solid #0a2b4c',
        //   position: 'relative',
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: '#0a2b4c',
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_, val) => setTab(val)}
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{
            '& .MuiTabs-indicator': { backgroundColor: '#0a2b4c' },
            mb: 2,
          }}
        >
          <Tab label="Login" sx={{ color: '#0a2b4c', fontWeight: 600 }} />
          <Tab label="Sign Up" sx={{ color: '#0a2b4c', fontWeight: 600 }} />
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
              backgroundColor: '#0a2b4c',
              '&:hover': {
                backgroundColor: '#093456',
              },
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : tab === 0 ? 'Login' : 'Sign Up'}
          </Button>

          <Divider sx={{ my: 3 }}>OR</Divider>

          <Box display="flex" justifyContent="center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google Auth failed')}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default AuthModal
