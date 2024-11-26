import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "../Attempt/your_attempt_reducer";

export default function FillInTheBlank({
  questionIndex,
  question,
} : {
  questionIndex: number;
  question: any;
}) {
  const { attempt } = useSelector((state: any) => state.attemptReducer);
  const dispatch = useDispatch();

  const [theseAnswers, setTheseAnswers] = useState<string[]>(
    attempt.answers[questionIndex] !== null ? [ ...attempt.answers[questionIndex] ] : question.content.blanks.map((_:any) => "")
  );

  const updateBlank = (st: string, ind: number) => {
    let newAnswers = theseAnswers;
    newAnswers[ind] = st;
    setTheseAnswers(newAnswers);
    dispatch(
      setAnswer({
        questionIndex,
        answer: [...theseAnswers],
      })
    );
  };

  return (
    <div>
      {question.content.text}
      {question.content.blanks.map((textForBlank: string, index: number) => {
        return (
          <>
            <br />
            <label>
              {textForBlank}
              <input
                defaultValue={
                  attempt.answers[questionIndex] !== null ? attempt.answers[questionIndex][index] : ""
                }
                onChange={(e) => {
                  updateBlank(e.target.value, index);
                }}
              ></input>
            </label>
          </>
        );
      })}
    </div>
  );
}
