import { Transition } from "@headlessui/react";
import {
  ArchiveIcon,
  CheckCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  inEditMode,
  selectedCurrentReadings,
  toggleEditMode,
  updateCurrentReading,
} from "src/features/readings/currentReadingSlice";
import {
  AddNewReadingDialog,
  EditReadingDialog,
  DeleteReadingDialog,
} from "src/components/Dialogs";
import { Reading, useUpdateReadingMutation } from "src/generated/graphql";
import { addReading } from "src/features/readings/previousReadingSlice";

interface GetSelectStateResponse {
  multipleSelected: boolean;
  noneSelected: boolean;
}

export function getMultiSelectState(
  selectedReading: Reading[]
): GetSelectStateResponse {
  const multipleSelected = selectedReading.length > 1;
  const noneSelected = selectedReading.length === 0;

  return { multipleSelected, noneSelected };
}

const CurrentReadingToolbar = () => {
  const [, updateReadingMutation] = useUpdateReadingMutation();
  const [deleteDialogOpen, setDeleteDialogModalOpen] = useState<boolean>(false);
  const [addReadingDialogOpen, setAddReadingDialogOpen] = useState(false);
  const [editReadingDialogOpen, setEditReadingDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const inEditState = useSelector(inEditMode);
  const selectedReadings = useSelector(selectedCurrentReadings);

  const { multipleSelected, noneSelected } =
    getMultiSelectState(selectedReadings);

  function handleMarkReadingsAsDone() {
    selectedReadings.forEach(async (reading) => {
      let res = await updateReadingMutation({
        id: reading.id,
        currentlyReading: false,
      });
      if (res.data) {
        dispatch(updateCurrentReading({ ...reading, currentlyReading: false }));
        dispatch(addReading(reading));
      } else {
        console.log("something went wrong");
      }
    });
  }
  return (
    <div className="flex flex-row gap-2 ">
      <div className="flex flex-row gap-2 bg-accent p-0 rounded-lg">
        <Transition
          className="flex flex-row"
          show={inEditState}
          enter="transform transition duration-200"
          enterFrom="opacity-0 right-0 scale-80"
          enterTo="opacity-100 scale-100"
          leave="transform duration-100 transition ease-in-out"
          leaveFrom="opacity-100 scale-100 "
          leaveTo="opacity-0 scale-80 "
        >
          <PencilIcon
            className={`cursor-pointer ${
              (multipleSelected || noneSelected) &&
              "opacity-50 cursor-not-allowed"
            } text-midnightBlue h-7 rounded-md p-0.5 px-1 hover:bg-champagne hover:bg-opacity-75 `}
            onClick={() => setEditReadingDialogOpen(true)}
            data-tooltip-target="tooltip-edit-reading"
          />

          <TrashIcon
            className={`cursor-pointer ${
              noneSelected && "opacity-50 cursor-not-allowed"
            } text-midnightBlue h-7 rounded-md p-0.5 px-1 hover:bg-champagne hover:bg-opacity-75 `}
            onClick={() => setDeleteDialogModalOpen(true)}
          />
          <ArchiveIcon
            className={`cursor-pointer ${
              noneSelected && "opacity-50 cursor-not-allowed"
            } text-midnightBlue h-7 rounded-md p-0.5 px-1 hover:bg-champagne hover:bg-opacity-75 `}
            onClick={handleMarkReadingsAsDone}
          />
        </Transition>

        {inEditState ? (
          <XIcon
            className="text-midnightBlue cursor-pointer h-7 rounded-md p-0.5 hover:bg-champagne hover:bg-opacity-75"
            onClick={() => dispatch(toggleEditMode())}
          />
        ) : (
          <PencilIcon
            className="text-midnightBlue cursor-pointer h-7 rounded-md p-0.5 hover:bg-champagne hover:bg-opacity-75"
            onClick={() => dispatch(toggleEditMode())}
          />
        )}
      </div>

      <PlusIcon
        className="text-midnightBlue cursor-pointer h-7 rounded-md p-0.5 bg-accent hover:bg-champagne hover:bg-opacity-75"
        onClick={() => setAddReadingDialogOpen(true)}
      />

      {/* -------MODALS----- */}
      <AddNewReadingDialog
        isOpen={addReadingDialogOpen}
        closeModal={() => setAddReadingDialogOpen(false)}
        isCurrentReading={true}
      />
      <DeleteReadingDialog
        isOpen={deleteDialogOpen}
        closeModal={() => setDeleteDialogModalOpen(false)}
        isCurrentReading={true}
        readings={selectedReadings}
      />
      <EditReadingDialog
        isOpen={editReadingDialogOpen}
        closeModal={() => setEditReadingDialogOpen(false)}
        isCurrentReading={true}
      />
    </div>
  );
};

export { CurrentReadingToolbar };
