import React from 'react';
import { Box, Typography } from '@mui/material';
import style from '../styles/Styles';

const AboutUs = () => {
  const styles = style.aboutUsSection;

  return (
    <Box sx={styles.mainContainer}>
      <Typography
        variant="h3"
        sx={styles.aboutHeadinng}
      >
        Lorem Ipsum
      </Typography>

      <Typography
        variant="body1"
        sx={styles.aboutDescription}
      >
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
        unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged.
      </Typography>
    </Box>
  );
};

export default AboutUs;
