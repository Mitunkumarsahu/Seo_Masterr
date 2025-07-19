import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Divider,
  Button,
  Stack,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useApi"; // make sure this path is correct

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const { apiCall: getBlogDetail, data, loading, error } = useApi();

  useEffect(() => {
    getBlogDetail(`http://127.0.0.1:8000/blogs/${id}/with-recent`);
  }, [id]);

  useEffect(() => {
    if (data) {
      setPost(data.blog);
      setRelatedPosts(data.recent_blogs);
    }
  }, [data]);

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
        <Typography variant="h5" color="error">
          {error ? "Something went wrong." : "Post not found."}
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", py: 4 }}>
      <Container>
        <Typography variant="h4" align="center" fontWeight="bold" mb={1}>
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
            {/* Featured Image with Share Icon */}
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
                    background: "#10b981",
                    color: "white",
                    boxShadow: 3,
                    "&:hover": {
                      backgroundColor: "#059669",
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

            {/* Blog HTML Content */}
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

            {/* Bottom Divider */}
            <Divider sx={{ my: 2 }} />
          </Box>

          {/* Related Posts Sidebar */}
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

            {relatedPosts.map((related) => (
              <Box
                key={related.id}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  mb: 3,
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
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "#0d66ff", mb: 0.5 }}
                  >
                    {related.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {related.meta_description}
                  </Typography>
                  <Button
                    size="small"
                    sx={{ mt: 1, textTransform: "none" }}
                    onClick={() => navigate(`/blog/${related.id}`)}
                  >
                    View Blog
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogDetailPage;
