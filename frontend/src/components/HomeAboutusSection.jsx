import {
    Box,
    Button,
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import React from "react";
  import style from "../styles/Styles"; // ← import styles
  
  export default function HomeAboutusSection() {
    const theme = useTheme();
    const styles = style.homeAboutSection;
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
    return (
      <Box sx={styles.wrapper}>
        {/* Left Section */}
        <Box sx={styles.leftSection}>
          <Typography component="h1" sx={styles.title}>
            Lorem Ipsum
            Has Been The
            Industry's Standard
          </Typography>
  
          <Typography sx={styles.description}>
            Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it
            to make a type specimen book.
          </Typography>
  
          <Button variant="contained" sx={styles.button}>
            Lorem Ipsum Has
          </Button>
        </Box>
  
        {/* Right Section */}
        <Box sx={styles.rightSection}>
          <Box
            component="img"
            src="https://plus.unsplash.com/premium_photo-1749319835913-a76b7506ee12?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero Image"
            sx={styles.heroImage}
          />
        </Box>
      </Box>
    );
  }
  