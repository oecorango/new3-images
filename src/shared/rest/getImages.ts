type Data = {
  page: number;
  search?: string;
};

const API_URL = 'https://api.pexels.com/v1';
const API_KEY = import.meta.env.VITE_PIXELS_KEY;

const fetchFromPexels = async (endpoint: string, params: Record<string, string | number>) => {
  const url = new URL(`${API_URL}/${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status}`);
  }

  return response.json();
};

export const getPhotos = async (data: Data) => {
  return fetchFromPexels('curated', {
    page: data.page,
    per_page: 10,
  });
};

export const getSearchPhotos = async (data: Data) => {
  return fetchFromPexels('search', {
    query: data.search ?? '',
    page: data.page,
    per_page: 10,
  });
};
