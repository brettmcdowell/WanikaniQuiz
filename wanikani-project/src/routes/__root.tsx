import { RootRoute, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const rootRoute = new RootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div>
        <Outlet />
      </div>
    </QueryClientProvider>
  ),
});