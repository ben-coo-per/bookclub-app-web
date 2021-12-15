import { TextInput, Button } from "../Inputs";
import { ErrorMessage, Formik } from "formik";
import {
  useChangePasswordMutation,
  useLoginMutation,
} from "../../generated/graphql";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { toErrorMap } from "../../utils/toErrorMap";
import { useState } from "react";

interface ChangePasswordFormFields {
  password: string;
}

export const ChangePasswordForm = () => {
  const urlEncoded = useParams();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState<string>();
  const navigate = useNavigate();

  return (
    <div className="bg-white w-96 mx-auto p-5 rounded-lg shadow-lg flex flex-col gap-3">
      <h2 className="text-darkBlue text-4xl font-bold">
        Sign in to your account
      </h2>
      <Formik
        initialValues={{ password: "" }}
        validate={(values: ChangePasswordFormFields) => {
          const errors: Partial<ChangePasswordFormFields> = {};
          if (!values.password) {
            errors.password = "Required";
          }

          return errors;
        }}
        onSubmit={async (values, { setErrors }) => {
          if (urlEncoded.token) {
            const response = await changePassword({
              token: urlEncoded.token,
              newPassword: values.password,
            });
            if (
              response.data?.changePassword?.errors &&
              response.data?.changePassword?.errors?.length > 0
            ) {
              const errorMap = toErrorMap(response.data.changePassword.errors);
              if ("token" in errorMap) {
                setTokenError(errorMap.token);
              }
              // Error occured when creating user
              setErrors(errorMap);
            } else {
              // Successfully returned user
              navigate("/");
            }
          }
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {tokenError && (
              <div className="text-royalRed font-sans text-md ml-0.5">
                {tokenError}{" "}
                <a
                  onClick={() => navigate("/auth/forgot")}
                  className="cursor-pointer underline text-subtleText"
                >
                  Click here to get a new one
                </a>
              </div>
            )}
            <TextInput
              label="New Password"
              name="password"
              placeholder="Enter your new password"
              className="mx-auto w-full"
              type="password"
              value={values.password}
              onChange={handleChange}
            />

            <span className="w-full flex flex-col gap-2 justify-between items-center">
              <Button type="submit" loading={isSubmitting}>
                Reset Password
              </Button>
            </span>
          </form>
        )}
      </Formik>
    </div>
  );
};
