import {
  Box,
  Button,
  CircularProgress,
  Container,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi"; // Ensure this path is correct
import style, { COLORS } from "../styles/Styles"; // Ensure this path is correct

const ITEMS_PER_PAGE = 6;

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  // Blog Fetch
  const {
    apiCall: getBlogs,
    data: blogsData,
    headers: blogsHeaders,
    loading: blogsLoading,
  } = useApi();

  // Categories Fetch
  const {
    apiCall: getCategories,
    data: categoryData,
    loading: categoriesLoading,
  } = useApi();

  // Tags Fetch
  const { apiCall: getTags, data: tagData } = useApi();

  // Fetch categories and tags on mount
  useEffect(() => {
    getCategories(
      "https://lemonchiffon-curlew-159892.hostingersite.com//wp-json/wp/v2/categories"
    );
    getTags(
      "https://lemonchiffon-curlew-159892.hostingersite.com//wp-json/wp/v2/tags?per_page=100"
    );
  }, []);

  // Store categories
  useEffect(() => {
    if (Array.isArray(categoryData)) {
      setCategories(categoryData);
    }
  }, [categoryData]);

  // Store tags
  useEffect(() => {
    if (Array.isArray(tagData)) {
      setTags(tagData);
    }
  }, [tagData]);

  // Fetch blogs
  useEffect(() => {
    let url = `https://lemonchiffon-curlew-159892.hostingersite.com/wp-json/wp/v2/posts?_embed&per_page=${ITEMS_PER_PAGE}&page=${currentPage}`;
    if (selectedCategory !== "all") {
      url += `&categories=${selectedCategory}`;
    }
    getBlogs(url);
  }, [selectedCategory, currentPage]);

  // Transform blog data
  useEffect(() => {
    if (Array.isArray(blogsData)) {
      const transformed = blogsData.map((post) => {
        const parser = new DOMParser();

        const decode = (html) =>
          parser.parseFromString(html, "text/html").body.textContent || "";

        const tagNames = post.tags
          .map((tagId) => tags.find((tag) => tag.id === tagId)?.name)
          .filter(Boolean);

        return {
          id: post.id,
          title: decode(post.title.rendered), // 👈 fix here
          author: post._embedded?.author?.[0]?.name || "Unknown",
          published_at: post.date,
          meta_description: decode(
            post.excerpt.rendered.replace(/<[^>]+>/g, "")
          ), // 👈 also decode excerpt
          slug: post.slug,
          featured_image:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcPgqm575oc2CiJLcYCo75HYrrQatuUSZ3KA&s",
          tags: tagNames,
        };
      });

      setBlogs(transformed);
      const total = Number(blogsHeaders?.["x-wp-totalpages"] || 1);
      setTotalPages(total);
    }
  }, [blogsData, blogsHeaders, tags]);

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

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

        {/* Category Tabs */}
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={2}
          mb={4}
        >
          <Button
            variant="outlined"
            size="small"
            sx={{
              backgroundColor:
                selectedCategory === "all" ? COLORS.primary : "#ffffff",
              color: selectedCategory === "all" ? "#fff" : COLORS.primary,
              border: `1px solid ${COLORS.primary}`,
              fontWeight: 700,
              fontSize: "0.75rem",
              borderRadius: "20px",
              px: 2.5,
              py: 0.75,
              textTransform: "capitalize",
              minWidth: "auto",
              "&:hover": {
                backgroundColor:
                  selectedCategory === "all" ? COLORS.primary : "#e0eaff",
                borderColor: "#0C2F58",
              },
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
                    backgroundColor: isSelected ? COLORS.primary : "#ffffff",
                    color: isSelected ? "#fff" : COLORS.primary,
                    border: `1px solid ${COLORS.primary}`,
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    borderRadius: "20px",
                    px: 2.5,
                    py: 0.75,
                    textTransform: "capitalize",
                    minWidth: "auto",
                    "&:hover": {
                      backgroundColor: isSelected ? COLORS.primary : "#e0eaff",
                      borderColor: "#0C2F58",
                    },
                  }}
                  variant="outlined"
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.name}
                </Button>
              );
            })
          )}
        </Box>

        {/* Blog List */}
        {blogsLoading ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        ) : blogs.length === 0 ? (
          <Typography textAlign="center" mt={4}>
            No blogs found.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              px: { xs: 2, sm: 4, md: 30 },
              py: 4,
            }}
          >
            {blogs.map((blog) => (
              <Box
                key={blog.id}
                sx={{
                  display: "flex",
                  gap: 3,
                  borderBottom: "1px solid #ddd",
                  pb: 3,
                }}
              >
                {/* Thumbnail */}
                <Box
                  sx={{
                    width: { xs: 40, sm: 60 },
                    height: { xs: 40, sm: 60 },
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={blog.featured_image}
                    alt={blog.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: COLORS.primary,
                      fontWeight: "bold",
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => navigate(`/blog/${blog.slug}`)}
                  >
                    {blog.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontStyle: "italic",
                      color: "text.secondary",
                      mb: 1,
                    }}
                  >
                    By {blog.author} •{" "}
                    {new Date(blog.published_at).toLocaleDateString("en-IN", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>

                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    {blog.meta_description.length > 150
                      ? blog.meta_description.slice(0, 150) + "..."
                      : blog.meta_description}
                  </Typography>

                  {/* Tags */}
                  {blog.tags?.length > 0 && (
                    <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                      {blog.tags.map((tag, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            backgroundColor: "#f0f0f0",
                            color: "#333",
                            px: 1,
                            py: 0.25,
                            fontSize: "0.7rem",
                            borderRadius: "4px",
                            fontWeight: 500,
                          }}
                        >
                          #{tag}
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
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
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#000",
                },
                "& .Mui-selected": {
                  backgroundColor: COLORS.secondary,
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: COLORS.secondary,
                  },
                },
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BlogPage;
