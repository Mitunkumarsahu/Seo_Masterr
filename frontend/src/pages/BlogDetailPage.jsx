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
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/blogs/${id}`);
        const data = await res.json();
        setPost(data);

        // Fetch all blogs to find related ones
        const allBlogsRes = await fetch("http://127.0.0.1:8000/blogs/");
        const allBlogs = await allBlogsRes.json();
        const related = allBlogs.filter((b) => b.id !== data.id);
        setRelatedPosts(related);

        setLoading(false);
      } catch (err) {
        console.error("Error loading blog detail:", err);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Container>
        <Typography variant="h5">Post not found.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", py: 4 }}>
      <Container>
        <Typography variant="h4" align="center" fontWeight="bold" mb={4}>
          {post.title}
        </Typography>

        {/* Main Flex Layout */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* Main Content */}
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

            {/* Social Share */}
            <Stack direction="row" spacing={1} justifyContent="center" mb={2}>
              <Button size="small" variant="contained" color="primary">
                Facebook
              </Button>
              <Button size="small" variant="contained" color="error">
                YouTube
              </Button>
              <Button size="small" variant="contained" color="secondary">
                Email
              </Button>
              <Button
                size="small"
                variant="contained"
                sx={{ backgroundColor: "#25D366" }}
              >
                WhatsApp
              </Button>
              <Button
                size="small"
                variant="contained"
                sx={{ backgroundColor: "#1DA1F2" }}
              >
                Twitter
              </Button>
            </Stack>

            <Typography
              variant="body1"
              color="text.secondary"
              mb={2}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Optional Second Image (placeholder) */}
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

            {/* Footer Link */}
            <Typography
              variant="body2"
              sx={{ mt: 2, color: "primary.main", cursor: "pointer" }}
            >
              Lorem Ipsum Back here
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Share Again */}
            <Stack direction="row" spacing={1} justifyContent="center">
              <Button size="small" variant="contained" color="primary">
                Facebook
              </Button>
              <Button size="small" variant="contained" color="error">
                YouTube
              </Button>
              <Button size="small" variant="contained" color="secondary">
                Email
              </Button>
              <Button
                size="small"
                variant="contained"
                sx={{ backgroundColor: "#25D366" }}
              >
                WhatsApp
              </Button>
              <Button
                size="small"
                variant="contained"
                sx={{ backgroundColor: "#1DA1F2" }}
              >
                Twitter
              </Button>
            </Stack>
          </Box>

          {/* Sidebar - Related Posts */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#fff",
              minHeight: "400px",       // Minimum height always maintained
              maxHeight: "600px",       // Adjust as needed
              p: 2,
              borderRadius: 2,
              overflowY: "auto",        // Scroll only if overflow
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
                    className="title"
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
