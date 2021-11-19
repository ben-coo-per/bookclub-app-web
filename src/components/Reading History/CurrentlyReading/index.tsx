import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrateReadings } from "src/features/readings/currentReadingSlice";
import { useCurrentlyReadingQuery } from "src/generated/graphql";
import { CurrentReadingList } from "./CurrentlyReadingSection";

export const CurrentlyReadingContainer = () => {
  const [{ data }] = useCurrentlyReadingQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.currentlyReading) {
      dispatch(hydrateReadings(data.currentlyReading));
    }
  }, [data]);

  return (
    <div className="col-span-4 mx-auto  gap-3 w-full">
      <div className="grid grid-cols-5 gap-4">
        <CurrentReadingList />
        <div className="flex flex-col col-span-5 md:col-span-2 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-darkBlue text-3xl font-bold">Meetings</h2>
        </div>
      </div>
    </div>
  );
};
