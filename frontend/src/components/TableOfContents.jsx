import {
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu"; 
import { COLORS } from "../styles/Styles";

const TableOfContents = ({ toc }) => {
  const theme = useTheme();
  const isMobileOrTab = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    handleClose();
  };

  return (
    <>
      {/* Desktop / Laptop / Larger screens */}
      {!isMobileOrTab && (
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#fff",
            minHeight: "200px",
            maxHeight: "600px",
            p: 2,
            borderRadius: 2,
            overflowY: "auto",
            boxShadow: 1,
            alignSelf: "flex-start",
            position: "sticky",
            top: 80,
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Table of Contents
          </Typography>
          {toc.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No headings found.
            </Typography>
          ) : (
            toc.map((item, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  pl: item.level === "H2" ? 1 : item.level === "H3" ? 3 : 0,
                  cursor: "pointer",
                  color: COLORS.primary,
                  mb: 1,
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() =>
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                {item.text}
              </Typography>
            ))
          )}
        </Box>
      )}

      {/* Mobile / Tablet Floating Button */}
      {isMobileOrTab && toc.length > 0 && (
        <>
          <IconButton
            onClick={handleOpen}
            sx={{
              position: "sticky",
              top: 70, // adjust based on navbar height
              left: "calc(100% - 60px)", // stick to right side
              zIndex: 1100,
              backgroundColor: COLORS.primary,
              color: COLORS.secondary,
              width: 48,
              height: 48,
              borderRadius: "50%",
              boxShadow: 3,
              "&:hover": {
                backgroundColor: COLORS.secondary,
                color: COLORS.primary,
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem disabled>Table of Contents</MenuItem>
            {toc.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => handleSelect(item.id)}
                sx={{ pl: item.level === "H2" ? 2 : item.level === "H3" ? 4 : 1 }}
              >
                {item.text}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </>
  );
};

export default TableOfContents;
