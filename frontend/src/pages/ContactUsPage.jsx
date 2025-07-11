import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  useTheme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { motion } from "framer-motion";
import useApi from "../hooks/useApi";

const ContactUsPage = () => {
  const theme = useTheme();

  const { apiCall: fetchHero, data: heroData } = useApi();
  const { apiCall: fetchInfo, data: infoData } = useApi();
  const { apiCall: submitForm, loading: submitting } = useApi();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    fetchHero("http://127.0.0.1:8000/contact-hero/?active_only=false");
    fetchInfo("http://127.0.0.1:8000/contact-info/");
  }, []);

  const contactHero = heroData?.find((item) => item.is_active);
  const contactInfo = infoData?.find((item) => item.is_active);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await submitForm("http://127.0.0.1:8000/contact-inquiries/", "POST", formData);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9ff", pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          py: 6,
          textAlign: "center",
          backgroundImage: `linear-gradient(to right, rgba(20, 30, 48, 0.85), rgba(36, 59, 85, 0.85)), url(${contactHero?.image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <Box maxWidth="900px">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {contactHero?.title || "Contact Us"}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.2rem", mt: 2 }}>
            {contactHero?.description ||
              "Let us know how we can help your business succeed."}
          </Typography>
        </Box>
      </Box>

      {/* Main Content Section */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems="stretch"
        flexWrap="wrap"
        gap="5px"
        mt={6}
        px={2}
      >
        {/* Contact Info Box */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          sx={{
            flex: 1,
            maxWidth: "48%",
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            p: 2,
            backgroundColor: "#fff",
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {contactInfo?.section_title || "Get In Touch"}
          </Typography>

          <Box display="flex" alignItems="start" gap={2}>
            <LocationOnIcon sx={{ color: "#1e3a8a" }}  />
            <Typography>{contactInfo?.address}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <EmailIcon sx={{ color: "#1e3a8a" }}  />
            <Typography>{contactInfo?.email}</Typography>
          </Box>

          {contactInfo?.phone_numbers?.map((phone, idx) => (
            <Box key={idx} display="flex" alignItems="center" gap={2}>
              <PhoneIcon sx={{ color: "#1e3a8a" }}  />
              <Typography>{phone}</Typography>
            </Box>
          ))}

          <Box mt={2}>
            <Typography variant="subtitle2" fontWeight="bold">
              Call us Toll-Free
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
            >
              {contactInfo?.toll_free}
            </Typography>
          </Box>

          {/* Bottom CTA Section */}
          <Box
            mt={4}
            p={3}
            borderRadius={3}
            bgcolor="#1e3a8a"
            textAlign="center"
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            sx={{
              color: "#fff",
              background:"#1e3a8a",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Would you like to start a project with us?
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
              Etiam erat lectus, finibus eget commodo quis, tincidunt eget leo.
              Nullam quis vulputate orci, ac accumsan quam. Morbi fringilla
              congue libero.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: "#fff", color: theme.palette.primary.main }}
              onClick={() => window.open(`tel:${contactInfo?.toll_free || ""}`)}
            >
              CALL NOW
            </Button>
          </Box>
        </Box>

        {/* Form + Map Section */}
        <Paper
          elevation={3}
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          sx={{
            flex: 1,
            maxWidth: "48%",
            minWidth: "300px",
            borderRadius: 3,
            p: 4,
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Request Free Consultation
          </Typography>

          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={3}
            alignItems="flex-start"
          >
            {/* Form */}
            <Box flex={1} display="flex" flexDirection="column" gap={2}>
              <TextField
                fullWidth
                label="Your Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Your Email *"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Your Message *"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={submitting}
                sx={{ borderRadius: 2, bgcolor:"#1e3a8a", color: "#fff" }}
              >
                {submitting ? "Submitting..." : "SUBMIT"}
              </Button>
            </Box>

            {/* Map */}
            {contactInfo?.map_embed && (
              <Box
                flex={1}
                sx={{
                  mt: { xs: 3, md: 0 },
                  width: "100%",
                  height: "100%",
                  minHeight: "250px",
                }}
              >
                <iframe
                  title="map"
                  src={contactInfo.map_embed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "12px", minHeight: 250 }}
                  allowFullScreen
                  loading="lazy"
                />
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ContactUsPage;
