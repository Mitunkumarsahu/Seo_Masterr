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
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useApi"; // make sure this path is correct

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const {
    apiCall: getBlogDetail,
    data,
    loading,
    error,
  } = useApi();

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
        <Typography variant="h4" align="center" fontWeight="bold" mb={4}>
          {post.title}
        </Typography>

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
            <Box
              component="img"
              src={post.featured_image}
              alt="Post Cover"
              sx={{ width: "100%", borderRadius: 2, mb: 2 }}
            />

            {/* Social Share Buttons */}
            <Stack direction="row" spacing={1} justifyContent="center" mb={2}>
              <Button size="small" variant="contained" color="primary">Facebook</Button>
              <Button size="small" variant="contained" color="error">YouTube</Button>
              <Button size="small" variant="contained" color="secondary">Email</Button>
              <Button size="small" variant="contained" sx={{ backgroundColor: "#25D366" }}>WhatsApp</Button>
              <Button size="small" variant="contained" sx={{ backgroundColor: "#1DA1F2" }}>Twitter</Button>
            </Stack>

            <Typography
              variant="body1"
              color="text.secondary"
              mb={2}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Optional Image */}
            <Box
              component="img"
              src="https://via.placeholder.com/800x400"
              alt="Second Image"
              sx={{ width: "100%", borderRadius: 2, mb: 2 }}
            />

            {/* Author Info */}
            <Box display="flex" alignItems="center" gap={1} mt={2}>
              <Avatar sx={{ bgcolor: "#ccc", width: 40, height: 40 }} />
              <Typography variant="body2">{post.author}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Share Again */}
            <Stack direction="row" spacing={1} justifyContent="center">
              <Button size="small" variant="contained" color="primary">Facebook</Button>
              <Button size="small" variant="contained" color="error">YouTube</Button>
              <Button size="small" variant="contained" color="secondary">Email</Button>
              <Button size="small" variant="contained" sx={{ backgroundColor: "#25D366" }}>WhatsApp</Button>
              <Button size="small" variant="contained" sx={{ backgroundColor: "#1DA1F2" }}>Twitter</Button>
            </Stack>
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
