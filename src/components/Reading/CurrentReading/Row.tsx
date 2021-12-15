import { TextDataDisplay } from "src/components/textDataDisplay";
import { capitalizeFirstLetter } from "src/utils/textUtils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { Checkbox } from "src/components/Inputs";
import {
  inEditMode,
  selectedCurrentReadings,
  toggleSelectedReading,
} from "src/features/readings/currentReadingSlice";

interface CurrentReadingRowProps {
  author: string;
  title: string;
  type?: string | null;
  id: number;
}

export const CurrentReadingRow = ({
  author,
  title,
  type,
  id,
}: CurrentReadingRowProps) => {
  const dispatch = useDispatch();
  const inEditState = useSelector(inEditMode);
  const selectedReadings = useSelector(selectedCurrentReadings);
  const isSelected = selectedReadings.some((reading) => reading.id === id);

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      toggleSelectedReading({ id: e.target.name, checked: e.target.checked })
    );
  }

  return (
    <div className="grid grid-cols-12 gap-1 align-bottom my-2">
      <div className={`${inEditState ? "" : "hidden"} h-full w-full flex`}>
        <Checkbox
          className="my-auto mx-auto"
          name={id.toString()}
          onCheck={handleCheck}
          checked={isSelected}
        />
      </div>
      <div
        className={`${
          inEditState ? "col-span-11" : "col-span-12"
        } grid grid-cols-3 gap-4 bg-white gap-y-1 shadow-lg border border-accent rounded-xl  px-4 py-1 `}
      >
        <TextDataDisplay label="Title" className="col-span-2 xl:col-span-1">
          {title}
        </TextDataDisplay>
        <TextDataDisplay label="Author" className="col-span-1">
          {author}
        </TextDataDisplay>
        <TextDataDisplay label="Type" className="hidden xl:flex col-span-1">
          {type ? capitalizeFirstLetter(type) : " - "}
        </TextDataDisplay>
      </div>
    </div>
  );
};
