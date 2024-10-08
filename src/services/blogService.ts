export const fetchBlogs = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  try {
    const response = await fetch(`/api/blogs?offset=${offset}&limit=${limit}`, {
      cache: "force-cache",
      next: {
        revalidate: 60 * 10, // Revalidate the cache every 10 * 60 seconds
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching blogs: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const fetchBlogsByAuthor = async (
  page: number,
  limit: number,
  authorEmail: string
) => {
  const offset = (page - 1) * limit;
  try {
    const response = await fetch(
      `/api/blogs?offset=${offset}&limit=${limit}&author=${authorEmail}`,
      {
        cache: "force-cache",
        next: {
          revalidate: 60 * 10, // Revalidate the cache every 10 * 60 seconds
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching blogs: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const fetchBlogById = async (id: string) => {
  try {
    const baseUrl = process.env.BASE_URL;
    const response = await fetch(`${baseUrl}/api/blogs/${id}`, {
      cache: "force-cache",
      next: {
        revalidate: 60 * 10, // Revalidate the cache every 10 * 60 seconds
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching blogs: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const fetchBlogByIdClient = async (id: string) => {
  try {
    const response = await fetch(`/api/blogs/${id}`, {
      cache: "force-cache",
      next: {
        revalidate: 60 * 10, // Revalidate the cache every 10 * 60 seconds
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching blogs: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const fetchRecent4Blogs = async () => {
  const baseUrl = process.env.BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/api/blogs/recent`, {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error(`Error fetching blogs: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};
