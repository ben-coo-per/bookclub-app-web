import { CurrentReadingContainer } from "src/components/Reading/CurrentReading/Container";
import { PreviousReadingContainer } from "../components/Reading/PreviousReading/Container";

export function History() {
  return (
    <main>
      <div className="bg-background w-screen py-10 px-4">
        <div className="container mx-auto space-y-5 grid grid-cols-4">
          <div className="col-span-4 mx-auto w-full">
            <div className="grid grid-cols-5 gap-4">
              <CurrentReadingContainer />
              <div className="flex flex-col col-span-5 md:col-span-2 bg-white p-5 rounded-xl shadow-lg">
                <h2 className="text-darkBlue text-3xl font-bold">Meetings</h2>
                <p>TODO</p>
              </div>
            </div>
          </div>
          <PreviousReadingContainer />
        </div>
      </div>
    </main>
  );
}
