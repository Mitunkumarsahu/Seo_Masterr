import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';
import style, { cardMotion } from '../styles/Styles'; // Keep styles as is
import useApi from '../hooks/useApi';

export default function TestimonialSection() {
  const styles = style.testimonialSection;

  const {
    apiCall: getTestimonials,
    data,
    loading,
    error,
  } = useApi();

  useEffect(() => {
    getTestimonials('http://127.0.0.1:8000/testimonials/');
  }, []);

  const testimonials = (data || [])
    .filter((t) => t.is_active)
    .sort((a, b) => a.order - b.order);

  if (loading) return <Typography align="center">Loading testimonials...</Typography>;
  if (error) return <Typography align="center" color="error">Failed to load testimonials.</Typography>;
  if (testimonials.length === 0) return null;

  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h5" sx={styles.headline}>
        What&nbsp;Our&nbsp;Clients&nbsp;Say
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((t, i) => (
          <Grid
            key={t.id}
            item
            xs={12}
            sm={6}
            md={4}
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={cardMotion}
            whileHover={{ scale: 1.03 }}
            style={{ display: 'flex' }}
          >
            <Paper elevation={0} sx={styles.paper}>
              <FormatQuoteIcon sx={styles.quoteIcon} />

              <Typography variant="body2" sx={styles.quoteText}>
                “{t.content}”
              </Typography>

              <Avatar src={t.image_url} alt={t.client_name} sx={styles.avatar} />

              <Typography variant="subtitle2" sx={styles.name}>
                {t.client_name}
              </Typography>
              <Typography variant="caption" sx={styles.title}>
                {t.client_title} · {t.company}
              </Typography>

              <Stack direction="row" spacing={0.5} sx={styles.stars}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <StarIcon key={idx} sx={{ fontSize: 18, color: '#fbbf24' }} />
                ))}
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {testimonials.length > 3 && (
        <Typography variant="caption" sx={styles.scrollHint}>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ display: 'inline-block', marginRight: 4 }}
          >
            ↓
          </motion.span>
          scroll for more
        </Typography>
      )}
    </Box>
  );
}
