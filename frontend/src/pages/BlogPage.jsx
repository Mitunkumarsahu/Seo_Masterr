// src/pages/BlogPage.jsx
import {
  Avatar,
  Box,
  Button,
  Container,
  Typography
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";


const POSTS = [
  { id: 1, category: "Lorem", title: "Lorem Ipsum", excerpt: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", author: "Lorem Ipsum" },
  { id: 2, category: "Ipsum", title: "Lorem Ipsum", excerpt: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", author: "Lorem Ipsum" },
  { id: 3, category: "Has Been", title: "Lorem Ipsum", excerpt: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", author: "Lorem Ipsum" },
  { id: 4, category: "Lorem", title: "Lorem Ipsum", excerpt: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", author: "Lorem Ipsum" },
  { id: 5, category: "Ipsum", title: "Lorem Ipsum", excerpt: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", author: "Lorem Ipsum" },
  { id: 6, category: "The Industry's", title: "Lorem Ipsum", excerpt: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", author: "Lorem Ipsum" }
];

const BlogPage = () => {
  const categories = useMemo(() => ["All", ...new Set(POSTS.map(p => p.category))], []);
  const [activeCat, setActiveCat] = useState("All");
  const visiblePosts = activeCat === "All" ? POSTS : POSTS.filter(p => p.category === activeCat);

  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      <Container maxWidth="xl" sx={{ py: 8 }}>
        {/* Heading */}
        <Typography variant="h3" fontWeight="bold" textAlign="center" mb={6}>
          Lorem Ipsum Has
        </Typography>

        {/* Category Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            mb: 8,
            flexWrap: "wrap"
          }}
        >
          {categories.map(cat => (
            <Typography
              key={cat}
              onClick={() => setActiveCat(cat)}
              sx={{
                cursor: "pointer",
                fontWeight: 600,
                textTransform: "uppercase",
                borderBottom: activeCat === cat ? "2px solid #000" : "2px solid transparent",
                pb: 1,
                color: activeCat === cat ? "#000" : "#888",
                "&:hover": { color: "#000" }
              }}
            >
              {cat}
            </Typography>
          ))}
        </Box>

        {/* First 3 Blog Cards */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            justifyContent: "space-around",
            mb: 8,
            px: 2
          }}
        >
          {visiblePosts.slice(0, 3).map(post => (
            <Box
              key={post.id}
              sx={{
                flex: "1 1 360px",
                maxWidth: "380px"
              }}
            >
              <BlogCard post={post} />
            </Box>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Box sx={{ backgroundColor: "#0b2a4d", py: 8, px: 2 }}>
        <Container maxWidth="md">
          <Typography variant="body1" sx={{ color: "#fff", textAlign: "center", mb: 4 }}>
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              sx={{ backgroundColor: "#00C896", px: 5, py: 2 }}
            >
              LOREM IPSUM
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Remaining Blog Cards */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            justifyContent: "space-around",
            px: 2
          }}
        >
          {visiblePosts.slice(3).map(post => (
            <Box
              key={post.id}
              sx={{
                flex: "1 1 360px",
                maxWidth: "380px"
              }}
            >
              <BlogCard post={post} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};


const BlogCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.06)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-6px)"
        }
      }}
    >
      <Box sx={{ height: 200, width: "100%", backgroundColor: "#ccc" }} />

      <Box sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
        <Typography variant="caption" sx={{ color: "#0d66ff", fontWeight: 700, mb: 0.8 }}>
          {post.category}
        </Typography>

        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1.5 }}>
          {post.title}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
          {post.excerpt}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#0d66ff",
            fontWeight: 600,
            mb: 2,
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" }
          }}
          onClick={() => navigate(`/blog/${post.id}`)}
        >
          LEARN MORE →
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: "auto" }}>
          <Avatar sx={{ width: 28, height: 28, mr: 1.5, bgcolor: "#ccc" }} />
          <Typography variant="body2" color="text.primary">
            {post.author}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};


export default BlogPage;
