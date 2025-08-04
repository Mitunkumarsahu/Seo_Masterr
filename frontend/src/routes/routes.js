import AboutUs from "../pages/AboutUs";
import BlogDetailPage from "../pages/BlogDetailPage";
import BlogPage from "../pages/BlogPage";
import ContactUsPage from "../pages/ContactUsPage";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import ServiceDetail from "../pages/ServiceDetail";
import Services from "../pages/Services";

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
      "type": "private"
    },
    {
      "path":"/services",
      "component":Services,
      "type":"private"

    },
    {
      "path": "/blog/:slug",
      "component": BlogDetailPage,
      "type": "private"
    },
    {
      "path": "/service/:id",
      "component": ServiceDetail,
      "type": "private"
    },
    {
      "path": "/contact-us",
      "component": ContactUsPage,
      "type": "public"
    }
  ]
}

export default routes;
