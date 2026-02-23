const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/users/sync";

export const createUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};

export const getUser = async (clerkId) => {
  const response = await fetch(`${BASE_URL}/users/${clerkId}`);

  if (!response.ok) {
    throw new Error("User not found");
  }

  return response.json();
};