export { AddNewReadingDialog } from "./AddNewReadingDialog";
export { EditReadingDialog } from "./EditReadingDialog";
export { DeleteReadingDialog } from "./DeleteReadingDialog";
export { AddMeetingDialog } from "./AddMeetingDialog";

export interface DialogProps {
  isOpen: boolean;
  closeModal: () => void;
}

export interface ReadingDialogProps extends DialogProps {
  isCurrentReading: boolean;
}
