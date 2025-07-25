import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
    getTestimonials(import.meta.env.VITE_BACKEND_URL + "/testimonials/");
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
        <Box mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" mt={4}>
          Failed to load testimonials.
        </Typography>
      ) : testimonials.length === 0 ? (
        <Typography mt={4}>No testimonials available.</Typography>
      ) : (
        <Box mt={4}>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="center"
            sx={{ transition: "transform 0.5s ease-in-out" }}
          >
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
                    elevation={4}
                    sx={{
                      ...style.testimonialSection.paper,
                      width: {
                        xs: "100%", // full width on mobile
                        sm: 400, // fixed width on small and above
                      },
                      height: {
                        xs: 300, // same height on mobile
                        sm: 300, // same height on desktop
                      },
                      minWidth: {
                        xs: "100%",
                        sm: 400,
                      },
                      maxWidth: {
                        xs: "100%",
                        sm: 400,
                      },
                      minHeight: 300,
                      maxHeight: 300,
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      mx: "auto",
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

                  {/* Index */}
                  <Typography
                    mt={1}
                    textAlign="center"
                    variant="caption"
                    color="text.secondary"
                  >
                    {pageIndex * testimonialsPerPage + index + 1} /{" "}
                    {testimonials.length}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Controls */}
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
