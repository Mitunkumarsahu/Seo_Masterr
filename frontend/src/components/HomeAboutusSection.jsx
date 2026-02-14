import { Box, Button, Typography } from "@mui/material";
import React from "react";
import style from "../styles/Styles";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";

export default function HomeAboutusSection({ data }) {
  const styles = style.homeAboutSection;
  const navigate = useNavigate();

  if (!data) return null;

  return (
    <Box sx={styles.wrapper}>
      {/* Right Section */}
      <Box sx={styles.rightSection}>
        <Box
          component="img"
          src={data.image_url}
          alt="About Us Image"
          sx={styles.heroImage}
        />
      </Box>
      {/* Left Section */}
      <Box sx={styles.leftSection}>
        <Typography component="h1" sx={styles.title}>
          {data.heading}
        </Typography>

        <Typography sx={styles.description}>{data.description}</Typography>

        <Button
          variant="contained"
          sx={style.heroSection.button}
          startIcon={<Info size={20} />}
          onClick={() => {
            navigate("/about-us");
          }}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  );
}
