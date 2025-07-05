// --- src/pages/BlogPage.jsx ---
import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Avatar,
  Button
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import style from "../styles/Styles";

/* ------------------------------------------------------------------ */
/* Demo data – normally fetched from an API ------------------------- */
const POSTS = [
  {
    id: 1,
    category: "Lorem",
    title: "Lorem Ipsum",
    excerpt:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley…",
    author: "Lorem Ipsum"
  },
  /* duplicate and vary for demo */
  { id: 2, category: "Ipsum", title: "Lorem Ipsum", excerpt: "sjuidysg jhbd", author: "Lorem Ipsum" },
  { id: 3, category: "Has Been", title: "Lorem Ipsum", excerpt: "sjuidysg jhbd", author: "Lorem Ipsum" },
  { id: 4, category: "Lorem", title: "Lorem Ipsum", excerpt: "asdfg fghbg", author: "Lorem Ipsum" },
  { id: 5, category: "Ipsum", title: "Lorem Ipsum", excerpt: "jhgfd fdxh", author: "Lorem Ipsum" },
  { id: 6, category: "The Industry's", title: "Lorem Ipsum", excerpt: "siuhyg", author: "Lorem Ipsum" }
];
/* ------------------------------------------------------------------ */

const BlogPage = () => {
  const s = style.blogPage;

  /* collect unique categories */
  const categories = useMemo(
    () => ["All", ...new Set(POSTS.map(p => p.category))],
    []
  );
  const [activeCat, setActiveCat] = useState("All");

  /* filter posts on the fly */
  const visiblePosts =
    activeCat === "All" ? POSTS : POSTS.filter(p => p.category === activeCat);

  return (
    <Box sx={s.pageWrapper}>
      <Container>

        {/* Page heading */}
        <Typography variant="h4" sx={s.heading}>
          Lorem Ipsum Has
        </Typography>

        {/* Category bar */}
        <Box sx={s.catBarWrapper}>
          {categories.map(cat => (
            <Typography
              key={cat}
              sx={{
                ...s.catChip,
                ...(activeCat === cat && { className: "active" })
              }}
              onClick={() => setActiveCat(cat)}
            >
              {cat.toUpperCase()}
            </Typography>
          ))}
        </Box>

        {/* Blog card grid (first batch) */}
        <Grid container spacing={4}>
          {visiblePosts.slice(0, 3).map(post => (
            <Grid item xs={12} md={4} key={post.id}>
              <BlogCard post={post} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA strip */}
      <Box sx={s.ctaStrip}>
        <Typography variant="body1" sx={s.ctaText}>
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived centuries and the leap into electronic typesetting.
        </Typography>
        <Button variant="contained" sx={s.ctaBtn}>
          LOREM IPSUM
        </Button>
      </Box>

      {/* Second batch of posts */}
      <Container>
        <Grid container spacing={4}>
          {visiblePosts.slice(3).map(post => (
            <Grid item xs={12} md={4} key={post.id}>
              <BlogCard post={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

/* ------------------------------------------------------------------ */
/* Re‑usable BlogCard component ------------------------------------- */
const BlogCard = ({ post }) => {
  const s = style.blogPage;

  return (
    <Box sx={s.cardRoot}>
      {/* Image placeholder */}
      <Box sx={s.cardMedia} />

      {/* Category */
      /* In a real app, link these to /category/:slug */}
      <Typography variant="caption" color="#0d66ff" sx={{ mt: 1 }}>
        {post.category.toUpperCase()}
      </Typography>

      <Typography variant="subtitle1" sx={s.cardTitle}>
        {post.title}
      </Typography>

      <Typography sx={s.cardExcerpt}>{post.excerpt}</Typography>

      <Box sx={s.learnMore}>
        LEARN MORE <ArrowForwardIcon fontSize="inherit" />
      </Box>

      <Box sx={s.cardFooter}>
        <Avatar sx={s.avatar} />
        {post.author}
      </Box>
    </Box>
  );
};
/* ------------------------------------------------------------------ */

export default BlogPage;
