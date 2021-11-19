import { CurrentReadingRow } from "./CurrentReadingRow";
import { Skeleton } from "src/components/Skeleton";
import { CurrentlyReadingQuery } from "src/generated/graphql";
import { CurrentReadingToolbar } from "./CurrentReadingToolbar";
import { useSelector } from "react-redux";
import { allCurrentReadings } from "src/features/readings/readingSlice";

interface CurrentReadingListProps {
  data?: CurrentlyReadingQuery;
}

export const CurrentReadingList = ({ data }: CurrentReadingListProps) => {
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
