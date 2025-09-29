import { useEffect, useState } from "react";
import axios from "axios";

const useGetStrip = () => {
  const [stripeUser, setStripeUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStripeId = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_USER_API}/me`,
          { withCredentials: true }
        );
        setStripeUser(response.data.user);
      } catch (error) {
        console.error("Error fetching stripe user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStripeId();
  }, []);

  return { stripeUser, loading };
};

export default useGetStrip;
