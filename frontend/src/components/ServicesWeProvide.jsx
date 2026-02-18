import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { COLORS } from "../styles/Styles";
import Loader from "./Loader";

const MotionCard = motion(Card);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const ServicesWeProvide = () => {
  const navigate = useNavigate();
  const { apiCall: getServices, loading, error, data } = useApi();

  useEffect(() => {
    getServices(import.meta.env.VITE_APP_BACKEND_URL + "/wp-json/wp/v2/service?_embed&per_page=6");
  }, []);

  const decodeHTML = (html) => {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html").body.textContent || "";
  };

  const services = data?.map((post) => ({
    id: post.id,
    title: decodeHTML(post.title.rendered),
    description: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
    slug: post.slug,
    image_url: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || 
               "https://via.placeholder.com/300x200",
  })) || [];

  if (loading) return <Loader />;
  if (error)
    return (
      <Typography align="center" color="error">
        Failed to load services.
      </Typography>
    );
  if (services.length === 0) return null;

  const styles = {
    wrapper: {
      py: { xs: 6, md: 10 },
      px: { xs: 2, md: 4 },
      backgroundColor: "#f8fafc",
    },
    heading: {
      fontSize: { xs: "28px", md: "40px" },
      fontWeight: "bold",
      color: COLORS.primary,
      mb: 1,
      textAlign: "center",
    },
    subheading: {
      color: "#666",
      maxWidth: "600px",
      mx: "auto",
      textAlign: "center",
      mb: 6,
    },
    card: {
      borderRadius: 3,
      overflow: "hidden",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
      },
    },
    avatar: {
      width: 80,
      height: 80,
      mb: 2,
      border: `3px solid ${COLORS.secondary}`,
    },
    cardTitle: {
      fontWeight: "bold",
      color: COLORS.primary,
      mb: 1,
      fontSize: "1.2rem",
    },
    cardDescription: {
      color: "#666",
      fontSize: "0.9rem",
      lineHeight: 1.6,
      flexGrow: 1,
    },
    learnMoreBtn: {
      mt: 2,
      color: COLORS.secondary,
      fontWeight: 600,
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: 1,
      transition: "gap 0.3s ease",
      "&:hover": {
        gap: 2,
      },
    },
  };

  return (
    <Box sx={styles.wrapper}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" sx={styles.heading}>
          Services <span style={{ color: COLORS.secondary }}>We Provide</span>
        </Typography>
        <Typography variant="body1" sx={styles.subheading}>
          Comprehensive digital marketing solutions to grow your business and maximize your online presence
        </Typography>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
          }}
        >
          {services.slice(0, 6).map((service) => (
            <MotionCard
              key={service.id}
              variants={cardVariants}
              sx={styles.card}
              onClick={() => navigate(`/service/${service.slug}`)}
            >
              <CardContent sx={{ p: 3, textAlign: "center", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Box display="flex" justifyContent="center" mb={2}>
                  <Avatar
                    sx={styles.avatar}
                    src={service.image_url}
                    alt={service.title}
                  />
                </Box>

                <Typography variant="h6" sx={styles.cardTitle}>
                  {service.title}
                </Typography>
                
                <Typography variant="body2" sx={styles.cardDescription}>
                  {service.description.length > 120 
                    ? service.description.slice(0, 120) + "..." 
                    : service.description}
                </Typography>

                <Box sx={styles.learnMoreBtn}>
                  Learn More
                  <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </Box>
              </CardContent>
            </MotionCard>
          ))}
        </Box>
      </motion.div>

      {/* View All Services Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/services")}
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: COLORS.secondary,
              color: "#fff",
              px: 5,
              py: 1.5,
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 4px 20px rgba(255, 109, 0, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: COLORS.primary,
                transform: "translateY(-2px)",
                boxShadow: "0 8px 30px rgba(255, 109, 0, 0.4)",
              },
            }}
          >
            View All Services
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default ServicesWeProvide;