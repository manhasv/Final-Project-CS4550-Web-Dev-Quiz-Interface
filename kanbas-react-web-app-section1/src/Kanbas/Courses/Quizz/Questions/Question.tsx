import FillInTheBlank from "./FillInTheBlank";
import MultipleChoice from "./MultipleChoice";
import QuestionHeader from "./QuestionHeader";
import TrueFalse from "./TrueFalse";

export default function Question({
  question,
  questionNumber,
  point,
}: {
  question: any;
  questionNumber: number;
  point: number;
}) {
  const questionType: string = question.type; // get this based on the quiz id and question number
  return (
    <div>
      <QuestionHeader
        isStudentTaking={true}
        questionNumber={questionNumber}
        points={point}
      />
      <div className="bg-light border border-2 border-top-0 border-dark p-2">
        {questionType == "TRUEFALSE" && <TrueFalse questionIndex={questionNumber - 1} question={question} />}
        {questionType == "MULTIPLECHOICE" && (
          <MultipleChoice questionIndex={questionNumber - 1} question={question} />
        )}
        {questionType == "FILLINTHEBLANK" && (
          <FillInTheBlank questionIndex={questionNumber - 1} question={question} />
        )}
      </div>
    </div>
  );
}
