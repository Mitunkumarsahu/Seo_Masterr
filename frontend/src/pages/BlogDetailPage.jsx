import React from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";

// Dummy post data
const POSTS = [
  {
    id: 1,
    category: "Lorem",
    title: "Lorem Ipsum",
    author: "Lorem Ipsum",
    thumbnail: "https://via.placeholder.com/150",
    description: "A standard dummy text used in design and printing.",
  },
  {
    id: 2,
    category: "Ipsum",
    title: "Dolor Sit Amet",
    author: "Lorem Ipsum",
    thumbnail: "https://via.placeholder.com/150",
    description: "Typesetting industry has used this dummy text for decades.",
  },
  {
    id: 3,
    category: "Has Been",
    title: "Consectetur Adipiscing",
    author: "Lorem Ipsum",
    thumbnail: "https://via.placeholder.com/150",
    description: "This layout is widely used in publishing platforms.",
  },
  {
    id: 4,
    category: "Lorem",
    title: "Elit Integer Nec",
    author: "Lorem Ipsum",
    thumbnail: "https://via.placeholder.com/150",
    description: "Readability is key to keeping users engaged.",
  },
];

const BlogDetailPage = () => {
  const { id } = useParams();
  const post = POSTS.find((p) => p.id === parseInt(id));

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
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
          {/* Main Content */}
          <Box sx={{ flex: 3, backgroundColor: "#fff", p: 3, borderRadius: 2, boxShadow: 1 }}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1750755072927-4221f5018635?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Post Cover"
              sx={{ width: "100%", borderRadius: 2, mb: 2 }}
            />

            {/* Social Share */}
            <Stack direction="row" spacing={1} justifyContent="center" mb={2}>
              <Button size="small" variant="contained" color="primary">Facebook</Button>
              <Button size="small" variant="contained" color="error">YouTube</Button>
              <Button size="small" variant="contained" color="secondary">Email</Button>
              <Button size="small" variant="contained" sx={{ backgroundColor: "#25D366" }}>WhatsApp</Button>
              <Button size="small" variant="contained" sx={{ backgroundColor: "#1DA1F2" }}>Twitter</Button>
            </Stack>

            <Typography variant="body1" color="text.secondary" mb={2}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry...
            </Typography>

            <Box
              component="img"
              src="https://via.placeholder.com/800x400"
              alt="Second Image"
              sx={{ width: "100%", borderRadius: 2, mb: 2 }}
            />

            <Typography variant="body2" color="text.secondary" mb={2}>
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
            </Typography>

            {/* Author Info */}
            <Box display="flex" alignItems="center" gap={1} mt={2}>
              <Avatar sx={{ bgcolor: "#ccc", width: 40, height: 40 }} />
              <Typography variant="body2">{post.author}</Typography>
            </Box>

            {/* Footer */}
            <Typography
              variant="body2"
              sx={{ mt: 2, color: "primary.main", cursor: "pointer" }}
            >
              Lorem Ipsum Back here
            </Typography>

            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={1} justifyContent="center">
              <Button size="small" variant="contained" color="primary">Facebook</Button>
              <Button size="small" variant="contained" color="error">YouTube</Button>
              <Button size="small" variant="contained" color="secondary">Email</Button>
              <Button size="small" variant="contained" sx={{ backgroundColor: "#25D366" }}>WhatsApp</Button>
              <Button size="small" variant="contained" sx={{ backgroundColor: "#1DA1F2" }}>Twitter</Button>
            </Stack>
          </Box>

          {/* Sidebar (Related Posts) */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#fff",
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
              alignSelf: "flex-start",
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Related Posts
            </Typography>

            {POSTS.filter(p => p.id !== post.id).map((related, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  mb: 2,
                  cursor: "pointer",
                  "&:hover .title": {
                    textDecoration: "underline",
                  },
                }}
              >
                <Box
                  component="img"
                  src={related.thumbnail}
                  alt={related.title}
                  sx={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    borderRadius: 1,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography
                    variant="body2"
                    className="title"
                    sx={{ fontWeight: 600, color: "#0d66ff", mb: 0.5 }}
                  >
                    {related.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {related.description}
                  </Typography>
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
