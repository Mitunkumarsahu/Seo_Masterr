import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import HomeServiceCards from '../components/HomeServiceCards';
import FeatureSection from '../components/FeatureSection';
import HomeAboutusSection from '../components/HomeAboutusSection';
import TestimonialSection from '../components/TestimonialSection';
import HomeFooterSearch from '../components/HomeFooterSearch';
import useApi from '../hooks/useApi';

export default function Home() {
  const { apiCall: getHomeFeatures, loading, error, data } = useApi();

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        await getHomeFeatures('http://127.0.0.1:8000/home-features/');
      } catch (error) {
        console.error('Failed to fetch home features:', error);
      }
    };

    fetchFeatures();
  }, []);

  const position1Data = data?.find(item => item.position === 1);
  const position2Data = data?.find(item => item.position === 2);

  return (
    <>
      <HeroSection data={position1Data} />
      <HomeServiceCards />
      <FeatureSection />
      <HomeAboutusSection data={position2Data} />
      <TestimonialSection />
      <HomeFooterSearch />
    </>
  );
}
