import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "../Attempt/your_attempt_reducer";

export default function MultipleChoice({
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
      {question.content.choices.map((choice: string) => {
        return (
          <>
            <br />
            <label>
              <input
                name={`MC#${question._id}`}
                type="radio"
                value={choice}
                defaultChecked={choice === attempt.answers[questionIndex]}
                onChange={(e) => {
                  if (e.target.checked) {
                    dispatch(setAnswer({ questionIndex, answer: choice }));
                    if (handleAnswerChange) {
                      handleAnswerChange(questionIndex, choice); // Call if exists
                    }
                  }
                }}
              ></input>
              {choice}
            </label>
          </>
        );
      })}
    </div>
  );
}
