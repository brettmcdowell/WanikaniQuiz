import { Route } from "@tanstack/react-router";
import { rootRoute } from "../__root";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input"

function QuizPage() {
  const { mode } = QuizRoute.useSearch();
  return (
    <div className="flex min-h-svh flex-col items-stretch space-y-3">
      {/* Quiz Title Section */}
      <Card className="h-30">
        <CardContent className="h-full p-4 flex items-center">
          <h2 className="text-3xl font-semibold mb-2"><strong>ワニカニ {mode} Quiz</strong></h2>
        </CardContent>
      </Card>

      {/* Display Vocab Section */}
      <Card className="h-70">
        <CardContent className="h-full p-4 flex items-center justify-center">
          <h2 className="text-lg font-semibold mb-2">Display Wanikani Data Here</h2>
        </CardContent>
      </Card>

      {/* Quiz Input Section */}
      <Card className="h-40">
        <CardContent className="h-full p-0 flex flex-col items-center justify-center">
          <p className="text-xl font-semibold mb-6">{mode} Meaning</p>
          <Input className="h-12 text-base text-center" type="text" placeholder="Answer" />
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
