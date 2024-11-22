    import Database from "../Database/index.js";

    export function findQuizzesForCourse(courseId) {
        const { quizzes } = Database;
        return quizzes.filter((quiz) => quiz.course === courseId);
    }
    export function createQuiz(quiz) {
        if (!quiz.hasOwnProperty('questions') || !Array.isArray(quiz.questions)) {
            quiz.questions = [];
        }
        const newQuiz = { ...quiz, _id: Date.now().toString() };
        Database.quizzes = [...Database.quizzes, newQuiz];
        return newQuiz;
    }
    export function deleteQuiz(quizId) {
        const { quizzes } = Database;
        Database.quizzes = quizzes.filter((quiz) => quiz._id !== quizId);
    }
    export function updateQuiz(quizId, quizUpdates) {
        const { quizzes } = Database;
        const quiz = quizzes.find((quiz) => quiz._id === quizId);
        Object.assign(quiz, quizUpdates);
        return quiz;
    }