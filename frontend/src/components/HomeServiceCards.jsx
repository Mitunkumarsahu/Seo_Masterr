import React, { useEffect } from "react";
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
import useApi from "../hooks/useApi";

const HomeServiceCards = () => {
  const styles = style.homeServiceCards;

  const {
    apiCall: getBestWorks,
    loading,
    error,
    data,
  } = useApi();

  useEffect(() => {
    getBestWorks("http://127.0.0.1:8000/best-works/?active_only=false");
  }, []);

  const activeCards = data?.filter((item) => item.is_active) || [];

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (error) return <Typography align="center" color="error">Failed to load works.</Typography>;
  if (activeCards.length === 0) return null;

  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h5" align="center" gutterBottom sx={styles.heading}>
        Best Works That Represent Our Skills
      </Typography>

      {activeCards.length < 5 ? (
        <Box
          sx={{
            ...styles.scrollContainer,
            justifyContent: "center",
            display: "flex",
            flexWrap: "wrap",
            overflowX: "hidden", // disable scroll
          }}
        >
          {activeCards.map((card) => (
            <Card key={card.id} sx={styles.card}>
              <Box>
                <Box display="flex" justifyContent="flex-start" mb={2}>
                  <Avatar
                    sx={styles.avatar}
                    src={card.image_url}
                    alt={card.title}
                  />
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
                  Learn More <ArrowForwardIcon sx={{ fontSize: "18px", ml: 0.5 }} />
                </Link>
              </Box>
            </Card>
          ))}
        </Box>
      ) : (
        <Box sx={styles.scrollContainer}>
          {activeCards.map((card) => (
            <Card key={card.id} sx={styles.card}>
              <Box>
                <Box display="flex" justifyContent="flex-start" mb={2}>
                  <Avatar
                    sx={styles.avatar}
                    src={card.image_url}
                    alt={card.title}
                  />
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
                  Learn More <ArrowForwardIcon sx={{ fontSize: "18px", ml: 0.5 }} />
                </Link>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default HomeServiceCards;
