import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Stack,
  CircularProgress,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import StarIcon from "@mui/icons-material/Star";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useApi from "../hooks/useApi";
import style from "../styles/Styles";

export default function TestimonialSection() {
  const { apiCall: getTestimonials, data, loading, error } = useApi();
  const testimonials = Array.isArray(data) ? data : [];

  const [pageIndex, setPageIndex] = useState(0);
  const intervalRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const testimonialsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  // Fetch testimonials
  useEffect(() => {
    getTestimonials("http://127.0.0.1:8000/testimonials/");
  }, []);

  // Autoplay
  useEffect(() => {
    if (testimonials.length > 0) {
      intervalRef.current = setInterval(() => {
        setPageIndex((prev) => (prev + 1) % totalPages);
      }, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [testimonials, totalPages, testimonialsPerPage]);

  const handleNext = () => {
    setPageIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentTestimonials = testimonials.slice(
    pageIndex * testimonialsPerPage,
    pageIndex * testimonialsPerPage + testimonialsPerPage
  );

  return (
    <Box sx={style.testimonialSection.wrapper}>
      <Typography variant="h5" sx={style.testimonialSection.headline}>
        What Our Clients Say
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Failed to load testimonials.</Typography>
      ) : testimonials.length === 0 ? (
        <Typography>No testimonials available.</Typography>
      ) : (
        <Box mt={4}>
          <Grid container spacing={4} justifyContent="center">
            {currentTestimonials.map((testimonial, index) => (
              <Grid
                item
                key={testimonial.id}
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box>
                  <Paper
                    elevation={3}
                    sx={{
                      ...style.testimonialSection.paper,
                      minWidth: 300,
                      maxWidth: 500,
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <FormatQuoteIcon sx={style.testimonialSection.quoteIcon} />

                    <Typography
                      variant="body2"
                      sx={style.testimonialSection.quoteText}
                    >
                      “{testimonial.content}”
                    </Typography>

                    <Avatar
                      src={testimonial.image_url}
                      alt={testimonial.client_name}
                      sx={style.testimonialSection.avatar}
                    />

                    <Typography
                      variant="subtitle2"
                      sx={style.testimonialSection.name}
                    >
                      {testimonial.client_name}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={style.testimonialSection.title}
                    >
                      {testimonial.client_title} • {testimonial.company}
                    </Typography>
                  </Paper>

                  {/* 👇 Index below each card */}
                  <Typography
                    mt={1}
                    textAlign="center"
                    variant="caption"
                    color="text.secondary"
                  >
                    {index + 1} / {currentTestimonials.length}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Navigation Buttons */}
          <Stack direction="row" justifyContent="center" spacing={2} mt={4}>
            <IconButton onClick={handlePrev} aria-label="Previous">
              <ChevronLeftIcon />
            </IconButton>
            <IconButton onClick={handleNext} aria-label="Next">
              <ChevronRightIcon />
            </IconButton>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
