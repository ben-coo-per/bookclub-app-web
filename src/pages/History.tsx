import { CurrentlyReadingContainer } from "src/components/Reading History/CurrentlyReading";
import { ReadingHistoryContainer } from "../components/Reading History/ReadingHistoryContainer";

export function History() {
  return (
    <main>
      <div className="bg-background w-screen py-10 px-4">
        <div className="container mx-auto space-y-5 grid grid-cols-4">
          <CurrentlyReadingContainer />
          <ReadingHistoryContainer />
        </div>
      </div>
    </main>
  );
}
