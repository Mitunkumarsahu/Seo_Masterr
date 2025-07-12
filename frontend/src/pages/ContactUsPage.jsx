import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  useTheme,
  Divider,
  CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { motion, AnimatePresence } from "framer-motion";
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
  const [submitted, setSubmitted] = useState(false);

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
    await submitForm(
      "http://127.0.0.1:8000/contact-inquiries/",
      "POST",
      formData
    );
    setFormData({ name: "", email: "", phone: "", message: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
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
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Box maxWidth="900px">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {contactHero?.title || "Contact Us"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.2rem", mt: 2 }}>
              {contactHero?.description ||
                "Let us know how we can help your business succeed."}
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* Main Content Section */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems="stretch"
        gap={4}
        mt={6}
        px={2}
      >
        {/* Contact Info Box */}
        <Paper
          elevation={3}
          component={motion.div}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          sx={{
            flex: 1,
            minWidth: { xs: "100%", md: "45%" },
            display: "flex",
            flexDirection: "column",
            gap: 3,
            p: 3,
            borderRadius: 3,
            backgroundColor: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -9, // space between text and underline
                left: "5%",
                transform: "translateX(-50%)",
                width: "10%", // or any width you prefer
                height: "4px",
                background:
                  "linear-gradient(90deg, #1e3a8a 0%, #1e3a8a 50%, #1e3a8a 100%)",
                borderRadius: "2px",
              },
            }}
          >
            {contactInfo?.section_title || "Get In Touch"}
          </Typography>

          <Box display="flex" alignItems="start" gap={2}>
            <LocationOnIcon sx={{ color: "#1e3a8a" }} />
            <Typography>{contactInfo?.address}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <EmailIcon sx={{ color: "#1e3a8a" }} />
            <Typography>{contactInfo?.email}</Typography>
          </Box>

          {contactInfo?.phone_numbers?.map((phone, idx) => (
            <Box key={idx} display="flex" alignItems="center" gap={2}>
              <PhoneIcon sx={{ color: "#1e3a8a" }} />
              <Typography>{phone}</Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Box display="flex" alignItems="center" gap={2}>
            <AccessTimeIcon sx={{ color: "#1e3a8a" }} />
            <Typography>Mon - Sat: 9:00 AM - 6:00 PM</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <BusinessCenterIcon sx={{ color: "#1e3a8a" }} />
            <Typography>We usually reply within 24 hours</Typography>
          </Box>

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
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
            sx={{ color: "#fff" }}
          >
            <motion.div
              animate={{ rotate: [0, 1, -1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Typography variant="h6" fontWeight="bold">
                Would you like to start a project with us?
              </Typography>
            </motion.div>
            <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
              Tell us your goals and challenges — we’ll help you solve them with
              tailored solutions and fast support.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#fff",
                color: theme.palette.primary.main,
              }}
              onClick={() => window.open(`tel:${contactInfo?.toll_free || ""}`)}
              component={motion.button}
              whileTap={{ scale: 0.97 }}
            >
              CALL NOW
            </Button>
          </Box>
        </Paper>

        {/* Form Box */}
        <Paper
          elevation={3}
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          sx={{
            flex: 1,
            minWidth: { xs: "100%", md: "45%" },
            p: 3,
            borderRadius: 3,
            backgroundColor: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Request Free Consultation
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
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
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <Typography color="green" fontWeight={500}>
                    ✅ Message sent successfully!
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={submitting}
              sx={{ borderRadius: 2, bgcolor: "#1e3a8a", color: "#fff" }}
              component={motion.button}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
            >
              {submitting ? (
                <CircularProgress size={20} sx={{ color: "#fff" }} />
              ) : (
                "SUBMIT"
              )}
            </Button>
          </Box>

          {/* Map */}
          {contactInfo?.map_embed && (
            <Box mt={4}>
              <iframe
                title="map"
                src={contactInfo.map_embed}
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
              />
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default ContactUsPage;
