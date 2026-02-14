import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography,
    Snackbar,
    Alert,
    InputAdornment,
} from "@mui/material";
import {
    User,
    Mail,
    Phone,
    MessageSquare,
    Send
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import useApi from "../hooks/useApi";
import style, { COLORS } from '../styles/Styles';

const ConsultationForm = ({ onSuccess }) => {
    const { apiCall: submitForm, loading: submitting } = useApi();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await submitForm(
                import.meta.env.VITE_BACKEND_URL + "/contact-inquiries/",
                "POST",
                formData
            );
            setFormData({ name: "", email: "", phone: "", message: "" });
            setSnackbar({ open: true, message: "Consultation request sent successfully!", severity: "success" });

            if (onSuccess) {
                setTimeout(onSuccess, 1500); // natural delay before auto-closing
            }
        } catch (error) {
            setSnackbar({ open: true, message: "Failed to send request. Please try again.", severity: "error" });
            console.error("Submission failed:", error);
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <TextField
                fullWidth
                label="Your Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <User size={20} color={COLORS.primary} />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                fullWidth
                label="Your Email *"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Mail size={20} color={COLORS.primary} />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Phone size={20} color={COLORS.primary} />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                fullWidth
                multiline
                rows={4}
                label="Your Message *"
                name="message"
                value={formData.message}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                            <MessageSquare size={20} color={COLORS.primary} />
                        </InputAdornment>
                    ),
                }}
            />
            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={submitting}
                sx={{
                    borderRadius: 2,
                    bgcolor: COLORS.secondary,
                    color: "#fff",
                    py: 1.5,
                    fontWeight: "bold",
                    "&:hover": {
                        bgcolor: "#e65100",
                    }
                }}
                component={motion.button}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                startIcon={!submitting && <Send size={20} />}
            >
                {submitting ? (
                    <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                    "SUBMIT REQUEST"
                )}
            </Button>
        </Box>
    );
};

export default ConsultationForm;
