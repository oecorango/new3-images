import { createClient } from 'pexels';

const client = createClient(import.meta.env.VITE_PIXELS_KEY);

type Data = {
  page: number;
  search?: string;
};

export const getPhotos = async (data: Data) => {
  const response = await client.photos.curated({
    page: data.page,
    per_page: 10,
  });

  return response;
};

export const getSearchPhotos = async (data: Data) => {
  const response = await client.photos.search({
    query: data.search ?? '',
    page: data.page,
    per_page: 10,
  });

  return response;
};
