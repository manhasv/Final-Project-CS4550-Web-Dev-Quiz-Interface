export default function TrueFalse({ question }: { question: any }) {
  return (
    <div>
      {question.content.text}
      <br />
      <label>
        <input name={`TF#${question._id}`} type="radio" value="true"></input>
        True
      </label>
      <br />
      <label>
        <input name={`TF#${question._id}`} type="radio" value="false"></input>
        False
      </label>
    </div>
  );
}
