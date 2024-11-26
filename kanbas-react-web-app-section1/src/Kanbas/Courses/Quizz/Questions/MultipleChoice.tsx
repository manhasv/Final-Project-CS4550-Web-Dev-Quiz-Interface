export default function MultipleChoice({
  questionIndex,
  question,
}: {
  questionIndex: number;
  question: any;
}) {
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
              ></input>
              {choice}
            </label>
          </>
        );
      })}
    </div>
  );
}
