import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import style from "../styles/Styles";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ConsultationModal from "./ConsultationModal";
import { Headset, LayoutGrid } from "lucide-react";

export default function HeroSection({ data }) {
  const location = useLocation();
  const path = location.pathname;
  const theme = useTheme();
  const styles = style.heroSection;

  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);

  if (!data) return(
    <Loader/>

  ); // or loading UI

  return (
    <Box sx={styles.heroContainer}>
      {/* Left Section */}
      <Box sx={styles.leftSection}>
        <Typography component="h1" sx={styles.title}>
          {data.heading || data?.title}
        </Typography>

        <Typography sx={styles.description}>
          {data.description}
        </Typography>
        {path == '/' ?
          <Box sx={{ display: "flex", gap: 2, mt: 4, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              sx={styles.buttonOrange}
              startIcon={<Headset size={20} />}
              onClick={() => setModalOpen(true)}
            >
              Speak to Expert
            </Button>
            <Button
              variant="outlined"
              sx={styles.buttonOutline}
              startIcon={<LayoutGrid size={20} />}
              onClick={() => navigate('/services')}
            >
              Our Services
            </Button>
          </Box>
          : ""
        }
        <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </Box>

      {/* Right Section */}
      <Box sx={styles.rightSection}>
        <Box
          component="img"
          src={data.image_url}
          alt="Hero Image"
          sx={styles.heroImage}
        />
      </Box>
    </Box>
  );
}
