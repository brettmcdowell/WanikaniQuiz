import { Route } from "@tanstack/react-router";
import { rootRoute } from "../__root";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import LevelProgressions  from "@/components/api/level-progressions";

function QuizPage() {
  const { mode } = QuizRoute.useSearch();
  return (
    <div className="flex min-h-svh flex-col items-stretch space-y-3">
      {/* Quiz Title Section */}
      <Card className="h-30">
        <CardContent className="h-full p-4 flex items-center">
          <h2 className="text-4xl font-semibold mb-2"><strong>ワニカニ {mode} Quiz</strong></h2>
        </CardContent>
      </Card>

      {/* Display Vocab Section */}
      <Card className="h-100 m-3">
        <CardContent className="h-full p-4 flex items-center justify-center">
          <h2 className="text-lg font-semibold mb-2">Display Wanikani Data Here</h2>
        </CardContent>
      </Card>

      {/* Quiz Input Section */}
      <Card className="h-40 m-3">
        <CardContent className="h-full p-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold mb-6">{mode} Meaning</p>
          <Input className="h-12 w-9/12 !text-2xl text-cente mb-6" type="text" placeholder="Answer" />
          <LevelProgressions></LevelProgressions>
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
