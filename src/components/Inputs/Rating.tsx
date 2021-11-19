import { useState } from "react";
import {
  useAddRatingMutation,
  useUpdateRatingMutation,
} from "src/generated/graphql";
import { StarIcon } from "src/icons/StarIcon";

export const StarRatingInput = ({
  readingId,
  existingVote,
  setExistingVote,
  fetching = false,
}: {
  readingId: number;
  existingVote?: { rating: number; id: number };
  fetching?: boolean;
  setExistingVote: React.Dispatch<
    React.SetStateAction<
      | {
          id: number;
          rating: number;
        }
      | undefined
    >
  >;
}) => {
  const [hoverState, setHoverState] = useState<number>(0);
  const stars = [1, 2, 3, 4, 5];
  const [, addRating] = useAddRatingMutation();
  const [, updateRating] = useUpdateRatingMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleRating(rating: number) {
    setIsLoading(true);

    if (existingVote && rating != existingVote.rating) {
      // If there is already an existing vote, update rating
      const { data } = await updateRating({
        newRating: rating,
        id: existingVote.id,
      });
      if (data?.updateRating) {
        setExistingVote({
          rating: data.updateRating.rating,
          id: data.updateRating.id,
        });
      }
    } else if (!existingVote) {
      // If not, add a new rating
      const { data } = await addRating({
        rating: rating,
        readingId: readingId,
      });

      if (data?.addRating) {
        setExistingVote({
          rating: data.addRating.rating,
          id: data.addRating.id,
        });
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-row gap-0">
      {stars.map((val) => (
        <StarRating
          key={val}
          place={val}
          existingVote={existingVote?.rating}
          hoverState={hoverState}
          setHoverState={setHoverState}
          handleRating={handleRating}
          loading={isLoading || fetching}
        />
      ))}
    </div>
  );
};

interface StarRatingProps {
  place: number;
  existingVote?: number;
  hoverState: number;
  setHoverState: React.Dispatch<React.SetStateAction<number>>;
  handleRating: (rating: number) => void;
  loading?: boolean;
}

const StarRating = ({
  place,
  hoverState,
  setHoverState,
  existingVote,
  handleRating,
  loading = false,
}: StarRatingProps) => {
  const size = "18";

  if (hoverState > 0 && !loading) {
    return (
      <div
        onMouseEnter={() => setHoverState(place)}
        onMouseLeave={() => setHoverState(0)}
        onClick={
          !loading
            ? () => handleRating(hoverState)
            : () => console.log("loading")
        }
        className={`${loading ? "opacity-80 animate-pulse" : ""}`}
      >
        <StarIcon
          size={size}
          className={loading ? "cursor-not-allowed" : "cursor-pointer"}
          variant={hoverState >= place ? "full" : "empty"}
        />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHoverState(place)}
      onMouseLeave={() => setHoverState(0)}
      className={`${loading ? "opacity-80 animate-pulse" : ""}`}
    >
      <StarIcon
        size={size}
        className={loading ? "cursor-not-allowed" : "cursor-pointer"}
        variant={existingVote && existingVote >= place ? "full" : "empty"}
      />
    </div>
  );
};
