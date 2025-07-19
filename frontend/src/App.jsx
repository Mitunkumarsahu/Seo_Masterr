// App.jsx
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import RouteGenerator from "./routes/RouteGenerator";
import { AuthProvider } from "../src/hooks/useAuth"; // ✅ import it
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  return (
    <AuthProvider> {/* ✅ wrap everything here */}
      <NavBar />
      <RouteGenerator />
      <ScrollToTopButton/>
      <Footer />
      
    </AuthProvider>
  );
}

export default App;
