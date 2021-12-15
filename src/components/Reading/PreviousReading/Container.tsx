import { useEffect, useState } from "react";
import { PreviousReadingRow } from "./Row";
// import { Select } from "src/components/Inputs";
import { Skeleton } from "../../Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { allPreviousReadings } from "src/features/readings/previousReadingSlice";
import { hydrateReadings } from "src/features/readings/previousReadingSlice";
import { usePreviousReadingsQuery } from "src/generated/graphql";
import { PreviousReadingToolbar } from "./Toolbar";

const sortByOptionsArray = ["Most Recent", "Oldest", "Rating"];
// const forTypeConversion = sortByOptionsArray
type sortByOptions = typeof sortByOptionsArray[number];

export const PreviousReadingContainer = () => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [{ data }] = usePreviousReadingsQuery({
    variables: {
      limit: 10,
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.previousReadings && firstLoad) {
      dispatch(hydrateReadings(data.previousReadings));
      setFirstLoad(false);
    }
  }, [data?.previousReadings]);

  const previousReadings = useSelector(allPreviousReadings);

  return (
    <div className="col-span-4 mx-auto gap-3 w-full flex flex-col">
      <div className="flex flex-row justify-between items-center ">
        <h2 className="text-darkBlue text-3xl font-bold truncate">History</h2>
        <PreviousReadingToolbar />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Skeleton
          className="h-14 my-1 bg-accent"
          isLoaded={previousReadings.length > 0}
          variant="list"
        >
          {previousReadings.map((reading) => {
            const props = {
              author: reading.author,
              title: reading.title,
              avgRating: reading.avgRating,
              type: reading.type,
              id: reading.id,
              userVote: reading.userVote,
            };
            return <PreviousReadingRow key={reading.id} {...props} />;
          })}
        </Skeleton>
      </div>
    </div>
  );
};

// const [sortBy, setSortBy] = useState<sortByOptions | undefined>(
//   "Most Recent"
// );

/* <Select
            options={sortByOptionsArray}
            selected={sortBy}
            setSelected={setSortBy}
            label="Sort By: "
            labelInside
            variant="light"
          /> */
