import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
import style from "../styles/Styles"; // ← import styles

export default function HomeAboutusSection({ data }) {
  const styles = style.homeAboutSection;

  if (!data) return null;

  return (
    <Box sx={styles.wrapper}>
      {/* Left Section */}
      <Box sx={styles.leftSection}>
        <Typography component="h1" sx={styles.title}>
          {data.heading}
        </Typography>

        <Typography sx={styles.description}>
          {data.description}
        </Typography>

        <Button variant="contained" sx={style.heroSection.button}>
          Learn More
        </Button>
      </Box>

      {/* Right Section */}
      <Box sx={styles.rightSection}>
        <Box
          component="img"
          src={data.image_url}
          alt="About Us Image"
          sx={styles.heroImage}
        />
      </Box>
    </Box>
  );
}
