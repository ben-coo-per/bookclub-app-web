import { ReadingAssignmentsResponse } from "src/generated/graphql";
import { TextDataDisplay } from "../../textDataDisplay";

interface ReadingAssignmentRowProps {
  readingAssignment: ReadingAssignmentsResponse;
}

function getReadableReadToDescription(
  type?: string | null,
  start?: string | null,
  end?: string | null
) {
  if (!start && !end) {
    return "~ Not Specified ~";
  }

  return (
    (type ? type : "") +
    " " +
    (start ? start : "🤷‍♀️") +
    " - " +
    (end ? end : "🤷‍♀️")
  );
}

export const ReadingAssignmentRow = ({
  readingAssignment,
}: ReadingAssignmentRowProps) => {
  const readToDescription = getReadableReadToDescription(
    readingAssignment.readingAssignmentType,
    readingAssignment.readingAssignmentStart,
    readingAssignment.readingAssignmentEnd
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white gap-y-1 shadow-lg border border-accent rounded-xl px-4 py-1 ">
      <TextDataDisplay label="Title" className="col-span-2" truncate={false}>
        {readingAssignment.title}
      </TextDataDisplay>
      <TextDataDisplay label="Author" className="col-span-1" truncate={false}>
        {readingAssignment.author}
      </TextDataDisplay>
      <TextDataDisplay label="Read To" className="col-span-1" truncate={false}>
        {readToDescription}
      </TextDataDisplay>
    </div>
  );
};
