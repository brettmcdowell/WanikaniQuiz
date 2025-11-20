import { useQuery } from "@tanstack/react-query";

export const fetchLevelProgressions = async (quizType: "radical" | "kanji" | "vocabulary") => {
  const response = await fetch("https://api.wanikani.com/v2/level_progressions", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_WANIKANI_API_KEY}`,
      "Wanikani-Revision": import.meta.env.VITE_WANIKANI_REVISION,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch level progressions");
  }
  const json = await response.json();
  const totalCount = json.total_count;
  const quizItems: Array<{ slug: string; image: string | null; level: number }> = [];
  for (let level = 1; level <= totalCount; level++) {
    const res = await fetch(`https://api.wanikani.com/v2/subjects?types=${quizType}&levels=${level}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_WANIKANI_API_KEY}`,
      "Wanikani-Revision": import.meta.env.VITE_WANIKANI_REVISION
    }
    });
    const levelData = await res.json();
    const items = levelData.data.map(
    (item: { data: { slug: string; character_images: { url: string }[] } }) => {
      const slug = item.data.slug;
      const image = item.data.character_images?.[0]?.url || null;
      return { slug, image, level };
    }
    );
    quizItems.push(...items);
  }
  return quizItems;
};


export const useLevelProgressions = (quizType: "radical" | "kanji" | "vocabulary") => {
  return useQuery({
    queryKey: ["level-progressions", quizType],
    queryFn: () => fetchLevelProgressions(quizType),
  });
};
