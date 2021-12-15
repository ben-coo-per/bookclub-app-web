import { TextInput, Button } from "../Inputs";
import { Formik } from "formik";
import { useLoginMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useNavigate } from "react-router-dom";

interface LoginFormFields {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [, login] = useLoginMutation();
  const navigate = useNavigate();

  return (
    <div className="bg-white w-96 mx-auto p-5 rounded-lg shadow-lg flex flex-col gap-3">
      <h2 className="text-darkBlue text-4xl font-bold">
        Sign in to your account
      </h2>
      <Formik
        initialValues={{ email: "", password: "", name: "" }}
        validate={(values: LoginFormFields) => {
          const errors: Partial<LoginFormFields> = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);

          if (
            response.data?.login?.errors &&
            response.data?.login?.errors?.length > 0
          ) {
            // Error occured when creating user
            setErrors(toErrorMap(response.data.login.errors));
          } else {
            // Successfully returned user
            navigate("/");
          }
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <TextInput
              label="Email"
              name="email"
              placeholder="Enter your email"
              className="mx-auto w-full"
              value={values.email}
              onChange={handleChange}
            />

            <TextInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              className="mx-auto w-full"
              type="password"
              value={values.password}
              onChange={handleChange}
            />

            <span className="w-full flex flex-col gap-2 justify-between items-center">
              <Button type="submit" loading={isSubmitting}>
                Sign In
              </Button>
              <span className="flex flex-row-reverse justify-between w-full">
                <Button
                  variant="link"
                  onClick={() => navigate("/auth/register")}
                >
                  Create an Account
                </Button>
                <Button
                  variant="link"
                  className="text-xs ml-1"
                  onClick={() => navigate("/auth/forgot")}
                >
                  Forgot Password
                </Button>
              </span>
            </span>
          </form>
        )}
      </Formik>
    </div>
  );
};
