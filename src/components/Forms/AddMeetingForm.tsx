import { FieldArray, Formik } from "formik";
import { TextInput, Button, Select, Checkbox } from "src/components/Inputs";
import { Dialog } from "@headlessui/react";
import {
  useCreateMeetingMutation,
  useCurrentlyReadingQuery,
} from "src/generated/graphql";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addNewMeeting } from "src/features/meetings/meetingSlice";

let ReadingAssignmentTypeOptions = ["Chapter", "Section", "Page"];

interface ReadingAssignment {
  readingId: number;
  readingAssignmentType?: string;
  readingAssignmentStart?: string;
  readingAssignmentEnd?: string;
  checked: boolean;
}

interface AddMeetingFormFields {
  meetingDate: string;
  readingAssignments: ReadingAssignment[];
  linkToMeeting?: string;
}

interface AddMeetingFormProps {
  cancelAction?: () => void;
}

const AddMeetingForm = ({ cancelAction }: AddMeetingFormProps) => {
  const [, createMeeting] = useCreateMeetingMutation();
  const [currentReadings] = useCurrentlyReadingQuery();

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-3">
      <Dialog.Title as="h2" className="text-darkBlue text-4xl font-bold">
        Add New Meeting
      </Dialog.Title>
      <Formik
        initialValues={{
          meetingDate: "",
          readingAssignments: [],
        }}
        validate={(values: AddMeetingFormFields) => {
          const errors: Partial<AddMeetingFormFields> = {};
          if (!values.meetingDate) {
            errors.meetingDate = "Required";
          }

          return errors;
        }}
        onSubmit={async (values, { setErrors }) => {
          let data = {
            meetingDate: values.meetingDate,
            linkToMeeting: values.linkToMeeting,
            readingAssignments: values.readingAssignments
              .filter((ra) => ra.checked)
              .map((ra) => {
                if (!ra.readingAssignmentStart && !ra.readingAssignmentEnd) {
                  return {
                    readingId: ra.readingId,
                    readingAssignmentType: ra.readingAssignmentType,
                    readingAssignmentStart: "Start",
                    readingAssignmentEnd: "End",
                  };
                }

                return {
                  readingId: ra.readingId,
                  readingAssignmentType: ra.readingAssignmentType,
                  readingAssignmentStart: ra.readingAssignmentStart,
                  readingAssignmentEnd: ra.readingAssignmentEnd,
                };
              }),
          };

          const response = await createMeeting({
            ...data,
          });

          console.log(response);

          if (response.data?.createMeeting) {
            dispatch(addNewMeeting(response.data.createMeeting));
          }
          if (response.error) {
            console.log("error: ", response.error);
          }
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className={`flex flex-col gap-0.5`}>
              <label className="font-sans text-md text-subtleText ml-0.5">
                Reading Assignments
              </label>

              <div className="border-2 border-darkBlue border-opacity-50 rounded-md px-2">
                {currentReadings.data?.currentlyReading && (
                  <FieldArray name="readingAssignments">
                    {() =>
                      currentReadings.data?.currentlyReading.map(
                        (reading, i) => {
                          return (
                            <div
                              key={i}
                              className="flex flex-col gap-4 p-2 rounded-lg bg-accent my-2"
                            >
                              <div className="flex flex-row gap-4 items-center">
                                <Checkbox
                                  name={`readingAssignments.${i}.checked`}
                                  onCheck={() => {
                                    setFieldValue(
                                      `readingAssignments.${i}.checked`,
                                      !values.readingAssignments[i]?.checked
                                    );
                                    setFieldValue(
                                      `readingAssignments.${i}.readingId`,
                                      reading.id
                                    );
                                  }}
                                  checked={
                                    values.readingAssignments[i]?.checked
                                  }
                                />
                                <div className="flex flex-col">
                                  <p className="text-lg font-serif">
                                    {reading.title}
                                  </p>
                                  <p className="text-sm font-serif">
                                    {reading.author}
                                  </p>
                                </div>
                              </div>
                              {values.readingAssignments[i]?.checked && (
                                <div className="grid grid-cols-4 gap-2">
                                  <div className="col-span-2">
                                    <Select
                                      size="sm"
                                      selected={
                                        values.readingAssignments[i]
                                          .readingAssignmentType
                                      }
                                      options={ReadingAssignmentTypeOptions}
                                      label="Marker Type"
                                      setSelected={(readingAssignmentType) =>
                                        setFieldValue(
                                          `readingAssignments.${i}.readingAssignmentType`,
                                          readingAssignmentType
                                        )
                                      }
                                    />
                                  </div>
                                  <TextInput
                                    name={`readingAssignments.${i}.readingAssignmentStart`}
                                    placeholder={`# or Start`}
                                    className="col-span-1"
                                    label="From"
                                    size="sm"
                                    value={
                                      values.readingAssignments[i]
                                        .readingAssignmentStart
                                    }
                                    onChange={handleChange}
                                  />
                                  <TextInput
                                    name={`readingAssignments.${i}.readingAssignmentEnd`}
                                    placeholder={`# or End`}
                                    className="col-span-1"
                                    label="To"
                                    size="sm"
                                    value={
                                      values.readingAssignments[i]
                                        .readingAssignmentEnd
                                    }
                                    onChange={handleChange}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        }
                      )
                    }
                  </FieldArray>
                )}
              </div>

              <Link to="/readings" className="">
                <p className="text-regBlue underline float-right">
                  Need to Add a New Book, Poem, etc.?
                </p>
              </Link>
            </div>

            <TextInput
              label="Meeting Date"
              name="meetingDate"
              placeholder=""
              className="mx-auto w-full form-input "
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

// <div className="grid grid-cols-6 md:grid-cols-10 gap-1 items-center border-2 border-darkBlue border-opacity-50 rounded-md p-2">
// <p className="col-span-1">From</p>

// <TextInput
//   name="readingAssignmentStart"
//   placeholder={`#`}
//   className="col-span-2"
//   value={values.readingAssignmentStart}
//   onChange={handleChange}
// />

// <p className="col-span-1">To</p>

// <TextInput
//   name="readingAssignmentEnd"
//   placeholder={`# or End`}
//   className="col-span-3"
//   value={values.readingAssignmentEnd}
//   onChange={handleChange}
// />
// </div>
