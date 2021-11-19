import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { TextDataDisplay } from "src/components/textDataDisplay";
import { capitalizeFirstLetter } from "src/utils/textUtils";
import { StarIcon } from "src/icons/StarIcon";
import { StarRatingInput } from "src/components/Inputs";
import { useGetUserRatingQuery } from "src/generated/graphql";
import { useDispatch } from "react-redux";
import {
  addUserVote,
  UserVote,
} from "src/features/readings/previousReadingSlice";
import { userInfo } from "os";

interface ReadingHistoryRowProps {
  id: number;
  title: string;
  author: string;

  type?: string | null;
  avgRating?: number | null;
  userVote?: UserVote;
}

type ExistingVote = {
  id: number;
  rating: number;
};

export const PreviousReadingRow = ({
  id,
  title,
  author,
  type = "",
  avgRating,
  userVote,
}: ReadingHistoryRowProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [{ data, fetching }] = useGetUserRatingQuery({
    variables: { readingId: id },
  });

  function setUserVote(
    ratingId: number,
    rating: number,
    avgRating?: number | null
  ) {
    dispatch(
      addUserVote({
        userVote: {
          id: ratingId,
          rating: rating,
        },
        id: id,
        avgRating: avgRating,
      })
    );
  }

  useEffect(() => {
    if (data?.userRating) {
      dispatch(
        addUserVote({
          userVote: {
            id: data?.userRating.id,
            rating: data?.userRating.rating,
          },
          id: id,
        })
      );
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
            userVote={userVote}
            setUserVote={setUserVote}
            fetching={fetching}
          />
        </TextDataDisplay>

        <div className="flex flex-col gap-0 md:hidden col-span-6">
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
          <div className="rounded-xl col-span-4 gap-1 gap-y-0 grid grid-cols-4 py-2 px-3 bg-background">
            <TextDataDisplay label="Dates Read" className="col-span-2">
              Nov. 01 - Dec. 12, 2020
            </TextDataDisplay>
            <TextDataDisplay label="Type" className="col-span-1">
              {type ? capitalizeFirstLetter(type) : " - "}
            </TextDataDisplay>
            <TextDataDisplay
              label="Avg. Rating"
              className="col-span-2 sm:col-span-1"
              truncate={false}
            >
              <div className="flex flex-row gap-1 items-center">
                <StarIcon size="24" />
                {avgRating ? avgRating : " - "}
              </div>
            </TextDataDisplay>
            <TextDataDisplay
              label="Your Rating"
              className="col-span-2"
              truncate={false}
            >
              <StarRatingInput
                readingId={id}
                userVote={userVote}
                setUserVote={setUserVote}
                fetching={fetching}
                size={24}
                isMobile={true}
              />
            </TextDataDisplay>
          </div>
        </div>
      )}
    </div>
  );
};
