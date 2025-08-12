import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { default as COLORS, default as style } from "../styles/Styles";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const {
    apiCall: getBlogDetail,
    data,
    loading,
    error,
  } = useApi();
  const decodeHTML = (html) => {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html").body.textContent || "";
  };

  // Fetch blog post by slug
  useEffect(() => {
    getBlogDetail(`https://lemonchiffon-curlew-159892.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`);
  }, [slug]);

  // Transform blog data and fetch related posts
  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      const wpPost = data[0];
      const transformedPost = {
        id: wpPost.id,
        title: decodeHTML(wpPost.title.rendered),
        content: wpPost.content.rendered,
        author: wpPost._embedded?.author?.[0]?.name || "Unknown",
        published_at: wpPost.date,
        featured_image:
          wpPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcPgqm575oc2CiJLcYCo75HYrrQatuUSZ3KA&s",
        categories: wpPost.categories,
        excerpt: wpPost.excerpt.rendered.replace(/<[^>]+>/g, ""),
        slug: wpPost.slug,
      };
      setPost(transformedPost);

      if (wpPost.categories?.length) {
        const categoryParams = wpPost.categories.join(",");
        fetchRelatedPosts(wpPost.id, categoryParams);
      }
    } else {
      setPost(null);
    }
  }, [data]);

  // Fetch related posts from same categories
  const fetchRelatedPosts = async (currentPostId, categoryParams) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL+`/wp-json/wp/v2/posts?_embed&per_page=5&categories=${categoryParams}&exclude=${currentPostId}`
      );
      const posts = await response.json();

      const transformed = posts.map((post) => ({
        id: post.id,
        title: decodeHTML(post.title.rendered),
        meta_description: post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 80) + "...",
        slug: post.slug,
        featured_image:
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcPgqm575oc2CiJLcYCo75HYrrQatuUSZ3KA&s",
      }));

      setRelatedPosts(transformed);
    } catch (error) {
      console.error("Failed to fetch related posts", error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Container>
        <Typography variant="h5" color="error" mt={4}>
          {error ? "Something went wrong." : "Post not found."}
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", py: 4 }}>
      <Container>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          mb={1}
          sx={[style.testimonialSection.headline]}
        >
          {post.title}
        </Typography>

        {/* Author and Date */}
        <Box display="flex" justifyContent="center" gap={1} mb={3}>
          <Typography variant="body2" color="text.secondary">
            By {post.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • {new Date(post.published_at).toLocaleDateString()}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* Blog Content */}
          <Box
            sx={{
              flex: 3,
              backgroundColor: "#fff",
              p: 3,
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            {/* Featured Image + Share */}
            <Box sx={{ position: "relative", mb: 2 }}>
              <Box
                component="img"
                src={post.featured_image}
                alt="Post Cover"
                sx={{ width: "100%", borderRadius: 2 }}
              />
              <Tooltip title="Copy link" arrow>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    minWidth: "unset",
                    padding: "6px",
                    borderRadius: "50%",
                    background: "#FF6D00",
                    color: "white",
                    boxShadow: 3,
                    "&:hover": {
                      backgroundColor: "#FF6D00",
                    },
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }}
                >
                  <ContentCopyIcon fontSize="small" />
                </Button>
              </Tooltip>
            </Box>

            {/* Post Content */}
            <Box
              sx={{
                wordBreak: "break-word",
                overflowWrap: "break-word",
                "& img": {
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: 2,
                  my: 2,
                  display: "block",
                },
                "& table": {
                  width: "100%",
                  borderCollapse: "collapse",
                  my: 2,
                  overflowX: "auto",
                  display: "block",
                },
                "& table, & th, & td": {
                  border: "1px solid #ddd",
                },
                "& th, & td": {
                  padding: "8px",
                  textAlign: "left",
                },
                "& iframe, & video": {
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: 2,
                  my: 2,
                  display: "block",
                },
                "& p": {
                  marginBottom: "1rem",
                  lineHeight: 1.7,
                  fontSize: "1rem",
                  color: "#333",
                },
                "& pre, & code": {
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  backgroundColor: "#f4f4f4",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  display: "block",
                  fontSize: "0.9rem",
                  overflowX: "auto",
                },
                "& *": {
                  boxSizing: "border-box",
                },
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <Divider sx={{ my: 2 }} />
          </Box>

          {/* Related Posts */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#fff",
              minHeight: "400px",
              maxHeight: "600px",
              p: 2,
              borderRadius: 2,
              overflowY: "auto",
              boxShadow: 1,
              alignSelf: "flex-start",
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Related Posts
            </Typography>

            {relatedPosts.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No related posts found.
              </Typography>
            ) : (
              relatedPosts.map((related) => (
                <Box
                  key={related.id}
                  onClick={() => navigate(`/blog/${related.slug}`)}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                    mb: 3,
                    cursor: "pointer",
                    p: 1,
                    borderRadius: 1,
                    transition: "0.2s",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={related.featured_image}
                    alt={related.title}
                    sx={{
                      width: 50,
                      height: 50,
                      objectFit: "cover",
                      borderRadius: 1,
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flex: 1, flexDirection: "column" }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: COLORS.primary, mb: 0.5 }}
                    >
                      {related.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {related.meta_description}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogDetailPage;
