export default function QuestionHeader({
  questionNumber,
  isStudentTaking,
  points,
  maxPoints,
}: {
  questionNumber: number;
  isStudentTaking: boolean;
  points: number;
  maxPoints: number;
}) {
  return (
    <div className="bg-secondary border border-2 border-dark p-2">
      <span className="fs-4">Question {questionNumber}</span>
      <span className="fs-4 float-end">
        {isStudentTaking ? `${maxPoints} points` : `${points}/${maxPoints}`}
      </span>
    </div>
  );
}
