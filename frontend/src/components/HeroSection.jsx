import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import style from "../styles/Styles";
import { useLocation } from "react-router-dom";

export default function HeroSection({ data }) {
  const location = useLocation();
  const path = location.pathname;
  const theme = useTheme();
  const styles = style.heroSection;

  if (!data) return null; // or loading UI

  return (
    <Box sx={styles.heroContainer}>
      {/* Left Section */}
      <Box sx={styles.leftSection}>
        <Typography component="h1" sx={styles.title}>
          {data.heading || data?.title}
        </Typography>

        <Typography sx={styles.description}>
          {data.description}
        </Typography>
        {path == '/'?
        <Button variant="contained" sx={styles.button}>
          Learn More
        </Button>
        :""
        }
      </Box>

      {/* Right Section */}
      <Box sx={styles.rightSection}>
        <Box
          component="img"
          src={data.image_url}
          alt="Hero Image"
          sx={styles.heroImage}
        />
      </Box>
    </Box>
  );
}
