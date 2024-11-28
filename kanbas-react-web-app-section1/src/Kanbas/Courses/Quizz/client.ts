import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZ_API = `${REMOTE_SERVER}/api/quizz`;

export const deleteQuizz = async (quizzId: string) => {
    const response = await axios.delete(`${QUIZZ_API}/${quizzId}`);
    return response.data;
};

export const updateQuizz = async (quizz: any) => {
    const response = await axios.put(`${QUIZZ_API}/${quizz._id}`, quizz);
    return response.data;
};

// attempt
export const startAttempt = async (quizId: string, userId: string) => {
    const response = await axios.post(`${QUIZZ_API}/${quizId}/attempt/${userId}`);
    return response.data;
};
export const getLatestAttempt = async (quizId: string, userId: string) => {
    const response = await axios.get(`${QUIZZ_API}/${quizId}/attempt/${userId}`);
    return response.data;
};

export const updateAttemptAnswers = async (quizId: string, userId: string, answers: any) => {
    const response = await axios.put(`${QUIZZ_API}/${quizId}/attempt/${userId}`, answers);
    return response.data;
};

export const submitAttempt = async (quizId: string, userId: string) => {
    const response = await axios.post(`${QUIZZ_API}/${quizId}/attempt/${userId}/submit`);
    return response.data;
};