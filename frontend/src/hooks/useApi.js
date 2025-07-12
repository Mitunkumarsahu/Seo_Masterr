// // hooks/useApi.js
// import { useState } from 'react'

// const useApi = () => {
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [data, setData] = useState(null)

//   const apiCall = async (url, method = 'GET', bodyData = null, customHeaders = {}) => {
//     setLoading(true)
//     setError(null)
//     setData(null)

//     try {
//       const config = {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           ...customHeaders, // merge dynamic headers
//         },
//       }

//       if (bodyData && ['POST', 'PUT', 'PATCH'].includes(method)) {
//         config.body = JSON.stringify(bodyData)
//       }

//       const response = await fetch(url, config)

//       if (!response.ok) {
//         const errorText = await response.text()
//         throw new Error(`Error ${response.status}: ${errorText}`)
//       }

//       const result = await response.json()
//       setData(result)
//       return result
//     } catch (err) {
//       setError(err.message)
//       throw err
//     } finally {
//       setLoading(false)
//     }
//   }

//   return { apiCall, loading, error, data }
// }

// export default useApi



import { useState, useCallback } from 'react';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const apiCall = useCallback(async (url, method = 'GET', bodyData = null, customHeaders = {}) => {
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

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { apiCall, loading, error, data };
};

export default useApi;
