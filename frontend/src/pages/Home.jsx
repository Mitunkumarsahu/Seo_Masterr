import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Fade,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FeatureSection from "../components/FeatureSection";
import HeroSection from "../components/HeroSection";
import ServiceCategoryBar from "../components/ServiceCategoryBar";
import HomeAboutusSection from "../components/HomeAboutusSection";
import HomeFooterSearch from "../components/HomeFooterSearch";
import HomeServiceCards from "../components/HomeServiceCards";
import LatestBlogs from "../components/LatestBlogs";
import TestimonialSection from "../components/TestimonialSection";
import Loader from '../components/Loader';
import useApi from "../hooks/useApi";
import style from '../styles/Styles';


const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay,
    },
  }),
};

const styles = {
  container: {
    py: 8,
    px: { xs: 2, md: 8 },
    backgroundColor: '#f9fafb',
  },
  accordion: {
    mb: 2,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px !important',
    '&:before': { display: 'none' },
  },
  summary: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#f3f4f6',
    },
  },
};

export default function Home() {
  const { apiCall: getHomeFeatures, loading, error, data } = useApi();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        await getHomeFeatures(backendUrl + "/home-features/");
      } catch (error) {
        console.error("Failed to fetch home features:", error);
      }
    };

    fetchFeatures();
  }, []);

  const position1Data = data?.find((item) => item.position === 1);
  const position2Data = data?.find((item) => item.position === 2);

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <HeroSection data={position1Data} />
      </motion.div>

      <ServiceCategoryBar />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <HomeServiceCards />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <FeatureSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <HomeAboutusSection data={position2Data} />
      </motion.div>

      {/* <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <TestimonialSection />
      </motion.div> */}

      {/* Latest Blogs Section */}
      <LatestBlogs />

      {/* FAQ Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <FAQSection />
      </motion.div>

      {/* Newsletter Subscription Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <HomeFooterSearch />
      </motion.div>
    </>
  );
}

// FAQ Section Component
const FAQSection = () => {
  const { apiCall, loading } = useApi();
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await apiCall(import.meta.env.VITE_BACKEND_URL + '/faqs/?active_only=true');
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
              <Loader />
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
