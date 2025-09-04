import axios from 'axios'
const AUTH_TOKEN = 'authToken'

class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

const defaultConfig = {
    baseURL: import.meta.env.VITE_BASE_URL || 'https://api.example.com',
    timeout: 10000,
    retryAttempts: 3,
    retryDelay: 1000,
    enableLogging:  false //import.meta.NODE_ENV === 'development'
}

const apiClient = axios.create({
    baseURL: defaultConfig.baseURL,
    timeout: defaultConfig.timeout,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

// Response interceptor for handling responses and errors
apiClient.interceptors.response.use(
  (response) => {
    // Log successful response in development
    if (defaultConfig.enableLogging) {
      console.log('✅ Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      // Handle specific status codes
      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          localStorage.removeItem(AUTH_TOKEN);
          sessionStorage.removeItem(AUTH_TOKEN);
          console.error('Unauthorized')
          //window.location.href = '/login';
          break;

        case 403:
          // Forbidden - user doesn't have permission
          console.error('Access forbidden:', data);
          break;

        case 404:
          // Not found
          console.error('Resource not found:', error.config.url);
          break;

        case 429:
          // Rate limited - implement exponential backoff
          if (!originalRequest._retry && originalRequest._retryCount < defaultConfig.retryAttempts) {
            originalRequest._retry = true;
            originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
            
            const delay = defaultConfig.retryDelay * Math.pow(2, originalRequest._retryCount - 1);
            await new Promise(resolve => setTimeout(resolve, delay));
            
            return apiClient(originalRequest);
          }
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          // Server errors - retry with exponential backoff
          if (!originalRequest._retry && originalRequest._retryCount < defaultConfig.retryAttempts) {
            originalRequest._retry = true;
            originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
            
            const delay = defaultConfig.retryDelay * Math.pow(2, originalRequest._retryCount - 1);
            await new Promise(resolve => setTimeout(resolve, delay));
            
            return apiClient(originalRequest);
          }
          break;
      }

      // Log error response
      if (defaultConfig.enableLogging) {
        console.error('❌ Response Error:', {
          status,
          statusText: error.response.statusText,
          data,
          url: error.config.url
        });
      }

      throw new APIError(
        data?.message || error.response.statusText || 'Request failed',
        status,
        data
      );
    } else if (error.request) {
      // Network error or timeout
      console.error('Network error:', error.message);
      
      // Retry on network errors
      if (!originalRequest._retry && originalRequest._retryCount < defaultConfig.retryAttempts) {
        originalRequest._retry = true;
        originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
        
        const delay = defaultConfig.retryDelay * Math.pow(2, originalRequest._retryCount - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return apiClient(originalRequest);
      }

      throw new APIError('Network error occurred', 0, null);
    } else {
      // Request setup error
      console.error('Request setup error:', error.message);
      throw new APIError('Request setup failed', 0, null);
    }
  }
);

class ApiService {

    constructor(customConfig = {}) {
        this.config = { ...defaultConfig, ...customConfig };
        this.cancelTokens = new Map();
    }

    async request(config) {
        console.log('request',config)
        try {
            const response = await apiClient(config);
            return {
                success: true,
                data: response.data,
                status: response.status,
                headers: response.headers
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                status: error.status || 0,
                data: error.data || null
            };
        }
    }

    async get(url, params = {}, options = {}) {
        const cancelToken = this.createCancelToken(url);
        
        return this.request({
        method: 'GET',
        url,
        params,
        cancelToken,
        ...options
        });
    }

  // POST request
  async post(url, data = {}, options = {}) {
    const cancelToken = this.createCancelToken(url);
    
    return this.request({
      method: 'POST',
      url,
      data,
      cancelToken,
      ...options
    });
  }

  // PUT request
  async put(url, data = {}, options = {}) {
    const cancelToken = this.createCancelToken(url);
    
    return this.request({
      method: 'PUT',
      url,
      data,
      cancelToken,
      ...options
    });
  }

  // PATCH request
  async patch(url, data = {}, options = {}) {
    const cancelToken = this.createCancelToken(url);
    
    return this.request({
      method: 'PATCH',
      url,
      data,
      cancelToken,
      ...options
    });
  }

  // DELETE request
  async delete(url, options = {}) {
    const cancelToken = this.createCancelToken(url);
    
    return this.request({
      method: 'DELETE',
      url,
      cancelToken,
      ...options
    });
  }

  // File upload with progress tracking
  async uploadFile(url, file, options = {}) {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add additional fields if provided
    if (options.fields) {
      Object.keys(options.fields).forEach(key => {
        formData.append(key, options.fields[key]);
      });
    }

    const cancelToken = this.createCancelToken(url);

    return this.request({
      method: 'POST',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      cancelToken,
      onUploadProgress: options.onProgress || ((progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload progress: ${percentCompleted}%`);
      }),
      ...options
    });
  }

  // Download file
  async downloadFile(url, filename, options = {}) {
    try {
      const response = await apiClient({
        method: 'GET',
        url,
        responseType: 'blob',
        onDownloadProgress: options.onProgress || ((progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Download progress: ${percentCompleted}%`);
        }),
        ...options
      });

      // Create download link
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      return { success: true, filename };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Batch requests
  async batchRequest(requests) {
    try {
      const promises = requests.map(req => apiClient(req));
      const responses = await Promise.allSettled(promises);
      
      return responses.map((response, index) => ({
        request: requests[index],
        success: response.status === 'fulfilled',
        data: response.status === 'fulfilled' ? response.value.data : null,
        error: response.status === 'rejected' ? response.reason.message : null
      }));
    } catch (error) {
      throw new APIError('Batch request failed', 0, null);
    }
  }

  // Create cancel token for request cancellation
  createCancelToken(key) {
    // Cancel previous request with same key if exists
    if (this.cancelTokens.has(key)) {
      this.cancelTokens.get(key).cancel('Request cancelled due to new request');
    }

    const cancelToken = axios.CancelToken.source();
    this.cancelTokens.set(key, cancelToken);
    return cancelToken.token;
  }

  // Cancel specific request
  cancelRequest(key) {
    if (this.cancelTokens.has(key)) {
      this.cancelTokens.get(key).cancel('Request cancelled by user');
      this.cancelTokens.delete(key);
    }
  }

  // Cancel all requests
  cancelAllRequests() {
    this.cancelTokens.forEach((cancelToken, key) => {
      cancelToken.cancel('All requests cancelled');
    });
    this.cancelTokens.clear();
  }

  // Health check
  async healthCheck() {
    return this.get('/health');
  }

  // Set authentication token
  setAuthToken(token) {
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token);
    } else {
      localStorage.removeItem(AUTH_TOKEN);
    }
  }

  // Clear authentication
  clearAuth() {
    localStorage.removeItem(AUTH_TOKEN);
    sessionStorage.removeItem(AUTH_TOKEN);
  }
}


const api = new ApiService()

export { ApiService, api as default };