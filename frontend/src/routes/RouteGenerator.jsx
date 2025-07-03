// routes/RouteGenerator.jsx
import { Routes, Route } from 'react-router-dom'
import { useMemo } from 'react'
import routesConfig from './routes'
import ProtectedRoute from './ProtectedRoute'
import RoleBasedRoute from './RoleBasedRoute'
import NotFound from '../pages/NotFound'

const RouteGenerator = () => {



  const renderRoute = (route, index) => {
    const Component = route.component;
    if (!Component) {
      console.warn(`Component ${route.component} not found`)
      return null
    }
    if (route.type === 'public') {
      return (
        <Route 
          key={index}
          path={route.path} 
          element={<Component />} 
        />
      )
    }
    
    if (route.type === 'private' && route.roles) {
      return (
        <Route 
          key={index}
          path={route.path} 
          element={
            <RoleBasedRoute requiredRoles={route.roles}>
              <Component />
            </RoleBasedRoute>
          } 
        />
      )
    }
    
    if (route.type === 'private') {
      return (
        <Route 
          key={index}
          path={route.path} 
          element={
            <ProtectedRoute>
              <Component />
            </ProtectedRoute>
          } 
        />
      )
    }
    
    return null
  }

  return (
    <Routes>
      {routesConfig.routes.map((route, index) => renderRoute(route, index))}
      <Route 
        path="*" 
        element={<NotFound />}
      />
    </Routes>
  )
}

export default RouteGenerator