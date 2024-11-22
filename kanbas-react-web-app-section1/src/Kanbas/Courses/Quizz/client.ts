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