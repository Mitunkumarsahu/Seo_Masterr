import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import style, { COLORS } from "../styles/Styles";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const ServiceDetail = () => {
  const { slug } = useParams(); // now using slug instead of id
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  const decodeHTML = (html) => {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html").body.textContent || "";
  };

  const { apiCall: fetchService, data: serviceData, loading, error } = useApi();

  useEffect(() => {
    if (slug) {
      fetchService(
        import.meta.env.VITE_APP_BACKEND_URL +
          `/wp-json/wp/v2/service?slug=${slug}&_embed`
      );
    }
  }, [slug]);

  useEffect(() => {
    if (Array.isArray(serviceData) && serviceData.length > 0) {
      const post = serviceData[0];

      const serviceDetail = {
        id: post.id,
        title: decodeHTML(post.title.rendered),
        content: decodeHTML(post.content.rendered),
        meta_description: decodeHTML(
          post.excerpt.rendered.replace(/<[^>]+>/g, "")
        ),
        image_url:
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "https://via.placeholder.com/1200x600",
        service_type: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "",
      };

      setService(serviceDetail);
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
      <Tooltip title="Copy link" arrow>
        <Button
          size="small"
          variant="contained"
          sx={{
            position: "absolute",
            right: 0,
            textAlign: "right",
            minWidth: "unset",
            padding: "6px",
            borderRadius: "50%",
            background: "#FF6D00",
            color: "white",
            margin: 2,
            boxShadow: 3,
            "&:hover": {
              backgroundColor: "#FF6D00",
            },
          }}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
          }}
        >
          <ContentCopyIcon fontSize="small" />
        </Button>
      </Tooltip>
      <Box
        sx={{
          position: "",
          top: 12,
          right: 12,
          margin: 2,
          display: "flex",
          flexDirection: "row",
          gap: "6px",
        }}
      >
        <FacebookShareButton url={window.location.href} quote={service.title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <LinkedinShareButton url={window.location.href} title={service.title}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>

        <TwitterShareButton url={window.location.href} title={service.title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <WhatsappShareButton url={window.location.href}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </Box>

      {/* Content Section */}
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 12 }, py: 6 }}>
        <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
          {service.service_type && (
            <Typography
              variant="subtitle2"
              sx={{ color: COLORS.primary, fontWeight: "bold", mb: 1 }}
            >
              {service.service_type.toUpperCase()}
            </Typography>
          )}

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
