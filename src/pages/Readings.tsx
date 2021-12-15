import { CurrentReadingContainer } from "src/components/Reading/CurrentReading/Container";
import { PreviousReadingContainer } from "src/components/Reading/PreviousReading/Container";

export function Readings() {
  return (
    <main>
      <div className="bg-background w-screen py-10 px-4">
        <div className="container mx-auto space-y-5 grid grid-cols-4">
          <CurrentReadingContainer />
          <PreviousReadingContainer />
        </div>
      </div>
    </main>
  );
}
