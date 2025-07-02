import React, { useState } from "react";

// ——— MUI ———
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton'; 
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { ChevronDown, Menu as MenuIcon } from "lucide-react";

const COLORS = {
  blue800: "#1e3a8a",
  green400: "#34d399",
  green500: "#22c55e",
  green600: "#16a34a",
  slate200: "#e2e8f0",
  slate600: "#475569",
  slate700: "#334155",
};

export default function NavBar() {
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);
  const [aboutAnchorEl, setAboutAnchorEl] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleMenuOpen = (event, setter) => {
    setter(event.currentTarget);
  };

  const handleMenuClose = () => {
    setServicesAnchorEl(null);
    setAboutAnchorEl(null);
  };

  const toggleDrawer = () => setMobileDrawerOpen((prev) => !prev);

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: COLORS.blue800 }}>
        <Toolbar sx={{ minHeight: 64 }}>
          {/* Logo */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: "white",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                component="span"
                sx={{ color: COLORS.blue800, fontWeight: "bold" }}
              >
                S
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Site
            </Typography>
          </Box>

          {/* Desktop Nav Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 4,
              mr: 4,
            }}
          >
            <Button
              href="#"
              sx={{ color: "white", "&:hover": { color: COLORS.green400 } }}
            >
              Home
            </Button>
            <Button
              href="#"
              sx={{ color: "white", "&:hover": { color: COLORS.green400 } }}
            >
              Blog
            </Button>

            {/* Services Dropdown */}
            <Button
              sx={{ color: "white", "&:hover": { color: COLORS.green400 } }}
              endIcon={<ChevronDown size={16} />}
              onClick={(e) => handleMenuOpen(e, setServicesAnchorEl)}
            >
              Services
            </Button>
            <Menu
              anchorEl={servicesAnchorEl}
              open={Boolean(servicesAnchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              PaperProps={{
                sx: { width: 200, bgcolor: "white", color: COLORS.slate600 },
              }}
              disableScrollLock
            >
              {[
                "Web Development",
                "Mobile Apps",
                "UI/UX Design",
                "SEO Services",
              ].map((txt) => (
                <MenuItem
                  key={txt}
                  component="a"
                  href="#"
                  onClick={handleMenuClose}
                  sx={{ "&:hover": { bgcolor: COLORS.slate200 } }}
                >
                  {txt}
                </MenuItem>
              ))}
            </Menu>

            {/* About Us Dropdown */}
            <Button
              sx={{ color: "white", "&:hover": { color: COLORS.green400 } }}
              endIcon={<ChevronDown size={16} />}
              onClick={(e) => handleMenuOpen(e, setAboutAnchorEl)}
            >
              About Us
            </Button>
            <Menu
              anchorEl={aboutAnchorEl}
              open={Boolean(aboutAnchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              PaperProps={{
                sx: { width: 200, bgcolor: "white", color: COLORS.slate600 },
              }}
              disableScrollLock
            >
              {["Our Team", "Our Story", "Mission & Vision", "Careers"].map(
                (txt) => (
                  <MenuItem
                    key={txt}
                    component="a"
                    href="#"
                    onClick={handleMenuClose}
                    sx={{ "&:hover": { bgcolor: COLORS.slate200 } }}
                  >
                    {txt}
                  </MenuItem>
                )
              )}
            </Menu>

            <Button
              href="#"
              sx={{ color: "white", "&:hover": { color: COLORS.green400 } }}
            >
              Contact&nbsp;Us
            </Button>
          </Box>

          {/* Desktop Auth */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": { bgcolor: "white", color: COLORS.blue800 },
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: COLORS.green500,
                "&:hover": { bgcolor: COLORS.green600 },
              }}
            >
              Sign&nbsp;Up
            </Button>
          </Box>

          {/* Mobile Toggle */}
          <IconButton
            onClick={toggleDrawer}
            sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
            aria-label="open menu"
          >
            <MenuIcon size={24} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: { width: 260, bgcolor: COLORS.blue800, color: "white" },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Menu
          </Typography>
          <Divider sx={{ borderColor: COLORS.slate700, mb: 2 }} />
          <List>
            {["Home", "Blog", "Services", "About Us", "Contact Us"].map(
              (txt) => (
                <ListItem key={txt} disablePadding>
                  <ListItemButton
                    component="a"
                    href="#"
                    onClick={toggleDrawer}
                    sx={{
                      "&:hover": { bgcolor: COLORS.slate700 },
                    }}
                  >
                    <ListItemText primary={txt} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
          <Divider sx={{ borderColor: COLORS.slate700, my: 2 }} />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": { bgcolor: "white", color: COLORS.blue800 },
              }}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: COLORS.green500,
                "&:hover": { bgcolor: COLORS.green600 },
              }}
            >
              Sign&nbsp;Up
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
