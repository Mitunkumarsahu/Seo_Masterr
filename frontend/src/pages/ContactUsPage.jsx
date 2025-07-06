import React from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
} from '@mui/material';

const ContactUsPage = () => {
  return (
    <Box sx={{ bgcolor: '#fff', py: 6 }}>
      {/* Main Heading */}
      <Box sx={{ width: '100%', textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          color="primary.dark"
        >
          Lorem Ipsum has
        </Typography>
      </Box>

      {/* Two Column Section using Box */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: 4,
          px: { xs: 2, md: 10 },
        }}
      >
        {[1, 2].map((item) => (
          <Box
            key={item}
            sx={{
              width: { xs: '100%', md: '25%' }, // Reduced from 30%
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" fontWeight={700} color="primary.dark" gutterBottom>
              Lorem Ipsum
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: item === 1 ? '#001F4D' : '#00C896',
                '&:hover': {
                  backgroundColor: item === 1 ? '#003074' : '#00aa80',
                },
              }}
            >
              LOREM IPSUM HAS BEEN
            </Button>
          </Box>
        ))}
      </Box>

      {/* Bottom Section */}
      <Box sx={{ bgcolor: '#f3f5f8', mt: 10, py: 6 }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
            textAlign: 'center',
            px: { xs: 2, md: 10 },
          }}
        >
          {[1, 2].map((item) => (
            <Box
              key={item}
              sx={{
                width: { xs: '100%', md: '20%' }, // Reduced from 22%
                mx: 'auto',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'grey.300',
                  width: 60,
                  height: 60,
                  margin: '0 auto',
                }}
              />
              <Typography
                variant="subtitle1"
                fontWeight={600}
                mt={2}
                color="primary.dark"
              >
                Lorem Ipsum
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem Ipsum has been the industry's
              </Typography>
              <Typography
                variant="body2"
                color="#00C896"
                fontWeight={600}
                mt={1}
              >
                LOREM IPSUM HAS
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUsPage;
