import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon, ChevronDown, Grid3x3, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import AuthModal from "./AuthModal";
import SubscribeModal from "./SubscribeModal";
import {COLORS as COLOR} from "../styles/Styles"
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
  const [servicesMenuAnchorEl, setServicesMenuAnchorEl] = useState(null);
  const [email, setEmail] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [serviceTypes, setServiceTypes] = useState([]);

  const { apiCall: postSubscription, loading } = useApi();
  const { apiCall: getServiceTypes, data: typesData } = useApi();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const toggleDrawer = () => setMobileDrawerOpen((prev) => !prev);
  const handleMenuOpen = (event) => setUserMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setUserMenuAnchorEl(null);
  const handleServicesMenuOpen = (event) => setServicesMenuAnchorEl(event.currentTarget);
  const handleServicesMenuClose = () => setServicesMenuAnchorEl(null);

  // Fetch service types on mount
  React.useEffect(() => {
    getServiceTypes(import.meta.env.VITE_APP_BACKEND_URL+"/wp-json/wp/v2/service_type?per_page=100");
  }, []);

  // Set service types from API
  React.useEffect(() => {
    if (Array.isArray(typesData)) {
      setServiceTypes(typesData);
    }
  }, [typesData]);

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
      await postSubscription(import.meta.env.VITE_BACKEND_URL+"/subscriptions/", "POST", {
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
    { label: "Services", to: "/services", hasDropdown: true },
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
      color: isActive ? "#FF6D00" : "white",
      fontWeight: isActive ? "bold" : "normal",
      "&:hover": { color: "#FF6D00" },
    };
  };

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#2E2E2E" }}>
        <Toolbar sx={{ minHeight: 64 }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
            {/* <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: "white",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            > */}
              {/* <Typography
                variant="h6"
                component="span"
                sx={{ color: COLORS.blue800, fontWeight: "bold" }}
              >
                S
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Site
            </Typography> */}
            <Box variant="image">
              <img src="/main-logo.png" alt="Logo" style={{ width: 106, height: 40 }} />
            </Box>
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
            {navLinks.map(({ label, to, hasDropdown }) => (
              hasDropdown ? (
                <Box key={label} sx={{ position: "relative" }}>
                  <Button 
                    sx={{
                      ...getLinkStyle(to),
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#FF6D00",
                        transform: "translateY(-2px)",
                      },
                    }}
                    onClick={handleServicesMenuOpen}
                    endIcon={
                      <ChevronDown 
                        size={16} 
                        style={{ 
                          transition: "transform 0.3s ease",
                          transform: Boolean(servicesMenuAnchorEl) ? "rotate(180deg)" : "rotate(0deg)"
                        }} 
                      />
                    }
                  >
                    {label}
                  </Button>
                  <Menu
                    anchorEl={servicesMenuAnchorEl}
                    open={Boolean(servicesMenuAnchorEl)}
                    onClose={handleServicesMenuClose}
                    PaperProps={{ 
                      sx: { 
                        mt: 1.5, 
                        minWidth: 240, 
                        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                        borderRadius: 2,
                        maxHeight: 450,
                        overflowY: "auto",
                        border: "1px solid rgba(0,0,0,0.08)",
                        "&::-webkit-scrollbar": {
                          width: "6px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "#f1f1f1",
                          borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: COLOR.primary,
                          borderRadius: "10px",
                          "&:hover": {
                            background: COLOR.secondary,
                          },
                        },
                      } 
                    }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    TransitionProps={{
                      timeout: 300,
                    }}
                  >
                    <MenuItem 
                      onClick={() => {
                        navigate("/services");
                        handleServicesMenuClose();
                      }}
                      sx={{ 
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        py: 1.5,
                        px: 2.5,
                        color: COLOR.primary,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: `${COLOR.primary}15`,
                          color: COLOR.secondary,
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      <Grid3x3 size={18} />
                      All Services
                    </MenuItem>
                    <Divider sx={{ my: 1, borderColor: "rgba(0,0,0,0.08)" }} />
                    {serviceTypes.map((type, index) => (
                      <MenuItem
                        key={type.id}
                        onClick={() => {
                          navigate(`/services/${type.slug}`);
                          handleServicesMenuClose();
                        }}
                        sx={{
                          py: 1.2,
                          px: 2.5,
                          fontSize: "0.9rem",
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          transition: "all 0.2s ease",
                          animation: `fadeIn 0.3s ease ${index * 0.05}s both`,
                          "@keyframes fadeIn": {
                            from: {
                              opacity: 0,
                              transform: "translateY(-10px)",
                            },
                            to: {
                              opacity: 1,
                              transform: "translateY(0)",
                            },
                          },
                          "&:hover": {
                            backgroundColor: `${COLOR.primary}10`,
                            color: COLOR.primary,
                            transform: "translateX(4px)",
                            "& .service-icon": {
                              color: COLOR.secondary,
                              transform: "scale(1.2)",
                            },
                          },
                        }}
                      >
                        <CheckCircle2 
                          size={16} 
                          className="service-icon"
                          style={{ 
                            transition: "all 0.2s ease",
                            color: COLOR.primary,
                            opacity: 0.6,
                          }} 
                        />
                        {type.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <NavLink key={label} to={to} style={{ textDecoration: "none" }}>
                  <Button sx={getLinkStyle(to)}>{label}</Button>
                </NavLink>
              )
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
                    bgcolor: COLOR.secondary,
                    "&:hover": { bgcolor: COLOR.primary },
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
          sx: { width: 260, bgcolor: COLOR.primary, color: "white" },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Menu
          </Typography>
          <Divider sx={{ borderColor: COLORS.slate700, mb: 2 }} />
          <List>
            {navLinks.map(({ label, to, hasDropdown }) => (
              <React.Fragment key={label}>
                <ListItem disablePadding>
                  <ListItemButton
                    component={hasDropdown ? "div" : NavLink}
                    to={hasDropdown ? undefined : to}
                    onClick={() => {
                      if (!hasDropdown) {
                        toggleDrawer();
                      }
                    }}
                    sx={{
                      "&.active": { bgcolor: COLORS.slate700 },
                      "&:hover": { bgcolor: COLORS.slate700 },
                      borderRadius: 1,
                      mb: 0.5,
                    }}
                  >
                    <ListItemText primary={label} />
                  </ListItemButton>
                </ListItem>
                {hasDropdown && (
                  <Box sx={{ 
                    pl: 2, 
                    py: 1,
                    mb: 1,
                    borderLeft: `3px solid ${COLOR.secondary}`,
                    ml: 1,
                  }}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate("/services");
                          toggleDrawer();
                        }}
                        sx={{
                          py: 0.8,
                          borderRadius: 1,
                          "&:hover": { 
                            bgcolor: COLORS.slate700,
                            transform: "translateX(4px)",
                            transition: "all 0.2s ease",
                          },
                        }}
                      >
                        <Grid3x3 size={16} style={{ marginRight: 8, opacity: 0.8 }} />
                        <ListItemText 
                          primary="All Services" 
                          primaryTypographyProps={{ 
                            fontSize: "0.9rem", 
                            fontWeight: 700,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider sx={{ borderColor: COLORS.slate700, my: 1, opacity: 0.5 }} />
                    {serviceTypes.map((type) => (
                      <ListItem key={type.id} disablePadding>
                        <ListItemButton
                          onClick={() => {
                            navigate(`/services/${type.slug}`);
                            toggleDrawer();
                          }}
                          sx={{
                            py: 0.7,
                            borderRadius: 1,
                            "&:hover": { 
                              bgcolor: COLORS.slate700,
                              transform: "translateX(4px)",
                              transition: "all 0.2s ease",
                            },
                          }}
                        >
                          <CheckCircle2 size={14} style={{ marginRight: 8, opacity: 0.6 }} />
                          <ListItemText 
                            primary={type.name}
                            primaryTypographyProps={{ fontSize: "0.85rem" }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </Box>
                )}
              </React.Fragment>
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
                    bgcolor: COLOR.secondary,
                    "&:hover": { bgcolor: COLORS.primary },
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
