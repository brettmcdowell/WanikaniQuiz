// src/router.tsx
import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root";
import { LandingRoute } from "./routes/landingPage/";
import { QuizRoute } from "./routes/quiz/";

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    LandingRoute,
    QuizRoute,
  ]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
