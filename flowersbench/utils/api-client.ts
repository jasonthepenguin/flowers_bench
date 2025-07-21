// Client-side API utility with rate limit handling
export async function apiRequest(
  endpoint: string,
  options?: RequestInit
): Promise<Response> {
  const response = await fetch(endpoint, options);

  // Handle rate limiting
  if (response.status === 429) {
    const resetTime = response.headers.get('X-RateLimit-Reset');
    const errorData = await response.json();
    
    throw new Error(
      `Rate limit exceeded. ${errorData.error}. Please try again after ${
        resetTime ? new Date(resetTime).toLocaleTimeString() : 'a few moments'
      }.`
    );
  }

  return response;
}

// Helper for JSON API requests
export async function apiJsonRequest<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await apiRequest(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `Request failed: ${response.status}`);
  }

  return response.json();
}