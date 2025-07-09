// src/pages/Services.jsx
import {
    Avatar,
    Box,
    Button,
    Container,
    Typography
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import useApi from "../hooks/useApi"; // Make sure this path is correct
  
  const Services = () => {
    const [services, setServices] = useState([]);
  
    const {
      apiCall: getServices,
      loading,
      error,
      data
    } = useApi();
  
    useEffect(() => {
      const fetchServices = async () => {
        try {
          await getServices("http://127.0.0.1:8000/services"); // Replace with actual URL
        } catch (err) {
          console.error("Failed to fetch services:", err);
        }
      };
      fetchServices();
    }, []);
  
    useEffect(() => {
      if (data) {
        setServices(data);
      }
    }, [data]);
  
    return (
      <Box sx={{ backgroundColor: "#fff" }}>
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Typography variant="h3" fontWeight="bold" textAlign="center" mb={6}>
            Our Services
          </Typography>
  
          {/* Service Cards */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              justifyContent: "space-around",
              mb: 8,
              px: 2
            }}
          >
            {loading ? (
              <Typography>Loading services...</Typography>
            ) : error ? (
              <Typography color="error">Failed to load services.</Typography>
            ) : (
              services.map((post) => (
                <Box
                  key={post.id}
                  sx={{
                    flex: "1 1 360px",
                    maxWidth: "380px"
                  }}
                >
                  <ServiceCard post={post} />
                </Box>
              ))
            )}
          </Box>
        </Container>
  
        {/* CTA Section */}
        <Box sx={{ backgroundColor: "#0b2a4d", py: 8, px: 2 }}>
          <Container maxWidth="md">
            <Typography variant="body1" sx={{ color: "#fff", textAlign: "center", mb: 4 }}>
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </Typography>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                sx={{ backgroundColor: "#00C896", px: 5, py: 2 }}
              >
                LOREM IPSUM
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    );
  };
  
  const ServiceCard = ({ post }) => {
    const navigate = useNavigate();
  
    return (
      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.06)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-6px)"
          }
        }}
      >
        <Box sx={{ height: 200, width: "100%", backgroundColor: "#ccc" }} >
        <img
                src={post?.image_url} // ✅ Provide a valid image URL
                alt="Preview"
                style={{ height: "100%", width:"100%", objectFit: "cover" }}
            />        </Box>
  
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1.5 }}>
            {post.title}
          </Typography>
  
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
            {post.meta_description}
          </Typography>
  
          <Typography
            variant="body2"
            sx={{
              color: "#0d66ff",
              fontWeight: 600,
              mb: 2,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" }
            }}
            onClick={() => navigate(`/service/${post.slug}`)}
          >
            LEARN MORE →
          </Typography>
  
          {/* <Box sx={{ display: "flex", alignItems: "center", mt: "auto" }}>
            <Avatar sx={{ width: 28, height: 28, mr: 1.5, bgcolor: "#ccc" }} />
            <Typography variant="body2" color="text.primary">
              Admin
            </Typography>
          </Box> */}
        </Box>
      </Box>
    );
  };
  
  export default Services;
  