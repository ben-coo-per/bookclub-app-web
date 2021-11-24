import { PlusIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { AddMeetingDialog } from "src/components/Dialogs";

export const AddMeetingButton = () => {
  const [addMeetingDialogOpen, setAddMeetingDialogOpen] = useState(false);

  return (
    <>
      <PlusIcon
        className="text-midnightBlue cursor-pointer h-7 rounded-md p-0.5 bg-accent hover:bg-champagne hover:bg-opacity-75"
        onClick={() => setAddMeetingDialogOpen(true)}
      />
      <AddMeetingDialog
        isOpen={addMeetingDialogOpen}
        closeModal={() => setAddMeetingDialogOpen(false)}
      />
    </>
  );
};
