import {
  Alert,
  Box,
  Button,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import useApi from "../hooks/useApi";
import style from "../styles/Styles";
import SubscribeModal from "./SubscribeModal"; // ✅ Import modal component

export default function HomeFooterSearch() {
  const styles = style.homeFooterSearch;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [email, setEmail] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [modalOpen, setModalOpen] = useState(false);

  const { apiCall: postSubscription, loading } = useApi();

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setSnackbar({ open: true, message: "Please enter a valid email.", severity: "error" });
      return;
    }

    try {
      await postSubscription(import.meta.env.VITE_BACKEND_URL+"/subscriptions/", "POST", { email });
      setSnackbar({ open: true, message: "Subscribed successfully!", severity: "success" });
      setEmail("");
      setModalOpen(false);
    } catch (err) {
      setSnackbar({ open: true, message: "Subscription failed.", severity: "error" });
    }
  };

  return (
    <Box
      sx={{
        py: 10,
        position: "relative",
        background: "transparent",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Floating icons */}
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1741975520592-3a7fdaad929f?q=80&w=1449&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        sx={{
          position: "absolute",
          top: "15%",
          left: "5%",
          width: 80,
          opacity: 0.03,
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1741975520592-3a7fdaad929f?q=80&w=1449&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        sx={{
          position: "absolute",
          top: "30%",
          right: "5%",
          width: 90,
          opacity: 0.03,
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1741975520592-3a7fdaad929f?q=80&w=1449&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        sx={{
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 100,
          opacity: 0.03,
          animation: "float 10s ease-in-out infinite",
        }}
      />

      <Stack spacing={2} alignItems="center" position="relative" zIndex={2}>
     
        <Typography
          variant="body2"
          sx={styles.heading}
        >
          Stay updated with our latest news, offers, and tips directly in your inbox.
        </Typography>

        <Button
          variant="contained"
          size="small"
          sx={style?.heroSection?.button}
          onClick={() => setModalOpen(true)}
        >
          Subscribe
        </Button>
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* ✅ Use the modular modal */}
      <SubscribeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        email={email}
        setEmail={setEmail}
        loading={loading}
        handleSubmit={handleSubmit}
      />

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
}
