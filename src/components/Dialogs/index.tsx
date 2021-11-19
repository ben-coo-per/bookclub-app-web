export { AddNewReadingDialog } from "./AddNewReadingDialog";
export { EditReadingDialog } from "./EditReadingDialog";
export { DeleteReadingDialog } from "./DeleteReadingDialog";

export interface DialogProps {
  isOpen: boolean;
  closeModal: () => void;
}
