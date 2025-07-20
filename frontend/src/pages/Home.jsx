import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import HomeServiceCards from "../components/HomeServiceCards";
import FeatureSection from "../components/FeatureSection";
import HomeAboutusSection from "../components/HomeAboutusSection";
import TestimonialSection from "../components/TestimonialSection";
import HomeFooterSearch from "../components/HomeFooterSearch";
import useApi from "../hooks/useApi";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,       // ⬅️ Increase duration from 0.6 to 1.2 seconds
      ease: "easeOut",
    },
  },
};

export default function Home() {
  const { apiCall: getHomeFeatures, loading, error, data } = useApi();

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        await getHomeFeatures("http://127.0.0.1:8000/home-features/");
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
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <HeroSection data={position1Data} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <HomeServiceCards />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <FeatureSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <HomeAboutusSection data={position2Data} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <TestimonialSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <HomeFooterSearch />
      </motion.div>
    </>
  );
}
