// App.jsx
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import RouteGenerator from "./routes/RouteGenerator";
import { AuthProvider } from "../src/hooks/useAuth"; // ✅ import it

function App() {
  return (
    <AuthProvider> {/* ✅ wrap everything here */}
      <NavBar />
      <RouteGenerator />
      <Footer />
    </AuthProvider>
  );
}

export default App;
