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
import { motion } from 'framer-motion'

const MotionBox = motion(Box)
const MotionTypography = motion(Typography);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
};



const AboutUs = () => {

  
  const theme = useTheme();

  const styles = style.aboutUsSection;
  const featuresStyles = style.circleFeatureSection;

  const HeroSection = () => {
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

    return (
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
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
        <MotionBox
          maxWidth="900px"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Typography variant="h3" fontWeight="bold" sx={style.heroSection.title} gutterBottom>
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
        </MotionBox>
      </MotionBox>
    );
  };


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
          px: { xs: 2, sm: 4, md: 8 },
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={6} sx={style?.testimonialSection?.headline}>
            Process We Follow
          </Typography>

          <MotionBox
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: { xs: 4, sm: 4, md: 6 },
            }}
          >
            {steps.map((step) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                style={{
                  flex: isMd
                    ? '0 1 calc(33.333% - 32px)'
                    : isSm
                    ? '0 1 calc(50% - 16px)'
                    : '0 1 100%',
                  position: 'relative',
                  padding: '8px',
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
              </motion.div>
            ))}
          </MotionBox>
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: { xs: 4, md: 8 },
            }}
          >
            {/* Image Section with animation */}
            <MotionBox
              component="img"
              src={data.image_url}
              alt="Why Choose Us"
              variants={fadeInUp}
              custom={0.2}
              sx={{
                width: { xs: '100%', md: '50%' },
                borderRadius: 3,
                boxShadow: 3,
                objectFit: 'cover',
              }}
            />

            {/* Content Section */}
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              <MotionTypography
                variant="h4"
                fontWeight="bold"
                mb={2}
                color="#1e3a8a"
                variants={fadeInUp}
                custom={0.3}
              >
                {data.heading}
              </MotionTypography>

              <MotionTypography
                color="text.secondary"
                mb={4}
                variants={fadeInUp}
                custom={0.4}
              >
                {data.description}
              </MotionTypography>

              <Stack spacing={2}>
                {data.points.map((point, index) => (
                  <MotionBox
                    key={index}
                    variants={fadeInUp}
                    custom={0.5 + index * 0.1}
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
                  </MotionBox>
                ))}
              </Stack>
            </Box>
          </Box>
        </motion.div>
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
            <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center" sx={style?.testimonialSection?.headline}>
              Frequently Asked Questions
            </Typography>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
              >
                {faqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    variants={fadeInUp}
                    custom={0.2 + index * 0.1}
                  >
                    <Accordion
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
                  </motion.div>
                ))}
              </motion.div>
            )}
          </Box>
        </Fade>
      </Box>
    );
  };



  return (
    <>

    <HeroSection />

    <ProcessSteps />

    <WhyChooseUs />

    <FAQSection />

  </>
  );
};

export default AboutUs;
