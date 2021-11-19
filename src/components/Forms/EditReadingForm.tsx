import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import { TextInput, Button, Select } from "src/components/Inputs";
import { Dialog } from "@headlessui/react";
import { camelCaseToCapitalizedWords } from "src/utils/textUtils";
import { ReadingType, useUpdateReadingMutation } from "src/generated/graphql";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedCurrentReadings,
  updateReading,
} from "src/features/readings/readingSlice";

let ReadingTypeOptions = ["novel", "play", "nonFiction"];

interface AddNewReadingFormFields {
  title: string;
  author: string;
  type?: ReadingType;
}

interface AddNewReadingFormProps {
  cancelAction?: () => void;
}

const EditReadingForm = ({ cancelAction }: AddNewReadingFormProps) => {
  const [, updateReadingMutation] = useUpdateReadingMutation();
  const dispatch = useDispatch();
  const readingToEdit = useSelector(selectedCurrentReadings)[0];

  return (
    <div className="flex flex-col gap-3">
      <Dialog.Title as="h2" className="text-darkBlue text-4xl font-bold">
        Edit Reading
      </Dialog.Title>
      <Formik
        initialValues={{
          title: readingToEdit.title,
          author: readingToEdit.author,
          type: readingToEdit.type == null ? undefined : readingToEdit.type,
        }}
        validate={(values: AddNewReadingFormFields) => {
          const errors: Partial<AddNewReadingFormFields> = {};
          if (!values.title) {
            errors.title = "Required";
          }
          if (!values.author) {
            errors.author = "Required";
          }

          return errors;
        }}
        onSubmit={async (values) => {
          const response = await updateReadingMutation({
            id: readingToEdit.id,
            title: values.title,
            author: values.author,
            type: values.type,
          });

          if (response.data?.updateReading) {
            dispatch(updateReading(response.data.updateReading));
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Select
              label="Type"
              selected={values.type}
              options={ReadingTypeOptions}
              setSelected={(type) => setFieldValue("type", type)}
            />
            <TextInput
              label="Title"
              name="title"
              placeholder={`Enter the title of the ${
                values.type
                  ? camelCaseToCapitalizedWords(values.type)
                  : "reading"
              }`}
              tailwindClasses="mx-auto w-full"
              value={values.title}
              onChange={handleChange}
            />
            <TextInput
              label="Author"
              name="author"
              placeholder={`Enter the author of the ${
                values.type
                  ? camelCaseToCapitalizedWords(values.type)
                  : "reading"
              }`}
              tailwindClasses="mx-auto w-full"
              value={values.author}
              onChange={handleChange}
            />

            <span className="w-full flex flex-row gap-2 items-center justify-end">
              <Button variant="outline" type="button" onClick={cancelAction}>
                Cancel
              </Button>
              <Button type="submit" loading={isSubmitting}>
                Submit
              </Button>
            </span>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditReadingForm;
