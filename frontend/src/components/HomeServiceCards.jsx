import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Link,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import style from "../styles/Styles"; 

const cards = Array(8).fill({
  title: "Lorem Ipsum Has Been The",
  description: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown`,
});

const HomeServiceCards = () => {
    const styles = style.homeServiceCards; 
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h5" align="center" gutterBottom sx={styles.heading}>
        Lorem Ipsum has been the industry's standard
      </Typography>

      <Box sx={styles.scrollContainer}>
        {cards.map((card, index) => (
          <Card key={index} sx={styles.card}>
            <Box>
              <Box display="flex" justifyContent="flex-start" mb={2}>
                <Avatar sx={styles.avatar} />
              </Box>

              <CardContent sx={{ px: 0, pb: 0, textAlign: "start" }}>
                <Typography variant="subtitle1" gutterBottom sx={styles.cardTitle}>
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={styles.cardDescription}>
                  {card.description}
                </Typography>
              </CardContent>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Link href="#" underline="none" sx={styles.link}>
                lorem Ipsum <ArrowForwardIcon sx={{ fontSize: "18px", ml: 0.5 }} />
              </Link>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HomeServiceCards;
