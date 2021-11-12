import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { TextDataDisplay } from "../textDataDisplay";

interface ReadingHistoryRowProps {
  title: string;
  author: string;
  // dateStarted:string;
  // dateEnded:string;
  // type:string;
  // rating?:number;
}

export const ReadingHistoryRow = ({
  title,
  author,
}: ReadingHistoryRowProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="shadow-sm rounded-xl">
      <div
        className={`bg-accent gap-y-1 rounded${
          isExpanded ? "-t" : ""
        }-xl px-4 py-2 md:py-0 md:px-10 w-full grid grid-cols-6 justify-items-stretch items-center gap-2`}
      >
        <TextDataDisplay label="Title" className="hidden md:flex">
          {title}
        </TextDataDisplay>
        <TextDataDisplay label="Author" className="hidden md:flex ">
          {author}
        </TextDataDisplay>
        <TextDataDisplay
          label="Dates Read"
          className="hidden md:flex col-span-2"
        >
          Nov. 01 - Dec. 12, 2020
        </TextDataDisplay>
        <TextDataDisplay label="type" className="hidden md:flex">
          Novel
        </TextDataDisplay>
        <TextDataDisplay label="Rating" className="hidden md:flex ">
          * * * *
        </TextDataDisplay>

        <div className="flex flex-col gap-0 md:hidden col-span-5">
          <p className="font-bold text-darkBlue text-2xl ">{title}</p>
          <p className="font-regular text-subtleText text-xl -mt-1.5">
            {author}
          </p>
        </div>
        <div className="md:hidden">
          {isExpanded ? (
            <ChevronUpIcon
              className="h-8 w-8 float-right text-midnightBlue"
              onClick={() => setIsExpanded(!isExpanded)}
            />
          ) : (
            <ChevronDownIcon
              className="h-8 w-8 float-right text-midnightBlue"
              onClick={() => setIsExpanded(!isExpanded)}
            />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="md:hidden rounded-b-xl col-span-4 p-1.5 bg-accent">
          <div className="rounded-xl col-span-4 gap-1 gap-y-0 grid grid-cols-3 py-2 px-3 bg-background">
            <TextDataDisplay
              label="Dates Read"
              className="col-span-2 sm:col-span-1"
            >
              Nov. 01 - Dec. 12, 2020
            </TextDataDisplay>
            <TextDataDisplay label="type" className="col-span-1">
              Novel
            </TextDataDisplay>
            <TextDataDisplay
              label="Rating"
              className="col-span-2 sm:col-span-1"
            >
              * * * *
            </TextDataDisplay>
          </div>
        </div>
      )}
    </div>
  );
};
