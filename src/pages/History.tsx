import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CurrentlyReadingContainer } from "src/components/Reading History/CurrentlyReading";
import {
  allReadings,
  hydrateReadings,
} from "src/features/readings/readingSlice";
import { useAllReadingsQuery } from "src/generated/graphql";
import { ReadingHistoryContainer } from "../components/Reading History/ReadingHistoryContainer";

export function History() {
  const [{ data }] = useAllReadingsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.allReadings) {
      dispatch(hydrateReadings(data.allReadings));
    }
  }, [data?.allReadings]);

  return (
    <main>
      <div className="bg-background w-screen py-10 px-4">
        <div className="container mx-auto space-y-5 grid grid-cols-4">
          <CurrentlyReadingContainer />
          <ReadingHistoryContainer />
        </div>
      </div>
    </main>
  );
}
