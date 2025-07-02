import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import style from "../styles/Styles"; // ← import styles

export default function FeatureSection() {
  const styles = style.featureSection; 
  const items = [
    "Lorem Ipsum has been",
    "Lorem Ipsum has been",
    "Lorem Ipsum has been",
    "Lorem Ipsum has been",
    "Lorem Ipsum has been",
  ];

  return (
    <Box sx={styles.wrapper}>
      {/* Title */}
      <Typography variant="h5" sx={styles.heading}>
        Lorem Ipsum has been the industry's standar
      </Typography>

      {/* Grid Items */}
      <Grid container justifyContent="center" spacing={4}>
        {items.map((text, index) => (
          <Grid item xs={6} sm={4} md={2.4} key={index}>
            <Box sx={styles.gridItemWrapper}>
              <Box sx={styles.iconCircle} />
              <Typography variant="body1" sx={styles.itemText}>
                {text}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
