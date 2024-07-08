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

export const fetchBlogsByAuthor = async (page: number, limit: number, authorEmail: string) => {
  const offset = (page - 1) * limit;
  try {
    const response = await fetch(`/api/blogs?offset=${offset}&limit=${limit}&author=${authorEmail}`, {
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

export const createBlog = async (
  title: string,
  data: string,
  tags: string[],
  imageUrl: string,
  excerpt: string,
  slug: string
) => {
  try {
    const response = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        data,
        tags,
        imageUrl,
        excerpt,
        slug
      }),
    });

    if (!response.ok) {
      throw new Error(`Error creating blog: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};


export const updateBlog = async (
  title: string,
  data: string,
  tags: string[],
  imageUrl: string,
  excerpt: string,
  slug: string,
  newSlug: string
) => {
  try {
    const response = await fetch(`/api/blogs/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        data,
        tags,
        imageUrl,
        excerpt,
        slug: newSlug,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error creating blog: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

export const deleteBlogById = async (id: string) => {
  try {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
      headers: {
        'Cache-Control': 'no-store',
      }
    });
    if (!response.ok) {
      throw new Error(`Error deleting blog: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

export const deleteBlogThumbnailById = async (id: string) => {
  try {
    const response = await fetch(`/api/blogs/thumbnail/${id}`, {
      method: 'DELETE',
      headers: {
        'Cache-Control': 'no-store',
      }
    });
    if (!response.ok) {
      throw new Error(`Error deleting blog: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};


