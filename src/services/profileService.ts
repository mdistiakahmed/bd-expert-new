export const fetchMyProfile = async () => {
  try {
    const response = await fetch(`/api/profile`);
    if (!response.ok) {
      throw new Error(`Error fetching profile: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const fetchProfileByEmail = async (email: string) => {
  try {
    const baseUrl = process.env.BASE_URL;
    const encodedEmail = encodeURIComponent(email);
    const response = await fetch(`${baseUrl}/api/profile/${encodedEmail}`);
    if (!response.ok) {
      throw new Error(`Error fetching profile: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const fetchProfilesByPage = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  try {
    const response = await fetch(
      `/api/profile/all?offset=${offset}&limit=${limit}`
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

export const updateProfile = async (data: any) => {
  console.log("Calling api ", data);
  try {
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

export async function uploadImage(imageFile: File | null) {
  if (!imageFile) {
    return;
  }
  const formData = new FormData();
  if (imageFile) {
    formData.append("imageFile", imageFile);
  }

  try {
    const response = await fetch("/api/profile/image", {
      method: "POST",
      headers: {},
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

export const deleteImage = async (imageUrl: string) => {
  try {
    const response = await fetch("/api/profile/image", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: imageUrl }),
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
