import * as quizDao from "./dao.js";

export default function QuizRoutes(app) {
    app.delete("/api/quizz/:quizId", (req, res) => {
        const { quizId } = req.params;
        quizDao.deleteQuiz(quizId);
        res.sendStatus(204);
    });
    app.put("/api/quizz/:quizId", (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        quizDao.updateQuiz(quizId, quizUpdates);
        res.sendStatus(204);
    });
}