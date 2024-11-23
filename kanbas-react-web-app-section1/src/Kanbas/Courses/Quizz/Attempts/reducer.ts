import { createSlice } from "@reduxjs/toolkit";
import { attempts as initialAttempts } from "../../../Database";
const initialState = {
    attempts: initialAttempts,
};

const attemptsSlice = createSlice({
    name: "attempts",
    initialState,
    reducers: {
        setAttempts: (state, { payload: attempts }) => {
            state.attempts = attempts;
        },
        addAttempt: (state, { payload: attempt }) => {
            const newAttempt = {
                _id: new Date().getTime().toString(),
                ...attempt,
                questions: attempt.questions || []
            };
            state.attempts.push(newAttempt);
        },
        updateAttempt: (state, { payload: attempt }) => {
            state.attempts = state.attempts.map((a) =>
                a._id === attempt._id
                    ? attempt
                    : a
            );
        },
        setAttemptScore: (state, { payload: { attemptId, score } }) => {
            state.attempts = state.attempts.map((a) =>
                a._id === attemptId ? { ...a, score } : a
            );
        },
    },
});

export const {  } = attemptsSlice.actions;
export default attemptsSlice.reducer;