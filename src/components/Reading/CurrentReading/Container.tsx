import { CurrentReadingRow } from "./Row";
import { Skeleton } from "src/components/Skeleton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrateReadings } from "src/features/readings/currentReadingSlice";
import { useCurrentlyReadingQuery } from "src/generated/graphql";
import { CurrentReadingToolbar } from "./Toolbar";
import { useSelector } from "react-redux";
import { allCurrentReadings } from "src/features/readings/currentReadingSlice";

export const CurrentReadingContainer = () => {
  const [{ data }] = useCurrentlyReadingQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.currentlyReading) {
      dispatch(hydrateReadings(data.currentlyReading));
    }
  }, [data]);

  const currentReadings = useSelector(allCurrentReadings);

  return (
    <div className="bg-white p-5 rounded-xl shadow-lg flex flex-col col-span-5 md:col-span-3">
      <div className="flex flex-row justify-between items-center ">
        <h2 className="text-darkBlue text-3xl font-bold truncate">
          Currently Reading
        </h2>
        <CurrentReadingToolbar />
      </div>
      <Skeleton
        className="h-14 my-1 bg-accent"
        isLoaded={currentReadings != null}
        variant="list"
      >
        {currentReadings.map((data) => {
          const props = {
            author: data.author,
            title: data.title,
            type: data.type,
            id: data.id,
          };
          return <CurrentReadingRow key={data.id} {...props} />;
        })}
      </Skeleton>
    </div>
  );
};
