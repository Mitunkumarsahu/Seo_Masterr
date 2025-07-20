import { Box, Container, Typography, Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { COLORS } from "../styles/Styles";
import style from "../styles/Styles"; // Ensure this path is correct

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  const { apiCall: fetchService, data: serviceData, loading, error } = useApi();

  useEffect(() => {
    if (id) {
      fetchService(`http://127.0.0.1:8000/services/${id}`);
    }
  }, [id]);

  useEffect(() => {
    if (serviceData) {
      setService(serviceData);
    }
  }, [serviceData]);

  if (loading)
    return (
      <Typography textAlign="center" mt={10}>
        Loading service...
      </Typography>
    );
  if (error)
    return (
      <Typography color="error" textAlign="center" mt={10}>
        {error}
      </Typography>
    );
  if (!service) return null;

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", pt: 0 }}>
      {/* Hero Image */}
      <Box
        sx={{
          height: { xs: 250, md: 400 },
          backgroundImage: `url(${service.image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 2,
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            color="white"
            sx={{ maxWidth: "90%", lineHeight: 1.2 }}
          >
            {service.title}
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 12 }, py: 6 }}>
        <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
          <Typography
            variant="subtitle2"
            sx={{ color: COLORS.primary, fontWeight: "bold", mb: 1 }}
          >
            {service.service_type?.name?.toUpperCase()}
          </Typography>

          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
            {service.title}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {service.meta_description}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Render HTML Content */}
          <Box
            sx={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "normal",
              backgroundColor: "#fff",
              p: { xs: 2, md: 4 },
              borderRadius: 2,
              boxShadow: 1,
              overflowX: "auto",
              fontSize: "1rem",
              lineHeight: 1.8,
              "& img": {
                maxWidth: "100%",
                height: "auto",
                borderRadius: 2,
                my: 2,
                display: "block",
              },
              "& table": {
                width: "100%",
                borderCollapse: "collapse",
                my: 2,
                overflowX: "auto",
                display: "block",
              },
              "& table, & th, & td": {
                border: "1px solid #ddd",
              },
              "& th, & td": {
                padding: "8px",
                textAlign: "left",
                wordBreak: "break-word",
              },
              "& iframe, & video": {
                maxWidth: "100%",
                height: "auto",
                borderRadius: 2,
                my: 2,
                display: "block",
              },
              "& p": {
                marginBottom: "1rem",
                lineHeight: 1.7,
                fontSize: "1rem",
                color: "#333",
              },
              "& pre, & code": {
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                backgroundColor: "#f4f4f4",
                padding: "0.5rem",
                borderRadius: "6px",
                display: "block",
                fontSize: "0.9rem",
                overflowX: "auto",
              },
              "& *": {
                boxSizing: "border-box",
              },
            }}
            dangerouslySetInnerHTML={{ __html: service.content }}
          />

          {/* CTA */}
          <Box
            mt={6}
            p={4}
            borderRadius={4}
            sx={{
              background: COLORS.primary,
              color: "#fff",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={2}
              sx={{
                fontSize: { xs: "32px", md: "48px" },
                fontWeight: "bold",
                lineHeight: 1.1,
                mb: 3,
                background: `linear-gradient(135deg, #fff 50%, #FF6D00 20%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                position: "relative",
                animation: "textGlow 2s ease-in-out infinite alternate",
                textAlign: "center",
                letterSpacing: "-0.02em",
              }}
            >
              Ready to get started with {service.title}?
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/contact-us")}
              sx={style.heroSection.button}
            >
              Contact Us
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ServiceDetail;
