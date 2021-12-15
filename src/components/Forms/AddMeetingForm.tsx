import { Formik } from "formik";
import { TextInput, Button, Select } from "src/components/Inputs";
import { Dialog } from "@headlessui/react";
import { useCreateMeetingMutation } from "src/generated/graphql";
import { useDispatch } from "react-redux";

let ReadingAssignmentTypeOptions = ["Chapter", "Section", "Page"];

interface AddMeetingFormFields {
  meetingDate: string;
  readingAssignmentType?: string;
  readingAssignmentStart?: string;
  readingAssignmentEnd?: string;
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
        Add New Meeting
      </Dialog.Title>
      <Formik
        initialValues={{
          meetingDate: "",
          readingAssignmentType: "",
          readingAssignmentStart: "",
          readingAssignmentEnd: "",
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
            <div className={`flex flex-col gap-0.5 `}>
              <label className="font-sans text-md text-subtleText ml-0.5">
                Reading For This Meeting
              </label>
              <div className="grid grid-cols-6 md:grid-cols-10 gap-1 items-center border-2 border-darkBlue border-opacity-50 rounded-md p-2">
                <p className="col-span-1">From</p>
                <div className="col-span-3">
                  <Select
                    selected={values.readingAssignmentType}
                    options={ReadingAssignmentTypeOptions}
                    setSelected={(readingAssignmentType) =>
                      setFieldValue(
                        "readingAssignmentType",
                        readingAssignmentType
                      )
                    }
                  />
                </div>

                <TextInput
                  name="readingAssignmentStart"
                  placeholder={`#`}
                  className="col-span-2"
                  value={values.readingAssignmentStart}
                  onChange={handleChange}
                />

                <p className="col-span-1">To</p>

                <TextInput
                  name="readingAssignmentEnd"
                  placeholder={`# or End`}
                  className="col-span-3"
                  value={values.readingAssignmentEnd}
                  onChange={handleChange}
                />
              </div>
            </div>

            <TextInput
              label="Meeting Date"
              name="meetingDate"
              placeholder=""
              className="mx-auto w-full form-input"
              value={values.meetingDate}
              onChange={handleChange}
              type="datetime-local"
            />

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
