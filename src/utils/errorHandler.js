class ApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

const handleApiError = (error, context) => {
  console.error(`${context}:`, error.response?.data || error.message);
  
  if (error.response?.data?.error?.message) {
    throw new ApiError(error.response.data.error.message, error.response.status);
  }
  
  throw new ApiError(error.message || 'API Error');
};

module.exports = { ApiError, handleApiError };