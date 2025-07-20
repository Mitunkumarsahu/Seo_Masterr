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
    getCategories(import.meta.env.VITE_BACKEND_URL+"/blogs/categories");
  }, []);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  useEffect(() => {
    let url = import.meta.env.VITE_BACKEND_URL+`/blogs/?page=${currentPage}&page_size=${ITEMS_PER_PAGE}`;
    if (selectedCategory !== "all") {
      const selectedCat = categories.find(
        (cat) => cat.slug === selectedCategory
      );
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
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          sx={[style.testimonialSection.headline]}
          mb={5}
        >
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
          // <Box
          //   sx={{
          //     display: "flex",
          //     flexWrap: "wrap",
          //     justifyContent: "space-between",
          //     gap: 3,
          //   }}
          // >
          //   {blogs.map((blog) => (
          //     <Box
          //       key={blog.id}
          //       sx={{
          //         flex: "1 1 calc(33.33% - 2rem)",
          //         borderRadius: "12px",
          //         boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          //         overflow: "hidden",
          //         position: "relative",
          //         minWidth: "250px",
          //         maxWidth: "calc(33.33% - 2rem)",
          //         transition: "0.3s",
          //         "&:hover": {
          //           transform: "translateY(-5px)",
          //         },
          //       }}
          //     >
          //       {/* Background Image */}
          //       <Box
          //         sx={{
          //           height: "250px",
          //           width: "100%",
          //           backgroundImage: `url(${blog.featured_image})`,
          //           backgroundSize: "cover",
          //           backgroundPosition: "center",
          //           position: "relative",
          //         }}
          //       >
          //         {/* Dark Overlay for readability */}
          //         <Box
          //           sx={{
          //             position: "absolute",
          //             inset: 0,
          //             background:
          //               "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
          //             zIndex: 1,
          //           }}
          //         />

          //         {/* Text Content */}
          //         <Box
          //           sx={{
          //             position: "absolute",
          //             inset: 0,
          //             zIndex: 2,
          //             color: "#fff",
          //             display: "flex",
          //             flexDirection: "column",
          //             justifyContent: "space-between",
          //             p: 2,
          //           }}
          //         >
          //           <Box>
          //             <Typography
          //               variant="subtitle2"
          //               sx={{ fontSize: "20px", fontWeight: 800 }}
          //             >
          //               {blog.title}
          //             </Typography>
          //             <Typography variant="body2" sx={{ mt: 1 }}>
          //               {blog.meta_description}
          //             </Typography>
          //           </Box>

          //           {/* Author Info - bottom right */}
          //         </Box>
          //       </Box>

          //       <Box sx={{
          //             display: "flex",
          //             justifyContent: "space-between",
          //             flexDirection: "row",

          //       }}>
          //         {/* Read More Button */}
          //         <Box
          //           sx={{
          //             p: 2,
          //           }}
          //         >
          //           <Button
          //             variant="outlined"
          //             sx={{
          //               bgcolor: "transparent",
          //               color: "#ffffff",
          //               textTransform: "uppercase",
          //               borderRadius: 5,
          //               mt: 1,
          //               alignSelf: "flex-start",
          //               position: "relative",
          //               overflow: "hidden",
          //               border: "2px solid transparent",
          //               background:
          //                 "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          //               backgroundClip: "padding-box",
          //               transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          //               animation: "buttonPulse 2s ease-in-out infinite",
          //               "&::before": {
          //                 content: '""',
          //                 position: "absolute",
          //                 top: 0,
          //                 left: "-100%",
          //                 width: "100%",
          //                 height: "100%",
          //                 background:
          //                   "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          //                 transition: "left 0.6s",
          //               },
          //               "&:hover": {
          //                 transform: "translateY(-3px) scale(1.05)",
          //                 background:
          //                   "linear-gradient(135deg, #059669 0%, #047857 100%)",
          //                 "&::before": {
          //                   left: "100%",
          //                 },
          //               },
          //               "&:active": {
          //                 transform: "translateY(-1px) scale(1.02)",
          //               },
          //             }}
          //             onClick={() => navigate(`/blog/${blog.id}`)}
          //           >
          //             Read More
          //           </Button>
          //         </Box>
          //         <Box
          //           sx={{
          //             display: "flex",
          //             alignItems: "center",
          //             mx: 2,
          //           }}
          //         >
          //           <Typography
          //             variant="caption"
          //             sx={{ color: COLORS.primary, fontSize:"12px", fontWeight: 900 }}
          //           >
          //            Author: {blog.author.toUpperCase()}
          //           </Typography>

          //         </Box>
          //       </Box>
          //     </Box>
          //   ))}
          // </Box>

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
                  // flexDirection: { xs: "column", sm: "row" },
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
                    onClick={() => navigate(`/blog/${blog.id}`)}
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
                  color: "#000", // optional text color
                },
                "& .Mui-selected": {
                  backgroundColor: COLORS.secondary,
                  color: "#fff", // white text on secondary background
                  "&:hover": {
                    backgroundColor: COLORS.secondary, // maintain bg on hover
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

const CategoryTab = ({ label, selected, onClick }) => (
  <Button
    onClick={onClick}
    variant="outlined"
    size="small"
    sx={{
      backgroundColor: selected ? COLORS.primary : "#ffffff",
      color: selected ? "#ffff" : COLORS.primary,
      border: `1px solid ${COLORS.primary}`,
      fontWeight: 700,
      fontSize: "0.75rem",
      borderRadius: "20px",
      px: 2.5,
      py: 0.75,
      textTransform: "capitalize",
      minWidth: "auto",
      "&:hover": {
        backgroundColor: selected ? COLORS.primary : "#e0eaff",
        borderColor: "#0C2F58",
      },
    }}
  >
    {label.toUpperCase()}
  </Button>
);

export default BlogPage;
