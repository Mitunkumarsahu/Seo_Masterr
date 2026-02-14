import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import Loader from "./Loader";
import { COLORS } from "../styles/Styles";

const MotionCard = motion(Card);

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const LatestBlogs = () => {
    const navigate = useNavigate();
    const { apiCall, loading } = useApi();
    const [blogs, setBlogs] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch tags first
                const tagsRes = await apiCall(
                    `${import.meta.env.VITE_APP_BACKEND_URL}/wp-json/wp/v2/tags?per_page=100`
                );
                if (Array.isArray(tagsRes)) {
                    setTags(tagsRes);
                }

                // Fetch latest 3 blogs
                const blogsRes = await apiCall(
                    `${import.meta.env.VITE_APP_BACKEND_URL}/wp-json/wp/v2/posts?_embed&per_page=3`
                );

                if (Array.isArray(blogsRes)) {
                    const parser = new DOMParser();
                    const decode = (html) =>
                        parser.parseFromString(html, "text/html").body.textContent || "";

                    const transformed = blogsRes.map((post) => {
                        const tagNames = post.tags
                            .map((tagId) => tagsRes?.find((t) => t.id === tagId)?.name)
                            .filter(Boolean);
                        return {
                            id: post.id,
                            title: decode(post.title.rendered),
                            published_at: post.date,
                            slug: post.slug,
                            featured_image:
                                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcPgqm575oc2CiJLcYCo75HYrrQatuUSZ3KA&s",
                            tags: tagNames,
                        };
                    });
                    setBlogs(transformed);
                }
            } catch (err) {
                console.error("Failed to fetch blogs:", err);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <Box
            sx={{
                py: { xs: 6, md: 10 },
                px: { xs: 2, md: 4 },
                backgroundColor: "#ffffff",
            }}
        >
            <Container maxWidth="xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        textAlign="center"
                        sx={{
                            mb: 1,
                            fontSize: { xs: "28px", md: "40px" },
                            color: COLORS.primary,
                        }}
                    >
                        Latest <span style={{ color: COLORS.secondary }}>Blogs</span>
                    </Typography>
                    <Typography
                        variant="body1"
                        textAlign="center"
                        sx={{
                            mb: 6,
                            color: "#666",
                            maxWidth: "600px",
                            mx: "auto",
                        }}
                    >
                        Stay updated with our latest insights, tips, and industry trends
                    </Typography>
                </motion.div>

                {/* Blog Cards */}
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <Loader />
                    </Box>
                ) : blogs.length === 0 ? (
                    <Typography textAlign="center" color="#999">
                        No blogs available at the moment.
                    </Typography>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "repeat(2, 1fr)",
                                    md: "repeat(3, 1fr)",
                                },
                                gap: 4,
                            }}
                        >
                            {blogs.map((blog) => (
                                <MotionCard
                                    key={blog.id}
                                    variants={cardVariants}
                                    sx={{
                                        borderRadius: 3,
                                        overflow: "hidden",
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                        transition: "all 0.3s ease",
                                        cursor: "pointer",
                                        "&:hover": {
                                            transform: "translateY(-8px)",
                                            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                                        },
                                    }}
                                    onClick={() => navigate(`/blog/${blog.slug}`)}
                                >
                                    {/* Featured Image */}
                                    <Box sx={{ position: "relative", overflow: "hidden" }}>
                                        <CardMedia
                                            component="img"
                                            height="220"
                                            image={blog.featured_image}
                                            alt={blog.title}
                                            sx={{
                                                transition: "transform 0.5s ease",
                                                "&:hover": {
                                                    transform: "scale(1.1)",
                                                },
                                            }}
                                        />
                                        {/* Tags Overlay */}
                                        {blog.tags && blog.tags.length > 0 && (
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: 16,
                                                    left: 16,
                                                    display: "flex",
                                                    gap: 1,
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                {blog.tags.slice(0, 2).map((tag, idx) => (
                                                    <Chip
                                                        key={idx}
                                                        label={tag}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: COLORS.secondary,
                                                            color: "#fff",
                                                            fontWeight: 600,
                                                            fontSize: "11px",
                                                            textTransform: "uppercase",
                                                            letterSpacing: "0.5px",
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        )}
                                    </Box>

                                    {/* Content */}
                                    <CardContent sx={{ p: 3 }}>
                                        {/* Date */}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                mb: 2,
                                            }}
                                        >
                                            <Calendar size={16} color="#999" />
                                            <Typography variant="caption" color="#999">
                                                {formatDate(blog.published_at)}
                                            </Typography>
                                        </Box>

                                        {/* Title */}
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            sx={{
                                                color: COLORS.primary,
                                                mb: 2,
                                                lineHeight: 1.4,
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                minHeight: "56px",
                                            }}
                                        >
                                            {blog.title}
                                        </Typography>

                                        {/* Read More Link */}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                color: COLORS.secondary,
                                                fontWeight: 600,
                                                fontSize: "14px",
                                                transition: "gap 0.3s ease",
                                                "&:hover": {
                                                    gap: 2,
                                                },
                                            }}
                                        >
                                            Read More
                                            <ArrowRight size={18} />
                                        </Box>
                                    </CardContent>
                                </MotionCard>
                            ))}
                        </Box>
                    </motion.div>
                )}

                {/* View All Button */}
                {blogs.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate("/blogs")}
                                endIcon={<ArrowRight size={20} />}
                                sx={{
                                    backgroundColor: COLORS.secondary,
                                    color: "#fff",
                                    px: 5,
                                    py: 1.5,
                                    borderRadius: "50px",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    boxShadow: "0 4px 20px rgba(255, 109, 0, 0.3)",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: COLORS.primary,
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 8px 30px rgba(255, 109, 0, 0.4)",
                                    },
                                }}
                            >
                                View All Blogs
                            </Button>
                        </Box>
                    </motion.div>
                )}
            </Container>
        </Box>
    );
};

export default LatestBlogs;
