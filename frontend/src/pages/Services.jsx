import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeFooterSearch from '../components/HomeFooterSearch';
import useApi from "../hooks/useApi";
import style, { COLORS } from "../styles/Styles"; // Ensure this path is correct  


const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("all");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    apiCall: getServices,
    loading: servicesLoading,
    error: servicesError,
    data: servicesData,
  } = useApi();

  const {
    apiCall: getServiceTypes,
    loading: serviceTypesLoading,
    error: serviceTypesError,
    data: serviceTypesData,
  } = useApi();

  useEffect(() => {
    getServices(import.meta.env.VITE_BACKEND_URL+"/services/");
    getServiceTypes(import.meta.env.VITE_BACKEND_URL+"/services/types");
  }, []);

  // Set services when data is received
  useEffect(() => {
    if (servicesData) {
      setServices(servicesData);
      setFilteredServices(servicesData);
    }
  }, [servicesData]);

  // Set service types when data is received
  useEffect(() => {
    if (serviceTypesData) {
      setServiceTypes(serviceTypesData);
    }
  }, [serviceTypesData]);

  useEffect(() => {
    if (selectedType === "all") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(
        (s) => s.service_type?.slug === selectedType
      );
      setFilteredServices(filtered);
    }
  }, [selectedType, services]);

  const loading = servicesLoading || serviceTypesLoading;
  const error = servicesError || serviceTypesError;

  return (
    <Box sx={{ backgroundColor: "#f9f9f9" }}>
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography variant="h3" fontWeight="bold" textAlign="center" sx={style?.testimonialSection?.headline} mb={5}>
          Our Services
        </Typography>

        {/* Tab Buttons */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            mb: 6,
          }}
        >
          <TabButton
            label="All"
            selected={selectedType === "all"}
            onClick={() => setSelectedType("all")}
          />
          {serviceTypes.map((type) => (
            <TabButton
              key={type.id}
              label={type.name}
              selected={selectedType === type.slug}
              onClick={() => setSelectedType(type.slug)}
            />
          ))}
        </Box>

        {/* Services Grid */}
        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            px: 2,
          }}
        >
          {loading ? (
            <Typography textAlign="center">Loading services...</Typography>
          ) : error ? (
            <Typography color="error" textAlign="center">{error}</Typography>
          ) : filteredServices.length === 0 ? (
            <Typography textAlign="center">No services found.</Typography>
          ) : (
            filteredServices.map((service) => (
              <ServiceCard key={service.id} post={service} />
            ))
          )}
        </Box>
      </Container>



      <HomeFooterSearch />
    </Box>
  );
};

const TabButton = ({ label, selected, onClick }) => (
  <Button
    onClick={onClick}
    variant="outlined"
    size="small"
    sx={{
      backgroundColor: selected ? COLORS.primary : "#ffffff",
      color: selected ? "#ffff" : COLORS.primary,
      border: `1px solid ${COLORS.primary}`,
      fontWeight: 700,
      fontSize: "0.75rem",
      borderRadius: "20px",
      px: 2.5,
      py: 0.75,
      textTransform: "capitalize",
      minWidth: "auto",
      "&:hover": {
        backgroundColor: selected
          ? COLORS.primary
          : "#e0eaff",
        borderColor: "#0C2F58",
      },
    }}
  >
    {label.toUpperCase()}
  </Button>
);

const ServiceCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box sx={{ height: 200, backgroundColor: "#1e3a8a" }}>
        <img
          src={post.image_url}
          alt={post.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{color:COLORS.primary}}>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {post.meta_description}
        </Typography>
        <Button
          onClick={() => navigate(`/service/${post.id}`)}
          sx={{
            mt: 2,
            fontWeight: 600,
            color: COLORS.secondary,
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          LEARN MORE →
        </Button>
      </Box>

    </Box>
  );
};

export default Services;