// App.jsx
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import RouteGenerator from "./routes/RouteGenerator";
// import { AuthProvider } from "../src/hooks/useAuth"; // Commented out for public access
import ScrollToTopButton from "./components/ScrollToTopButton";


function App() {
  return (
    /* AuthProvider commented out for public access */
    // <AuthProvider>
    <>
      <NavBar />
      <RouteGenerator />
      <ScrollToTopButton />
      <Footer />
    </>
    // </AuthProvider>
  );
}

export default App;
