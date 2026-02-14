import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    List,
    ListItem,
    ListItemText,
    Fade,
    Paper,
    Tabs,
    Tab,
    Button,
    Container,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import useApi from "../hooks/useApi";
import { ChevronRight, ArrowRight } from "lucide-react";
import { COLORS } from "../styles/Styles";
import { Divider } from "@mui/material";

// Icon mapping based on slugs or names
import {
    Search,
    Monitor,
    Smartphone,
    PenTool,
    BarChart,
    Megaphone,
} from "lucide-react";

// Helper to get icon
const getIconForService = (slug) => {
    if (slug.includes("seo")) return <Search size={20} />;
    if (slug.includes("dev") || slug.includes("web") || slug.includes("tech"))
        return <Monitor size={20} />;
    if (slug.includes("app") || slug.includes("mobile")) return <Smartphone size={20} />;
    if (slug.includes("content")) return <PenTool size={20} />;
    if (slug.includes("ppc") || slug.includes("paid")) return <BarChart size={20} />;
    return <Megaphone size={20} />;
};

const ServicesMegaMenu = ({ serviceTypes, onClose }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [subServices, setSubServices] = useState({});
    const { apiCall: getServices, loading } = useApi();

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    // Fetch sub-services when active tab changes, if not already cached
    useEffect(() => {
        const fetchSubServices = async () => {
            const activeType = serviceTypes[activeTab];
            if (!activeType || subServices[activeType.id]) return;

            try {
                // Construct URL - adjust based on your actual API structure
                // The user provided: wp:post_type link: https://seomasterr.com/wp-json/wp/v2/service?service_type=4
                const url = `${import.meta.env.VITE_APP_BACKEND_URL}/wp-json/wp/v2/service?service_type=${activeType.id}&per_page=10`;
                const data = await getServices(url);
                if (data) {
                    setSubServices((prev) => ({ ...prev, [activeType.id]: data }));
                }
            } catch (error) {
                console.error("Failed to fetch sub-services", error);
            }
        };

        if (serviceTypes.length > 0) {
            fetchSubServices();
        }
    }, [activeTab, serviceTypes, getServices, subServices]);

    // Close on window scroll
    useEffect(() => {
        const handleScroll = () => {
            onClose();
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [onClose]);

    if (!serviceTypes || serviceTypes.length === 0) return null;

    const currentType = serviceTypes[activeTab];
    const currentServices = currentType ? subServices[currentType.id] || [] : [];

    return (
        <Paper
            elevation={6}
            sx={{
                position: "absolute", // Changed to absolute relative to sticky AppBar
                top: "100%", // Starts exactly below the AppBar
                left: 0,
                right: 0,
                zIndex: 1300,
                bgcolor: "#2E2E2E", // Dark Theme Background
                borderTop: "1px solid rgba(255,255,255,0.1)",
                mt: 0,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                overflow: "hidden",
                color: "white" // Default text color white
            }}
            onMouseLeave={onClose}
        >
            <Container maxWidth="xl" sx={{ py: 5 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>

                    {/* Top Tabs - Categories */}
                    {/* Top Tabs - Categories (Box Outfit) */}
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            minHeight: 80,
                            "& .MuiTabs-indicator": {
                                display: "none", // Hide default underline indicator
                            },
                            "& .MuiTabs-flexContainer": {
                                gap: 2,
                            },
                            "& .MuiTab-root": {
                                color: "#9ca3af" // Inactive tab text color
                            }
                        }}
                    >
                        {serviceTypes.map((type, index) => (
                            <Tab
                                key={type.id}
                                label={
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1.5,
                                            textTransform: "none",
                                            textAlign: "left"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                p: 1.2,
                                                borderRadius: "50%",
                                                bgcolor: activeTab === index ? COLORS.secondary : "rgba(255,255,255,0.05)",
                                                color: activeTab === index ? "#fff" : "#9ca3af",
                                                display: "flex",
                                                transition: "all 0.3s ease",
                                                boxShadow: activeTab === index ? "0 4px 10px rgba(255, 109, 0, 0.3)" : "none",
                                            }}
                                        >
                                            {getIconForService(type.slug)}
                                        </Box>
                                        <Box>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontWeight: activeTab === index ? 700 : 500,
                                                    lineHeight: 1.2,
                                                    color: activeTab === index ? "white" : "inherit"
                                                }}
                                            >
                                                {type.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                }
                                sx={{
                                    border: "1px solid",
                                    borderColor: activeTab === index ? `${COLORS.secondary}40` : "rgba(255,255,255,0.1)",
                                    borderRadius: 4,
                                    py: 1.5,
                                    px: 3,
                                    bgcolor: activeTab === index ? "rgba(255,255,255,0.05)" : "transparent",
                                    minHeight: 70,
                                    opacity: 1,
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    "&:hover": {
                                        borderColor: COLORS.secondary,
                                        bgcolor: "rgba(255,255,255,0.08)",
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                                        "& .MuiTypography-root": { color: "white" }
                                    },
                                    boxShadow: activeTab === index ? "0 8px 20px rgba(0,0,0,0.2)" : "none",
                                }}
                            />
                        ))}
                    </Tabs>

                    <Divider sx={{ borderStyle: "dashed", borderColor: "rgba(255,255,255,0.1)" }} />

                    {/* Content Area */}
                    <Fade in={true} key={activeTab} timeout={400}>
                        <Grid container spacing={6} sx={{ minHeight: 300 }}>
                            {/* Left: Sub-Services List */}
                            <Grid item xs={12} md={8}>
                                <Box>
                                    <Typography variant="h5" sx={{ mb: 4, color: "white", fontWeight: 800, letterSpacing: "-0.5px" }}>
                                        Explore {currentType?.name}
                                    </Typography>

                                    {loading && !currentServices.length ? (
                                        <Typography sx={{ color: "grey.400" }}>Loading services...</Typography>
                                    ) : (
                                        <Grid container spacing={3}>
                                            {currentServices.length > 0 ? (
                                                currentServices.map((service) => (
                                                    <Grid item xs={12} sm={6} md={4} key={service.id}>
                                                        <NavLink
                                                            to={`/service/${service.slug}`}
                                                            style={{ textDecoration: 'none' }}
                                                            onClick={onClose}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    gap: 1.5,
                                                                    p: 1.5,
                                                                    borderRadius: 2,
                                                                    transition: "all 0.2s ease",
                                                                    "&:hover": {
                                                                        bgcolor: "rgba(255,255,255,0.05)",
                                                                        transform: "translateX(5px)",
                                                                        "& .arrow-icon": { opacity: 1, transform: "translateX(0)" }
                                                                    }
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant="body1"
                                                                    sx={{
                                                                        color: '#d1d5db',
                                                                        fontWeight: 500,
                                                                        transition: "color 0.2s",
                                                                        "&:hover": { color: COLORS.secondary },
                                                                    }}
                                                                >
                                                                    {service.title?.rendered || service.title}
                                                                </Typography>
                                                                <ChevronRight
                                                                    size={16}
                                                                    className="arrow-icon"
                                                                    style={{
                                                                        opacity: 0,
                                                                        transform: "translateX(-5px)",
                                                                        transition: "all 0.2s ease",
                                                                        color: COLORS.secondary
                                                                    }}
                                                                />
                                                            </Box>
                                                        </NavLink>
                                                    </Grid>
                                                ))
                                            ) : (
                                                <Grid item xs={12}>
                                                    <Box sx={{ textAlign: "center", py: 4 }}>
                                                        <Typography sx={{ mb: 2, color: "grey.400" }}>
                                                            Detailed services for this category are coming soon.
                                                        </Typography>
                                                        <Button
                                                            variant="outlined"
                                                            endIcon={<ArrowRight size={16} />}
                                                            component={NavLink}
                                                            to={`/services/${currentType?.slug}`}
                                                            onClick={onClose}
                                                            sx={{
                                                                color: "white",
                                                                borderColor: "rgba(255,255,255,0.3)",
                                                                borderRadius: 2,
                                                                textTransform: "none",
                                                                "&:hover": { borderColor: COLORS.secondary, color: COLORS.secondary }
                                                            }}
                                                        >
                                                            View Category Page
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            )}
                                        </Grid>
                                    )}
                                </Box>
                            </Grid>

                            {/* Right: Promotion / Image */}
                            <Grid item xs={12} md={4}>
                                <Box
                                    sx={{
                                        height: "100%",
                                        borderRadius: 4,
                                        p: 5,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        position: "relative",
                                        overflow: "hidden",
                                        backgroundImage: 'linear-gradient(135deg, #FF6D00 0%, #E65100 100%)', // Orange Gradient
                                        color: "white",
                                        boxShadow: "0 20px 40px -10px rgba(255, 109, 0, 0.3)",
                                    }}
                                >
                                    {/* Decorative circle */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: -20,
                                            right: -20,
                                            width: 150,
                                            height: 150,
                                            borderRadius: "50%",
                                            bgcolor: "rgba(255,255,255,0.15)"
                                        }}
                                    />

                                    <Typography variant="overline" sx={{ opacity: 0.9, fontWeight: 700, letterSpacing: 1 }}>
                                        GROWTH PARTNER
                                    </Typography>

                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.2 }}>
                                        Grow Your Business with {currentType?.name}
                                    </Typography>

                                    <Typography variant="body1" sx={{ mb: 4, opacity: 0.95, lineHeight: 1.6 }}>
                                        Ready to scale? Get a comprehensive {currentType?.name} audit and strategy tailored for you.
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            onClose();
                                        }}
                                        endIcon={<ArrowRight size={18} />}
                                        sx={{
                                            bgcolor: "white",
                                            color: COLORS.secondary,
                                            alignSelf: 'flex-start',
                                            py: 1.5,
                                            px: 4,
                                            borderRadius: 2,
                                            fontWeight: 700,
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                            "&:hover": {
                                                bgcolor: "#f1f1f1",
                                                transform: "translateY(-2px)",
                                                boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
                                            },
                                            transition: "all 0.3s ease"
                                        }}
                                        component={NavLink}
                                        to="/contact-us"
                                    >
                                        Get Started
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Fade>
                </Box>
            </Container>
        </Paper>
    );
};

export default ServicesMegaMenu;
