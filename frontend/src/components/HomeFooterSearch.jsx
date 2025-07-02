// HomeFooterSearch.jsx
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React from "react";
import style from "../styles/Styles"; // Import styles from Styles.js

export default function HomeFooterSearch() {
  const styles = style.homeFooterSearch;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={styles.wrapper}>
      <Stack sx={styles.container}>
        <Typography component="h2" sx={styles.heading}>
          Lorem Ipsum has been the industry's standard dummy text ever since
          the 1500s, when an
        </Typography>

        <Stack sx={styles.inputStack}>
          <TextField
            fullWidth
            placeholder="Lorem Ipsum Has"
            variant="outlined"
            size="small"
            sx={styles.input}
          />

          <Button variant="contained" size="small" sx={styles.button}>
            Lorem
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
