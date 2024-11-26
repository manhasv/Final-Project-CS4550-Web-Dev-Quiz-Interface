import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "../Attempt/your_attempt_reducer";

export default function TrueFalse({
  questionIndex,
  question,
}: {
  questionIndex: number;
  question: any;
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
            if (attempt[questionIndex] !== e.target.checked) {
              dispatch(setAnswer({ questionIndex, answer: e.target.checked }));
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
