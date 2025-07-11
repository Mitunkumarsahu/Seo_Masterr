import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Typography, Avatar } from "@mui/material";
import style from "../styles/Styles";
import useApi from "../hooks/useApi";

export default function FeatureSection() {
  const styles = style.featureSection;
  const sectionRef = useRef(null);
  const [counters, setCounters] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const {
    apiCall: fetchAchievements,
    data: items = [],
    loading,
    error,
  } = useApi();

  // Fetch data on mount
  useEffect(() => {
    fetchAchievements("http://127.0.0.1:8000/achievements/");
  }, []);

  // Set initial counters
  useEffect(() => {
    if (Array.isArray(items) && items.length > 0) {
      const initial = {};
      items.forEach((_, index) => (initial[index] = 0));
      setCounters(initial);
    }
  }, [items]);

  // Observer to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [isVisible, items]);

  // Count animation
  const animateCounters = () => {
    items.forEach((item, index) => {
      let currentValue = 0;
      const increment = Math.ceil(item.count / 50);
      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= item.count) {
          currentValue = item.count;
          clearInterval(timer);
        }
        setCounters((prev) => ({
          ...prev,
          [index]: currentValue,
        }));
      }, 50);
    });
  };

  if (loading || !Array.isArray(items)) {
    return (
      <Box sx={styles.wrapper}>
        <Typography align="center">Loading achievements...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.wrapper}>
        <Typography color="error" align="center">
          Failed to load achievements.
        </Typography>
      </Box>
    );
  }

  return (
    <Box ref={sectionRef} sx={styles.wrapper}>
      {/* Heading */}
      <Typography variant="h5" sx={styles.heading}>
        Our Achievements in Numbers
      </Typography>

      {/* Grid */}
      <Grid container justifyContent="center" spacing={4}>
        {items.map((item, index) => (
          <Grid item xs={6} sm={4} md={2.4} key={item.id}>
            <Box sx={styles.gridItemWrapper}>
              <Avatar
                src={item.image_url}
                alt={item.title}
                sx={styles.iconCircle}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                  mb: 1,
                  fontSize: { xs: "1.5rem", sm: "2rem" },
                }}
              >
                {counters[index] || 0}+
              </Typography>
              <Typography variant="body1" sx={styles.itemText}>
                {item.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
