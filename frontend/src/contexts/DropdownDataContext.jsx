import { createContext, useContext, useState, useEffect } from 'react';
import useApi from '../hooks/useApi';

const DropdownDataContext = createContext();

export const useDropdownData = () => {
  const context = useContext(DropdownDataContext);
  if (!context) {
    throw new Error('useDropdownData must be used within a DropdownDataProvider');
  }
  return context;
};

export const DropdownDataProvider = ({ children }) => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [servicesByType, setServicesByType] = useState({});
  const [postsByCategory, setPostsByCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const { apiCall } = useApi();

  // Initialize data on mount
  useEffect(() => {
    const initializeData = async () => {
      if (isInitialized) return;
      
      setIsLoading(true);
      try {
        // Fetch service types and blog categories in parallel
        const [typesData, categoriesData] = await Promise.all([
          apiCall(import.meta.env.VITE_APP_BACKEND_URL + "/wp-json/wp/v2/service_type?per_page=100"),
          apiCall(import.meta.env.VITE_APP_BACKEND_URL + "/wp-json/wp/v2/categories?per_page=100")
        ]);

        if (Array.isArray(typesData)) {
          setServiceTypes(typesData);
        }

        if (Array.isArray(categoriesData)) {
          setBlogCategories(categoriesData);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize dropdown data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [apiCall, isInitialized]);

  // Fetch services for a specific type (with caching)
  const getServicesForType = async (typeId) => {
    if (servicesByType[typeId]) {
      return servicesByType[typeId]; // Return cached data
    }

    try {
      const url = `${import.meta.env.VITE_APP_BACKEND_URL}/wp-json/wp/v2/service?service_type=${typeId}&per_page=10`;
      const data = await apiCall(url);
      
      if (data) {
        // Cache the data
        setServicesByType(prev => ({
          ...prev,
          [typeId]: data
        }));
        return data;
      }
    } catch (error) {
      console.error(`Failed to fetch services for type ${typeId}:`, error);
    }
    
    return [];
  };

  // Fetch posts for a specific category (with caching)
  const getPostsForCategory = async (categoryId) => {
    if (postsByCategory[categoryId]) {
      return postsByCategory[categoryId]; // Return cached data
    }

    try {
      const url = `${import.meta.env.VITE_APP_BACKEND_URL}/wp-json/wp/v2/posts?categories=${categoryId}&per_page=6&_embed`;
      const data = await apiCall(url);
      
      if (data) {
        const parser = new DOMParser();
        const decode = (html) =>
          parser.parseFromString(html, "text/html").body.textContent || "";

        const transformed = data.map((post) => ({
          id: post.id,
          title: decode(post.title.rendered),
          published_at: post.date,
          slug: post.slug,
          featured_image:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://via.placeholder.com/300x200",
          excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 100) + "...",
        }));

        // Cache the transformed data
        setPostsByCategory(prev => ({
          ...prev,
          [categoryId]: transformed
        }));
        return transformed;
      }
    } catch (error) {
      console.error(`Failed to fetch posts for category ${categoryId}:`, error);
    }
    
    return [];
  };

  // Preload data for better UX (optional)
  const preloadServicesForType = async (typeId) => {
    if (!servicesByType[typeId]) {
      await getServicesForType(typeId);
    }
  };

  const preloadPostsForCategory = async (categoryId) => {
    if (!postsByCategory[categoryId]) {
      await getPostsForCategory(categoryId);
    }
  };

  const value = {
    // Data
    serviceTypes,
    blogCategories,
    servicesByType,
    postsByCategory,
    
    // State
    isLoading,
    isInitialized,
    
    // Methods
    getServicesForType,
    getPostsForCategory,
    preloadServicesForType,
    preloadPostsForCategory,
    
    // Utility methods
    clearCache: () => {
      setServicesByType({});
      setPostsByCategory({});
    },
    
    refreshData: async () => {
      setIsInitialized(false);
      setServiceTypes([]);
      setBlogCategories([]);
      setServicesByType({});
      setPostsByCategory({});
    }
  };

  return (
    <DropdownDataContext.Provider value={value}>
      {children}
    </DropdownDataContext.Provider>
  );
};

export default DropdownDataContext;