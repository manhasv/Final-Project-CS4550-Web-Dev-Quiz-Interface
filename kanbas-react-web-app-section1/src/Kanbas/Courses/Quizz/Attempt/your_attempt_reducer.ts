import { createSlice, PayloadAction } from "@reduxjs/toolkit";

declare type QuestionSetter = {
  questionIndex: number;
  answer: any;
};

const initialState = {
  attempt: {
    _id: "1",
    user: "uid",
    quiz: "qid",
    start: "time string",
    answers: [null, null, "", [""]],
  },
};

const attemptsSlice = createSlice({
  name: "attempt",
  initialState,
  reducers: {
    setAttempt: (state, { payload: attempt }) => {
      state.attempt = attempt;
    },
    setAnswer: (state, action: PayloadAction<QuestionSetter>) => {
      // alert(`setting answer ${action.payload.questionIndex} to ${action.payload.answer}`);
      state.attempt.answers[action.payload.questionIndex] = action.payload.answer;
    },
  },
});

export const { setAnswer, setAttempt } = attemptsSlice.actions;
export default attemptsSlice.reducer;
