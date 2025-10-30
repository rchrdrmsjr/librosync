import { useEffect, useState } from "react";

export const useAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await fetch(
          "https://api-backend-urlr.onrender.com/api/announcements"
        );
        if (!res.ok) throw new Error("Failed to fetch announcement");
        const data = await res.json();
        setAnnouncements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, []);

  return {
    announcements,
    loading,
    error,
  };
};
