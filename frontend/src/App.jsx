// App.jsx
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import RouteGenerator from "./routes/RouteGenerator";
// import { AuthProvider } from "../src/hooks/useAuth"; // Commented out for public access
import ScrollToTopButton from "./components/ScrollToTopButton";
import { DropdownDataProvider } from "./contexts/DropdownDataContext";


function App() {
  return (
    /* AuthProvider commented out for public access */
    // <AuthProvider>
    <DropdownDataProvider>
      <NavBar />
      <RouteGenerator />
      <ScrollToTopButton />
      <Footer />
    </DropdownDataProvider>
    // </AuthProvider>
  );
}

export default App;
