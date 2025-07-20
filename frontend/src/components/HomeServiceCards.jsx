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

  const { apiCall: getBestWorks, loading, error, data } = useApi();

  useEffect(() => {
    getBestWorks("http://127.0.0.1:8000/best-works/?active_only=false");
  }, []);

  const activeCards = data?.filter((item) => item.is_active) || [];

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (error)
    return (
      <Typography align="center" color="error">
        Failed to load works.
      </Typography>
    );
  if (activeCards.length === 0) return null;

  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h5" align="center" gutterBottom sx={styles.heading}>
        Best Works That Represent Our Skills
      </Typography>

      <Box
        sx={{
          ...styles.scrollContainer,
          ...(activeCards.length < 5
            ? {
                justifyContent: "center",
                flexWrap: "wrap",
                overflowX: "hidden",
                gap: 3,
              }
            : { gap: 2 }),
        }}
      >
        {activeCards.map((card) => (
          <Card key={card.id} sx={styles.card}>
            <Box>
              <Box display="flex" justifyContent="center" mb={2}>
                <Avatar
                  className="avatar"
                  sx={{
                    ...styles.avatar,
                    zIndex: 2,
                    position: "relative",
                  }}
                  src={card.image_url}
                  alt={card.title}
                />
              </Box>

              <CardContent
                sx={{
                  px: 0,
                  pb: 0,
                  textAlign: "center",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  className="card-title"
                  sx={{ ...styles.cardTitle, fontSize: "1.1rem" }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body2"
                  className="card-description"
                  sx={{ ...styles.cardDescription, fontSize: "0.9rem" }}
                >
                  {card.description.length > 100 ? card.description.slice(0, 100) + "..." : card.description}
                </Typography>
              </CardContent>
            </Box>

            <Box sx={{ mt: 3, textAlign: "center", zIndex: 2, position: "relative" }}>
              <Link href="#" underline="none" className="card-link" sx={styles.link}>
                Learn More{" "}
                <ArrowForwardIcon className="arrow" sx={styles.arrowIcon} />
              </Link>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HomeServiceCards;
