import { Route } from "@tanstack/react-router";
import { rootRoute } from "../__root";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react";
import { useLevelProgressions } from "@/lib/wanikaniLevels";

function QuizPage() {
  const { mode } = QuizRoute.useSearch();
  const { data, isLoading } = useLevelProgressions(
    mode as "radical" | "kanji" | "vocabulary"
  );
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

  const checkAnswer = () => {
    if (!current) return;

    const correct = answer.trim().toLowerCase() === current.slug.toLowerCase();
    alert(correct ? "Correct!" : `Incorrect — the answer was: ${current.slug}`);

    // Reset for next question
    setCurrentIndex(Math.floor(Math.random() * data.length));
    setAnswer("");
  };

  return (
    <div className="flex min-h-svh flex-col items-stretch space-y-3">
      {/* Quiz Title Section */}
      <Card className="h-30">
        <CardContent className="h-full p-4 flex items-center">
          <h2 className="text-4xl font-semibold mb-2">
            <strong>ワニカニ {mode.charAt(0).toUpperCase()} Quiz</strong>
          </h2>
        </CardContent>
      </Card>
      {/* Display WaniKani Data Section */}
      <Card className="h-100 m-3">
        <CardContent className="h-full p-4 flex flex-col items-center justify-center">
          {current?.image ? (
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
      {/* Quiz Input Section */}
      <Card className="h-40 m-3">
        <CardContent className="h-full p-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold mb-6">
            What is the meaning?
          </p>
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="h-12 w-9/12 !text-2xl text-center"
            type="text"
            placeholder="Answer"
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
  validateSearch: (search) => {
    return {
      mode: (search.mode as string) ?? "radicals",
    };
  },    
  component: QuizPage,
});

export default QuizPage;
