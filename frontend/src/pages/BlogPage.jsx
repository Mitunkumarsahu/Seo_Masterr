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


const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;
  const navigate = useNavigate();


  // Fetch blogs and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, categoriesRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/blogs/"),
          fetch("http://127.0.0.1:8000/blogs/categories"),
        ]);

        const blogsData = await blogsRes.json();
        const categoriesData = await categoriesRes.json();

        setBlogs(blogsData);
        setFilteredBlogs(blogsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        console.error("Error loading blogs or categories:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter blogs by category
  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 on category change
    if (selectedCategory === "all") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter((blog) =>
        blog.categories?.some((cat) => cat.slug === selectedCategory)
      );
      setFilteredBlogs(filtered);
    }
  }, [selectedCategory, blogs]);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9" }}>
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(to top, rgba(12, 47, 88, 1), rgba(12, 47, 88, 0))",
          py: 6,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ color: "#fff", mb: 2 }}
        >
          Blogs
        </Typography>
      </Box>

      <Container maxWidth="xl" sx={{ py: 6 }}>
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
            onClick={() => setSelectedCategory("all")}
          />
          {categories.map((cat) => (
            <CategoryTab
              key={cat.id}
              label={cat.name}
              selected={selectedCategory === cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
            />
          ))}
        </Box>

        {/* Blog List */}
        {loading ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        ) : filteredBlogs.length === 0 ? (
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
            {paginatedBlogs.map((blog) => (
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
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#00C896", fontWeight: 600 }}
                >
                  {blog.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#333", mt: 1, mb: 2 }}
                >
                  {blog.meta_description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "gray", fontWeight: 500 }}
                  >
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

                {/* New Read More Button */}
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

        {/* Conditional Pagination */}
        {filteredBlogs.length > ITEMS_PER_PAGE && (
          <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE)}
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

// Category Tab Button Component
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
