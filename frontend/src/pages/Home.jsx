import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
  TextField,
  Divider,
} from '@mui/material';
import { ChevronDown, User, Globe, Code, Palette, Building, Wrench, Menu as MenuIcon } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import HomeServiceCards from '../components/HomeServiceCards';
import FeatureSection from '../components/FeatureSection';
import HomeAboutusSection from '../components/HomeAboutusSection';
import TestimonialSection from '../components/TestimonialSection';
import HomeFooterSearch from '../components/HomeFooterSearch';

// Palette helpers – hex codes matching Tailwind’s palette used in the original file
const COLORS = {
  blue800: '#1e3a8a',
  blue100: '#dbeafe',
  green400: '#4ade80',
  green500: '#22c55e',
  green600: '#16a34a',
  slate50: '#f8fafc',
  slate200: '#e2e8f0',
  slate300: '#cbd5e1',
  slate400: '#94a3b8',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1e293b',
};

export default function Home() {

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
