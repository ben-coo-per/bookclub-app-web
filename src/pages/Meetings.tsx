import { CurrentMeetingsContainer } from "src/components/Meetings/Container";

export function Meetings() {
  return (
    <main>
      <div className="bg-background w-screen py-10 px-4">
        <div className="container mx-auto space-y-5">
          <CurrentMeetingsContainer />
        </div>
      </div>
    </main>
  );
}
