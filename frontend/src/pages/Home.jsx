import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import HomeServiceCards from '../components/HomeServiceCards';
import FeatureSection from '../components/FeatureSection';
import HomeAboutusSection from '../components/HomeAboutusSection';
import TestimonialSection from '../components/TestimonialSection';
import HomeFooterSearch from '../components/HomeFooterSearch';
import useApi from '../hooks/useApi';

export default function Home() {

                /* Demo api testing

                          // const {apiCall:getUserDetails, loading:userLoading, error:userError, data:userData} = useApi();

                          // useEffect(() => {

                          //   if(userLoading) {
                          //     console.log('Loading user details...');
                          //   }
                          //   if(userError) {
                          //     console.error('Error fetching user details:', userError);
                          //   }
                          //   if(userData) {
                          //     console.log('User details fetched successfully:', userData);
                          //   }

                          // },[userData,userError]);

                          // useEffect(() => {
                          //   const fetchUserDetails = async () => {
                          //     try {
                          //       await getUserDetails('https://fake-json-api.mock.beeceptor.com/users');
                          //     } catch (error) {
                          //       console.error('Failed to fetch user details:', error);
                          //     }
                          //   };

                          //   fetchUserDetails();
                          // }, []);
                          
                */

  return (
   //hero section
   <>
   <HeroSection />
   <HomeServiceCards />
   <FeatureSection />
   <HomeAboutusSection />
   <TestimonialSection/>
   <HomeFooterSearch/>
   </>

  );
}
