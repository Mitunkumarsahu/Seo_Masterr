import React from 'react';
import { Box, Typography, Grid, Avatar, Paper, Stack } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';
import style, { cardMotion } from '../styles/Styles'; // Import styles

const testimonials = [
  {
    name: 'Sarah Johnson',
    title: 'CEO · TechCorp',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'Smile helped us scale our digital presence. Their team is amazing and very professional.',
  },
  {
    name: 'James Miller',
    title: 'Founder · Startly',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    quote: 'The designs and development were top‑notch. We loved working with them!',
  },
  {
    name: 'Emily Brown',
    title: 'Head of Marketing · CreativeEdge',
    avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
    quote: 'Highly recommend Smile. Their service exceeded our expectations in every way.',
  },
];

export default function TestimonialSection() {
    const styles = style.testimonialSection;
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h5" sx={styles.headline}>
        What&nbsp;Our&nbsp;Clients&nbsp;Say
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((t, i) => (
          <Grid
            key={i}
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
                “{t.quote}”
              </Typography>

              <Avatar src={t.avatar} alt={t.name} sx={styles.avatar} />

              <Typography variant="subtitle2" sx={styles.name}>
                {t.name}
              </Typography>
              <Typography variant="caption" sx={styles.title}>
                {t.title}
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
