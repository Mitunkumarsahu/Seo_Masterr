import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi"; // Ensure this path is correct

const ITEMS_PER_PAGE = 6;

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  // Blogs API
  const {
    apiCall: getBlogs,
    data: blogsData,
    loading: blogsLoading,
    error: blogsError,
  } = useApi();

  // Categories API
  const {
    apiCall: getCategories,
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useApi();

  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getCategories("http://127.0.0.1:8000/blogs/categories");
  }, []);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  useEffect(() => {
    let url = `http://127.0.0.1:8000/blogs/?page=${currentPage}&page_size=${ITEMS_PER_PAGE}`;
    if (selectedCategory !== "all") {
      const selectedCat = categories.find((cat) => cat.slug === selectedCategory);
      if (selectedCat) {
        url += `&category_id=${selectedCat.id}`;
      }
    }
    getBlogs(url);
  }, [currentPage, selectedCategory, categories]);

  useEffect(() => {
    if (blogsData) {
      setBlogs(blogsData.items || []);
      setTotalPages(Math.ceil((blogsData.total || 0) / ITEMS_PER_PAGE));
    }
  }, [blogsData]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9" }}>
         {/* <Typography variant="h3" fontWeight="bold" sx={{ color: "#000", textAlign:"center",py:4, mb: 2 }}>
          Blogs
        </Typography> */}
      {/* Header */}
      {/* <Box
        sx={{
          background: "linear-gradient(to top, rgba(12, 47, 88, 1), rgba(12, 47, 88, 0))",
          py: 6,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold" sx={{ color: "#fff", mb: 2 }}>
          Blogs
        </Typography>
      </Box> */}

      <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography variant="h3" fontWeight="bold" textAlign="center" mb={5}>
          Our Blogs
        </Typography>

        {/* Category Tabs */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            mb: 6,
          }}
        >
          <CategoryTab
            label="All"
            selected={selectedCategory === "all"}
            onClick={() => handleCategoryChange("all")}
          />
          {categories.map((cat) => (
            <CategoryTab
              key={cat.id}
              label={cat.name}
              selected={selectedCategory === cat.slug}
              onClick={() => handleCategoryChange(cat.slug)}
            />
          ))}
        </Box>

        {/* Blog List */}
        {blogsLoading || categoriesLoading ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        ) : blogs.length === 0 ? (
          <Typography textAlign="center" mt={4}>
            No blogs found for this category.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            {blogs.map((blog) => (
              <Box
                key={blog.id}
                sx={{
                  flex: "1 1 calc(33.33% - 2rem)",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                  px: 3,
                  py: 2,
                  minWidth: "250px",
                  maxWidth: "calc(33.33% - 2rem)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Typography variant="subtitle2" sx={{ color: "#00C896", fontWeight: 600 }}>
                  {blog.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#333", mt: 1, mb: 2 }}>
                  {blog.meta_description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption" sx={{ color: "gray", fontWeight: 500 }}>
                    {blog.author}
                  </Typography>
                  <Box
                    sx={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "#ddd",
                    }}
                  />
                </Box>

                <Button
                  variant="outlined"
                  sx={{ mt: 2, alignSelf: "flex-start", borderRadius: "20px" }}
                  onClick={() => navigate(`/blog/${blog.id}`)}
                >
                  Read More
                </Button>
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
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

const CategoryTab = ({ label, selected, onClick }) => (
  <Button
    onClick={onClick}
    variant="outlined"
    size="small"
    sx={{
      backgroundColor: selected ? "#0C2F58" : "#ffffff",
      color: selected ? "#fff" : "#0C2F58",
      border: "1px solid #0C2F58",
      fontWeight: 700,
      fontSize: "0.75rem",
      borderRadius: "20px",
      px: 2.5,
      py: 0.75,
      textTransform: "capitalize",
      minWidth: "auto",
      "&:hover": {
        backgroundColor: selected ? "#092342" : "#e0eaff",
        borderColor: "#0C2F58",
      },
    }}
  >
    {label}
  </Button>
);

export default BlogPage;
