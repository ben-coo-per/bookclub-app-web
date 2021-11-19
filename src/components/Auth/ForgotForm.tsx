import { TextInput, Button } from "src/components/Inputs";
import { Formik } from "formik";
import { useForgotPasswordMutation } from "src/generated/graphql";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

interface ForgotFormFields {
  email: string;
}

export const ForgotForm = ({
  setComplete,
}: {
  setComplete: Dispatch<SetStateAction<boolean>>;
}) => {
  const [, forgotPassword] = useForgotPasswordMutation();

  const navigate = useNavigate();

  return (
    <div className="bg-white w-96 mx-auto p-5 rounded-lg shadow-lg flex flex-col gap-3">
      <h2 className="text-darkBlue text-4xl font-bold">Reset Password</h2>
      <Formik
        initialValues={{ email: "" }}
        validate={(values: ForgotFormFields) => {
          const errors: Partial<ForgotFormFields> = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await forgotPassword(values);
          if (response) {
            setComplete(true);
          }
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <TextInput
              label="Email"
              name="email"
              placeholder="Enter your email"
              tailwindClasses="mx-auto w-full"
              value={values.email}
              onChange={handleChange}
            />

            <span className="w-full flex flex-col gap-2 justify-between items-center">
              <Button type="submit" loading={isSubmitting}>
                Send Password Reset Link
              </Button>
            </span>
          </form>
        )}
      </Formik>
    </div>
  );
};
