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
import { ChevronDown, Menu as MenuIcon } from "lucide-react";import { NavLink, useLocation } from "react-router-dom"; // ← Import this

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
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const location = useLocation();

  const handleMenuOpen = (event, setter) => setter(event.currentTarget);
  const handleMenuClose = () => setServicesAnchorEl(null);
  const toggleDrawer = () => setMobileDrawerOpen((prev) => !prev);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Blog", to: "/blogs" },
    { label: "Services", to: "/service", isDropdown: true },
    { label: "About Us", to: "/about-us" },
    { label: "Contact Us", to: "/contact-us" },
  ];

  const getLinkStyle = (to) => ({
    color: location.pathname === to ? COLORS.green400 : "white",
    fontWeight: location.pathname === to ? "bold" : "normal",
    "&:hover": { color: COLORS.green400 },
  });

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: COLORS.blue800 }}>
        <Toolbar sx={{ minHeight: 64 }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
            <Box sx={{
              width: 40,
              height: 40,
              bgcolor: "white",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Typography variant="h6" component="span" sx={{ color: COLORS.blue800, fontWeight: "bold" }}>
                S
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Site
            </Typography>
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 4, mr: 4 }}>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <Button sx={getLinkStyle("/")}>Home</Button>
            </NavLink>
            <NavLink to="/blogs" style={{ textDecoration: "none" }}>
              <Button sx={getLinkStyle("/blogs")}>Blog</Button>
            </NavLink>

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
              PaperProps={{ sx: { width: 200, bgcolor: "white", color: COLORS.slate600 } }}
              disableScrollLock
            >
              {["Web Development", "Mobile Apps", "UI/UX Design", "SEO Services"].map((txt) => (
                <MenuItem key={txt} component={NavLink} to={`/${txt.toLowerCase().replace(/ /g, "-")}`} onClick={handleMenuClose}>
                  {txt}
                </MenuItem>
              ))}
            </Menu>

            <NavLink to="/about-us" style={{ textDecoration: "none" }}>
              <Button sx={getLinkStyle("/about-us")}>About Us</Button>
            </NavLink>
            <NavLink to="/contact-us" style={{ textDecoration: "none" }}>
              <Button sx={getLinkStyle("/contact-us")}>Contact&nbsp;Us</Button>
            </NavLink>
          </Box>

          {/* Auth Buttons */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
            <Button variant="outlined" sx={{
              color: "white", borderColor: "white",
              "&:hover": { bgcolor: "white", color: COLORS.blue800 },
            }}>
              Login
            </Button>
            <Button variant="contained" sx={{
              bgcolor: COLORS.green500,
              "&:hover": { bgcolor: COLORS.green600 },
            }}>
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
        PaperProps={{ sx: { width: 260, bgcolor: COLORS.blue800, color: "white" } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Menu</Typography>
          <Divider sx={{ borderColor: COLORS.slate700, mb: 2 }} />
          <List>
            {navLinks.map(({ label, to }) => (
              <ListItem key={label} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={to}
                  onClick={toggleDrawer}
                  sx={{
                    "&.active": { bgcolor: COLORS.slate700 },
                    "&:hover": { bgcolor: COLORS.slate700 },
                  }}
                >
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ borderColor: COLORS.slate700, my: 2 }} />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button fullWidth variant="outlined" sx={{
              color: "white", borderColor: "white",
              "&:hover": { bgcolor: "white", color: COLORS.blue800 },
            }}>
              Login
            </Button>
            <Button fullWidth variant="contained" sx={{
              bgcolor: COLORS.green500,
              "&:hover": { bgcolor: COLORS.green600 },
            }}>
              Sign&nbsp;Up
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
