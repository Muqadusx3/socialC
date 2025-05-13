export const getServerSideUserByUsername = async (username: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/username/${username}`, {
        cache: "no-store",
      });
  
      if (!res.ok) return null;
  
      const user = await res.json();
      return user;
    } catch (err) {
      console.error("Failed to fetch user:", err);
      return null;
    }
  };
  export const getServerSideUserById = async (userId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/${userId}`, {
        cache: "no-store",
      });
      if (!res.ok) return null;
      const user = await res.json();
      return user;
    } catch (err) {
      console.error("Failed to fetch user by ID:", err);
      return null;
    }
  };
  