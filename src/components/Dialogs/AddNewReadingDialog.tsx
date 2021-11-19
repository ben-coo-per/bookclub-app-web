import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import AddNewReadingForm from "src/components/Forms/AddNewReadingForm";
import { DialogProps } from ".";

export const AddNewReadingDialog = ({ isOpen, closeModal }: DialogProps) => {
  return (
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
              <AddNewReadingForm cancelAction={closeModal} />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
