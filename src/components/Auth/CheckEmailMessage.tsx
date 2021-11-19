import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router";

export const CheckEmailMessage = ({
  setComplete,
}: {
  setComplete: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="bg-white w-96 mx-auto p-5 rounded-lg shadow-lg flex flex-col gap-3">
      <h2 className="text-darkBlue text-4xl font-bold">
        Please check your email
      </h2>
      <p className="text-subtleText text-xl font-regular">
        You should have recieved a password reset link at the email you
        provided.
      </p>
      <p className="text-subtleText text-xl font-regular">
        If you have not recieved your email after a few minutes,{" "}
        <a
          className="text-midnightBlue text-lg font-regular underline cursor-pointer"
          onClick={() => setComplete(false)}
        >
          try sending it again.
        </a>
      </p>
    </div>
  );
};
