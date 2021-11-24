import { Formik } from "formik";
import { TextInput, Button, Select } from "src/components/Inputs";
import { Dialog } from "@headlessui/react";
import { useCreateMeetingMutation } from "src/generated/graphql";
import { useDispatch } from "react-redux";

interface AddMeetingFormFields {
  meetingDate: string;
  readThrough?: string;
  linkToMeeting?: string;
}

interface AddMeetingFormProps {
  cancelAction?: () => void;
}

const AddMeetingForm = ({ cancelAction }: AddMeetingFormProps) => {
  const [, createMeeting] = useCreateMeetingMutation();
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-3">
      <Dialog.Title as="h2" className="text-darkBlue text-4xl font-bold">
        Add a New Reading
      </Dialog.Title>
      <Formik
        initialValues={{
          meetingDate: "",
          readThrough: "",
        }}
        validate={(values: AddMeetingFormFields) => {
          const errors: Partial<AddMeetingFormFields> = {};
          if (!values.meetingDate) {
            errors.meetingDate = "Required";
          }

          return errors;
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          // const response = await createReading({
          //   title: values.meetingDate,
          //   author: values.author,
          //   type: values.type,
          //   currentlyReading: isCurrentReading,
          // });

          // if (response.data?.createReading) {
          //   if (isCurrentReading)
          //     dispatch(
          //       addReadingToCurrentReadings(response.data.createReading)
          //     );
          //   if (!isCurrentReading)
          //     dispatch(
          //       addREadingToPreviousReadings(response.data.createReading)
          //     );
          // }
          // if (response.error) {
          //   console.log("error: ", response.error);
          // }
          if (cancelAction) {
            cancelAction();
          }
        }}
      >
        {({
          values,
          handleChange,
          setFieldValue,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <TextInput
              label="Meeting Date"
              name="meetingDate"
              placeholder=""
              tailwindClasses="mx-auto w-full form-input"
              value={values.meetingDate}
              onChange={handleChange}
              type="datetime-local"
            />
            <TextInput
              label="Read Through"
              name="readThrough"
              placeholder=""
              tailwindClasses="mx-auto w-full"
              value={values.readThrough}
              onChange={handleChange}
            />
            {/* <TextInput
              label="Link to Meeting"
              name="author"
              placeholder=""
              tailwindClasses="mx-auto w-full"
              value={values.readThrough}
              onChange={handleChange}
            /> */}

            <span className="w-full flex flex-row gap-2 items-center justify-end">
              <Button variant="outline" type="button" onClick={cancelAction}>
                Cancel
              </Button>
              <Button type="submit" loading={isSubmitting}>
                Add
              </Button>
            </span>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddMeetingForm;
