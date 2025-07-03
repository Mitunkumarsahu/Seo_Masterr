import AboutUs from "../pages/AboutUs";
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
      "path":"/about-us",
      "component":AboutUs,
      "type":"public",
    }
  ]
}

export default routes;
