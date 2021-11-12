import { useState } from "react";
import { useAllReadingsQuery } from "src/generated/graphql";
import { ReadingHistoryRow } from "./ReadingHistoryRow";
import { Select } from "src/components/Inputs/Select";

const sortByOptionsArray = ["Most Recent", "Oldest", "Rating"];
// const forTypeConversion = sortByOptionsArray
type sortByOptions = typeof sortByOptionsArray[number];

export const ReadingHistoryContainer = () => {
  const [{ data }] = useAllReadingsQuery();
  const [sortBy, setSortBy] = useState<sortByOptions>("Most Recent");

  let readingsBody;
  if (data) {
    const readings = data.readings;
    readingsBody = (
      <>
        {readings.map(({ id, author, title }) => (
          <ReadingHistoryRow key={id} author={author} title={title} />
        ))}
      </>
    );
  }

  return (
    <div className="col-span-4  bg-white mx-auto p-5 rounded-xl shadow-lg gap-3 w-full">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <h2 className="text-darkBlue text-4xl font-bold">History</h2>
          <Select
            options={sortByOptionsArray}
            selected={sortBy}
            setSelected={setSortBy}
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">{readingsBody}</div>
      </div>
    </div>
  );
};
