import { useLevelProgressions } from "@/lib/wanikaniLevels";

export default function LevelProgressions() {
  const { data, isLoading, error } = useLevelProgressions();

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return <p>Total Count: {data.total_count}</p>
}
