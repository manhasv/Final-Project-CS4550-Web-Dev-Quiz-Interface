import { useSelector } from "react-redux";
import Question from "./Questions/Question";
import QuestionHeader from "./Questions/QuestionHeader";
import { useParams } from "react-router";

export default function Quiz({ isPreview }: { isPreview: boolean }) {
  const { qid } = useParams();
  const quizzes = useSelector(
    (state: any) => state.quizzesReducer?.quizzes ?? []
  );
  const thisQuiz = quizzes.find((quiz: any) => quiz._id === qid);
  return (
    <div>
      This is a {isPreview ? "preview" : "quiz"}!!!
      <br />
      {JSON.stringify(thisQuiz.questions)}
      <br />
      <br />
      <br />
      {thisQuiz.questions.map((q: any, n: number) => {
        return (
          <div>
            {" "}
            <Question question={q} questionNumber={n + 1} point={q.content.point} />
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
}
