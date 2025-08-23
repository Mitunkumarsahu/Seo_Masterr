import { useState, useCallback } from 'react';
import defaultData from '../defaultData.json';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Endpoints where fallback should NOT apply
  const noFallbackEndpoints = ["/login", "/signup", "/auth"];

  // Helper to match keys from defaultData.json
  const findDefaultData = (url) => {
    const matchKey = Object.keys(defaultData).find((key) =>
      url.includes(key)
    );
    return matchKey ? defaultData[matchKey] : null;
  };

  const apiCall = useCallback(
    async (url, method = 'GET', bodyData = null, customHeaders = {}) => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const isFormData = bodyData instanceof URLSearchParams;

        const config = {
          method,
          headers: {
            ...(isFormData
              ? { 'Content-Type': 'application/x-www-form-urlencoded' }
              : { 'Content-Type': 'application/json' }),
            ...customHeaders,
          },
        };

        if (bodyData && ['POST', 'PUT', 'PATCH'].includes(method)) {
          config.body = isFormData ? bodyData : JSON.stringify(bodyData);
        }

        const response = await fetch(url, config);

        if (!response.ok) throw new Error(`Error ${response.status}`);

        const result = await response.json();

        // If API gives empty or null result → use default (if allowed)
        if (
          (!result || (Array.isArray(result) && result.length === 0)) &&
          !noFallbackEndpoints.some((path) => url.includes(path))
        ) {
          const fallback = findDefaultData(url);
          if (fallback) {
            console.warn(`Using fallback data for: ${url}`);
            setData(fallback);
            return fallback;
          }
        }

        setData(result);
        return result;
      } catch (err) {
        console.warn(`API failed: ${url}`);
        // Use fallback only if not login/signup/auth
        if (!noFallbackEndpoints.some((path) => url.includes(path))) {
          console.log({url});
          const fallback = findDefaultData(url);
          if (fallback) {
            console.warn(`Using fallback data for: ${url}`);
            setData(fallback);
            return fallback;
          }
        }
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { apiCall, loading, error, data };
};

export default useApi;
