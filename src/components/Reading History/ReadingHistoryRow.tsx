import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { TextDataDisplay } from "../textDataDisplay";
import { capitalizeFirstLetter } from "../../utils/textUtils";
import { StarIcon } from "src/icons/StarIcon";
import { StarRatingInput } from "../Inputs/Rating";
import {
  GetUserRatingDocument,
  useGetUserRatingQuery,
  useReadingQuery,
} from "src/generated/graphql";

interface ReadingHistoryRowProps {
  id: number;
  title: string;
  author: string;

  type?: string | null;
  avgRating?: number | null;
}

type ExistingVote = {
  id: number;
  rating: number;
};

export const ReadingHistoryRow = ({
  id,
  title,
  author,
  type = "",
  avgRating,
}: ReadingHistoryRowProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [{ data, fetching }] = useGetUserRatingQuery({
    variables: { readingId: id },
  });
  const [existingVote, setExistingVote] = useState<ExistingVote | undefined>();

  useEffect(() => {
    if (data?.userRating) {
      setExistingVote({
        id: data?.userRating.id,
        rating: data?.userRating.rating,
      });
    }
  }, [data]);

  return (
    <div className="shadow-sm rounded-xl my-2">
      <div
        className={`bg-accent gap-y-1 rounded${
          isExpanded ? "-t" : ""
        }-xl px-4 py-2 md:py-0 md:px-10 w-full grid grid-cols-7 justify-items-stretch items-start gap-4`}
      >
        <TextDataDisplay label="Title" className="hidden md:flex ">
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
        <TextDataDisplay label="Type" className="hidden md:flex ">
          {type ? capitalizeFirstLetter(type) : " - "}
        </TextDataDisplay>
        <TextDataDisplay
          label="Avg. Rating"
          className="hidden md:flex "
          truncate={false}
        >
          <div className="flex flex-row gap-1 items-center">
            <StarIcon />
            {avgRating ? avgRating : " - "}
          </div>
        </TextDataDisplay>
        <TextDataDisplay
          label="Your Rating"
          className="hidden md:flex"
          truncate={false}
        >
          <StarRatingInput
            readingId={id}
            existingVote={existingVote}
            setExistingVote={setExistingVote}
            fetching={fetching}
          />
        </TextDataDisplay>

        <div className="flex flex-col gap-0 md:hidden col-span-5">
          <p className="font-bold text-darkBlue text-2xl ">{title}</p>
          <p className="font-regular text-subtleText text-xl -mt-1.5">
            {author}
          </p>
        </div>
        <div className="md:hidden">
          {isExpanded ? (
            <button className="float-right" aria-label="Collapse Content">
              <ChevronUpIcon
                className="h-8 w-8  text-midnightBlue"
                onClick={() => setIsExpanded(!isExpanded)}
              />
            </button>
          ) : (
            <button className="float-right" aria-label="Expand Content">
              <ChevronDownIcon
                className="h-8 w-8 float-right text-midnightBlue"
                onClick={() => setIsExpanded(!isExpanded)}
              />
            </button>
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
