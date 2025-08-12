import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeFooterSearch from "../components/HomeFooterSearch";
import useApi from "../hooks/useApi";
import style, { COLORS } from "../styles/Styles";

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("all");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const decodeHTML = (html) => {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html").body.textContent || "";
  };

  const {
    apiCall: getServices,
    data: servicesData,
    loading: servicesLoading,
    error: servicesError,
  } = useApi();

  const {
    apiCall: getServiceTypes,
    data: typesData,
    loading: typesLoading,
    error: typesError,
  } = useApi();

  // Fetch services and types on mount
  useEffect(() => {
    getServices(import.meta.env.VITE_BACKEND_URL+"/wp-json/wp/v2/service?_embed&per_page=100");
    getServiceTypes(import.meta.env.VITE_BACKEND_URL+"/wp-json/wp/v2/service_type?per_page=100");
  }, []);

  // Transform and set services data
  useEffect(() => {
    if (Array.isArray(servicesData)) {
      const transformed = servicesData.map((post) => {
        const typeId = post.service_type?.[0]; // Assuming one service_type

        return {
          id: post.id,
          title:decodeHTML(post.title.rendered),
          meta_description: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
          slug: post.slug,
          image_url:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://via.placeholder.com/300x200",
          service_type: typeId,
        };
      });

      setServices(transformed);
      setFilteredServices(transformed);
    }
  }, [servicesData]);

  // Set available service types
  useEffect(() => {
    if (Array.isArray(typesData)) {
      setServiceTypes(typesData);
    }
  }, [typesData]);

  // Filter services by selected type
  useEffect(() => {
    if (selectedType === "all") {
      setFilteredServices(services);
    } else {
      setFilteredServices(
        services.filter((s) => s.service_type === selectedType)
      );
    }
  }, [selectedType, services]);

  const loading = servicesLoading || typesLoading;
  const error = servicesError || typesError;

  return (
    <Box sx={{ backgroundColor: "#f9f9f9" }}>
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          sx={style?.testimonialSection?.headline}
          mb={5}
        >
          Our Services
        </Typography>

        {/* Filter Tabs */}
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
              selected={selectedType === type.id}
              onClick={() => setSelectedType(type.id)}
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
            <Box sx={{ textAlign: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
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
      color: selected ? "#ffffff" : COLORS.primary,
      border: `1px solid ${COLORS.primary}`,
      fontWeight: 700,
      fontSize: "0.75rem",
      borderRadius: "20px",
      px: 2.5,
      py: 0.75,
      textTransform: "capitalize",
      minWidth: "auto",
      "&:hover": {
        backgroundColor: selected ? COLORS.primary : "#e0eaff",
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
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{ color: COLORS.primary }}
        >
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {post.meta_description.length > 150
            ? post.meta_description.slice(0, 60) + "..."
            : post.meta_description.slice(0, 60) + "..."}
        </Typography>
        <Button
          onClick={() => navigate(`/service/${post.slug}`)}
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
