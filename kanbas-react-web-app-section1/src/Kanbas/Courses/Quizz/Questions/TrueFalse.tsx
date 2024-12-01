import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "../Attempt/your_attempt_reducer";

export default function TrueFalse({
  questionIndex,
  question,
  handleAnswerChange,
}: {
  questionIndex: number;
  question: any;
  handleAnswerChange?: (questionIndex: number, answer: any) => void;
}) {
  const { attempt } = useSelector((state: any) => state.attemptReducer);
  const dispatch = useDispatch();
  return (
    <div>
      {question.content.text}
      <br />
      <label>
        <input
          name={`TF#${question._id}`}
          type="radio"
          value="true"
          defaultChecked={
            attempt.answers[questionIndex] === true
          }
          onChange={(e) => {
            if (e.target.checked) {
              const answer = true;
              dispatch(setAnswer({ questionIndex, answer }));
              if (handleAnswerChange) {
                handleAnswerChange(questionIndex, answer); // Call if exists
              }
            }
          }}
        ></input>
        True
      </label>
      <br />
      <label>
        <input
          name={`TF#${question._id}`}
          type="radio"
          value="false"
          defaultChecked={
            attempt.answers[questionIndex] === false
          }
          onChange={(e) => {
            if (attempt[questionIndex] !== !e.target.checked) {
              dispatch(setAnswer({ questionIndex, answer: !e.target.checked }));
            }
          }}
        ></input>
        False
      </label>
    </div>
  );
}
