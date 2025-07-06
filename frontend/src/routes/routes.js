import AboutUs from "../pages/AboutUs";
import BlogDetailPage from "../pages/BlogDetailPage";
import BlogPage from "../pages/BlogPage";
import ContactUsPage from "../pages/ContactUsPage";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";

const routes = {
  "routes": [
    {
      "path": "/",
      "component": Home,
      "type": "public"
    },
    {
      "path": "/dashboard",
      "component": Dashboard,
      "type": "public",
      "roles": ["admin", "moderator"]
    },
    {
      "path": "/about-us",
      "component": AboutUs,
      "type": "public"
    },
    {
      "path": "/blogs",
      "component": BlogPage,
      "type": "public"
    },
    {
      "path": "/blog/:id",
      "component": BlogDetailPage,
      "type": "public"
    },
    {
      "path": "/contact-us",
      "component": ContactUsPage,
      "type": "public"
    }
  ]
}

export default routes;
