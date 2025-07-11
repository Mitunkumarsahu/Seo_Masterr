import React from 'react';
import { Box, Typography, Grid, Divider, Link, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#1e3a8a', color: 'white', mt: 0, pt: 6, pb: 2 }}>
      <Grid container spacing={4} justifyContent="space-around" sx={{ px: { xs: 3, md: 10 } }}>
        {/* Logo + Socials */}
        <Grid item xs={12} md={3}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
              Smile
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton sx={{ bgcolor: 'white', color: '#0a2b4c', '&:hover': { bgcolor: '#f0f0f0' } }}>
              <LinkedInIcon />
            </IconButton>
            <IconButton sx={{ bgcolor: 'white', color: '#0a2b4c', '&:hover': { bgcolor: '#f0f0f0' } }}>
              <TwitterIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* Columns */}
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Lorem Ipsum</Typography>
          <Typography variant="body2">Lorem Ipsum<br />Has Been The<br />Industry's Standard</Typography>
        </Grid>
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Lorem Ipsum</Typography>
          <Typography variant="body2">Lorem Ipsum<br />Has Been The<br />Industry's Standard</Typography>
        </Grid>
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Lorem Ipsum</Typography>
          <Typography variant="body2">Lorem Ipsum<br />Has Been The<br />Industry's Standard</Typography>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={6} md={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Ipsum Has</Typography>
          <Box sx={{ display: 'flex', alignItems: 'start', gap: 1, mt: 1 }}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">Lorem Ipsum has<br />been the industry</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'start', gap: 1, mt: 1 }}>
            <PhoneIcon fontSize="small" />
            <Typography variant="body2">12345678910<br />12345678910</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Centered Paragraph */}
      <Box sx={{ my: 3,  mx: { xs: 3, md: 10 },mt: 7}}>
        <Typography variant="body2" sx={{ textAlign: 'left'}}>
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not.
        </Typography>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 3, borderColor: '#4b5d75', mx: { xs: 3, md: 10 } }} />

      {/* Bottom Row */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 3, md: 10 },
          pb: 2,
          gap: 2,
        }}
      >
        <Typography variant="body2">
          Lorem Ipsum Has been Dummy Text And Simple Has
        </Typography>
        <Link href="#" underline="hover" color="inherit">
          Lorem Ipsum Has been Dummy Text And Simple Has
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
