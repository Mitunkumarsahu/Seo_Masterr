// routes/RoleBasedRoute.jsx
// import { Navigate, useLocation } from 'react-router-dom' // Commented out for public access
// import { useAuth } from '../hooks/useAuth' // Commented out for public access
// import Loader from '../components/Loader' // Commented out for public access

const RoleBasedRoute = ({ children, requiredRoles }) => {
  /* Commenting out role logic for public access
  const { isAuthenticated, user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <Loader/>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    )
  }

  // Check if user has required role
  if (requiredRoles && !requiredRoles.includes(user?.role)) {
    return (
      <Navigate 
        to="/unauthorized" 
        replace 
      />
    )
  }
  */

  return children
}

export default RoleBasedRoute