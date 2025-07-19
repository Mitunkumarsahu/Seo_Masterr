import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Avatar,
  Tooltip,
} from "@mui/material";
import { Menu as MenuIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import AuthModal from "./AuthModal";
import { useAuth } from "../hooks/useAuth";
import SubscribeModal from "./SubscribeModal";
import useApi from "../hooks/useApi";

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
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [email, setEmail] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const { apiCall: postSubscription, loading } = useApi();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const toggleDrawer = () => setMobileDrawerOpen((prev) => !prev);
  const handleMenuOpen = (event) => setUserMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setUserMenuAnchorEl(null);

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setSnackbar({
        open: true,
        message: "Please enter a valid email.",
        severity: "error",
      });
      return;
    }

    try {
      await postSubscription("http://127.0.0.1:8000/subscriptions/", "POST", {
        email,
      });
      setSnackbar({
        open: true,
        message: "Subscribed successfully!",
        severity: "success",
      });
      setEmail("");
      setModalOpen(false);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Subscription failed.",
        severity: "error",
      });
    }
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Blog", to: "/blogs" },
    { label: "Services", to: "/services" },
    { label: "About Us", to: "/about-us" },
    { label: "Contact Us", to: "/contact-us" },
  ];

  const getLinkStyle = (to) => {
    const path = location.pathname;
    const isActive =
      path === to ||
      path.startsWith(to + "/") ||
      (to === "/blogs" && path.startsWith("/blog/")) ||
      (to === "/services" && path.startsWith("/service/"));
    return {
      color: isActive ? COLORS.green400 : "white",
      fontWeight: isActive ? "bold" : "normal",
      "&:hover": { color: COLORS.green400 },
    };
  };

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: COLORS.blue800 }}>
        <Toolbar sx={{ minHeight: 64 }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
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

          {/* Desktop Nav */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 4,
              mr: 4,
            }}
          >
            {navLinks.map(({ label, to }) => (
              <NavLink key={label} to={to} style={{ textDecoration: "none" }}>
                <Button sx={getLinkStyle(to)}>{label}</Button>
              </NavLink>
            ))}
          </Box>

          {/* Desktop Auth */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* New Subscribe Button */}
            <Button
              variant="outlined"
              onClick={() => setModalOpen(true)}
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": { bgcolor: "white", color: COLORS.blue800 },
              }}
            >
              Subscribe
            </Button>

            {isAuthenticated ? (
              <>
                <Tooltip title="Account">
                  <IconButton onClick={handleMenuOpen} size="small">
                    <Avatar
                      sx={{
                        bgcolor: COLORS.green500,
                        width: 32,
                        height: 32,
                        fontSize: 14,
                      }}
                    >
                      {user?.sub?.[0]?.toUpperCase() || "U"}
                    </Avatar>
                  </IconButton>
                </Tooltip>

                <Menu
                  anchorEl={userMenuAnchorEl}
                  open={Boolean(userMenuAnchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{ sx: { mt: 1.5, minWidth: 180, boxShadow: 3 } }}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem disabled>
                    <Typography variant="subtitle2" color="text.secondary">
                      {user?.sub}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      logout();
                      handleMenuClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={() => setAuthModalOpen(true)}
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
                  onClick={() => setAuthModalOpen(true)}
                  sx={{
                    bgcolor: COLORS.green500,
                    "&:hover": { bgcolor: COLORS.green600 },
                  }}
                >
                  Sign&nbsp;Up
                </Button>
              </>
            )}
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {/* Subscribe button for mobile */}
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setModalOpen(true);
                toggleDrawer();
              }}
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": { bgcolor: "white", color: COLORS.blue800 },
              }}
            >
              Subscribe
            </Button>

            {isAuthenticated ? (
              <>
                <Typography sx={{ fontWeight: 600, mb: 1 }}>
                  {user?.sub}
                </Typography>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    logout();
                    toggleDrawer();
                  }}
                  sx={{
                    color: "white",
                    borderColor: "white",
                    "&:hover": { bgcolor: "white", color: COLORS.blue800 },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    setAuthModalOpen(true);
                    toggleDrawer();
                  }}
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
                  onClick={() => {
                    setAuthModalOpen(true);
                    toggleDrawer();
                  }}
                  sx={{
                    bgcolor: COLORS.green500,
                    "&:hover": { bgcolor: COLORS.green600 },
                  }}
                >
                  Sign&nbsp;Up
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Drawer>

      {/* Auth & Subscribe Modals */}
      <AuthModal
        open={authModalOpen}
        handleClose={() => setAuthModalOpen(false)}
        onSuccess={() => setAuthModalOpen(false)}
        redirectTo={"/"}
      />

      <SubscribeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        email={email}
        setEmail={setEmail}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
