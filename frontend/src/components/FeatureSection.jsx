import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import style from "../styles/Styles"; // ← import styles

export default function FeatureSection() {
  const styles = style.featureSection;
  const [counters, setCounters] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const items = [
    { label: "Projects Completed", value: 150, suffix: "+" },
    { label: "Happy Clients", value: 200, suffix: "+" },
    { label: "Years of Experience", value: 5, suffix: "+" },
    { label: "Team Members", value: 25, suffix: "+" },
    { label: "Awards Won", value: 12, suffix: "+" },
  ];

  // Initialize counters
  useEffect(() => {
    const initialCounters = {};
    items.forEach((item, index) => {
      initialCounters[index] = 0;
    });
    setCounters(initialCounters);
  }, []);

  // Intersection Observer to trigger animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          startCountingAnimation();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  const startCountingAnimation = () => {
    items.forEach((item, index) => {
      let currentValue = 0;
      const increment = Math.ceil(item.value / 50); // Adjust speed here
      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= item.value) {
          currentValue = item.value;
          clearInterval(timer);
        }
        setCounters(prev => ({
          ...prev,
          [index]: currentValue
        }));
      }, 50); // Animation speed
    });
  };

  return (
    <Box ref={sectionRef} sx={styles.wrapper}>
      {/* Title */}
      <Typography variant="h5" sx={styles.heading}>
        Our Achievements in Numbers
      </Typography>

      {/* Grid Items */}
      <Grid container justifyContent="space-around" spacing={4}>
        {items.map((item, index) => (
          <Grid item xs={6} sm={4} md={2.4} key={index}>
            <Box sx={styles.gridItemWrapper}>
              <Box sx={styles.iconCircle} />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: "bold", 
                  color: "#fff", 
                  mb: 1,
                  fontSize: { xs: "1.5rem", sm: "2rem" }
                }}
              >
                {counters[index] || 0}{item.suffix}
              </Typography>
              <Typography variant="body1" sx={styles.itemText}>
                {item.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}