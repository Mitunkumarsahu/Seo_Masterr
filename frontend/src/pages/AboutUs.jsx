import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Container,
  useTheme,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fade,
  Stack,
  useMediaQuery,
} from "@mui/material";
import style from '../styles/Styles';
import useApi from '../hooks/useApi';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const AboutUs = () => {

  
  const theme = useTheme();

  const styles = style.aboutUsSection;
  const featuresStyles = style.circleFeatureSection;

  const { apiCall, loading } = useApi();
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await apiCall('http://localhost:8000/about-hero/?active_only=true');
        if (res && res.length > 0) {
          setHeroData(res[0]); 
        }
      } catch (err) {
        console.error('Failed to fetch about-hero:', err);
      }
    };
    fetchHero();
  }, [apiCall]);

  if (loading || !heroData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  // const FeatureCard = () => (
  //   <Box sx={styles.featureCardRoot}>
  //     <Box sx={styles.featureImage} />
  //     <Typography variant="h5" component="h3" sx={styles.featureTitle}>
  //       Lorem Ipsum
  //     </Typography>

  //     <Typography variant="body2" sx={styles.featureText}>
  //       Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  //       when an unknown printer took a galley of type and scrambled it to make a type
  //       specimen book. It has survived not only five centuries
  //     </Typography>
  //   </Box>
  // );



  const ProcessSteps = () => {
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(true);

    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'));
    const isSm = useMediaQuery(theme.breakpoints.up('sm'));

    const fetchSteps = async () => {
      try {
        const res = await fetch('http://localhost:8000/process-steps/?active_only=true');
        const json = await res.json();
        const sorted = json.sort((a, b) => a.order - b.order);
        setSteps(sorted);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchSteps();
    }, []);

    if (loading) {
      return (
        <Box sx={{ py: 10, textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      );
    }

    return (
      <Box
        sx={{
          backgroundColor: '#f6f8ff',
          px: { xs: 2, sm: 4, md: 8 }, // 64px padding on md+
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={6} color='#1e3a8a'>
            Process We Follow
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: { xs: 4, sm: 4, md: 6 },
            }}
          >
            {steps.map((step, index) => (
              <Fade in key={step.id} timeout={800 + index * 150}>
                <Box
                  sx={{
                    flex: isMd
                      ? '0 1 calc(33.333% - 32px)'
                      : isSm
                      ? '0 1 calc(50% - 16px)'
                      : '0 1 100%',
                    position: 'relative',
                    p: 1,
                  }}
                >
                  <Typography
                    variant="h2"
                    fontWeight="bold"
                    sx={{
                      position: 'absolute',
                      top: -30,
                      left: 0,
                      fontSize: { xs: 64, sm: 80, md: 100 },
                      opacity: 0.08,
                      lineHeight: 1,
                      userSelect: 'none',
                    }}
                  >
                    {String(step.order).padStart(2, '0')}.
                  </Typography>

                  <Box sx={{ mt: 6 }}>
                    <Typography variant="h6" fontWeight="bold" mb={1}>
                      {step.heading}
                    </Typography>
                    <Typography color="text.secondary">{step.description}</Typography>
                  </Box>
                </Box>
              </Fade>
            ))}
          </Box>
        </Container>
      </Box>
    );
  };


  const WhyChooseUs = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8000/why-choose-us/');
        const json = await res.json();
        if (json.length) {
          setData(json[0]);
        }
      } catch (err) {
        console.error('Error fetching Why Choose Us:', err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (!data) return null;

    return (
      <Box
        id="why-choose-us"
        sx={{
          backgroundColor: '#f8faff',
          px: { xs: 2, sm: 4, md: 8, lg: 8 }, 
          py: { xs: 6, md: 10 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 4, md: 8 },
          }}
        >
          {/* Image Section */}
          <Fade in timeout={1000}>
            <Box
              component="img"
              src={data.image_url}
              alt="Why Choose Us"
              sx={{
                width: { xs: '100%', md: '50%' },
                borderRadius: 3,
                boxShadow: 3,
                objectFit: 'cover',
              }}
            />
          </Fade>

          {/* Content Section */}
          <Fade in timeout={1200}>
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              <Typography variant="h4" fontWeight="bold" mb={2} color='#1e3a8a'>
                {data.heading}
              </Typography>

              <Typography color="text.secondary" mb={4}>
                {data.description}
              </Typography>

              <Stack spacing={2}>
                {data.points.map((point, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#ffffff',
                      px: 2,
                      py: 1.5,
                      borderRadius: 2,
                      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                      gap: 1.5,
                    }}
                  >
                    <CheckCircleIcon sx={{ color: '#1976d2' }} />
                    <Typography variant="body1" fontWeight={500}>
                      {point.trim()}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Fade>
        </Box>
      </Box>
    );
  };

  const FAQSection = () => {
    const { apiCall, loading } = useApi();
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
      const fetchFaqs = async () => {
        try {
          const res = await apiCall('http://localhost:8000/faqs/?active_only=true');
          if (res && Array.isArray(res)) {
            const sortedFaqs = res.sort((a, b) => a.order - b.order);
            setFaqs(sortedFaqs);
          }
        } catch (err) {
          console.error('Failed to fetch FAQs:', err);
        }
      };
      fetchFaqs();
    }, [apiCall]);

    return (
      <Box sx={styles.container}>
        <Fade in={true} timeout={800}>
          <Box>
            <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center" color='#1e3a8a'>
              Frequently Asked Questions
            </Typography>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              faqs.map((faq) => (
                <Accordion
                  key={faq.id}
                  TransitionProps={{ unmountOnExit: true }}
                  sx={styles.accordion}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={styles.summary}>
                    <Typography fontWeight="bold">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))
            )}
          </Box>
        </Fade>
      </Box>
    );
  };


  return (
    <>
    <Box
      sx={{
        position: 'relative',
        height: { xs: 'auto', md: '60vh' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        py: { xs: 6, md: 0 },
        textAlign: 'center',
        backgroundImage: `linear-gradient(to right, rgba(20, 30, 48, 0.85), rgba(36, 59, 85, 0.85)), url(${heroData.image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      <Box maxWidth="900px">
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
        >
          {heroData.title || 'Services'}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: '1.2rem',
            lineHeight: 1.8,
            mt: 2,
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          {heroData.description}
        </Typography>
      </Box>
    </Box>

    {/* <Box sx={styles.cardsWrapper}>
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
    </Box> */}

    <ProcessSteps />

    <WhyChooseUs />

    <FAQSection />

  </>
  );
};

export default AboutUs;
