// App.jsx
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import RouteGenerator from "./routes/RouteGenerator";

function App() {
  return (
    <>
      <NavBar />
      <RouteGenerator />
      <Footer />
    </>
  );
}

export default App;
