import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import style from "../styles/Styles";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        position: "relative",
        overflow: "hidden",
        px: 2,
      }}
    >
      {/* Background Circles */}
      <Box
        sx={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "#FF6D00",
          opacity: 0.2,
          top: -50,
          left: -50,
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "#1976d2",
          opacity: 0.15,
          bottom: -100,
          right: -100,
          animation: "float 8s ease-in-out infinite",
          animationDirection: "alternate",
        }}
      />

      {/* Animated 404 */}
      <Typography
        variant="h1"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "6rem", md: "10rem" },
          color: "#FF6D00",
          textShadow: "2px 2px 10px rgba(0,0,0,0.2)",
          animation: "bounce 2s infinite",
        }}
      >
        404
      </Typography>

      <Typography
        variant="h5"
        color="text.secondary"
        sx={{ mb: 3, fontWeight: 500 }}
      >
        Oops! The page you're looking for doesn't exist.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={[style?.heroSection?.button, { mt: 2 }]}

        onClick={() => navigate("/")}
      >
        Go Home
      </Button>

      {/* Keyframes */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
}
