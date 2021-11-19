import { useEffect, useState } from "react";
import { ReadingHistoryRow } from "./ReadingHistoryRow";
import { Select } from "src/components/Inputs/Select";
import { Skeleton } from "../Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { allReadings } from "src/features/readings/readingSlice";

const sortByOptionsArray = ["Most Recent", "Oldest", "Rating"];
// const forTypeConversion = sortByOptionsArray
type sortByOptions = typeof sortByOptionsArray[number];

export const ReadingHistoryContainer = () => {
  const data = useSelector(allReadings);
  const [sortBy, setSortBy] = useState<sortByOptions | undefined>(
    "Most Recent"
  );

  useEffect(() => {
    console.log("called");
  }, [data]);

  return (
    <div className="col-span-4  bg-white mx-auto p-5 rounded-xl shadow-lg gap-3 w-full">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center px-1">
          <h2 className="text-darkBlue text-3xl font-bold">History</h2>
          <Select
            options={sortByOptionsArray}
            selected={sortBy}
            setSelected={setSortBy}
            label="Sort By: "
            labelInside
            variant="light"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <Skeleton
            className="h-14 my-1 bg-accent"
            isLoaded={data.length > 0}
            variant="list"
          >
            {data.map((reading) => {
              const props = {
                author: reading.author,
                title: reading.title,
                avgRating: reading.avgRating,
                type: reading.type,
                id: reading.id,
              };
              if (!reading.currentlyReading)
                return <ReadingHistoryRow key={reading.id} {...props} />;
            })}
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
