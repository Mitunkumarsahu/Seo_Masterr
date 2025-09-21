import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  LinearProgress,
  TextField,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

// UnderConstruction.jsx
// Single-file React component using MUI (v5)
// Usage: import UnderConstruction from './UnderConstruction'; then render <UnderConstruction />

export default function UnderConstruction() {



  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* decorative diagonal band */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(120deg, rgba(255,200,0,0.06), rgba(0,0,0,0))',
              transform: 'translateY(-10%)',
              pointerEvents: 'none',
            }}
          />

          <ConstructionIcon sx={{ fontSize: 64, color: 'warning.main' }} />

          <Typography variant="h4" component="h1" sx={{ mt: 2, mb: 1 }}>
            We're Building Something Great
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Our site is currently under construction. We'll be here soon with a new
            and improved experience.
          </Typography>

          <Box sx={{ width: '100%', mb: 3 }}>
            <LinearProgress
              variant="indeterminate"
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>

          <Typography variant="caption" display="block" sx={{ mt: 3, color: 'text.secondary' }}>
            Or reach us at{' '}
            <Link href="mailto:seomasterr@gmail.com" underline="hover">
            seomasterr@gmail.com
            </Link>
          </Typography>

          {/* small footer */}
          <Box sx={{ mt: 4, fontSize: 12, color: 'text.secondary' }}>
            <Typography variant="caption">Estimated time: we don't like guesses — check back soon.</Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
