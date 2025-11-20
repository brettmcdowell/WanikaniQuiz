import { Route } from "@tanstack/react-router";
import { rootRoute } from "../__root";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useLevelProgressions } from "@/lib/wanikaniLevels";

function QuizPage() {
  const { mode } = QuizRoute.useSearch();
  const quizType = mode as "radical" | "kanji" | "vocabulary";

  const { data, isLoading } = useLevelProgressions(quizType);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");

  // Pick a random item once data loads
  useEffect(() => {
    if (data && data.length > 0 && currentIndex === null) {
      setCurrentIndex(Math.floor(Math.random() * data.length));
    }
  }, [data, currentIndex]);

  if (isLoading) {
    return <div className="p-4 text-xl">Loading…</div>;
  }

  if (!data || data.length === 0) {
    return <div className="p-4 text-xl">No quiz data available.</div>;
  }

  const current = currentIndex !== null ? data[currentIndex] : null;
  if (!current) {
    return <div className="p-4 text-xl">Loading next question…</div>;
  }

  const checkAnswer = () => {
    if (!current) return;

    const submitted = answer.trim().toLowerCase();

    let correctAnswer: string;

    if (quizType === "radical") {
      // radicals → meaning is slug
      correctAnswer = current.slug.toLowerCase();
    } else {
      // kanji + vocab → meaning is available
      const curr = current as { meaning: string; slug: string };
      correctAnswer = curr.meaning.toLowerCase();
    }

    const correct = submitted === correctAnswer;

    alert(
      correct
        ? "Correct!"
        : `Incorrect — the answer was: ${correctAnswer}`
    );

    setCurrentIndex(Math.floor(Math.random() * data.length));
    setAnswer("");
};

  return (
    <div className="flex min-h-svh flex-col items-stretch space-y-3">
      {/* Title */}
      <Card className="h-30">
        <CardContent className="h-full p-4 flex items-center">
          <h2 className="text-4xl font-semibold mb-2">
            <strong>ワニカニ {quizType.charAt(0).toUpperCase() + quizType.slice(1)} Quiz</strong>
          </h2>
        </CardContent>
      </Card>

      {/* Display Section */}
      <Card className="h-100 m-3">
        <CardContent className="h-full p-4 flex flex-col items-center justify-center">
          {quizType === "radical" ? (
            // ⭐ RADICAL DISPLAY
            "characters" in current ? (
              <span className="text-9xl font-bold">{current.characters}</span>
            ) : (
              <p className="text-red-500">No radical character found</p>
            )
          ) : "image" in current && current.image ? (
            // ⭐ KANJI / VOCAB DISPLAY
            <img
              src={current.image}
              alt={current.slug}
              className="w-48 h-48 object-contain"
            />
          ) : (
            <p>No image available</p>
          )}
        </CardContent>
      </Card>

      {/* Answer Section */}
      <Card className="h-40 m-3">
        <CardContent className="h-full p-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold mb-6">What is the meaning?</p>

          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="h-12 w-9/12 !text-2xl text-center"
            type="text"
            placeholder="Answer"
            onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
          />

          <button
            onClick={checkAnswer}
            className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg"
          >
            Submit
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

export const QuizRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  validateSearch: (search) => ({
    mode: (search.mode as string) ?? "radical"
  }),
  component: QuizPage,
});

export default QuizPage;
