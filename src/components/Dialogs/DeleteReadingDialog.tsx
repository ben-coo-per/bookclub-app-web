import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "src/components/Inputs";
import {
  removeReading as removeCurrentReading,
  selectedCurrentReadings,
} from "src/features/readings/currentReadingSlice";
import {
  removeReading as removePreviousReading,
  selectedPreviousReading,
} from "src/features/readings/previousReadingSlice";
import { Reading, useDeleteReadingMutation } from "src/generated/graphql";
import { DialogProps } from ".";
import { getMultiSelectState } from "../Reading/CurrentReading/Toolbar";

interface DeleteReadingDialogProps extends DialogProps {
  readings: Reading[];
}

export const DeleteReadingDialog = ({
  isOpen,
  closeModal,
  isCurrentReading,
  readings,
}: DeleteReadingDialogProps) => {
  const dispatch = useDispatch();
  const { multipleSelected } = getMultiSelectState(readings);
  const [, deleteReadings] = useDeleteReadingMutation();

  async function handleDelete() {
    const readingIdArray = readings.map((reading: Reading) => reading.id);
    const res = await deleteReadings({ ids: readingIdArray });

    if (res.data?.deleteReading) {
      if (isCurrentReading) dispatch(removeCurrentReading(readingIdArray));
      if (!isCurrentReading) dispatch(removePreviousReading(readingIdArray));

      closeModal();
    }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              leave="ease-in duration-200"
            >
              <Dialog.Overlay className="fixed inset-0 bg-darkBlue opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex flex-col gap-4">
                  <Dialog.Title
                    as="h2"
                    className="text-darkBlue text-3xl font-bold"
                  >
                    {multipleSelected
                      ? "Are you sure you want to delete these readings"
                      : "Are you sure you want to delete this reading"}
                  </Dialog.Title>
                  <div className="text-lg">{`The deleted ${
                    multipleSelected ? "readings" : "reading"
                  } will be deleted for ever.`}</div>
                  <div className="flex flex-row-reverse gap-2 justify-start mt-4">
                    <Button onClick={handleDelete}>{`Yes, Delete ${
                      multipleSelected ? "These Readings" : "This Reading"
                    }`}</Button>
                    <Button variant="outline" onClick={closeModal}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
