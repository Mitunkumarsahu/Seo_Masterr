import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Stack,
  IconButton,
  CircularProgress,
} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import StarIcon from "@mui/icons-material/Star";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { motion, AnimatePresence } from "framer-motion";
import useApi from "../hooks/useApi";
import style, { COLORS } from "../styles/Styles";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function TestimonialSection() {
  const [[index, direction], setIndex] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const { apiCall: getTestimonials, data, loading, error } = useApi();

  const testimonials = Array.isArray(data) ? data : [];

  useEffect(() => {
    getTestimonials("http://127.0.0.1:8000/testimonials/");
  }, []);

  useEffect(() => {
    if (!isPaused && testimonials.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setIndex(([prevIdx]) => [(prevIdx + 1) % testimonials.length, 1]);
      }, 4000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [index, isPaused, testimonials]);

  const handleNext = () => {
    setIndex(([prevIdx]) => [(prevIdx + 1) % testimonials.length, 1]);
  };

  const handlePrev = () => {
    setIndex(([prevIdx]) => [
      (prevIdx - 1 + testimonials.length) % testimonials.length,
      -1,
    ]);
  };

  const togglePause = () => setIsPaused((prev) => !prev);

  const current = testimonials.length > 0 ? testimonials[index] : null;

  return (
    <Box sx={{ py: 6, backgroundColor: "#f9fafb", textAlign: "center" }}>
      <Typography variant="h5" sx={style?.testimonialSection?.headline}>
        What Our Clients Say
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Failed to load testimonials.</Typography>
      ) : testimonials.length === 0 ? (
        <Typography>No testimonials available.</Typography>
      ) : (
        <>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 600,
              mx: "auto",
              height: 300,
            }}
          >
            {current && (
              <AnimatePresence custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6 }}
                  style={{ position: "absolute", width: "100%" }}
                >
                  <Paper elevation={3} sx={style.testimonialSection.paper}>
                    <FormatQuoteIcon sx={style.testimonialSection.quoteIcon} />

                    <Typography
                      variant="body2"
                      sx={style.testimonialSection.quoteText}
                    >
                      “{current.content}”
                    </Typography>

                    <Avatar
                      src={current.image_url}
                      alt={current.client_name}
                      sx={style.testimonialSection.avatar}
                    />

                    <Typography
                      variant="subtitle2"
                      sx={style.testimonialSection.name}
                    >
                      {current.client_name}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={style.testimonialSection.title}
                    >
                      {current.client_title} • {current.company}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={0.3}
                      sx={style.testimonialSection.stars}
                    >
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </Stack>
                  </Paper>
                </motion.div>
              </AnimatePresence>
            )}
          </Box>

          <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
            <IconButton onClick={handlePrev} color="primary">
              <ChevronLeftIcon />
            </IconButton>
            <IconButton onClick={togglePause} color="primary">
              {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
            </IconButton>
            <IconButton onClick={handleNext} color="primary">
              <ChevronRightIcon />
            </IconButton>
          </Stack>
        </>
      )}
    </Box>
  );
}
