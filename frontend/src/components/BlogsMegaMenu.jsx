import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    Fade,
    Paper,
    Tabs,
    Tab,
    Button,
    Container,
    Card,
    CardMedia,
    CardContent,
    Divider,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { ArrowRight, Calendar, BookOpen, Tag, FileText } from "lucide-react";
import { COLORS } from "../styles/Styles";
import { useDropdownData } from "../contexts/DropdownDataContext";

// Helper to get icon for blog category
const getIconForCategory = (slug) => {
    if (slug.includes("seo") || slug.includes("search")) return <BookOpen size={20} />;
    if (slug.includes("tech") || slug.includes("development")) return <FileText size={20} />;
    if (slug.includes("marketing") || slug.includes("social")) return <Tag size={20} />;
    return <BookOpen size={20} />;
};

const BlogsMegaMenu = ({ blogCategories, onClose }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [categoryPosts, setCategoryPosts] = useState({});
    const [loading, setLoading] = useState(false);

    // Use dropdown data context
    const { getPostsForCategory } = useDropdownData();

    const handleTabChange = (_, newValue) => {
        setActiveTab(newValue);
    };

    // Fetch posts when active tab changes, using context method
    useEffect(() => {
        const fetchCategoryPosts = async () => {
            const activeCategory = blogCategories[activeTab];
            if (!activeCategory || categoryPosts[activeCategory.id]) return;

            setLoading(true);
            try {
                const data = await getPostsForCategory(activeCategory.id);
                if (data) {
                    setCategoryPosts((prev) => ({ ...prev, [activeCategory.id]: data }));
                }
            } catch (error) {
                console.error("Failed to fetch category posts", error);
            } finally {
                setLoading(false);
            }
        };

        if (blogCategories.length > 0) {
            fetchCategoryPosts();
        }
    }, [activeTab, blogCategories, getPostsForCategory, categoryPosts]);

    // Close on window scroll - REMOVED to prevent closing on scroll
    // useEffect(() => {
    //     const handleScroll = () => {
    //         onClose();
    //     };

    //     window.addEventListener("scroll", handleScroll, { passive: true });
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, [onClose]);

    if (!blogCategories || blogCategories.length === 0) return null;

    const currentCategory = blogCategories[activeTab];
    const currentPosts = currentCategory ? categoryPosts[currentCategory.id] || [] : [];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <Paper
            elevation={6}
            sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 1300,
                bgcolor: "#2E2E2E",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                mt: 0,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                overflow: "hidden",
                color: "white"
            }}
        >
            <Container maxWidth="xl" sx={{ py: 3 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

                    {/* Top Tabs - Categories */}
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            minHeight: 60,
                            "& .MuiTabs-indicator": {
                                display: "none",
                            },
                            "& .MuiTabs-flexContainer": {
                                gap: 1.5,
                            },
                            "& .MuiTab-root": {
                                color: "#9ca3af"
                            }
                        }}
                    >
                        {blogCategories.map((category, index) => (
                            <Tab
                                key={category.id}
                                label={
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            textTransform: "none",
                                            textAlign: "left"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                p: 0.8,
                                                borderRadius: "50%",
                                                bgcolor: activeTab === index ? COLORS.secondary : "rgba(255,255,255,0.05)",
                                                color: activeTab === index ? "#fff" : "#9ca3af",
                                                display: "flex",
                                                transition: "all 0.3s ease",
                                                boxShadow: activeTab === index ? "0 4px 10px rgba(255, 109, 0, 0.3)" : "none",
                                            }}
                                        >
                                            {getIconForCategory(category.slug)}
                                        </Box>
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: activeTab === index ? 700 : 500,
                                                    lineHeight: 1.2,
                                                    color: activeTab === index ? "white" : "inherit",
                                                    fontSize: "0.85rem"
                                                }}
                                            >
                                                {category.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                }
                                sx={{
                                    border: "1px solid",
                                    borderColor: activeTab === index ? `${COLORS.secondary}40` : "rgba(255,255,255,0.1)",
                                    borderRadius: 3,
                                    py: 1,
                                    px: 2,
                                    bgcolor: activeTab === index ? "rgba(255,255,255,0.05)" : "transparent",
                                    minHeight: 50,
                                    opacity: 1,
                                    transition: "none", // Removed animations
                                    "&:hover": {
                                        borderColor: activeTab === index ? `${COLORS.secondary}40` : "rgba(255,255,255,0.2)",
                                        bgcolor: activeTab === index ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
                                        // Removed transform and other animations
                                    },
                                    boxShadow: activeTab === index ? "0 4px 10px rgba(0,0,0,0.1)" : "none",
                                }}
                            />
                        ))}
                    </Tabs>

                    <Divider sx={{ borderStyle: "dashed", borderColor: "rgba(255,255,255,0.1)" }} />

                    {/* Content Area */}
                    <Fade in={true} key={activeTab} timeout={400}>
                        <Grid container spacing={3} sx={{ minHeight: 200 }}>
                            {/* Left: Blog Posts */}
                            <Grid item xs={12} md={9}>
                                <Box>
                                    <Typography variant="h6" sx={{ mb: 3, color: "white", fontWeight: 700, letterSpacing: "-0.5px" }}>
                                        Latest in {currentCategory?.name}
                                    </Typography>

                                    {loading && !currentPosts.length ? (
                                        <Typography sx={{ color: "grey.400" }}>Loading posts...</Typography>
                                    ) : (
                                        <Grid container spacing={1.5}>
                                            {currentPosts.length > 0 ? (
                                                currentPosts.slice(0, 6).map((post) => (
                                                    <Grid item xs={6} sm={4} key={post.id}>
                                                        <NavLink
                                                            to={`/blog/${post.slug}`}
                                                            style={{ textDecoration: 'none' }}
                                                            onClick={onClose}
                                                        >
                                                            <Card
                                                                sx={{
                                                                    bgcolor: "rgba(255,255,255,0.05)",
                                                                    borderRadius: 2,
                                                                    overflow: "hidden",
                                                                    transition: "all 0.2s ease",
                                                                    height: "100%",
                                                                    "&:hover": {
                                                                        bgcolor: "rgba(255,255,255,0.08)",
                                                                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                                                    }
                                                                }}
                                                            >
                                                                <CardMedia
                                                                    component="img"
                                                                    height="80"
                                                                    image={post.featured_image}
                                                                    alt={post.title}
                                                                />
                                                                <CardContent sx={{ p: 1 }}>
                                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                                                                        <Calendar size={10} color="#9ca3af" />
                                                                        <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.65rem" }}>
                                                                            {formatDate(post.published_at)}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            color: "white",
                                                                            fontWeight: 600,
                                                                            fontSize: "0.75rem",
                                                                            display: "-webkit-box",
                                                                            WebkitLineClamp: 2,
                                                                            WebkitBoxOrient: "vertical",
                                                                            overflow: "hidden",
                                                                            lineHeight: 1.2,
                                                                        }}
                                                                    >
                                                                        {post.title}
                                                                    </Typography>
                                                                </CardContent>
                                                            </Card>
                                                        </NavLink>
                                                    </Grid>
                                                ))
                                            ) : (
                                                <Grid item xs={12}>
                                                    <Box sx={{ textAlign: "center", py: 4 }}>
                                                        <Typography sx={{ mb: 2, color: "grey.400" }}>
                                                            No posts found in this category yet.
                                                        </Typography>
                                                        <Button
                                                            variant="outlined"
                                                            endIcon={<ArrowRight size={16} />}
                                                            component={NavLink}
                                                            to="/blogs"
                                                            onClick={onClose}
                                                            sx={{
                                                                color: "white",
                                                                borderColor: "rgba(255,255,255,0.3)",
                                                                borderRadius: 2,
                                                                textTransform: "none",
                                                                "&:hover": { borderColor: COLORS.secondary, color: COLORS.secondary }
                                                            }}
                                                        >
                                                            View All Blogs
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            )}
                                        </Grid>
                                    )}
                                </Box>
                            </Grid>

                            {/* Right: Promotion */}
                            <Grid item xs={12} md={3}>
                                <Box
                                    sx={{
                                        height: "100%",
                                        borderRadius: 2,
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        position: "relative",
                                        overflow: "hidden",
                                        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: "white",
                                        boxShadow: "0 8px 20px -5px rgba(102, 126, 234, 0.3)",
                                    }}
                                >
                                    <Typography variant="overline" sx={{ opacity: 0.9, fontWeight: 700, letterSpacing: 1, fontSize: "0.6rem" }}>
                                        STAY INFORMED
                                    </Typography>

                                    <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.2, fontSize: "1rem" }}>
                                        Never Miss an Update
                                    </Typography>

                                    <Typography variant="caption" sx={{ mb: 2, opacity: 0.95, lineHeight: 1.4, fontSize: "0.75rem" }}>
                                        Get latest insights delivered to your inbox.
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            onClose();
                                        }}
                                        endIcon={<ArrowRight size={14} />}
                                        sx={{
                                            bgcolor: "white",
                                            color: "#667eea",
                                            alignSelf: 'flex-start',
                                            py: 0.5,
                                            px: 2,
                                            borderRadius: 1.5,
                                            fontWeight: 700,
                                            fontSize: "0.7rem",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                            "&:hover": {
                                                bgcolor: "#f1f1f1",
                                            },
                                            transition: "all 0.2s ease"
                                        }}
                                        component={NavLink}
                                        to="/blogs"
                                    >
                                        View All
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

export default BlogsMegaMenu;