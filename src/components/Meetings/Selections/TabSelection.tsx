import { useSelector } from "react-redux";
import { selectedMeeting } from "src/features/meetings/meetingSlice";

export type TabOptions = "attendance" | "reading";

interface TabSelectionRowInterface {
  selectedTab: TabOptions;
  setSelectedTab: (tab: TabOptions) => void;
}

export const TabSelectionRow = ({
  selectedTab,
  setSelectedTab,
}: TabSelectionRowInterface) => {
  const meeting = useSelector(selectedMeeting);

  const dateTime = meeting?.meetingDate
    ? new Date(parseInt(meeting?.meetingDate))
    : "-";

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-4 items-center md:px-2">
        <h2
          className={`${
            selectedTab === "attendance"
              ? "text-darkBlue underline"
              : "text-darkAccent cursor-pointer"
          } text-2xl font-bold truncate`}
          onClick={() => setSelectedTab("attendance")}
        >
          Attendance
        </h2>
        <h2
          className={`${
            selectedTab === "reading"
              ? "text-darkBlue underline"
              : "text-darkAccent cursor-pointer"
          } text-2xl font-bold truncate`}
          onClick={() => setSelectedTab("reading")}
        >
          Reading
        </h2>
      </div>
      <div className="flex flex-row gap-3 justify-items-end ">
        <p className="hidden md:block">Meeting Time:</p>
        <p>
          {dateTime != "-"
            ? dateTime
                .toLocaleTimeString()
                .replace(":00", "")
                .replace(":00", "")
            : dateTime}
        </p>
      </div>
    </div>
  );
};
