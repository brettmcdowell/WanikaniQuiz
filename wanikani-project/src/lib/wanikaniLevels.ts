import { useQuery } from "@tanstack/react-query";

export const fetchLevelProgressions = async (
  quizType: "radical" | "kanji" | "vocabulary"
) => {
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
  type RadicalItem = {
    slug: string; 
    characters: string; 
    level: number;
  };
  type KanjiVocabItem = {
    slug: string;
    image: string | null;
    meaning: string;
    level: number;
  };
  const quizItems: Array<RadicalItem | KanjiVocabItem> = [];
  for (let level = 1; level <= totalCount; level++) {
    const res = await fetch(
      `https://api.wanikani.com/v2/subjects?types=${quizType}&levels=${level}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_WANIKANI_API_KEY}`,
          "Wanikani-Revision": import.meta.env.VITE_WANIKANI_REVISION,
        },
      }
    );
    const levelData = await res.json();
    // RADICAL WORKFLOW
    if (quizType === "radical") {
      const items: RadicalItem[] = levelData.data.map(
        (item: {
          data: {
            slug: string;
            characters: string;
          };
        }) => {
          return {
            slug: item.data.slug,
            characters: item.data.characters,
            level,
          };
        }
      );
      quizItems.push(...items);
      continue;
    }
    
    // KANJI + VOCAB WORKFLOW
    const items: KanjiVocabItem[] = levelData.data.map(
      (item: {
        data: {
          slug: string;
          character_images: { url: string }[];
          meanings: { meaning: string; primary: boolean }[];
        };
      }) => {
        const slug = item.data.slug;
        const image = item.data.character_images?.[0]?.url || null;
        const meaning =
          item.data.meanings.find((m) => m.primary)?.meaning || slug;
        return { slug, image, meaning, level };
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
