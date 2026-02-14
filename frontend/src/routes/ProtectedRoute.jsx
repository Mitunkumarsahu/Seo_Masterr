// ProtectedRoute.jsx
// import { useEffect, useState } from "react"; // Commented out for public access
// import { useLocation, Navigate } from "react-router-dom"; // Commented out for public access
// import { useAuth } from "../hooks/useAuth"; // Commented out for public access
// import AuthModal from "../components/AuthModal"; // Commented out for public access
// import { useNavigate } from "react-router-dom"; // Commented out for public access
// import Loader from "../components/Loader"; // Commented out for public access
// import UnderConstruction from "../pages/UnderConstruction"; // Commented out for public access

const ProtectedRoute = ({ children }) => {
  /* Commenting out auth logic for public access
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setAuthModalOpen(true);
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return (
      <Loader/>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <AuthModal
          open={authModalOpen}
          handleClose={() => setAuthModalOpen(false)}
          onSuccess={() => {
            setAuthModalOpen(false);
          }}
          redirectTo={location.pathname}
          mode="private"
        />
      </>
    );
  }
  */

  return children;
};

export default ProtectedRoute;
