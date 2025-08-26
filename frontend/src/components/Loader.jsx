import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { COLORS } from "../styles/Styles";


const Loader = ({
  text = "Loading",
  textSize = "1rem", // you can override via props
  size = 64, // size of spinner
  dotSize = 16, // size of dots
}) => {
  const theme = useTheme();
  const blueColors = [
    theme.palette.primary.main, // default MUI blue
    theme.palette.info.main,
    "#42a5f5",
    "#90caf9",
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      height="90vh"
      width="100%"
    >
      <Box
        sx={{
          position: "relative",
          width: size,
          height: size,
          animation: "spin 2s linear infinite",
          "@keyframes spin": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        }}
      >
        {/* Top Dot */}
        <Box
          sx={{
            position: "absolute",
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            bgcolor:COLORS.primary,
            top: 0,
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        />
        {/* Right Dot */}
        <Box
          sx={{
            position: "absolute",
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            bgcolor: COLORS.secondary,
            top: "50%",
            right: 0,
            transform: "translate(0, -50%)",
          }}
        />
        {/* Bottom Dot */}
        <Box
          sx={{
            position: "absolute",
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            bgcolor: COLORS.primary,
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        />
        {/* Left Dot */}
        <Box
          sx={{
            position: "absolute",
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            bgcolor: COLORS.secondary,
            top: "50%",
            left: 0,
            transform: "translate(0, -50%)",
          }}
        />
      </Box>

      <Typography
        sx={{ color: theme.palette.primary.main, fontSize: textSize }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Loader;
