import { useQuery } from "@tanstack/react-query";

export const fetchLevelProgressions = async () => {
  const response = await fetch("https://api.wanikani.com/v2/level_progressions", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_WANIKANI_API_KEY}`,
      "Wanikani-Revision": import.meta.env.VITE_WANIKANI_REVISION,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.log(import.meta.env.VITE_WANIKANI_API_KEY);
    throw new Error("Failed to fetch level progressions");
  }
  console.log(import.meta.env.VITE_WANIKANI_API_KEY);
  return response.json();
};

export const useLevelProgressions = () => {
  return useQuery({
    queryKey: ["level-progressions"],
    queryFn: fetchLevelProgressions,
  });
};
