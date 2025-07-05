import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Container,
  useTheme
} from "@mui/material";import style from '../styles/Styles';

const AboutUs = () => {

  
  const theme = useTheme();

  const styles = style.aboutUsSection;
  const featuresStyles = style.circleFeatureSection;

  const FeatureCard = () => (
    <Box sx={styles.featureCardRoot}>
      <Box sx={styles.featureImage} />
      <Typography variant="h5" component="h3" sx={styles.featureTitle}>
        Lorem Ipsum
      </Typography>

      <Typography variant="body2" sx={styles.featureText}>
        Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries
      </Typography>
    </Box>
  );

  const FeatureItem = () => {
  
    return (
      <Box sx={featuresStyles.featureItem}>
        <Box sx={featuresStyles.circle} />
        <Typography sx={featuresStyles.featureTitle}>Lorem</Typography>
        <Typography sx={featuresStyles.featureDescription}>
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown
        </Typography>
      </Box>
    );
  };


  return (
    <>
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

    <Box sx={styles.cardsWrapper}>
        <Container>
          <Grid
            container
            spacing={styles.gridSpacing}
            justifyContent={styles.gridJustify}
          >
            <Grid item xs={12} md={6}>
              <FeatureCard />
            </Grid>

            <Grid item xs={12} md={6}>
              <FeatureCard />
            </Grid>
          </Grid>

          <Box sx={styles.ctaWrapper}>
            <Button size="large" variant="contained" sx={styles.ctaButton}>
              LOREM IPSUM HAS BEEN
            </Button>
          </Box>
        </Container>
    </Box>

    <Box sx={featuresStyles.sectionWrapper}>
      <Container>
        <Typography variant="h4" sx={featuresStyles.heading}>
          Lorem Ipsum has been
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="flex-start"
          mt={2}
        >
          <Grid item xs={12} md={4}>
            <FeatureItem />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureItem />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureItem />
          </Grid>
        </Grid>

        <Box sx={featuresStyles.ctaWrapper}>
          <Button variant="contained" sx={featuresStyles.ctaButton}>
            LOREM IPSUM HAS BEE
          </Button>
        </Box>
      </Container>
    </Box>


  </>
  );
};

export default AboutUs;
