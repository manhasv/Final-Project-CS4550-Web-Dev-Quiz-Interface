import FillInTheBlank from "./FillInTheBlank";
import MultipleChoice from "./MultipleChoice";
import QuestionHeader from "./QuestionHeader";
import TrueFalse from "./TrueFalse";

export default function Question({
  question,
  questionNumber,
}: {
  question: any;
  questionNumber: number;
}) {
  const questionType: string = question.type; // get this based on the quiz id and question number
  return (
    <div>
      <QuestionHeader
        isStudentTaking={true}
        questionNumber={questionNumber}
        points={4}
        maxPoints={4}
      />
      <div className="bg-light border border-2 border-top-0 border-dark p-2">
        {questionType == "TRUEFALSE" && <TrueFalse question={question} />}
        {questionType == "MULTIPLECHOICE" && (
          <MultipleChoice question={question} />
        )}
        {questionType == "FILLINTHEBLANK" && (
          <FillInTheBlank question={question} />
        )}
      </div>
    </div>
  );
}