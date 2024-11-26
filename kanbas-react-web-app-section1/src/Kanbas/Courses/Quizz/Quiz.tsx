import { useDispatch, useSelector } from "react-redux";
import Question from "./Questions/Question";
import { useParams } from "react-router";
import { setAttempt } from "./Attempt/your_attempt_reducer";
import Timer from "./Timer";

export default function Quiz({
  isPreview
}: {
  isPreview: boolean;
}) {
  const { qid } = useParams();
  const quizzes = useSelector(
    (state: any) => state.quizzesReducer?.quizzes ?? []
  );
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { attempt } = useSelector((state: any) => state.attemptReducer);
  const thisQuiz = quizzes.find((quiz: any) => quiz._id === qid); // this would pull from server

  const dispatch = useDispatch();

  return (
    <div>
      {JSON.stringify(attempt)}
      <br />
      This is a {isPreview ? "preview" : "quiz"}!!!
      <br />
      {JSON.stringify(thisQuiz.questions)}
      <br />
      <br />
      <br />
      <Timer startTime={attempt.start}/>
      {thisQuiz.questions.map((q: any, n: number) => {
        return (
          <div>
            {" "}
            <Question
              question={q}
              questionNumber={n + 1}
              point={q.content.point}
            />
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
}
