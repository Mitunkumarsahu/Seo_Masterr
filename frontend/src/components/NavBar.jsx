import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon, ChevronDown, Grid3x3, CheckCircle2,
  Home,
  BookOpen,
  Server,
  Info,
  Phone,
  Bell,
  Mail,
  ArrowRight,
} from "lucide-react";
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import ServicesMegaMenu from "./ServicesMegaMenu";
import BlogsMegaMenu from "./BlogsMegaMenu";
import { COLORS as COLOR } from "../styles/Styles"
import SubscribeModal from "./SubscribeModal";
import { useDropdownData } from "../contexts/DropdownDataContext";
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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isBlogsOpen, setIsBlogsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const { apiCall: postSubscription, loading } = useApi();
  const { apiCall: fetchContactInfo, data: contactInfoData } = useApi();
  const location = useLocation();
  const navigate = useNavigate();

  // Use dropdown data context
  const { serviceTypes, blogCategories } = useDropdownData();

  const toggleDrawer = () => setMobileDrawerOpen((prev) => !prev);

  // Fetch contact info on mount
  React.useEffect(() => {
    fetchContactInfo(import.meta.env.VITE_BACKEND_URL + "/contact-info/");
  }, []);

  const contactInfo = contactInfoData?.find((item) => item.is_active);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the navbar
      const navbar = document.querySelector('[data-navbar]');
      if (navbar && !navbar.contains(event.target)) {
        setIsServicesOpen(false);
        setIsBlogsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      return;
    }

    try {
      await postSubscription(import.meta.env.VITE_BACKEND_URL + "/subscriptions/", "POST", {
        email,
      });
      setEmail("");
      setModalOpen(false);
    } catch (err) {
      console.error("Subscription failed:", err);
    }
  };

  const navLinks = [
    { label: "Home", to: "/", icon: <Home size={18} /> },
    { label: "Blog", to: "/blogs", hasDropdown: true, icon: <BookOpen size={18} /> },
    { label: "Services", to: "/services", hasDropdown: true, icon: <Server size={18} /> },
    { label: "About Us", to: "/about-us", icon: <Info size={18} /> },
    { label: "Contact Us", to: "/contact-us", icon: <Phone size={18} /> },
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
      {/* Top Bar - Scrolls away */}
      <Box
        sx={{
          bgcolor: "#f5f5f5",
          py: 1,
          px: { xs: 2, md: 8 },
          display: { xs: "none", md: "flex" },
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 4,
          borderBottom: "1px solid #e0e0e0",
          fontSize: "0.875rem",
          color: COLORS.slate700,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Phone size={16} color={COLOR.secondary} />
          <Typography
            component="a"
            href={`tel:${contactInfo?.phone_numbers || "+911234567890"}`}
            variant="body2"
            fontWeight={500}
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&:hover": { textDecoration: "underline" },
              cursor: "pointer"
            }}
          >
            {contactInfo?.phone_numbers || "+91 12345 67890"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Mail size={16} color={COLOR.secondary} />
          <Typography
            component="a"
            href={`mailto:${contactInfo?.email || "seomasterr@gmail.com"}`}
            variant="body2"
            fontWeight={500}
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&:hover": { textDecoration: "underline" },
              cursor: "pointer"
            }}
          >
            {contactInfo?.email || "seomasterr@gmail.com"}
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/contact-us")}
          endIcon={<ArrowRight size={16} />}
          sx={{
            bgcolor: COLOR.secondary,
            minWidth: "auto",
            px: 2,
            py: 0.5,
            borderRadius: 0,
            textTransform: "none",
            "&:hover": { bgcolor: COLOR.primary },
          }}
        >
          Request a Call
        </Button>
      </Box>

      <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#2E2E2E", top: 0 }} data-navbar>
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
            {navLinks.map(({ label, to, hasDropdown, icon }) => (
              hasDropdown ? (
                <Box
                  key={label}
                  sx={{ position: "static", height: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                  <Button
                    sx={{
                      ...getLinkStyle(to),
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      transition: "all 0.3s ease",
                      height: '100%',
                      "&:hover": {
                        color: "#FF6D00",
                        transform: "translateY(-2px)",
                      },
                    }}
                    startIcon={icon}
                    endIcon={
                      <ChevronDown
                        size={16}
                        style={{
                          transition: "transform 0.3s ease",
                          transform: ((label === 'Services' && isServicesOpen) || (label === 'Blog' && isBlogsOpen)) ? "rotate(180deg)" : "rotate(0deg)"
                        }}
                      />
                    }
                    onClick={() => {
                      if (label === 'Services') {
                        setIsServicesOpen(!isServicesOpen);
                        setIsBlogsOpen(false);
                      } else if (label === 'Blog') {
                        setIsBlogsOpen(!isBlogsOpen);
                        setIsServicesOpen(false);
                      }
                    }}
                  >
                    {label}
                  </Button>

                  {label === 'Services' && isServicesOpen && (
                    <ServicesMegaMenu
                      serviceTypes={serviceTypes}
                      onClose={() => setIsServicesOpen(false)}
                    />
                  )}

                  {label === 'Blog' && isBlogsOpen && (
                    <BlogsMegaMenu
                      blogCategories={blogCategories}
                      onClose={() => setIsBlogsOpen(false)}
                    />
                  )}
                </Box>
              ) : (
                <NavLink key={label} to={to} style={{ textDecoration: "none" }}>
                  <Button sx={getLinkStyle(to)} startIcon={icon}>{label}</Button>
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
              startIcon={<Bell size={18} />}
              sx={{
                color: "white",
                borderColor: "white",
                borderRadius: "50px",
                px: 3,
                "&:hover": { bgcolor: "white", color: COLORS.blue800 },
              }}
            >
              Subscribe
            </Button>



            {/* Desktop authentication section removed - making all routes public */}
          </Box>

          {/* Mobile Toggle */}
          <IconButton
            onClick={toggleDrawer}
            sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
            aria-label="open menu"
          >
            <MenuIcon size={24} />
          </IconButton>
        </Toolbar >
      </AppBar >

      {/* Mobile Drawer */}
      < Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: { width: 260, bgcolor: COLOR.primary, color: "white" },
        }
        }
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Menu
          </Typography>
          <Divider sx={{ borderColor: COLORS.slate700, mb: 2 }} />
          <List>
            {navLinks.map(({ label, to, hasDropdown, icon }) => (
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
                    <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>{icon}</Box>
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


            {/* Mobile authentication section removed - making all routes public */}
          </Box>
        </Box>
      </Drawer >

      {/* Auth & Subscribe Modals */}
      {/* AuthModal removed - making all routes public */}
      {/*
      <AuthModal
        open={authModalOpen}
        handleClose={() => setAuthModalOpen(false)}
        onSuccess={() => setAuthModalOpen(false)}
        redirectTo={"/"}
      />
      */}

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
