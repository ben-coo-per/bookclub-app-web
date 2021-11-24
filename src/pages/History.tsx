import { CurrentReadingContainer } from "src/components/ReadingHistory/CurrentReading/Container";
import { PreviousReadingContainer } from "src/components/ReadingHistory/PreviousReading/Container";
import { CurrentMeetingsContainer } from "src/components/ReadingHistory/Meetings/Container";

export function History() {
  return (
    <main>
      <div className="bg-background w-screen py-10 px-4">
        <div className="container mx-auto space-y-5 grid grid-cols-4">
          <div className="col-span-4 mx-auto w-full">
            <div className="grid grid-cols-5 gap-4">
              <CurrentReadingContainer />
              <CurrentMeetingsContainer />
            </div>
          </div>
          <PreviousReadingContainer />
        </div>
      </div>
    </main>
  );
}
