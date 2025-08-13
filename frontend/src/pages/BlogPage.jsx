import {
  Box,
  Button,
  CircularProgress,
  Container,
  Pagination,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import style, { COLORS } from "../styles/Styles";

const ITEMS_PER_PAGE =6 ;

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const blogsCache = useRef({}); // ✅ cache to avoid re-fetch
  const navigate = useNavigate();

  // API hooks
  const {
    apiCall: getBlogs,
    data: blogsData,
    headers: blogsHeaders,
    loading: blogsLoading
  } = useApi();
  const {
    apiCall: getCategories,
    data: categoryData,
    loading: categoriesLoading
  } = useApi();
  const { apiCall: getTags, data: tagData } = useApi();

  // Initial categories & tags fetch
  useEffect(() => {
    getCategories(`${import.meta.env.VITE_APP_BACKEND_URL}/wp-json/wp/v2/categories`);
    getTags(`${import.meta.env.VITE_APP_BACKEND_URL}/wp-json/wp/v2/tags?per_page=100`);
  }, []);

  useEffect(() => {
    if (Array.isArray(categoryData)) setCategories(categoryData);
  }, [categoryData]);

  useEffect(() => {
    if (Array.isArray(tagData)) setTags(tagData);
  }, [tagData]);

  // Fetch blogs if not cached
  useEffect(() => {
    const cacheKey = `${selectedCategory}-${currentPage}`;
    if (blogsCache.current[cacheKey]) {
      // Load from cache
      setBlogs(blogsCache.current[cacheKey].blogs);
      setTotalPages(blogsCache.current[cacheKey].totalPages);
      return;
    }

    let url = `${import.meta.env.VITE_APP_BACKEND_URL}/wp-json/wp/v2/posts?_embed`;
    if (selectedCategory !== "all") url += `&categories=${selectedCategory}`;
    getBlogs(url);
  }, [selectedCategory, currentPage]);

  // Transform and cache blogs
  useEffect(() => {
    if (Array.isArray(blogsData)) {
      const parser = new DOMParser();
      const decode = (html) => parser.parseFromString(html, "text/html").body.textContent || "";

      const transformed = blogsData.map((post) => {
        const tagNames = post.tags
          .map((tagId) => tags.find((t) => t.id === tagId)?.name)
          .filter(Boolean);
        return {
          id: post.id,
          title: decode(post.title.rendered),
          author: post._embedded?.author?.[0]?.name || "Unknown",
          published_at: post.date,
          meta_description: decode(post.excerpt.rendered.replace(/<[^>]+>/g, "")),
          slug: post.slug,
          featured_image:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcPgqm575oc2CiJLcYCo75HYrrQatuUSZ3KA&s",
          tags: tagNames,
        };
      });

      const total = Number(blogsHeaders?.["x-wp-totalpages"] || 1);
      const cacheKey = `${selectedCategory}-${currentPage}`;
      blogsCache.current[cacheKey] = { blogs: transformed, totalPages: total };
      setBlogs(transformed);
      setTotalPages(total);
    }
  }, [blogsData, blogsHeaders, tags]);

  const handlePageChange = (_, value) => setCurrentPage(value);
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9" }}>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          sx={[style.testimonialSection.headline]}
          mb={4}
        >
          Our Blogs
        </Typography>

        {/* Categories */}
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2} mb={4}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: selectedCategory === "all" ? COLORS.primary : "#fff",
              color: selectedCategory === "all" ? "#fff" : COLORS.primary,
              border: `1px solid ${COLORS.primary}`,
              fontWeight: 700,
              borderRadius: "20px",
              "&:hover": { backgroundColor: selectedCategory === "all" ? COLORS.primary : "#e0eaff" }
            }}
            onClick={() => handleCategoryChange("all")}
          >
            All
          </Button>

          {categoriesLoading ? (
            <CircularProgress size={24} />
          ) : (
            categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <Button
                  key={cat.id}
                  size="small"
                  sx={{
                    backgroundColor: isSelected ? COLORS.primary : "#fff",
                    color: isSelected ? "#fff" : COLORS.primary,
                    border: `1px solid ${COLORS.primary}`,
                    fontWeight: 700,
                    borderRadius: "20px",
                    "&:hover": { backgroundColor: isSelected ? COLORS.primary : "#e0eaff" }
                  }}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.name}
                </Button>
              );
            })
          )}
        </Box>

        {/* Blog Cards */}
        {blogsLoading && !blogs.length ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        ) : blogs.length === 0 ? (
          <Typography textAlign="center" mt={4}>No blogs found.</Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 3
            }}
          >
            {blogs.map((blog) => (
              <Card key={blog.id} sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={blog.featured_image}
                  alt={blog.title}
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/blog/${blog.slug}`)}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color={COLORS.primary}
                    sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                    onClick={() => navigate(`/blog/${blog.slug}`)}
                  >
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {blog.meta_description.length > 120
                      ? blog.meta_description.slice(0, 120) + "..."
                      : blog.meta_description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    By {blog.author} •{" "}
                    {new Date(blog.published_at).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </Typography>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
              color="primary"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BlogPage;
