import React, { useEffect, useState } from "react";
import { Fab, Zoom } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    const scrolled = window.scrollY;
    setVisible(scrolled > 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={visible}>
      <Fab
        size="medium"
        color="primary"
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1200,
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          color: "white",
          "&:hover": {
            bgcolor: "#1e40af",
          },
        }}
        aria-label="scroll back to top"
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  );
}
