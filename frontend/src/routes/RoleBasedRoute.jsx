// routes/RoleBasedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const RoleBasedRoute = ({ children, requiredRoles }) => {
  const { isAuthenticated, user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
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

  return children
}

export default RoleBasedRoute