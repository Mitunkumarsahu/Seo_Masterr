import {
    Backdrop,
    Box,
    Fade,
    IconButton,
    Modal,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import ConsultationForm from "./ConsultationForm";
import style, { COLORS } from "../styles/Styles";

const ConsultationModal = ({ open, onClose }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                sx: { backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0,0,0,0.6)' }
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        borderRadius: 4,
                        boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
                        p: { xs: 3, md: 5 },
                        width: "90%",
                        maxWidth: 500,
                        outline: 'none',
                        position: 'relative'
                    }}
                >
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        mb={1}
                        textAlign="center"
                        sx={{
                            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Speak to an Expert
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={4} textAlign="center">
                        Fill out the form below and we'll get back to you shortly.
                    </Typography>

                    <ConsultationForm onSuccess={onClose} />
                </Box>
            </Fade>
        </Modal>
    );
};

export default ConsultationModal;
