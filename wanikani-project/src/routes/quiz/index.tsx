// src/routes/landingPage/index.tsx
import { Route } from "@tanstack/react-router";
import { rootRoute } from "../__root";

function QuizPage() {
  const { mode } = QuizRoute.useSearch();
  return (
    <div>
      <h1>Landing Page</h1>
      <p className="text-lg">Selected mode: <strong>{mode}</strong></p>
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
