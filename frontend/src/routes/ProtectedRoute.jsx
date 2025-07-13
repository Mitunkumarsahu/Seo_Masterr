// ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthModal from "../components/AuthModal"; // your modal component
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
      </div>
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

  return children;
};

export default ProtectedRoute;
