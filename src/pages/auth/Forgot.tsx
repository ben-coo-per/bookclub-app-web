import { useState } from "react";
import { ForgotForm } from "src/components/Auth/ForgotForm";
import { CheckEmailMessage } from "../../components/Auth/CheckEmailMessage";

export const Forgot = () => {
  const [complete, setComplete] = useState<boolean>(false);
  return (
    <div className=" py-10 px-8">
      {complete ? (
        <CheckEmailMessage setComplete={setComplete} />
      ) : (
        <ForgotForm setComplete={setComplete} />
      )}
    </div>
  );
};
