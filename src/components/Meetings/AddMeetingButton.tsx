import { PlusCircleIcon, PlusIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { AddMeetingDialog } from "src/components/Dialogs";

export const AddMeetingButton = () => {
  const [addMeetingDialogOpen, setAddMeetingDialogOpen] = useState(false);

  return (
    <>
      <button
        className="rounded-lg h-full"
        onClick={() => setAddMeetingDialogOpen(true)}
      >
        <PlusCircleIcon
          className={`text-midnightBlue hover:text-regBlue h-7 w-7`}
        />
      </button>
      <AddMeetingDialog
        isOpen={addMeetingDialogOpen}
        closeModal={() => setAddMeetingDialogOpen(false)}
      />
    </>
  );
};
