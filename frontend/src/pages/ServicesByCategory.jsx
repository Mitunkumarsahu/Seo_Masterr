import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HomeFooterSearch from "../components/HomeFooterSearch";
import useApi from "../hooks/useApi";
import style, { COLORS } from "../styles/Styles";
import Loader from "../components/Loader";

const ServicesByCategory = () => {
  const [services, setServices] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const { categorySlug } = useParams();

  const navigate = useNavigate();

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
  } = useApi();

  // Fetch service types to find the category ID
  useEffect(() => {
    getServiceTypes(import.meta.env.VITE_APP_BACKEND_URL+"/wp-json/wp/v2/service_type?per_page=100");
  }, []);

  // Find category by slug and fetch services
  useEffect(() => {
    if (Array.isArray(typesData) && categorySlug) {
      const category = typesData.find((type) => type.slug === categorySlug);
      
      if (category) {
        setCategoryInfo(category);
        // Fetch services filtered by this category
        getServices(
          import.meta.env.VITE_APP_BACKEND_URL+
          `/wp-json/wp/v2/service?_embed&per_page=100&service_type=${category.id}`
        );
      }
    }
  }, [typesData, categorySlug]);

  // Transform services data
  useEffect(() => {
    if (Array.isArray(servicesData)) {
      const transformed = servicesData.map((post) => {
        return {
          id: post.id,
          title: decodeHTML(post.title.rendered),
          meta_description: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
          slug: post.slug,
          image_url:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://via.placeholder.com/300x200",
        };
      });

      setServices(transformed);
    }
  }, [servicesData]);

  const loading = servicesLoading || typesLoading;
  const error = servicesError;

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "80vh" }}>
      <Container maxWidth="xl" sx={{ py: 8 }}>
        {/* Category Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={style?.testimonialSection?.headline}
            mb={2}
          >
            {categoryInfo?.name || "Services"}
          </Typography>
          
          {categoryInfo?.description && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: "auto", mb: 3 }}
            >
              {decodeHTML(categoryInfo.description)}
            </Typography>
          )}

          <Button
            variant="outlined"
            onClick={() => navigate("/services")}
            sx={{
              borderColor: COLORS.primary,
              color: COLORS.primary,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: COLORS.primary,
                color: "white",
              },
            }}
          >
            ← View All Services
          </Button>
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
            <Box sx={{ textAlign: "center", py: 4, gridColumn: "1 / -1" }}>
              <Loader />
            </Box>
          ) : error ? (
            <Typography color="error" textAlign="center" sx={{ gridColumn: "1 / -1" }}>
              {error}
            </Typography>
          ) : services.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8, gridColumn: "1 / -1" }}>
              <Typography variant="h6" color="text.secondary">
                No services found in this category.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/services")}
                sx={{
                  mt: 3,
                  backgroundColor: COLORS.primary,
                  "&:hover": {
                    backgroundColor: COLORS.secondary,
                  },
                }}
              >
                Browse All Services
              </Button>
            </Box>
          ) : (
            services.map((service) => (
              <ServiceCard key={service.id} post={service} />
            ))
          )}
        </Box>
      </Container>

      <HomeFooterSearch />
    </Box>
  );
};

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

export default ServicesByCategory;
