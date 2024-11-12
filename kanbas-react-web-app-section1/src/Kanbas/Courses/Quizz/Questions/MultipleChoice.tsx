export default function MultipleChoice({ question }: { question: any }) {
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
