export default function FillInTheBlank({
  questionIndex,
  question,
}: {
  questionIndex: number;
  question: any;
}) {
  return (
    <div>
      {question.content.text}
      {question.content.blanks.map((textForBlank: string) => {
        return (
          <>
            <br />
            <label>
              {textForBlank}
              <input></input>
            </label>
          </>
        );
      })}
    </div>
  );
}
