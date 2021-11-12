import { TextInput, Button } from "../Inputs";
import { Formik } from "formik";
import { useRegisterMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useNavigate } from "react-router-dom";

interface RegisterFormFields {
  email: string;
  password: string;
  name: string;
}

export const RegisterForm = () => {
  const [, register] = useRegisterMutation();
  const navigate = useNavigate();

  return (
    <div className="bg-white w-96 mx-auto p-5 rounded-lg shadow-lg flex flex-col gap-3">
      <h2 className="text-darkBlue text-4xl font-bold">Create your account</h2>
      <Formik
        initialValues={{ email: "", password: "", name: "" }}
        validate={(values: RegisterFormFields) => {
          const errors: Partial<RegisterFormFields> = {};

          if (!values.name) {
            errors.name = "Required";
          }
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
          const response = await register(values);

          if (
            response.data?.register?.errors &&
            response.data?.register?.errors?.length > 0
          ) {
            // Error occured when creating user
            setErrors(toErrorMap(response.data.register.errors));
          } else {
            // Successfully returned member
            navigate("/");
          }
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <TextInput
              label="Name"
              name="name"
              placeholder="Enter your full name"
              tailwindClasses="mx-auto w-full"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextInput
              label="Email"
              name="email"
              placeholder="Enter your desired email"
              tailwindClasses="mx-auto w-full"
              value={values.email}
              onChange={handleChange}
            />
            <TextInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              tailwindClasses="mx-auto w-full"
              type="password"
              value={values.password}
              onChange={handleChange}
            />

            <span className="w-full flex flex-col justify-between items-center">
              <Button type="submit" loading={isSubmitting}>
                Create Account
              </Button>
              <Button variant="link" onClick={() => navigate("/auth/login")}>
                Sign in to your account
              </Button>
            </span>
          </form>
        )}
      </Formik>
    </div>
  );
};
