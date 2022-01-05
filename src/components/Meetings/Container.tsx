import { useState } from "react";
import { MeetingAttendance } from "./Attendance/MeetingsAttendance";
import { MeetingSelector } from "./Selections/MeetingSelector";
import { SelectedMeetingDetail } from "./ReadingAssignment/SelectedMeetingDetail";
import { TabOptions, TabSelectionRow } from "./Selections/TabSelection";

export const CurrentMeetingsContainer = () => {
  const [selectedTab, setSelectedTab] = useState<TabOptions>("attendance");

  return (
    <div className="flex flex-col gap-4 w-full col-span-4 ">
      <MeetingSelector />

      <TabSelectionRow
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {selectedTab === "attendance" ? (
        <MeetingAttendance />
      ) : (
        <SelectedMeetingDetail />
      )}
    </div>
  );
};
