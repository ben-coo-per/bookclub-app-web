import { Dispatch, SetStateAction } from "react";
import { AttendanceType } from "src/generated/graphql";
import { AttendanceOption } from "./UserCard";

export const AttendanceSelector = ({
  attendanceSelection,
  setAttendanceSelection,
}: {
  attendanceSelection: AttendanceOption;
  setAttendanceSelection: (
    attendanceSelection: AttendanceType
  ) => Promise<void>;
}) => {
  return (
    <div className="flex flex-row col-span-2 md:col-span-1 w-36 justify-between gap-0 rounded-lg border border-darkAccent p-0.5">
      <AttendanceOptionSection
        isExpanded={attendanceSelection === "absent"}
        color="royalRed"
        name={AttendanceType["Absent"]}
        setAttendanceSelection={setAttendanceSelection}
      />
      <AttendanceOptionSection
        isExpanded={attendanceSelection === "present"}
        color="jesterGreen"
        name={AttendanceType["Present"]}
        setAttendanceSelection={setAttendanceSelection}
      />
      <AttendanceOptionSection
        isExpanded={attendanceSelection === "excused"}
        color="regBlue"
        name={AttendanceType["Excused"]}
        setAttendanceSelection={setAttendanceSelection}
      />
    </div>
  );
};

interface AttendanceOptionSectionProps {
  color: string;
  name: AttendanceType;
  isExpanded: boolean;
  className?: string;
  setAttendanceSelection: (attendanceOption: AttendanceType) => void;
}

const AttendanceOptionSection = ({
  color,
  name,
  isExpanded,
  className,
  setAttendanceSelection,
}: AttendanceOptionSectionProps) => {
  if (isExpanded) {
    return (
      <div
        className={`bg-${color} text-white p-2 py-1 ${className} rounded font-semibold font-serif`}
      >
        {name.replace(name[0], name[0].toUpperCase())}
      </div>
    );
  }
  return (
    <div
      className={`text-${color} bg-white p-2 py-1 cursor-pointer ${className} font-semibold font-serif`}
      onClick={() => setAttendanceSelection(name)}
    >
      {name[0].toUpperCase()}
    </div>
  );
};
