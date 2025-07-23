import React from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Link,
  IconButton,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { COLORS } from "../styles/Styles";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: COLORS.primary, color: "white", mt: 0, pt: 6, pb: 2 }}>
      <Grid
        container
        spacing={4}
        justifyContent="space-around"
        sx={{ px: { xs: 3, md: 10 } }}
      >
        {/* Logo + Socials */}
        <Grid item xs={12} md={3}>
          {/* <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
              Smile
            </Typography>
          </Box> */}
          <Box sx={{ mb: 2 }} variant="image">
            <img
              src="/main-logo.png"
              alt="Logo"
              style={{ width: 126, height: 50 }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              sx={{
                bgcolor: "white",
                color: "#0a2b4c",
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              sx={{
                bgcolor: "white",
                color: "#0a2b4c",
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
            >
              <TwitterIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Quick Links
          </Typography>
          <Typography variant="body2">
            <Link href="/blogs" color="inherit" underline="hover">
              Blogs
            </Link>
            <br />
            <Link href="/services" color="inherit" underline="hover">
              Services
            </Link>
            <br />
            <Link href="/about-us" color="inherit" underline="hover">
              About Us
            </Link>
            <br />
            <Link href="/contact-us" color="inherit" underline="hover">
              Contact Us
            </Link>
          </Typography>
        </Grid>

        {/* Services */}
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Our Services
          </Typography>
          <Typography variant="body2">
            SEO Optimization
            <br />
            PPC Advertising
            <br />
            Social Media Marketing
            <br />
            Website Development
          </Typography>
        </Grid>

        {/* Company */}
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Company
          </Typography>
          <Typography variant="body2">
            Empowering brands with data-driven strategies
            <br />
            Trusted by startups and enterprises
            <br />
            Customized growth plans
            <br />
            Transparent communication
          </Typography>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={6} md={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Get In Touch
          </Typography>
          <Box sx={{ display: "flex", alignItems: "start", gap: 1, mt: 1 }}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">
              Bhubaneswar, Odisha
              <br />
              India - 751003
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "start", gap: 1, mt: 1 }}>
            <PhoneIcon fontSize="small" />
            <Typography variant="body2">
              +91 8249*****
              <br />
              support@seomasterr.com
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Centered Paragraph */}
      <Box sx={{ my: 3, mx: { xs: 3, md: 10 }, mt: 7 }}>
        <Typography variant="body2" sx={{ textAlign: "left" }}>
          At Smile, we specialize in delivering measurable digital growth. From
          driving traffic through expert SEO practices to generating qualified
          leads via PPC and social media campaigns, we’re here to turn your
          online presence into real business results. Read our blogs to stay
          updated with digital trends, or explore our services to take your
          brand to the next level.
        </Typography>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 3, borderColor: "#4b5d75", mx: { xs: 3, md: 10 } }} />

      {/* Bottom Row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 3, md: 10 },
          pb: 2,
          gap: 2,
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} SEO Master. All rights reserved.
        </Typography>
        <Link href="/privacy-policy" underline="hover" color="inherit">
          Privacy Policy
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
