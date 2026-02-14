import React, { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { COLORS } from '../styles/Styles';

const ServiceCategoryBar = () => {
    const { apiCall: getServiceTypes, data: serviceTypes } = useApi();
    const navigate = useNavigate();

    useEffect(() => {
        getServiceTypes(import.meta.env.VITE_APP_BACKEND_URL + "/wp-json/wp/v2/service_type?per_page=100");
    }, []);

    if (!Array.isArray(serviceTypes) || serviceTypes.length === 0) return null;

    return (
        <Box sx={{ py: 3 }}>
            <Container maxWidth="xl">
                <Box
                    sx={{
                        bgcolor: '#daeafa',
                        borderRadius: '50px',
                        py: 2,
                        px: 4,
                        display: 'flex',
                        justifyContent: { md: 'center', xs: 'flex-start' }, // Center on desktop, left on mobile
                        gap: 4,
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                        // Hide scrollbar but keep functionality
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': { display: 'none' },
                    }}
                >
                    {serviceTypes.map((type) => (
                        <Typography
                            key={type.id}
                            variant="body2"
                            onClick={() => navigate(`/services/${type.slug}`)}
                            sx={{
                                cursor: 'pointer',
                                color: '#334155',
                                fontWeight: 500,
                                fontSize: '0.95rem',
                                transition: 'color 0.2s',
                                '&:hover': { color: COLORS.secondary }
                            }}
                        >
                            {type.name} {type.name.toLowerCase().includes('services') ? '' : 'Services'}
                        </Typography>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default ServiceCategoryBar;
