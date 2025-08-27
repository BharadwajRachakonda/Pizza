const endpoint = "https://pizza-six-alpha.vercel.app";

// methods.ts
export const updateCatalog = async (catalogItems: any[]) => {
  console.log("Updating catalog with items:", catalogItems);
  const res = await fetch(`${endpoint}/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      items: catalogItems.map((item) => ({
        _id: item._id,
        count: item.count ?? 0, // ensure count is at least 1
      })),
    }),
  });

  return res.json();
};

export const getCatalog = async () => {
  const res = await fetch(`${endpoint}/cart`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
};

export const getItems = async () => {
  const res = await fetch(`${endpoint}/items`, {
    method: "GET",
  });
  return res.json();
};

export const getImageURL = (imageURL: string): string => {
  try {
    const match = imageURL.match(/\/d\/([^/]+)\//);
    if (match && match[1]) {
      const fileId = match[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    if (imageURL.includes("uc?export=view&id=")) {
      return imageURL;
    }
    return imageURL;
  } catch (err) {
    return imageURL;
  }
};

export async function getUser(userName: string, password: string) {
  const res = await fetch(`${endpoint}/user/${userName}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ password }),
  });

  if (!res.ok) {
    return { error: `Request failed with status ${res.status}` };
  }

  return res.json();
}

export const hasSession = async () => {
  const res = await fetch(`${endpoint}/hasSession`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
};

export const createUser = async (username: string, password: string) => {
  const res = await fetch(`${endpoint}/user/${username}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ password }),
  });

  if (!res.ok) {
    return { error: `Request failed with status ${res.status}` };
  }

  return res.json();
};

export const getItem = async (itemId: string) => {
  const res = await fetch(`${endpoint}/items/${itemId}`, {
    method: "GET",
  });
  return res.json();
};
