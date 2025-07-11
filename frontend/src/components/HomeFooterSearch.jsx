import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import style from "../styles/Styles";
import useApi from "../hooks/useApi"; // ✅ Import useApi

export default function HomeFooterSearch() {
  const styles = style.homeFooterSearch;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [email, setEmail] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const {
    apiCall: postSubscription,
    loading,
    error,
  } = useApi();

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setSnackbar({ open: true, message: "Please enter a valid email.", severity: "error" });
      return;
    }

    try {
      console.log(email);
      await postSubscription("http://127.0.0.1:8000/subscriptions/","POST",{"email":email});
      setSnackbar({ open: true, message: "Subscribed successfully!", severity: "success" });
      setEmail("");
    } catch (err) {
      setSnackbar({ open: true, message: "Subscription failed.", severity: "error" });
    }
  };

  return (
    <Box sx={styles.wrapper}>
      <Stack sx={styles.container}>
        <Typography component="h2" sx={styles.heading}>
          Lorem Ipsum has been the industry's standard dummy text ever since
          the 1500s, when an
        </Typography>

        <Stack sx={styles.inputStack} direction={isMobile ? "column" : "row"} spacing={1}>
          <TextField
            fullWidth
            placeholder="Enter your email"
            variant="outlined"
            size="small"
            sx={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            variant="contained"
            size="small"
            sx={styles.button}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
        </Stack>
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
    </Box>
  );
}
